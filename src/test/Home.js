import React from "react";

const homePageStyle = {
  textAlign: "center",
  padding: "20px",
  backgroundColor: "#f0f0f0",
};

const headingStyle = {
  fontSize: "24px",
  marginBottom: "10px",
};

function HomePage() {
  return (
    <div style={homePageStyle}>
      <h1 style={headingStyle}>Welcome to the Home Page</h1>
      <p>This is a simple home page built with inline CSS styles.</p>
    </div>
  );
}

export default HomePage;
