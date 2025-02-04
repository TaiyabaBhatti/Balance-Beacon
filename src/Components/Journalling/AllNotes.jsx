import React, { useContext, useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import journalHeaderBg from "../../assets/images/journalHeaderBg.jpg";
import Card from "../Common Components/Card";
import Notes from "../Common Components/Notes";
import AuthContext from "../context/authContext";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
} from "firebase/firestore";
import app from "../../Configuration/firebase-config";
import { NotificationPopup } from "../Noifications/NotificationPopup";

import Wrapper from "../Common Components/Wrapper";
import LoadingAnim from "../Common Components/LoadingAnim";
import PastPage from "../Common Components/PastPage";
import NotePopup from "./NotePopup";
import { useParams, useSearchParams } from "react-router-dom";

const db = getFirestore(app);

export default function AllNotes() {

  const [searchPara, setSearchPara] = useSearchParams();
 
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const { currUser, patientName } = useContext(AuthContext);
  const [journalData, setJournalData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      setLoading(true);
      const userJournalQuery = query(
        collection(db, `Users/${currUser.uid}/Journals`)
      );

      try {
        const journalQuerySnapshot = await getDocs(userJournalQuery);

        if (!journalQuerySnapshot.empty) {
          NotificationPopup("Successfully fetched notes", "success");
          const fetchedJournalData = journalQuerySnapshot.docs.map((doc) => {
            return {...doc.data(),id:doc.id};
          });

          setJournalData(fetchedJournalData);
          console.log(fetchedJournalData)
          console.log("Fetched journal documents:");
        } else if (journalQuerySnapshot.empty) {
          NotificationPopup("Not Found Any journal for this user", "info");
          console.log("No documents found for this user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      setLoading(false);
    };

    fetchedData();
  }, []);

  // Handler to open note
  const handleNoteClick = (note) => {
    setSearchPara({id:note.id});
    setSelectedNote(note);
    setIsNoteOpen(true);
  };

  // Handler to close note
  const handleClosePopup = () => {
   
    setSearchPara()
    setIsNoteOpen(false);
    setSelectedNote(null);
  };

  return (
    <>
      <img
        src={journalHeaderBg}
        alt=""
        className=" absolute  object-cover top-0 -z-50 h-24 w-screen bg-no-repeat"
      />
      <section className="relative min-h-screen">
        <Wrapper properties={isNoteOpen ? "blur-2xl" : ""}>
          <PastPage path={"/journal"} />
          <section
            className={`relative items-center  justify-center flex gap-3 flex-wrap`}
          >
            {journalData ? (
              journalData.map((noteObj, index) => (
                <div
                  key={index}
                  className="cursor-pointer"
                  onClick={() => handleNoteClick(noteObj)}
                >
                  <Notes
                    contentHead={noteObj.title}
                    contentDesc={noteObj.content}
                  />
                </div>
              ))
            ) : (
              <LoadingAnim />
            )}
          </section>
        </Wrapper>

        {selectedNote && (
          <NotePopup
            contentHead={selectedNote.title}
            contentDesc={selectedNote.content}
            onClose={handleClosePopup}
          />
        )}
      </section>
    </>
  );
}
