import React from "react";
import { Link } from "react-router-dom";

export default function Button({
  text,
  type = "button",
  to = null,
  href,
  onclick = null,
  disabled = false,
  properties
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={` rounded-xl ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }  font-semibold text-center   hover:scale-105 transition-all duration-150 text-lg px-3 py-2  ${properties}`}
    >
      {href && <a href={href}>{text}</a>}
      {to && <Link to={to}>{text}</Link>}
      {(!href && !to) && `${text}`}


    </button>
  );
}
