from flask import Blueprint, request, jsonify
from controller.QueryParser import QueryParser
from controller.DBConnector import DBConnector
from agents.llmagent import LLMAgent
import os
import json
from json_toon import json_to_toon
ChatHistory  = Blueprint("chat", __name__)


@ChatHistory.route("/session", methods=["GET"])
def getSession():
        dbConnection = DBConnector("db", "postgres", 5432, "postgres", "postgres")
        conn = dbConnection.get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT id, title, created_at
            FROM sessions
            ORDER BY created_at DESC
        """)
        sessions = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"sessions": sessions}), 200

@ChatHistory.route("/session/<session_id>", methods=["GET"])

def getsessionMesages(session_id):
    dbConnection = DBConnector("db", "postgres", 5432, "postgres", "postgres")
    conn = dbConnection.get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT role, content
        FROM messages
        WHERE session_id = %s
        ORDER BY created_at ASC
    """, (session_id,))
    messages = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify({"messages": messages}), 200