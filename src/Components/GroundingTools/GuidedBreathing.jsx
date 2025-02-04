import React,{useEffect, useRef, useState} from 'react'
import Button from '../Common Components/Button';
import Lottie from "lottie-react"
import BreathExercise from "../../assets/animations/breathing.json"
import PastPage from '../Common Components/PastPage';
import Timer from './Timer';


export default function GuidedBreathing() {

  const [isActive, setIsActive] = useState(false);
  const [btnText,setBtnText] = useState("Play");
  const [timerState,setTimerState] = useState(false);
  let lottieRef  = useRef(null);


  useEffect(()=>{
  
    lottieRef.current.pause();
  
  },[])


const actionPlayed = () =>{
if(isActive){
  setBtnText("Pause")
  setTimerState(false)
  setIsActive(false);
  lottieRef.current.pause();
}
else {
setBtnText("Play")
setTimerState(true)
setIsActive(true);
lottieRef.current.play();


}
  
}



  return (
    <>
     
    

  {/* <PastPage path={"/grounding-tool-library"}/> */}
 <section className='flex flex-col items-center gap-y-7 justify-center  relative '>

{/* Exercise Description */}
<p className='text-center font-semibold  text-4xl'>Breathing Exercise</p>

{/* Exercise */}

<Lottie animationData={BreathExercise}
            loop
          lottieRef={lottieRef}
            style={{ height: "300px", width: "300px" }}/>

<Timer active={timerState}/>

{/* start stop button */}
<Button text={btnText} onclick={actionPlayed} properties={"font-semibold text-2xl bg-white text-black min-w-32"}/>


</section>
   

    </>
   
  )
}
