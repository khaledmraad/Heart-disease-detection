from flask import Flask,request,jsonify
from datetime import datetime,timedelta,timezone
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity,unset_jwt_cookies,jwt_required,JWTManager
from flask_cors import CORS
from pymongo import MongoClient
import json
import pickle
import numpy as np



api=Flask(__name__)

api.config['SECRET_KEY']='thaKey'

jwt=JWTManager(api)

# cors = CORS(api, resources={r"/*": {"origins": "http://localhost:3000"}})
CORS(api)

client=MongoClient("mongodb://localhost:27017/")

client_db = client["hospital"]

db_collection = client_db["users"]

model=pickle.load(open("model.pkl","rb"))


@api.route("/")
def hello_worl():
    return "<p>csdkjnc<p/>"

@api.route("/logintoken",methods=['POST'])
def create_token():

    email=request.json.get("email",None)
    password=request.json.get("password",None)

    access_token=create_access_token(identity=email)
    
    test=db_collection.count_documents({"user_email":email,"password":password})==1

    if not test:
        return jsonify({"error ":"email or password are wrong"}),401
    
    return jsonify({
        "email":email,
        "access_token":access_token
    })


@api.route("/signup",methods=['POST'])
def signup():

    userName=request.json.get("userName",None)
    email=request.json.get("email",None)
    password=request.json.get("password",None)

    test=db_collection.count_documents({"user_email":email})==1

    if test:
        return jsonify({"error ":"email already exist"}),401
    
    newUser=db_collection.insert_one({"user_name":userName,"user_email":email,"password":password})
    
    access_token=create_access_token(identity=email)

    return jsonify({
        "email":email,
        "access_token":access_token
    }),200


@api.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response
    
@api.route("/logout", methods=['POST'])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response


@api.route('/profile/<getemail>')
@jwt_required() 
def my_profile(getemail):
    print(getemail)
    if not getemail:
        return jsonify({"error": "Unauthorized Access"}), 401
       
    test=db_collection.count_documents({"user_email":getemail})==1

    if not test:
        return jsonify({"error ":"email dont exist"}),400
    
    return jsonify({
        "id": "kqsldkcdqdsc",
        "email": getemail,
        "name":"theprimeagen"
    })
  
@api.route("/predict", methods=['POST'])
def predict():
    # print(request.json)
    try:
        form_data = request.json

        feature = np.array([float(form_data[key]) for key in form_data]).reshape(1, -1)

        prediction = model.predict(feature)

        return jsonify({"prediction": str(prediction[0])}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 400


