from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import os
import json
from routes.ConnectionToDB import requestDB

app = Flask(__name__)
CORS(app)
app.register_blueprint(requestDB)

if __name__ == "__main__":
    app.run(debug=True)