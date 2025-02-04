import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaRegHeart,
  FaRegUser,
  FaTableCellsLarge,
  FaUsers,
  FaWhmcs,
  FaWeightScale,
  FaRegNewspaper,
  FaRightToBracket,
} from "react-icons/fa6";
import AuthContext from "../context/authContext";


export default function Hamburger({ toggleMenu, loggedOut,state }) {
  
  
  const {patientName} = useContext(AuthContext);
  
  
  
  
  
  
  return (
    <div
      id="menu"
      className={`z-50 absolute top-0 bg-white  overflow-x-hidden ${state?"right-0":"left-0"} rounded-lg w-80 h-screen`}
    >
     
      <div className="relative h-full p-5">
         {/* menu top */}
        <div className="flex flex-row justify-between mb-10">
          <h1 className="font-normal text-2xl text-[#595880]">D.I.D Site</h1>
          <button onClick={toggleMenu}>
            <FaBars />
          </button>
        </div>

        {/* middle */}

        <ul className="p-5 flex-col flex gap-y-5">
          <li className="flex flex-row items-center gap-x-3">
            <FaTableCellsLarge />
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className="flex flex-row items-center gap-x-3">
            <FaUsers />
            <Link to="/system-profiles">System Profiles</Link>
          </li>
          <li className="flex flex-row items-center gap-x-3">
            <FaRegUser />
            <Link to="/profile">Profile</Link>
          </li>
          <li className="flex flex-row items-center gap-x-3">
            <FaWeightScale />
            <Link to="/moodtracker">Mood Tracker</Link>
          </li>
          <li className="flex flex-row items-center gap-x-3">
            <FaRegNewspaper />
            <Link to="/journal">Journal</Link>
          </li>
          <li className="flex flex-row items-center gap-x-3">
            <FaRegHeart />
            <Link to="/support">Support</Link>
          </li>
          <li className="flex flex-row items-center gap-x-3">
            <FaWhmcs />
            <Link to="">Setting</Link>
          </li>
        </ul>

        {/* last */}
        <div className="bg-light-purple absolute bottom-0 left-0 w-full px-5 py-4 flex flex-row justify-between">
          <h1>{patientName || "Lisa"}</h1>
          <button onClick={loggedOut}>
            <FaRightToBracket />
          </button>
        </div>
      </div>
    </div>
  );
}
