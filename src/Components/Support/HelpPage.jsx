import React from "react";
import Wrapper from "../Common Components/Wrapper";
import PastPage from "../Common Components/PastPage";
import taskeenWeb from "../../assets/images/resource-one.png";
import neuroglobeBook from "../../assets/images/resource-two.png";
import ResourceContent from "../Common Components/ResourceContent";
import Button from "../Common Components/Button";

export default function HelpPage() {
  return (
  <>

<section className="absolute top-0 left-0 bg-dark-purple w-full h-24"></section>

    <Wrapper properties={"bg-white min-h-screen"}>
      <PastPage path="/support"></PastPage>
      <div className="flex flex-col gap-y-24 items-center">
        <ResourceContent
          path="https://taskeen.org/seek-help/"
          text="Know yourself, to help yourself"
          img={taskeenWeb}
        >
         
        </ResourceContent>
      
        <ResourceContent
          path="https://neuroglobe.store/"
          text="MORE THAN JUST A BOOK
"
          img={neuroglobeBook}
        >
         
        </ResourceContent>
      
<Button text="You will be Notified for new Resources!" properties={"bg-greyish-purple text-white"}/>

      </div>
    </Wrapper>
    </>
  );
}
