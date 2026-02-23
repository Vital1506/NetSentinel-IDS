from flask import Blueprint, request, jsonify
from app import db
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

# Temporary demo login (no real user DB yet)
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "admin123":
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)

    return jsonify({"error": "Invalid credentials"}), 401