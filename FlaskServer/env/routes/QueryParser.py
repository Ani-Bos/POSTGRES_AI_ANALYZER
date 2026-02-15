from flask import Blueprint, request, jsonify
from controller.QueryParser import QueryParser
from controller.DBConnector import DBConnector

queryParser = Blueprint("parser", __name__)

@queryParser.route("/queryPlanner",methods = ["POST"])

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
            dbConnection = DBConnector(host, database, port, username, password)
            plan = dbConnection.executeQueryPlan(query)
            summary = LLMAgent.analyze_with_llm(plan)
            return jsonify({
                "plan": plan,
                "summary": summary
            }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
