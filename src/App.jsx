
import './index.css'
import './style.css'
import {BrowserRouter as Router } from 'react-router-dom'
import AppRoutePages from './Components/Routes/AppRoutePages'
import Layout from './Components/Routes/Layout'
import { useEffect } from 'react'
// import requestPermission from './Components/Noifications/requestPermission'
import { requestPermission,listenForMessages } from './Components/Noifications/requestPermission'
import RestoreRoute from './Components/Routes/RestoreRoute'

function App() {
   
useEffect(()=>{
    requestPermission();
    listenForMessages();

},[])

 return (
<Router>
  
<Layout>
<AppRoutePages/>
</Layout>
</Router>
 )
}

export default App
