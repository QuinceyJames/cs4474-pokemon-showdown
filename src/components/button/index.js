import React from "react";
import "./style.css"


function Button({children, className, ...props}) {
  return (
    <div className={`button ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Button