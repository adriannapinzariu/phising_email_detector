import React from "react";
import "./MiddleSection.css";

function MiddleSection() {
  return (
    <section className="middle-section">
      <p className="tagline">Introduce Cloud Platforms</p>
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
        <button className="primary-button">Test An Email</button>
        <button className="secondary-button">See Video Demo</button>
      </div>
    </section>
  );
}

export default MiddleSection;
