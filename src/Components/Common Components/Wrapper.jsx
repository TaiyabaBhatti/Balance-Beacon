import React from "react";

export default function Wrapper({
  children,

  properties
 
}) {
  return (
    <section  className={` p-10 mb-10   relative ${properties} ` }>
      {children}
    </section>
  );
}
