from flask import Flask, request, jsonify, session
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import uuid

import os
import json
from routes.ConnectionToDB import requestDB
from routes.QueryParser import queryParser
from routes.ChatHistory import ChatHistory

load_dotenv()
app = Flask(__name__)
CORS(app)
app.register_blueprint(requestDB)
app.register_blueprint(queryParser)
app.register_blueprint(ChatHistory)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)