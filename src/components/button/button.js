import React from "react";
import "./button.scss"


const Button = ({children, color, type, height, onClick, ...props}) => (
  <a className={`button-${color || "blue"} ${type || "default"}`} style={{height: height}} onClick={onClick} {...props}>
    {children}
  </a>
);

export default Button