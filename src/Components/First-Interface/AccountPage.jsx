import React, { useEffect, useState } from 'react'
import accountBg from "../../assets/images/accountBg.jpg";
import Button from "../Common Components/Button";
import LoginForm from './LoginForm';
import SignInForm from './SignInForm';

export default function AccountPage() {

const [toggleAccount,setToggle] = useState(true); 
const [loading,setLoading] = useState(false);

useEffect(()=>{

},[])


const loginPage = () =>{
  setToggle(true)
}


const signInPage = () =>{
  setToggle(false)
}



  return (
   <>
         <section className="h-[600px] justify-center flex items-center
         ">
           {/* dashboard-about-screen-bg-image */}
           <img
             src={accountBg}
             alt=""
             className="h-[1000px]  object-cover  absolute top-0 -z-50 w-screen bg-no-repeat"
           />
          
         
{ toggleAccount ? <LoginForm accountPage={signInPage}/> : <SignInForm accountPage={loginPage}/>}

               
         </section>

         {loading && <LoadingAnim/>}
</>

  )
}
