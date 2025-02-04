import React, { useContext } from "react";
import { getFirestore, addDoc,collection,getDoc,doc } from "firebase/firestore";
import app from "../../Configuration/firebase-config";
import Button from "../Common Components/Button";
import { useForm } from "react-hook-form";
import {Link,useNavigate} from 'react-router-dom'
import AuthContext from "../context/authContext";
import moment from 'moment';
AuthContext
// initialize firestore instance

const db = getFirestore(app);

export default function MoodTrackerForm() {

  const {currUser} = useContext(AuthContext);
    const navigate = useNavigate();
    // const [emotionData, setEmotionData] = useState([]);

const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const writeData = async (data) =>{

  const currTime=moment().format('LT'); 
  const currDate=moment().format("YYYY-MM-DD");

  data["uid"] = currUser.uid;
  data["time"] =  currTime;
  data["date"] =  currDate;

// creating reference to current user
const docRef = doc(db,"Users",currUser.uid)

const moodTrackerColRef = collection(docRef,"moodTracker")

try{
  const response = await addDoc(moodTrackerColRef,
  data 
  )

  if(response){
    console.log(response)
    navigate("/dashboard");
    
  }


}
catch(err){
console.log("Error",err)
}


}

  return (

    <div className="max-w-lg m-auto relative my-10 rounded-2xl px-12 py-6  bg-purple-900 bg-opacity-25 flex flex-col   gap-y-8 ">
      <div>
        <h1 className="font-semibold text-4xl text-center text-white">
          User Emotion and trigger data collection
        </h1>
      </div>

      <form className="flex flex-col gap-y-2 " action="post" onSubmit={handleSubmit(writeData)}>
        <div className="flex flex-col gap-y-1 ">
          <label htmlFor="userEmotion" className=" font-medium text-xl text-white">
            Select you Emotion
          </label>
          <select 
          id="userEmotion"
          aria-invalid={errors.userEmotion ? "true" : "false"}
          {...register("userEmotion",{required:"Please select an emotion"})}
          className="outline-none rounded-2xl px-5 py-3">
        
        <option value="">-- Choose an Emotion --</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="anxious">Anxious</option>
          </select>
          {errors.userEmotion?.type === "required" && (
          <p role="alert" className="text-red-500 text-xs">
            {errors.userEmotion.message}
          </p>
        )}

        </div>
    

        <div className="flex flex-col gap-y-1 ">
        <label
          htmlFor="trigger"
          className=" font-medium text-xl text-white"
        >
             What triggered this emotion
        </label>
        <input
          {...register("trigger", { required: "This is required" })}
          aria-invalid={errors.trigger ? "true" : "false"}
          type="text"
          autoComplete="trigger"
          placeholder="Certain smells (e.g., perfume, smoke)"
          id="trigger"
          className="outline-none rounded-2xl px-5 py-3"
        />
        {errors.trigger?.type === "required" && (
          <p role="alert" className="text-red-500 text-xs">
            {errors.trigger.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-y-1 ">
        <label
          htmlFor="intensity"
          className=" font-medium text-xl text-white"
        >
            Intensity you feel!
        </label>
        <input
          {...register("intensity", { required: "This is required" })}
          aria-invalid={errors.intensity ? "true" : "false"}
          type="number" 
          autoComplete="intensity"
          placeholder="Certain smells (e.g., perfume, smoke)"
          id="intensity"
          className="outline-none rounded-2xl px-5 py-3"
        />
        {errors.intensity?.type === "required" && (
          <p role="alert" className="text-red-500 text-xs">
            {errors.intensity.message}
          </p>
        )}
      </div>


        <Button text={"Save Data"} type={"submit"} properties={"bg-white text-black"}/>
      </form>
    </div>
  );
}
