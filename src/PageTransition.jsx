// PageTransition.js
import React from "react";
import { CSSTransition } from "react-transition-group";
import "./PageTransition.css"; // Define your CSS animations here

const PageTransition = ({ children, ...props }) => (
  <CSSTransition {...props} classNames="page" timeout={8000}>
    {children}
  </CSSTransition>
);

export default PageTransition;
