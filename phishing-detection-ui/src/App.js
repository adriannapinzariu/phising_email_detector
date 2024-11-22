import React, { useState } from "react";
import axios from "axios";
import Header from "./Header"; // Import Header component
import MiddleSection from "./MiddleSection";
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

      <Header
        title="AI-Powered Phishing Detection"
        subtitle="Analyze email content to detect potential phishing attacks."
      />
      <MiddleSection />
      <footer className="footer">
        <p>© 2024 Phishing Detection AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
