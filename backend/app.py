from flask import Flask, jsonify
from flask_cors import CORS
import random
from datetime import datetime
import pickle

app = Flask(__name__)
CORS(app)

# LOAD AI MODEL
model = pickle.load(open("model.pkl", "rb"))

# DASHBOARD API
@app.route('/dashboard')
def dashboard():

    # Random crowd count
    people = random.randint(50, 500)

    # Risk Logic
    if people < 150:
        risk = "Low"

    elif people < 300:
        risk = "Medium"

    else:
        risk = "High"

    # AI Prediction
    prediction_value = int(model.predict([[18, 1]])[0])

    # Final Data
    data = {
        "people_count": people,
        "risk_level": risk,
        "alerts_sent": random.randint(1, 20),
        "prediction": prediction_value,
        "last_updated": datetime.now().strftime("%H:%M:%S")
    }

    return jsonify(data)

# MAP LOCATIONS API
@app.route('/locations')
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
if __name__ == '__main__':
    app.run(debug=True)