import React from "react";
import "./style.scss"


const Button = ({children, className, ...props}) => (
  <div className={`button ${className}`} {...props}>
    {children}
  </div>
);

export default Button