import React,{useContext, useEffect, useState} from 'react'
import Button from "../Common Components/Button";
import { useForm } from "react-hook-form";
import app from "../../Configuration/firebase-config";
import AuthContext from "../context/authContext";
import { Link, useNavigate } from 'react-router-dom';
import {
  EmailAuthProvider,
    getAuth, reauthenticateWithCredential,
  } from "firebase/auth";
  import { getFirestore, addDoc,collection,getDoc,doc, getDocs, setDoc } from "firebase/firestore";
import LoadingAnim from '../Common Components/LoadingAnim';
import PatientProfile from '../Common Components/PatientProfile';
import { NotificationPopup } from '../Noifications/NotificationPopup';
  

const db = getFirestore(app);
export default function CreateAlter() {

    
    const [loading, setLoading] = useState(false);
    const {currUser} = useContext(AuthContext);
    const navigate = useNavigate();
 
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    setError
  } = useForm();


console.log(getAuth())



const createAlter = async(data)=>{
setLoading(true);

try { 

// creating reference to alters
const docRef = doc(db,"Users",currUser.uid)

const altersColRef = collection(docRef,"Alters");

 const response = await addDoc(altersColRef,
  data 
  )

  if(response){
    console.log(response)
     NotificationPopup("Successfully Created Alter", "success");
    navigate("/system-profiles");
    
  }


} catch (error) {
        console.error("Failed to update profile:", error.message);
      }
      finally {
        setLoading(false);
      }

}

  return (


<>

<PatientProfile path="/system-profiles">

<div className='relative'>

<div className={loading?"blur-sm":""}>

<form className="flex flex-col text-black gap-y-2 w-[555px]"
    action='post'
   onSubmit={handleSubmit((data)=>{
  createAlter(data);
   })}>


<div className="flex flex-col gap-y-1 ">
  <label htmlFor="name" className="font-medium text-xl text-white">
   Name
  </label>
  <input
    // aria-invalid={errors.name ? "true" : "false"}
    {...register("name")}
    type="text"
    autoComplete="name"
    placeholder="lisa"
    id="name"
    className="rounded-2xl px-5 py-3 outline-none"
  />
  {/* {errors.name?.type === "required" && (
    <p role="alert" className="text-red-500 text-xs">
      {errors.name.message}
    </p>
  )} */}
</div>

<div className="flex flex-col gap-y-1 ">
  <label htmlFor="role" className="font-medium text-xl text-white">
   Role (If any)
  </label>
  <input
    {...register("role")}
    type="text"
    autoComplete="role"
    placeholder="role"
    id="role"
    className="rounded-2xl px-5 py-3 outline-none"
  />
</div>


<div className="flex flex-col gap-y-1 ">
  <label
    htmlFor="favouriteColor"
    className="font-medium text-xl text-white"
  >
    Favourite Color
  </label>



<input
      {...register("favouriteColor")}
      type="color"
      id="favouriteColor"
      defaultValue={"#ff5733"}
      className="w-40 h-10 rounded-lg border-none cursor-pointer bg-transparent"
    />



  {/* <input
    aria-invalid={errors.favouriteColor?"true":"false"}
    {...register("favouriteColor", {
      required: "Required",
    })}
    type="favouriteColor"
    autoComplete="favouriteColor"
    placeholder="Enter your favourite Color"
    id="favouriteColor"
    className="outline-none rounded-2xl px-5 py-3 "
  /> */}
  
</div>

<div className="flex flex-col gap-y-1 ">
  <label htmlFor="description" className="font-medium text-xl text-white">
   Description
  </label>
 
<textarea name="description" id="description"
autoComplete="description"
className="rounded-2xl px-5 py-2 outline-none"
    placeholder="About your current behaviour"
    {...register("description")}
    rows={5}
    minLength={5}
></textarea>


</div>










  <Button text={"Save Changes"} type={"submit"}  
   properties={"bg-light-purple text-greyish-purple"} 
 />
    </form>
    </div>
{loading && <LoadingAnim/>}

</div>

</PatientProfile>
</>

   
  )
}

