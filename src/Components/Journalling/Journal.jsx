import React from "react";


import journalBg from "../../assets/images/JournalBg.jpg";

import Button from "../Common Components/Button";

import Wrapper from "../Common Components/Wrapper";
import allNotes from "../../assets/animations/allnotes.json";
import editor from "../../assets/animations/texteditor.json";
import Lottie from "lottie-react";
import Content from "../Common Components/Content";

export default function Journal() {
  return (
    <>
      {/* About */}
      <section className="h-screen mb-10 -mt-24 flex items-center">
        {/* dashboard-about-screen-bg-image */}
        <img
          src={journalBg}
          alt=""
          className="h-screen absolute top-0 -z-50 w-screen bg-no-repeat object-cover"
        />

        <Content contentProperties={"text-white"}>
          <h1 className="text-center text-white font-bold text-6xl  ">
            Journal
          </h1>
          <p className="text-center text-white font-normal text-4xl">
            Write freely and organize your thoughts your way.
          </p>
          <Button
            text={"Explore journal"}
            
           href="#explore-journaling"
            properties={"text-black bg-white"}
          />
        </Content>
      </section>
<section id="explore-journaling">
<Wrapper properties={" md:flex-row m-auto flex justify-center gap-5 flex-col  items-center  m-auto text-black "}>
       
          <div className=" flex bg-light-purple p-5 rounded-md flex-col gap-y-2 items-center">
            <Lottie
              animationData={editor}
              loop
              style={{ height: "300px", width: "300px" }}
            />

            <Button
              text={"Text Editor"}
              to={"/journal/workspace"}
              properties={"text-white bg-greyish-purple "}
            />
          </div>

          <div className="flex bg-light-purple p-5 rounded-md flex-col gap-y-2 items-center">
            <Lottie
              animationData={allNotes}
              loop
              style={{ height: "300px", width: "300px" }}
            />

            <Button
              text={"All Notes"}
              to={"/journal/all-notes"}
              properties={"text-white bg-greyish-purple "}
            />
          </div>
       
      </Wrapper>
</section>

     
    </>
  );
}
