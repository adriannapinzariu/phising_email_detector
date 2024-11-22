import React, { useState } from "react";
import "./MiddleSection.css";
import "@fontsource/inter";

function MiddleSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [emailContent, setEmailContent] = useState(""); // Store email content
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [processedEmail, setProcessedEmail] = useState(""); // Store processed email with highlights
  const [error, setError] = useState(null); // Track errors

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Read email content from the uploaded file
    const reader = new FileReader();
    reader.onload = (e) => {
      setEmailContent(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload").click();
  };

  const handleViewResultsClick = async () => {
    setIsLoading(true); // Start loading
    setError(null);
    setProcessedEmail(""); // Clear previous results

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email_content: emailContent }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze the email.");
      }

      const data = await response.json();
      const highlightedEmail = highlightEmail(data.features); // Highlight features from the backend

      // Simulate loading bar duration
      setTimeout(() => {
        setIsLoading(false); // Stop loading after the bar is full
        setProcessedEmail(highlightedEmail); // Set processed email
      }, 3000); // Adjust the timeout duration as necessary
    } catch (err) {
      setError(err.message);
      setIsLoading(false); // Stop loading in case of error
    }
  };

  const highlightEmail = (features) => {
    let content = emailContent;
  
    // Ensure the entire subject line is bolded
    content = content.replace(/^(Subject:.*)$/im, (match) => {
      return `<strong>${match}</strong>`;
    });
  
    // Highlight phishing features
    features.phishing.forEach((word) => {
      const regex = new RegExp(`\\b(${word})\\b`, "gi"); // Case-insensitive regex
      content = content.replace(regex, (match) => {
        const capitalized = match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
        return `<span class="phishing-feature">${capitalized}</span>`;
      });
    });
  
    // Highlight safe features
    features.safe.forEach((word) => {
      const regex = new RegExp(`\\b(${word})\\b`, "gi"); // Case-insensitive regex
      content = content.replace(regex, (match) => {
        const capitalized = match.charAt(0).toUpperCase() + match.slice(1).toLowerCase();
        return `<span class="safe-feature">${capitalized}</span>`;
      });
    });
  
    return content;
  };
  
  
  return (
    <section className="middle-section">
      <button className="cloud-platform-button">Discover Phishing Protection</button>

      <h1 className="main-heading">
        Phishing <span className="highlight">Detection</span> <br />
        Anywhere and Anytime
      </h1>
      <p className="subheading">
        Run intelligent phishing detection. Protect all your emails.
        <br />
        From anywhere and on any email platform.
      </p>
      <div className="button-group">
        <input
          id="file-upload"
          type="file"
          accept=".eml, .txt, .msg"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button className="primary-button" onClick={handleUploadClick}>
          Upload An Email
        </button>
        <button className="secondary-button" onClick={handleViewResultsClick}>
          View Results
        </button>
      </div>
      {isLoading && (
        <div className="loading-bar">
          <div className="loading-bar-progress"></div>
        </div>
      )}
      {error && <p className="error-text">{error}</p>}
      {!isLoading && processedEmail && (
        <div className="email-display">
          <p dangerouslySetInnerHTML={{ __html: processedEmail }}></p>
        </div>
      )}
    </section>
  );
}

export default MiddleSection;
