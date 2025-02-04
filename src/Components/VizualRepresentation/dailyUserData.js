import moment from "moment"


export default function dailyUserData(data){

const currDate = moment().format("YYYY-MM-DD");

const dailyFilteredData = data.filter((emotionList) => {
    // Check if the date is current



    return moment(emotionList.date).isSame(currDate,"day");
  }).map((emotionList) => {
    // Transform the data to include only the required fields
    return {
      intensity: parseInt(emotionList.intensity),
      emotions: emotionList.userEmotion,
      time: emotionList.time,
      date: emotionList.date,      //format is "YYYY-MM-DD"
    };
  });    

return dailyFilteredData;

}