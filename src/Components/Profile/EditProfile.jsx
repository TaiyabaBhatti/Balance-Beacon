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
  

const db = getFirestore(app);
export default function EditProfile() {

     const navigate = useNavigate();
    const {currUser,profileData,profileDocId} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
 
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    setError
  } = useForm();


console.log(profileData)

 useEffect(()=>{

const fetchExistedData = async () => {

  if(currUser){
try{
   const profileDocRef = doc(db, "Users", currUser.uid, "profile", profileDocId || "")
   const docSnap = await getDoc(profileDocRef);
  // if(docSnap.exists()){  
  //  const {username} = docSnap.data();
  //  console.log(username)
  //  setValue("username",username)
  // }

}
catch(err){
console.log("Error",err)








}
  }


  
}
fetchExistedData()




 },[])

const editProfile = async(data)=>{

setLoading(true);

try { 
 
 
if(!currUser){
 
  setError("password", { type: "manual", message: "No user is logged in" });
  setLoading(false);
  return;
}

// having user credentials
const credentials = EmailAuthProvider.credential(currUser.email,data.password);
await reauthenticateWithCredential(currUser, credentials);        

      const updatedProfileData = {
            name: data.name || profileData?.[0]?.name, // Preserve old value if not updated
            gender: data.gender || profileData?.[0]?.gender, 
            age:data.age || profileData?.[0]?.age
          };
        
        const profileDocRef = doc(db, "Users", currUser.uid, "profile", profileDocId || "");
        await setDoc(profileDocRef, updatedProfileData, { merge: true });
        navigate("/dashboard");
       
      } catch (error) {
        console.error("Failed to update profile:", error.message);
        
        if (error.code === "auth/invalid-credential") {
          console.error(error.code);
          setError("password", {
            type: "manual",
            message: "Incorrect password.",
          });
        }
      }
      finally {
        setLoading(false);
      }

}

  return (


<>

<PatientProfile path='/dashboard'>

<div className='relative'>

<div className={loading?"blur-sm":""}>
<form className="flex flex-col text-black gap-y-2 w-fit md:w-[555px]"
    action='post'
   onSubmit={handleSubmit((data)=>{
  editProfile(data);
   })}>




<div className="flex flex-col gap-y-1 ">
  <label htmlFor="name" className="font-medium text-xl text-white">
   Name:
  </label>
  <input
    // aria-invalid={errors.name ? "true" : "false"}
    {...register("name")}
    type="text"
    autoComplete="name"
    placeholder={profileData?.[0]?.name || "lisa"}
    id="name"
    className="rounded-2xl px-5 py-3 outline-none"
  />
</div>

<div className="flex flex-col gap-y-1 ">
<label htmlFor="name" className="font-medium text-xl text-white">
   Gender:
  </label>


  <div className="flex gap-x-4 rounded-2xl px-5 text-greyish-purple py-3 bg-light-purple">
  <label className="flex items-center gap-x-2 ">
      <input
        {...register("gender", { required: "Gender is required" })}
        type="radio"
        value="male"
       
        className="accent-blue-500"
      />
      Male
    </label>
    <label className="flex items-center gap-x-2 ">
      <input
        {...register("gender", { required: "Gender is required" })}
        type="radio"
        value="female"
        className="accent-blue-500"
      />
      Female
    </label>
    <label className="flex items-center gap-x-2 ">
      <input
        {...register("gender", { required: "Gender is required" })}
        type="radio"
        value="other"
        className="accent-blue-500"
      />
      Preferred not to say
    </label>
  </div>

  




</div>

<div className="flex flex-col gap-y-1 ">
  <label htmlFor="age" className="font-medium text-xl text-white">
   Age:
  </label>
  <input
    {...register("age")}
    type="text"
    autoComplete="age"
    placeholder={profileData?.[0]?.age || "23"}
    id="age"
    className="rounded-2xl px-5 py-3 outline-none"
  />
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
  {errors.password && (
    <p role="alert" className="text-red-500 text-xs">
      {errors.password.message}
    </p>
  )}
</div>

<span className="text-white text-right  text-sm ">
  Forget Password? {" "}
  <Link className="font-bold">
    Send me code
  </Link>
</span>


  <Button text={"Save Changes"} type={"submit"}  properties={"bg-light-purple text-greyish-purple"}  />
    </form>
    </div>
{loading && <LoadingAnim/>}

</div>

</PatientProfile>
</>

   
  )
}

