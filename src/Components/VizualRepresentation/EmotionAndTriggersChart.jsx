import React from 'react'
import DoughnutChart from './DoughnutChart'
import { useLocation } from "react-router-dom";
import app from "../../Configuration/firebase-config";
import { getFirestore,getDoc,doc } from "firebase/firestore";
import DailyEmotionTrigger from './DailyEmotionTrigger';
import WeeklyEmotionTrigger from './WeeklyEmotionTrigger';

const db = getFirestore(app);
export default function EmotionAndTriggersChart() {

// const data = getDocument();

  
    // const location = useLocation();
    // const newEntry = location.state?.db; // Access the passed data
  return (
    <div className='p-10 max-w-xl border-2 rounded-2xl text-white m-auto mt-10'>
    {/* <DoughnutChart/> */}
    {/* <DailyEmotionTrigger/> */}
    <WeeklyEmotionTrigger/>
    <p></p>
  </div>


  )
}
