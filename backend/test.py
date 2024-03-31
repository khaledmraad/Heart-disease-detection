from flask import Flask,request
from datetime import datetime,timedelta,timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity,unset_jwt_cookies,jwt_required,JWTManager
from flask_cors import CORS
from pymongo import MongoClient
import json

client=MongoClient("mongodb://localhost:27017/")

client_db = client["hospital"]

db_collection = client_db["users"]
    
x=db_collection.insert_one({"email":"qsdcqsdc","password":"sdfqsdfqsdf"})

print(str(x.inserted_id))
