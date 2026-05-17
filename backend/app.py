from flask import Flask, jsonify
from flask_cors import CORS
import random
from datetime import datetime
import pickle

app = Flask(__name__)
CORS(app)

# LOAD MODEL
model = pickle.load(open("model.pkl", "rb"))


# HOME ROUTE
@app.route("/")
def home():
    return jsonify({
        "message": "Nagar Raksha AI Backend Running"
    })


# DASHBOARD API
@app.route("/api/data")
def dashboard():

    # RANDOM CROWD COUNT
    people = random.randint(50, 500)

    # RISK LOGIC
    if people < 150:
        risk = "Low"

    elif people < 300:
        risk = "Medium"

    else:
        risk = "High"

    # AI PREDICTION
    prediction_value = int(model.predict([[18, 1]])[0])

    # FINAL DATA
    data = {
        "people_count": people,
        "risk_level": risk,
        "alerts_sent": random.randint(1, 20),
        "prediction": prediction_value,
        "last_updated": datetime.now().strftime("%H:%M:%S")
    }

    return jsonify(data)


# MAP API
@app.route("/api/locations")
def locations():

    data = [
        {
            "name": "Delhi Temple",
            "lat": 28.7041,
            "lng": 77.1025,
            "people": 202,
            "risk": "High"
        },

        {
            "name": "Kolkata Temple",
            "lat": 22.5726,
            "lng": 88.3639,
            "people": 72,
            "risk": "Medium"
        },

        {
            "name": "Chennai Temple",
            "lat": 13.0827,
            "lng": 80.2707,
            "people": 99,
            "risk": "Low"
        }
    ]

    return jsonify(data)


# RUN SERVER
if __name__ == "__main__":
    port=int(os.environ.get("PORT",8080))
    app.run(host="0.0.0.0"port=port)