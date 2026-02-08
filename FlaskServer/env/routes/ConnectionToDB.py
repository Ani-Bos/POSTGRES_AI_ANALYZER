from flask import Blueprint, request, jsonify
from controller.DBConnector import DBConnector

requestDB = Blueprint("connect", __name__)

@requestDB.route('/connect',methods = ['POST'])
def connectTODB():
    data = request.get_json()
    host = data['host']
    database = data['database']
    port = data['port']
    username = data['username']
    password = data['password'] 
    
    dbConnection = DBConnector(host,database,port,username,password)
    try:
        connection = dbConnection.connectTODB()
        connection.close()
        return jsonify({"status": "Connected to DB", "connection": connection})
    except Exception as e:
        print("Error while connection to postgres DB",e)
        return jsonify({"status": "Failed to connect to DB", "error": str(e)})
