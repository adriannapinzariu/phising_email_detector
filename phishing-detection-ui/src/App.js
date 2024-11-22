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
    <div className="App">
      <header className="App-header">
        <h1>AI-Powered Phishing Detection</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            placeholder="Paste your email content here..."
            rows="10"
            cols="50"
          ></textarea>
          <br />
          <button type="submit">Analyze</button>
        </form>
        {result && (
          <div className="result">
            {result.error ? (
              <p style={{ color: "red" }}>{result.error}</p>
            ) : (
              <>
                <p>Likelihood: {result.likelihood}%</p>
                <p>Result: {result.result}</p>
              </>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
