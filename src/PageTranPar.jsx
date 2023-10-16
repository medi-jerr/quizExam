import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./test/Home";
import AboutPage from "./test/About";
import PageTransition from "./PageTransition";

function PageTranPar() {
  return (
    <Router>
      <Routes>
        <Route
          path="/about"
          element={
            <PageTransition>
              <AboutPage />
            </PageTransition>
          }
        ></Route>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default PageTranPar;
