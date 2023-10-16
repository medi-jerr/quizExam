import React from "react";

const aboutPageStyle = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#f0f0f0",
};

const headingStyle = {
  fontSize: "24px",
  marginBottom: "10px",
};

function AboutPage() {
  return (
    <div style={aboutPageStyle}>
      <h1 style={headingStyle}>About Us</h1>
      <p>We are a team of developers creating awesome apps.</p>
    </div>
  );
}

export default AboutPage;
