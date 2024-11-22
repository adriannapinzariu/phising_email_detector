import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [emailContent, setEmailContent] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/analyze", {
        email_content: emailContent,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error analyzing the email:", error);
      setResult({ error: "Failed to analyze email." });
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>AI-Powered Phishing Detection</h1>
        <p>Analyze email content to detect potential phishing attacks.</p>
      </header>
      <main className="main">
        <form onSubmit={handleSubmit} className="form">
          <textarea
            className="email-input"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Paste your email content here..."
            rows="10"
          ></textarea>
          <button type="submit" className="analyze-button">
            Analyze Email
          </button>
        </form>
        {result && (
          <div className="result-box">
            {result.error ? (
              <p className="error-text">{result.error}</p>
            ) : (
              <>
                <p className="result-label">Likelihood:</p>
                <p className="result-value">{result.likelihood}%</p>
                <p className="result-label">Result:</p>
                <p className="result-value">
                  {result.is_phishing ? "Phishing Email" : "Safe Email"}
                </p>
              </>
            )}
          </div>
        )}
      </main>
      <footer className="footer">
        <p>© 2024 Phishing Detection AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
