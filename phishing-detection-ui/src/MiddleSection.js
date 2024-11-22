import React, { useState } from "react";
import "./MiddleSection.css";
import phishingImage from "./phishing.png";
import "@fontsource/inter";

function MiddleSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [emailContent, setEmailContent] = useState(""); // Store email content
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [processedEmail, setProcessedEmail] = useState(""); // Store processed email with highlights
  const [resultData, setResultData] = useState(null); // Store result details
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
    setResultData(null); // Clear previous result

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
        setResultData({
          result: data.result,
          likelihood: data.likelihood,
        }); // Set result details
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

      {/* Conditional Rendering for Buttons and Image */}
      <div className="button-image-container">
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
    <button
      className="secondary-button"
      onClick={handleViewResultsClick}
      disabled={isLoading} // Disable button during loading
    >
      View Results
    </button>
  </div>
  {/* Show phishing image only if no results or loading */}
  {!isLoading && !resultData && (
    <img src={phishingImage} alt="Phishing Illustration" className="phishing-image" />
  )}
</div>


      {/* Loading Bar */}
      {isLoading && (
        <div className="loading-bar">
          <div className="loading-bar-progress"></div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="error-text">{error}</p>}

      {/* Results Section */}
      {!isLoading && resultData && (
        <div className="results-container">
          <h3 className="results-header">Results</h3>
          <div className="results-display">
            <p>
              <span
                className={
                  resultData.result === "Phishing" ? "red-text" : "green-text"
                }
              >
                {resultData.result} - {resultData.likelihood}%
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Processed Email Section */}
      {!isLoading && processedEmail && (
        <div>
          <div className="email-display">
            <p dangerouslySetInnerHTML={{ __html: processedEmail }}></p>
          </div>
          <div className="highlight-info">
            <p>
              <span className="highlight-box red-highlight">Red</span> - AI Flagged as Phishy.
            </p>
            <p>
              <span className="highlight-box green-highlight">Green</span> - AI Flagged as Safe.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default MiddleSection;
