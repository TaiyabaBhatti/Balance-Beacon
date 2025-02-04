import React from 'react'
import Button from "../Common Components/Button";
import supportBg from "../../assets/images/supportImage.jpg";
import supportLine from "../../assets/images/supportLineImage.png";

import meditation from "../../assets/images/meditation.png";

import creatorWork from "../../assets/images/creator.png";
import Content from '../Common Components/Content';
import Wrapper from '../Common Components/Wrapper';

export default function SupportPage() {
  return (
    <>
     {/* About */}
          <section className="h-screen flex items-center px-10 mb-10 -mt-24">
            {/* dashboard-about-screen-bg-image */}
            <img
              src={supportBg}
              alt=""
              className="h-screen absolute top-0 -z-50 w-screen bg-no-repeat left-0 object-cover"
            />
            <Content contentProperties={"text-white"}>

            <h1 className="text-center font-bold text-6xl ">Support & Emergency Resources</h1>
              <p className="text-center font-normal text-4xl">
              Access critical resources and tools to support your caregiving journey.
              </p>
              <Button text={"Explore resources"}  properties={"bg-white text-black"}
              href="#explore-resources"
              />
              

            </Content>
           
          </section>



<section id='explore-resources'>

{/* helpline call */}
<Wrapper properties={"h-screen flex items-center"}>
<div className='flex lmd:flex-row  flex-col   items-center justify-between m-auto'>
            <div
              id="dashboard-about-heading"
              className=" flex flex-col items-start gap-y-3 text-black"
            >
              <h1 className=" font-semibold text-4xl ">Emergency Hotline</h1>
              <p className=" font-normal text-3xl">
              Get immediate support through trusted crisis lines.
              </p>
              <Button text={"Seek help"}  bgColor={"bg-[#595880]"}
               textColor={"text-white"}
               properties={"bg-greyish-purple text-white"}
              to="/support/help-page"
              />
             
            </div>

<div>
<img
              src={supportLine}
              alt=""
              className=" max-w-md"
            />

</div>
            </div>

</Wrapper>

{/* Grounding tool */}
<Wrapper properties={"min-h-screen bg-light-purple flex items-center"}>
<div className='flex lmd:flex-row  flex-col items-center gap-x-5  justify-between '>

<div>
<img
  src={meditation}
  alt=""
  className=" max-w-md"
/>

</div>

<div
  id="dashboard-about-heading"
  className=" flex flex-col text-right items-end gap-y-3 text-black"
>
  <h1 className=" font-semibold text-4xl ">Grounding Techniques</h1>
  <p className=" font-normal text-3xl">
  Discover practical tools to regain calm and focus during stressful moments.
  </p>
  <Button text={"Learn more"} 
   to={"/grounding-tool-library"}
   properties={"bg-greyish-purple text-white"}
  />
 
</div>
</div>
</Wrapper>
{/* Safety plan Creator */}

<Wrapper properties={"h-screen flex items-center"}>
<div className='flex lmd:flex-row  flex-col items-center gap-x-5  justify-between m-auto '>

<div
  id="dashboard-about-heading"
  className=" flex flex-col  items-start gap-y-3 text-black"
>
  <h1 className=" font-semibold text-4xl ">Safety Plan Creator</h1>
  <p className=" font-normal text-3xl">
  Build a personalized safety plan for moments of crisis
  </p>
  <Button text={"Learn more"} 
  properties={"bg-greyish-purple text-white"}
  />
 
</div>


<div>
<img
  src={creatorWork}
  alt=""
  className=" max-w-md"
/>

</div>


</div>
</Wrapper>

</section>
       









    </>
  )
}
