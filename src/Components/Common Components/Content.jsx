import React from "react";

export default function Content({ 
    children,
    contentProperties,
    }) {
  return (
    <div
      id="dashboard-about-heading"
      className={`max-w-4xl flex flex-col items-center gap-y-6  m-auto ${contentProperties}`}
    >
      {children}
    </div>
  );
}
