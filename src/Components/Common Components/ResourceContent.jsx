import React from "react";
import { Link } from "react-router-dom";
export default function ResourceContent({text,path,img }) {
  return (
    <div className=" shadow-md p-2 bg-light-purple rounded-sm w-[800px] hover:opacity-95 transition-all duration-150 text-greyish-purple">
      <a href={path} target="_blank">
        <img src={img} alt="" className="rounded-sm w-full object-cover  h-80" />
      </a>
      <h1 className=" text-center mt-7 text-lg font-semibold ">
       {text}
      </h1>
    </div>
  );
}
