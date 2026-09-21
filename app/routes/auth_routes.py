from flask import Blueprint, jsonify, request
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    username = data.get("username")
    password = data.get("password")

    if username == "admin" and password == "admin123":
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token)

    return jsonify({"error": "Invalid credentials"}), 401
