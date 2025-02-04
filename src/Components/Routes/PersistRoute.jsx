import React,{useEffect} from 'react'
import { useLocation } from 'react-router-dom'

export default function PersistRoute() {

const loaction = useLocation();


useEffect(()=>{

localStorage.setItem("lastPath",location.pathname)


},[location])

  return null;
}
