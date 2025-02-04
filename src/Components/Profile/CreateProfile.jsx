import React,{useContext, useEffect, useState} from 'react'
import Button from "../Common Components/Button";
import { useForm } from "react-hook-form";
import app from "../../Configuration/firebase-config";
import AuthContext from "../context/authContext";
import { Link, useNavigate } from 'react-router-dom';
import {
    getAuth, validatePassword 
  } from "firebase/auth";
  import { getFirestore, addDoc,collection,getDoc,doc, getDocs,setDoc } from "firebase/firestore";

  


// const auth = getAuth(app);
const db = getFirestore(app);

export default function CreateProfile() {

     const navigate = useNavigate();
    const {currUser,profileDocId} = useContext(AuthContext);
    const [validStatus,setValidStatus] = useState(null);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
    },
  });

useEffect(()=>{
  
const fetchData = async () => {

  if(currUser){

try{
  
   const profileDocRef = doc(db, "Users", currUser.uid, "profile", profileDocId || "")
   const docSnap = await getDoc(profileDocRef);

  if(docSnap.exists()){
   
   const {username} = docSnap.data();
   console.log(username)
   setValue("username",username)
  }

}

catch(err){


console.log("Error",err)

}
  }


  
}
fetchData()

},[currUser])


const createProfile = async(data)=>{

  
 const profileDocRef = doc(db, "Users", currUser.uid, "profile", profileDocId || "");

  const status = await validatePassword(getAuth(), data.password);
if(status.isValid){
setValidStatus(true);
console.log("valid")
  try{

    
   await setDoc(profileDocRef,data, { merge: true });
  navigate("/moodtracker");
    
  }
  catch(err){
  console.log("Error",err)
  }
}

else {
  setValidStatus(false)
  console.log("Not valid")
}









}






  return (
    <form className="flex flex-col text-black gap-y-2 w-[775px]"
    action="post" onSubmit={handleSubmit(createProfile)}>


<div className="flex flex-col gap-y-1 ">
  <label htmlFor="name" className="font-medium text-xl text-white">
   Name
  </label>
  <input
    aria-invalid={errors.name ? "true" : "false"}
    {...register("name", { required: "Name is required" })}
    type="text"
    autoComplete="name"
    placeholder="Lisa"
    id="name"
    className="rounded-2xl px-5 py-3 outline-none"
  />
  {errors.name?.type === "required" && (
    <p role="alert" className="text-red-500 text-xs">
      {errors.name.message}
    </p>
  )}
</div>

<div className="flex flex-col gap-y-1 ">
  <label htmlFor="username" className="font-medium text-xl text-white">
   Username
  </label>
  <input
    aria-invalid={errors.username ? "true" : "false"}
    {...register("username", { required: "username is required" })}
    type="text"
    autoComplete="username"
    placeholder="UserName"
    id="username"
    className="rounded-2xl px-5 py-3 outline-none "
    value={getValues("username") || ""}
    disabled
  />
  {errors.username?.type === "required" && (
    <p role="alert" className="text-red-500 text-xs">
      {errors.username.message}
    </p>
  )}
</div>

<div className="flex flex-col gap-y-1 ">
  <label
    htmlFor="password"
    className="font-medium text-xl text-white"
  >
    Password
  </label>
  <input
    aria-invalid={errors.password?"true":"false"}
    {...register("password", {
      required: "Password is mismatched",
    })}
    type="password"
    autoComplete="password"
    placeholder="Enter your password"
    id="password"
    className="outline-none rounded-2xl px-5 py-3 "
  />
  {errors.password?.type === "required" && (
    <p role="alert" className="text-red-500 text-xs">
      {errors.password.message}
    </p>
  )}
</div>

<span className="text-white text-right font-medium text-sm ">
  Forget Password?
  <Link className="font-bold">
   Send me code
  </Link>
</span>
  <Button text={"Create Profile"} type={"submit"} />
    </form>
  )
}

