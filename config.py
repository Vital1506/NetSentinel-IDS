import os

class Config:
    SECRET_KEY = "netsentinel-secret"
    JWT_SECRET_KEY = "netsentinel-jwt-secret"

    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "netsentinel.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False