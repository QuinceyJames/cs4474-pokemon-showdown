import React from "react";
import "./button.scss"


const Button = ({children, color, type, height, ...props}) => (
  <a className={`button-${color || "blue"} ${type || "default"}`} style={{height: height}} {...props}>
    {children}
  </a>
);

export default Button