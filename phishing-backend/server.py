from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import re

app = Flask(__name__)
CORS(app)  

model = joblib.load("svm_model.pkl")
vectorizer = joblib.load("tfidf_vectorizer.pkl")

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r"\b\d+\b", "", text) 
    text = re.sub(r"[^\w\s]", "", text)  
    text = re.sub(r"\s+", " ", text).strip()  
    return text

@app.route("/analyze", methods=["POST"])
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    email_content = data.get("email_content", "")

    if not email_content:
        return jsonify({"error": "Email content is required"}), 400

    processed_text = preprocess_text(email_content)
    email_tfidf = vectorizer.transform([processed_text])
    prediction = model.predict(email_tfidf)[0]
    confidence = model.predict_proba(email_tfidf)[0][1] * 100

    # Mock logic to detect phishing and safe words (replace with your logic)
    phishing_keywords = ["urgent", "password", "click", "bank"]
    safe_keywords = ["hello", "thank you", "regards", "attached"]

    # Find matching words
    phishing_features = [word for word in phishing_keywords if word in email_content.lower()]
    safe_features = [word for word in safe_keywords if word in email_content.lower()]

    result = {
        "result": "Phishing" if prediction else "Not Phishing",
        "likelihood": round(confidence, 2),
        "features": {
            "phishing": phishing_features,
            "safe": safe_features,
        },
    }
    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)
