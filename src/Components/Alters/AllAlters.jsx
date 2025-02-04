import React, { useContext, useEffect, useState } from "react";
import PatientProfile from "../Common Components/PatientProfile";
import Button from "../Common Components/Button";
import app from "../../Configuration/firebase-config";
import { collection, getDocs, getFirestore, query } from "firebase/firestore";
import LoadingAnim from "../Common Components/LoadingAnim";
import AuthContext from "../context/authContext";
import { NotificationPopup } from "../Noifications/NotificationPopup";
import { useParams, useSearchParams } from "react-router-dom";

import { FcPodiumWithSpeaker } from "react-icons/fc";

const db = getFirestore(app);

export default function AllAlters() {
  const [searchPara,setSearchPara] = useSearchParams();
  const { currUser, patientName } = useContext(AuthContext);
  const [altersData, setAltersData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      setLoading(true);
      const altersQuery = query(collection(db, `Users/${currUser.uid}/Alters`));

      try {
        const altersQuerySnapshot = await getDocs(altersQuery);

        if (!altersQuerySnapshot.empty) {
          NotificationPopup("Successfully fetched Alters", "success");
          const fetchedAltersData = altersQuerySnapshot.docs.map((doc) => {
         
            return doc.data();
          });

          setAltersData(fetchedAltersData);
          console.log("Fetched Alters documents:");
        } else if (altersQuerySnapshot.empty) {
          setLoading(false);
          NotificationPopup("Not Found Any Alter for this user", "info");
          console.log("No documents found for this user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      setLoading(false);
    };

    fetchedData();
  }, []);



  const handleAlterClick = (alter) => {
    setSearchPara({role:alter.role});
    // setSelectedNote(note);
    // setIsNoteOpen(true);
  };








  return (
    <PatientProfile gap={"gap-y-10"} path="/dashboard">




<div className="flex flex-col gap-y-3">

 {altersData ? 
              altersData.map((alter, index) => (
                <div
                  key={index}
                  className="cursor-pointer text-3xl  w-96 text-black bg-light-purple items-center px-5 py-2 flex flex-row gap-x-5"
                  onClick={() => handleAlterClick(alter)}
                >
                  
       <FcPodiumWithSpeaker/>
        <p className="font-normal text-2xl">{alter.role}</p>
      </div>
                
              ))
            : 
             loading && <LoadingAnim />
            }

</div>

      <div>
        <Button
          classname=""
          text={"Add Alter"}
          to={"/system-profiles/add-alter"}
          properties={"bg-white text-black"} 
        />
      </div>
    </PatientProfile>
  );
}
