import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AppProvider from './Components/context/AppProvider.jsx'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
 <AppProvider>
<App />
<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
 </AppProvider>
   
  
)
