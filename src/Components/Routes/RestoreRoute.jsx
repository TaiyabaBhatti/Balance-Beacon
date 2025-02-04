import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RestoreRoute() {

const navigate = useNavigate();


useEffect(()=>{

const lastPath = localStorage.getItem("lastPath");
if(lastPath){
    navigate(lastPath,{replace:true})
}
},[navigate])






  return null
}
