import React from "react";
import "./PerformanceSection.css";

function PerformanceSection() {
  return (
    <section className="performance-section">
      {/* Left Card */}
      
      <div className="welcome-card">
      <div className="card-header">
    <span className="dot"></span>
    <span className="dot"></span>
    <span className="dot"></span>
  </div>
  <div className="card-line"></div>
        <div className="icon-group">
          <span className="icon computer-icon">🖥️</span>
          <span className="icon cloud-icon">☁️</span>
        </div>
        <h2 className="welcome-heading">Welcome to PhishShield</h2>
        <p className="welcome-text">
          With PhishShield, you can connect to powerful email protection systems.
        </p>
        <button className="connect-button">Connect</button>
      </div>

      {/* Right Card */}
      <div className="performance-card">
      <div className="card-header">
    <span className="dot"></span>
    <span className="dot"></span>
    <span className="dot"></span>
  </div>
  <div className="card-line"></div>
        <h2 className="performance-heading">
          Which Protection Package Would You Like to Use?
        </h2>
        <div className="package-options">
          <div className="package small-package">
            <h3>Basic Package</h3>
            <p>✔ Real-time Detection</p>
            <p>✔ 50 Scans/Month</p>
            <p>✔ Email Alerts</p>
          </div>
          <div className="package medium-package">
            <h3>Pro Package</h3>
            <p>✔ Real-time Detection</p>
            <p>✔ Unlimited Scans</p>
            <p>✔ Advanced Reporting</p>
          </div>
          <div className="package large-package">
            <h3>Enterprise Package</h3>
            <p>✔ Everything in Pro</p>
            <p>✔ Dedicated Support</p>
            <p>✔ Team Collaboration</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PerformanceSection;
