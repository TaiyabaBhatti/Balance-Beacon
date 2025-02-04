import React from 'react'
import { FaChevronLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';


export default function PastPage({title,path="",textColor="text-greyish-purple"}) {
  return (
    <div className={`flex flex-row hover:translate-x-3 transition-all duration-150 w-fit  gap-x-1  items-center mb-10 font-semibold ${textColor}`}>
        < FaChevronLeft/>
      <Link to={path} className='text-xl'>Back</Link>
    </div>
  )
}
