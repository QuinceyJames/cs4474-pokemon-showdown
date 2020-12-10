import React from "react";
import "./button.scss"


const Button = ({children, disabled, className, height, backgroundColor, color, onClick, ...props}) => (
  <a className={`button ${className} ${disabled ? "disabled" : ""}`} style={{backgroundColor, color, height: height}} onClick={onClick} {...props}>
    {children}
  </a>
);

export default Button