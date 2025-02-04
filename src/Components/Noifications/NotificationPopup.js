import React from 'react'
import {toast } from "react-toastify";


export  const NotificationPopup = (message, type = "info")=>  {

    toast[type](message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });


}
