import React from 'react'
import Lottie from "lottie-react"
import loadingAnimation from "../../assets/animations/loading.json"





export default function LoadingAnim() {
  return (
    <>
   
        <div className="absolute inset-0 flex items-center justify-center ">
          <Lottie
           animationData={loadingAnimation}
           loop
           autoplay
           style={{ height: "200px", width: "200px" }}
          />
        </div>
      
      </>
  )

}
