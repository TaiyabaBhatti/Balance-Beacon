import React,{useEffect, useRef,useState} from 'react'


import SensoryExercise2 from "../../assets/images/sensoryExe2.png"

export default function SensoryExercises() {

const [isActive, setIsActive] = useState(false);
const [btnText,setBtnText] = useState("Play");

let lottieRef  = useRef(null);

useEffect(()=>{

  // lottieRef.current.pause();




},[])

const actionPlayed = () =>{
if(isActive){
  setBtnText("Pause")
 
  setIsActive(false);
  lottieRef.current.pause();
}
else {

  setBtnText("Play")
  
setIsActive(true);
lottieRef.current.play();


}
  
}














  return (
    <>
      

    <section className=' flex flex-col items-center gap-y-10 justify-center relative '>

{/* Exercise Description */}


<p className='text-center font-semibold text-4xl'>Sensory Exercise</p>

{/* Exercise */}

<img src={SensoryExercise2} alt="" className='object-cover w-72'/>
<p className='text-center font-normal text-2xl'>Name all the Colors you can see above</p>

{/* start stop button */}


</section>

    </>
   
  )
}
