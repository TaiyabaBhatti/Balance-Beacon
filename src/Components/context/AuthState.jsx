import React, { useState, useEffect } from 'react'
import AuthContext from './authContext'
import {onAuthStateChanged,getAuth} from "firebase/auth"
import app from "../../Configuration/firebase-config";
import {getFirestore,getDoc,doc,getDocs,query,collection,where} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export default function AuthState(props) {

const [currUser,setCurrUser] = useState(null);
const [profileData,setProfileData] = useState(null);
const [profileDocId,setProfileDocId] = useState(null);
const [patientName,setPatientName] = useState(null);
const [emotionTriggerData,setEmotionTriggerData] = useState(null);

const [isAuthLoading, setIsAuthLoading] = useState(true);

useEffect(()=>{

const unsubscribe =  onAuthStateChanged(auth,async user => {

if(user){

  setCurrUser(user);
  console.log(user.uid)
  
 try{
  const profileQuery = query(
    collection(db, `Users/${user.uid}/profile`),
  );
const userTrackerQuery = query(
    collection(db, `Users/${user.uid}/moodTracker`),
  );
 

  const profileQuerySnapshot = await getDocs(profileQuery);
  const trackerQuerySnapshot = await getDocs(userTrackerQuery);

  if(!profileQuerySnapshot.empty){
    const fetchedProfileData = profileQuerySnapshot.docs.map((doc)=>{
     setProfileDocId(doc.id)
      return doc.data();
    });
    // setUserData(fetchedData);
    setProfileData(fetchedProfileData);
    setPatientName(fetchedProfileData[0].name  || "Patient")
  }

  if(!trackerQuerySnapshot.empty){
  
    const fetchedTrackerData = trackerQuerySnapshot.docs.map((doc)=>{
      return doc.data();
    });
    setEmotionTriggerData(fetchedTrackerData);
    console.log("Fetched user documents:");
  
  }


  else if(profileQuerySnapshot.empty) {
    console.log("No setup profile");
  }
  
  
  else if(trackerQuerySnapshot.empty) {
    console.log("No documents found for this user.");
  }


 }
 catch(err){
  console.log("Error fetching user data",err);
 }
}

else {
  setCurrUser(null)
  setProfileDocId(null)
setEmotionTriggerData(null)
  setPatientName("Patient")
  console.log("Not logged in")
}

setIsAuthLoading(false);
})

return () => unsubscribe()

}, [])

const authSuccess = currUser? true: false;



  return (
   <AuthContext.Provider value={{authSuccess,emotionTriggerData,patientName,currUser,profileData,profileDocId}}>
       {props.children}
   </AuthContext.Provider>
  )
}
