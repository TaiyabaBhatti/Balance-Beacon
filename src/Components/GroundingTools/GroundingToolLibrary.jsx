import React from "react";

import supportBg from "../../assets/images/supportImage.jpg";
import Button from "../Common Components/Button";

import Wrapper from "../Common Components/Wrapper";
import GuidedBreathing from "./GuidedBreathing";
import SensoryExercises from "./SensoryExercises";

export default function GroundingToolLibrary() {

  const toolCards = [
    {
      description: "Follow calming animations to regulate your breathing.",
      buttonText: "Start Breathing Exercise",
      pageNavigation:"/grounding-tool-library/guided-breathing"
    },
    {
      description: "Focus on the present by identifying objects and sensations",
      buttonText: "Try Sensory Exercise",
       pageNavigation:"/grounding-tool-library/sensory-exercise"
    },
    {
      description: "Listen to calming playlists for relaxation and focus",
      buttonText: "Play Now",
       pageNavigation:"/grounding-tool-library/soothing-playlists"
    },
  ];

  return (
    <>
      {/* About */}
      <section className=" h-screen mb-10 -mt-24 flex items-center">
        <img
          src={supportBg}
          alt=""
          className="h-screen absolute top-0 -z-50 w-screen bg-no-repeat object-cover"
        />
        <div
          id="dashboard-about-heading"
          className="max-w-4xl px-10 flex flex-col items-center gap-y-6  m-auto text-white"
        >
          <h1 className="text-center font-bold text-6xl ">
            Grounding Tool Library
          </h1>
          <p className="text-center font-normal text-4xl">
          Access tools and exercises to stay grounded during moments of dissociation.
          </p>
          <Button text={"Explore tools"} href="#grounding-techniques" properties={"bg-white text-black"}/>
        </div>
      </section>

      {/*  Exercises */}

<section id="grounding-techniques">

      <Wrapper properties="h-screen bg-light-purple ">
       <GuidedBreathing/>
        </Wrapper>

        <Wrapper properties={"h-screen"}>
       <SensoryExercises/>
        </Wrapper>

        <Wrapper properties={"bg-light-purple flex justify-center"}>
          <Button text={"More Techniques will be added soon!"}  properties={"font-semibold text-2xl bg-greyish-purple text-white min-w-32 "}/>
        </Wrapper>

        </section>

    </>
  );
}
