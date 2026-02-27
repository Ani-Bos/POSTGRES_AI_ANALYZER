from flask import Blueprint, request, jsonify
from controller.QueryParser import QueryParser
from controller.DBConnector import DBConnector
from agents.llmagent import LLMAgent
import os
import json
queryParser = Blueprint("parser", __name__)
llm_agent = LLMAgent() 


@queryParser.route("/queryPlanner", methods=["POST"])
def queryExecutor():
    try:
        data = request.get_json()
        query = data.get("query")
        parser = QueryParser(query)
        if not parser.is_sql():
            return jsonify({"error": "Invalid SQL"}), 400
        dbConnection = DBConnector(host, database, port, username, password)
        plan = dbConnection.executeQueryPlan(query)
        return jsonify({
            "status": "success",
            "plan": plan
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@queryParser.route("/analyze",methods=["POST"])
def queryAnalyze():
    try:
        #now where human chat in comes to play interaction with agent to improvise and summarize the plan
            data = request.get_json()
            query = data.get("query")
            # parser = QueryParser(query)
            # if not parser.is_sql():
            #     return jsonify({"error": "Invalid SQL"}), 400
            #bConnection = DBConnector(host, database, port, username, password)
            dbConnection = DBConnector("127.0.0.1","postgres", 5432, "postgres", "postgres")
            plan = dbConnection.executeQueryPlan(query)
            print(plan)
            formatted_plan = json.dumps(plan_json, indent=2)

            prompt = f"""
            You are a PostgreSQL query performance expert.

            Analyze the provided EXPLAIN ANALYZE output and provide a clear, easy-to-understand explanation.

            Your response MUST follow this exact structure:

            1. Query Overview:
            Brief description of what the query does.

            2. Performance Summary:
            - Total execution time
            - Total estimated cost
            - Number of rows processed

            3. Execution Plan Analysis:
            Explain key steps in the execution plan.
            Focus especially on expensive operations such as:
            - Sequential Scan
            - Nested Loop
            - Hash Join
            - Sort
            - Aggregate
            - Subquery execution

            4. Performance Issues:
            Identify bottlenecks, inefficient scans, high loop counts, large row filtering, or expensive operations.

            5. Optimization Suggestions:
            Provide specific actionable improvements such as:
            - Query rewrites
            - Replacing correlated subqueries
            - Using window functions
            - Reducing data scanned
            - Improving filtering logic

            6. Index Recommendations:
            Suggest missing indexes if applicable.
            Mention exact column names that should be indexed.

            IMPORTANT INSTRUCTIONS:
            - Keep the explanation concise but comprehensive.
            - Use plain language suitable for both developers and DBAs.
            - Format the response as plain text.
            - Use clear section headers exactly as written above.
            - Use bullet points using "-" only.
            - Do NOT use markdown symbols like **, ##, or ###.
            - Do NOT wrap SQL in code blocks.

            Here is the EXPLAIN ANALYZE output in JSON format:

            {formatted_plan}
            """

            summary = llm_agent.chat(prompt)
            return jsonify({
                "plan": plan,
                "summary": summary
            }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@queryParser.route("/chat", methods=["POST"])
def chatwithLLM():
    try:
        data = request.get_json()
        message = data.get("message")
        response = llm_agent.ask_database(message)
        return jsonify({
            "response": response
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@queryParser.route("/textToSQL", methods=["POST"])
def convertNonSQL():
    try:
        data = request.get_json()
        message = data.get("message")

        sql_query = llm_agent.text_to_sql(message)
        query1 = QueryParser(sql_query)

        if not query1.checkQuery():
            return jsonify({"error": "Invalid SQL"}), 400

        dbConnection = DBConnector("db", "postgres", 5432, "postgres", "postgres")
        conn = dbConnection.get_connection()
        cursor = conn.cursor()
        cursor.execute(sql_query)
        conn.commit()
        result = cursor.fetchall()
        print(result)
        explanation_prompt = f"""
        User asked: {message}

        SQL executed:
        {sql_query}

        Database result:
        {result}

        Explain clearly.
        """

        response = llm_agent.model.invoke(explanation_prompt)
        response_text = response.content.strip()

        return jsonify({
            "response": response_text
        }), 200

    except Exception as e:
        if conn:
            conn.rollback()
        return jsonify({"error": str(e)}), 500