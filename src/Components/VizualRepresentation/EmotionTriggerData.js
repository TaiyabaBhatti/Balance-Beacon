import {getFirestore,getDoc,doc,getDocs,query,collection,where} from "firebase/firestore";
import app from "../../Configuration/firebase-config";

const db = getFirestore(app);

export default async function gettingData(id){

  let fetchedCollection ;
const userQuery = query(
    collection(db, `Users/${id}/moodtracker`),
  );


  try{
  const querySnapshot = await getDocs(userQuery);

  if(!querySnapshot.empty){

   fetchedCollection = querySnapshot.docs.map((document)=>{
      return document.data();
    });
  }
  else {
    console.log("No documents found for this user.",fetchedCollection);
  }
  }
   catch (error) {
    console.error("Error fetching user data:", error);
    }
console.log(fetchedCollection)
return fetchedCollection;

}