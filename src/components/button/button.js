import React from "react";
import "./button.scss"


const Button = ({children, className, ...props}) => (
  <a className={`button ${className}`} {...props}>
    {children}
  </a>
);

export default Button