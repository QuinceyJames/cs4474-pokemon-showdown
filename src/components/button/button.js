import React from "react";
import "./button.scss"


const Button = ({children, className, color="white", backgroundColor="blue", height, onClick, ...props}) => (
  <a className={`button ${className}`} style={{height: height, color: color, backgroundColor:backgroundColor}} onClick={onClick} {...props}>
    {children}
  </a>
);

export default Button