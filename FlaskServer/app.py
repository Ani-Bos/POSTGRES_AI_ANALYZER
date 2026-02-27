from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import uuid

import os
import json
from routes.ConnectionToDB import requestDB
from routes.QueryParser import queryParser

app = Flask(__name__)
CORS(app)
app.register_blueprint(requestDB)
app.register_blueprint(queryParser)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)