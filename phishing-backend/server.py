from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def detect_phishing(email_content):
    likelihood = 85 
    result = "Phishing Likely" if likelihood > 70 else "Safe"
    return {"likelihood": likelihood, "result": result}

@app.route("/", methods=["GET"])
def home():
    return "Welcome to the Phishing Detection API! Use the /analyze endpoint to analyze emails."

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    email_content = data.get("email_content", "")
    response = detect_phishing(email_content)
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
