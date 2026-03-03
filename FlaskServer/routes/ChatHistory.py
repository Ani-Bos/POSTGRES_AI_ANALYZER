from flask import Flask, url_for, request, render_template,redirect,jsonify,make_response,session,Blueprint
from controller.QueryParser import QueryParser
from controller.DBConnector import DBConnector
from agents.llmagent import LLMAgent
import os
import json
from json_toon import json_to_toon
ChatHistory  = Blueprint("chat", __name__)


@ChatHistory.route("/session", methods=["GET","OPTIONS"])
def getSession():
        if request.method == "OPTIONS":
            return _build_cors_preflight_response
        dbConnection = DBConnector("db", "postgres", 5432, "postgres", "postgres")
        conn = dbConnection.get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, title, created_at
            FROM sessions
            ORDER BY created_at DESC
        """)
        rows = cursor.fetchall()
        sessions = [
            {
                "id": str(row[0]),
                "title": row[1],
                "created_at": str(row[2])
            }
            for row in rows
        ]
        # cursor.close()
        # conn.close()
        return jsonify({"sessions": sessions}), 200

@ChatHistory.route("/session/<session_id>", methods=["GET","OPTIONS"])

def getsessionMesages(session_id):
    if request.method == "OPTIONS":
         return _build_cors_preflight_response
    dbConnection = DBConnector("db", "postgres", 5432, "postgres", "postgres")
    conn = dbConnection.get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT role, content
        FROM messages
        WHERE session_id = %s
        ORDER BY created_at ASC
    """, (session_id,))
    rows = cursor.fetchall()
    messages =  [
            {
                "role": row[0],
                "content": row[1]
            }
            for row in rows
        ]
    # cursor.close()
    # conn.close()
    return jsonify({"messages": messages}), 200


def _build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response

def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

