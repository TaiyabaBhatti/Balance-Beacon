import React,{useContext, useState} from 'react'
import {Link} from "react-router-dom"
import AuthContext from "../context/authContext";
import app from "../../Configuration/firebase-config";
import {
  getAuth,signOut
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Hamburger from './Hamburger';

import {FaRegCircleUser,FaBars} from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { NotificationPopup } from '../Noifications/NotificationPopup';

const auth = getAuth(app);

export default function Header() {

  const {authSuccess,user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenu,setMenuStatus] = useState(false);

const loggedOut = async () => {
// console.log(userId)

try {
  await signOut(auth);
  console.log("succesfully loged out")
  NotificationPopup("Successfully Logged out", "success");
  navigate("/account");
}
catch (error){
  console.log(error)

}

}

const toggleMenu = () =>{

  if(!isMenu){
    setMenuStatus(true);
  }

  else {
    setMenuStatus(false)
  }


}
  return (
   <nav className='relative z-10 px-10 py-9 flex flex-row justify-between items-center  h-24'>
    <div id='left-logo'>
        <h1 className='font-bold text-3xl text-light-purple'>
Balance Beacon
        </h1>
    </div>

    <div id='right-navlinks' className='text-3xl text-white font-extrabold flex flex-row items-center gap-x-4'>
       {authSuccess && <IoNotifications/>}
       
        <Link to="/account">< FaRegCircleUser /></Link>
        {authSuccess &&  <button onClick={toggleMenu}><FaBars /></button>}
       
    </div>

{isMenu && 

<Hamburger toggleMenu = {toggleMenu} loggedOut={loggedOut} state={isMenu}/>

}




   </nav>
  )
}


