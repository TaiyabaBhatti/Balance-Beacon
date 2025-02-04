import moment from "moment"

export default function weeklyUserData(data,startOfWeek,endOfWeek){



console.log("Entered",data)

const date = moment().format("YYYY-MM-DD")


let filteredData = data.filter((emotionList) => {
    // Check if the date is within the specified range
    return moment(emotionList.date).isBetween(startOfWeek, endOfWeek, []);
  }).map((emotionList) => {
    // Transform the data to include only the required fields
    return {
      intensity: parseInt(emotionList.intensity),
      emotions: emotionList.userEmotion,
      time: emotionList.time,
      date: emotionList.date,
    };
  });


const groupedData = {};
filteredData.forEach((emotionList)=>{
if(groupedData[emotionList.emotions]){
    groupedData[emotionList.emotions] += 1;
}
else {
    groupedData[emotionList.emotions] = 1;
}
})


return groupedData;


    }