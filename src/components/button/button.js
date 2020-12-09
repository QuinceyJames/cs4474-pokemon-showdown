import React from "react";
import "./button.scss"


const Button = ({children, className, height, onClick, ...props}) => (
  <a className={`button ${className}`} style={{height: height}} onClick={onClick} {...props}>
    {children}
  </a>
);

export default Button