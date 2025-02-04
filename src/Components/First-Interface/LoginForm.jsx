import React, {useEffect, useContext, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Common Components/Button";
import { useForm } from "react-hook-form";
import app from "../../Configuration/firebase-config";
import AuthContext from "../context/authContext";
import { NotificationPopup } from "../Noifications/NotificationPopup";
import { listenForMessages } from "../Noifications/requestPermission";
import LoadingAnim from "../Common Components/LoadingAnim";

// creating auth instance
const auth = getAuth(app);

export default function LoginForm({accountPage}) {
  
  const { authSuccess } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {

    if (authSuccess) {
      console.log("Already Logged in");
        navigate("/dashboard");
     
    } 
    
    else {
     
        console.log("not logged in");
        navigate("/account");
      
    }
  }, [authSuccess]);

  // No need for state management
  // const [user, setUser] = useState({
  // username:"",
  // password:"",
  // email:"",
  // confirmPassword:""
  // });

  // const inputHandler = (event) => {
  //     const {name,value} = event.target;
  //     setUser((prevData) => {
  //     return {...prevData,[name]:value}
  //     })
  //     }

  const login = async (data) => {

    

    try{
      setLoading(true);
      const response = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
     

      if (response) {
        setLoading(false)
        NotificationPopup("Successfully Logged In", "success");
        console.log("Successfully Logged in");
        navigate("/dashboard");
      }

     




    }

    catch(err){
      setLoading(false)
      if (err.code === "auth/network-request-failed") {
     
        NotificationPopup("Login Failed: Network Error", "error");
      }

      else if(err.code === "auth/invalid-credential"){
       
        NotificationPopup("Login Failed: User Not Found/Invalid Credentials ", "error");
      }
       
      console.error("Login failed:", err);
    }
setLoading(false)
   
  };

  return (
    <>

<section className="relative">

<div className={` ${loading?"blur-sm":""} w-[calc(100vh-150px)] md:w-[555px] m-auto relative rounded-2xl px-12 py-6   bg-opacity-25 flex flex-col bg-white  gap-y-8 `}>
        <div>
          <h1 className="font-semibold text-4xl text-center text-white">
            Login
          </h1>
        </div>
        <form
          className="flex flex-col gap-y-2 "
          action="post"
          onSubmit={handleSubmit(login)}
        >
          <div className="flex flex-col gap-y-1 ">
            <label htmlFor="email" className="font-medium text-xl text-white">
              Email
            </label>
            <input
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", { required: "Email Address is required" })}
              type="email"
              autoComplete="email"
              placeholder="info@gmail.com"
              id="email"
              className="rounded-2xl px-5 py-3 outline-none"
            />
            {errors.email?.type === "required" && (
              <p role="alert" className="text-red-500 text-xs">
                {errors.email.message}
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
              aria-invalid={errors.password ? "true" : "false"}
              {...register("password", {
                required: "Password is required",
              })}
              type="password"
              autoComplete="password"
              placeholder="Enter your password"
              id="password"
              className="outline-none rounded-2xl px-5 py-3"
            />
            {errors.password?.type === "required" && (
              <p role="alert" className="text-red-500 text-xs">
                {errors.password.message}
              </p>
            )}
          </div>

        

        




          <Button text={"Login"} type={"submit"} properties={"bg-light-purple text-greyish-purple"}/>
        </form>
        <span className="text-white text-right   font-medium text-sm ">
            Don't have an account?{" "}
           <button className="font-bold" onClick={accountPage}> Sign Up</button>
        
          </span>
          </div>


{loading && <LoadingAnim/>}

</section>
    </>
  );
}
