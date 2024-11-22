import React, { useState } from "react";
import "./MiddleSection.css";
import "@fontsource/inter";

function MiddleSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [emailContent, setEmailContent] = useState(""); // Store email content
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [processedEmail, setProcessedEmail] = useState(""); // Store processed email with highlights

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    // Simulate reading email content from the file (replace with real implementation)
    const reader = new FileReader();
    reader.onload = (e) => {
      setEmailContent(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleUploadClick = () => {
    document.getElementById("file-upload").click();
  };

  const handleViewResultsClick = () => {
    setIsLoading(true);
    console.log("Processing results...");

    // Simulate processing and highlight features
    setTimeout(() => {
      setIsLoading(false);
      const features = analyzeEmail(emailContent); // Analyze email and highlight features
      setProcessedEmail(features);
      console.log("Results ready!");
    }, 3000);
  };

  // Simulated email analysis function
  const analyzeEmail = (content) => {
    if (!content) return "";

    // Mock keywords for phishing and non-phishing
    const phishingKeywords = ["urgent", "password", "click", "bank"];
    const safeKeywords = ["hello", "thank you", "regards", "attached"];

    // Split the content into words and wrap flagged features
    return content
      .split(" ")
      .map((word) => {
        if (phishingKeywords.includes(word.toLowerCase())) {
          return `<span class="phishing-feature">${word}</span>`;
        } else if (safeKeywords.includes(word.toLowerCase())) {
          return `<span class="safe-feature">${word}</span>`;
        }
        return word;
      })
      .join(" ");
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
      {!isLoading && processedEmail && (
        <div className="email-display">
          <h3>Processed Email:</h3>
          <p dangerouslySetInnerHTML={{ __html: processedEmail }}></p>
        </div>
      )}
    </section>
  );
}

export default MiddleSection;
