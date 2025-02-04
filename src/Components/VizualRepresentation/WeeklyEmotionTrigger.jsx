import {Pie} from "react-chartjs-2"
import {Legend,Tooltip,Chart as ChartJS, CategoryScale,LinearScale,BarElement,Title, plugins,ArcElement} from "chart.js"
import moment from 'moment';
import React, { useEffect } from 'react'

import weeklyUserData from "./weeklyUserData";
import { color } from "./colorScheme";
ChartJS.register(Legend,Tooltip,ArcElement,plugins,Title)

export default function WeeklyEmotionTrigger({data}) {

const  colorSchema =color;
   
   const startOfWeek = moment().startOf('week').format("YYYY-MM-DD");
   const endOfWeek = moment().endOf('week').format("YYYY-MM-DD");

let chartData =data && weeklyUserData(data,startOfWeek,endOfWeek);



let caption = [];
let vizualData = [];


  if(chartData){
   
    for (const key in chartData) {
     caption.push(key);
     vizualData.push(chartData[key]);
  
    }
 
  }

   

    const dataSet =  {
        labels:caption,
        datasets:[
            {
              label:`Emotions and Triggers: ${startOfWeek}-${endOfWeek}`,
              data:vizualData,
              backgroundColor:caption.map((emotion)=>{

    return colorSchema[emotion] || "gray"



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
       
        plugins:{
            title:{
                display:true
            }
        }
    }


  return (
    <div className="w-[400px] h-[400px]">
      {chartData.length === 0 ?
        <div className="flex items-center text-2xl">
      <p className="text-greyish-purple font-semibold text-lg ">You have not logged any data!</p>
      <FcEmptyTrash/>
      
              </div>   
      : <Pie data={dataSet} options={options}/>} 
    </div>

  )
}
