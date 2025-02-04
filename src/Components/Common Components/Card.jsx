import React from "react";
import Button from "./Button";

export default function Card({
  btnText,
  btnBgColor="bg-white",
  btnTextColor="text-black",
  contentHead,
  contentDesc,
  to = null,
  background="bg-greyish-purple "

}) {
  return (
    <div className={`h-64 p-10 flex-1 flex flex-col items-center rounded-2xl gap-y-2  text-white justify-center ${background} opacity-80`} >
      <h1 className='text-center font-semibold text-3xl'>{contentHead}</h1>
      <p className="text-center font-normal text-2xl">{contentDesc}</p>
      <Button
        text={btnText}
      
        properties={`${btnTextColor} ${btnBgColor}`}
        to={to}
      />
    </div>
  );
}
