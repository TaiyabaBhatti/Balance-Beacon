import {Bar} from "react-chartjs-2"
import {Legend,Tooltip,Chart as ChartJS, CategoryScale,LinearScale,BarElement,Title, plugins} from "chart.js"
import AuthContext from "../context/authContext";
import { FcEmptyTrash } from "react-icons/fc";
import moment from 'moment';
import Empty from "../../assets/animations/Empty.json"
import Lottie from "lottie-react"
// import {useContext} from "react"
// Register the components into ChartJS
ChartJS.register( 
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend)

import React, { useContext } from 'react'
import dailyUserData from "./dailyUserData";
import { color } from "./colorScheme";

export default function DailyEmotionTrigger({data}) {

    const  colorSchema =color;


    const todayDate=moment().format('LL'); 
    // calling function for getting data
let chartData = data && dailyUserData(data);


const dataSet =  {
    labels:chartData?.map((obj)=> obj.time?obj.time:"1:02"),
    datasets:[
        {
          label:`Emotions and Triggers: ${todayDate}`,
          data:chartData?.map((obj)=> obj.intensity),
          backgroundColor:chartData?.map((obj)=>{

            return colorSchema[obj.emotions] || "gray"
                      }),
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(54, 162, 235, 0.2)',
          ],
          borderWidth: 1,
        },
      ]
}

const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            title: {
                display: true,
                text: 'Time of Emotion Submission', // Add a title for the x-axis
            },
        },
        y: {
            title: {
                display: true,
                text: 'Emotion Intensity',
            },
        },
    },
    plugins: {
tooltip:{

    callbacks: {

        label:function(context){
    const index = context.dataIndex; // Get the index of the hovered bar
    const emotion = chartData[index]?.emotions; // Get the emotion for the hovered bar
    const intensity = context.raw; // Get the intensity value (y-axis)
    return `Emotion: ${emotion}, Intensity: ${intensity}`;

        }
        }
    }

},
title:{
    display:false
}

}

  return (
    <div className="w-[600px] flex items-center justify-center">
        {chartData.length === 0 ? 
        <div className="flex items-center text-2xl">
<p className="text-greyish-purple font-semibold text-lg ">You have not logged any data!</p>
<FcEmptyTrash/>

        </div>

      
       :
        <Bar data={dataSet} options={options}/>}
    
    </div>
  )
}
