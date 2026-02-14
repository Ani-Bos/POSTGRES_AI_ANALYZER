from flask import Blueprint, request, jsonify
from controller.QueryParser import QueryParser
from controller.DBConnector import DBConnector

queryParser = Blueprint("parser", __name__)

@queryParser.route("/queryPlanner",methods = ["POST"])

def queryExecutor():
    try:
        data = request.get_json()
        query = data.get("query")
        if(QueryParse.checkQuery(query)):
            #session storage comes in play
            dbConnection = DBConnector(host,database,port,username,password)
            try:
                connection = dbConnection.connectTODB()
                cursor = connection.cursor()
                cursor.execute(f"EXPLAIN (ANALYZE, VERBOSE, BUFFERS, FORMAT JSON) {query}")
                plan = cursor.fetchone()[0]   
                cursor.close()
                return jsonify({"status": "successfully executed in db" , "plan":plan}),200
            except Exception as e:
                print("Error while connection to postgres DB",e)
                return jsonify({"status": "Failed to connect to DB", "error": str(e)})
            #execute query

        else:
            
    except Exception as e:
        print("Error while the sql in database",e)


@queryparser.route("/analyze",methods=["POST"])
def queryAnalyze():
    try:
        data = queryExecutor()
        #now where human chat in comes to play interaction with agent to improvise and summarize the plan

        summary = analyze_with_llm(plan)

    except Exception as e:
        print("Error while analyzing query in database",e)
        