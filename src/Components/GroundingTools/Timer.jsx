import React, { useEffect, useState } from 'react'

export default function Timer({active}) {

   const timeVar = 30;
   const [remainingTime,setRemaining] = useState(timeVar);
   

     const time = {
        remainingTime:0,
        startTimer:0,
     }
     
     useEffect(()=>{

const intervalId = setInterval(()=>{


setRemaining((prev)=>{


if(prev<10 && prev > 0){
  // return "0"+ prev;
}


    if(prev <=0){
        // clearInterval(intervalId);
         // Clear the interval when time reaches 0
        return 30;
    }


else if(!active){
    clearInterval(intervalId); // Clear the interval when time reaches 0
    return prev;
}

return prev-1;
})
},1000)

return () => clearInterval(intervalId);

     },[active]);
  return (
    <div>
      <p className='text-3xl font-normal'>00:{remainingTime<10?"0"+remainingTime:remainingTime}</p>
    </div>
  )
}
