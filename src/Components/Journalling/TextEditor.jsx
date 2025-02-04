import React,{useState,useContext} from 'react'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import moment from "moment"
import { useForm } from "react-hook-form";
import Button from "../Common Components/Button";
import { getFirestore, addDoc,collection,getDoc,doc } from "firebase/firestore";
import app from "../../Configuration/firebase-config";
import AuthContext from "../context/authContext";
import { useNavigate } from 'react-router-dom';




const db = getFirestore(app);

export default function TextEditor() {

    const [value, setValue] = useState('');
    const {currUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const [journalData,setJournalData] = useState({
        title:"",
        content:"",
        date:moment().format("YYYY-MM-DD"),
    })
   
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


const handleTextEditorContent = (value) =>{
    setJournalData({...journalData,content:value})
}



const modules = {
      toolbar: {
        container: [
          [{ header: [2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
       
      },
      clipboard: {
        matchVisual: true,
      },
    }
   
  
const submitJournal = async (data) => {
    const collectiveData = {...journalData,...data};
    console.log(collectiveData)
 if(currUser){
    const docRef = doc(db,"Users",currUser.uid)
    const journalColRef = collection(docRef,"Journals");
    try{
        const response = await addDoc(journalColRef,
        collectiveData
        )
      
        if(response){
          console.log(response)
          navigate("/journal");
        }
      
      
      }
      catch(err){
      console.log("Error",err)
      }
 }

 else {
    console.log("Not found")
 }











    
   
}



  return (
     <form action="post" onSubmit={handleSubmit(submitJournal)} className='flex flex-col gap-y-5'>


<div className='text-greyish-purple   font-medium'>
<div className="flex flex-row items-center gap-x-1 ">
        <label
          htmlFor="title"
        >
            Title:
        </label>
        <input
          {...register("title", { required: "This is required" })}
          aria-invalid={errors.title ? "true" : "false"}
          type="text"
          autoComplete="title"
          placeholder="Today Summarize"
          id="title"
          className="outline-none rounded-2xl px-5 py-1"
        />
        {errors.title?.type === "required" && (
          <p role="alert" className="text-red-500 text-xs">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="flex flex-row gap-x-1 items-center ">
        <label
          htmlFor="date"
          
        >
            Date:
        </label>
        <input
          {...register("date")}
          aria-invalid={errors.date ? "true" : "false"}
          type="text"
          autoComplete="date"
          value={journalData.date}
          id="date"
          className="outline-none rounded-2xl px-5 py-1 "
        />
       
      </div>
</div>


<ReactQuill theme="snow" value={journalData.content} modules={modules} className=' ' onChange={handleTextEditorContent} placeholder="Write your journal entry here..."/>

   <Button text={"Save Journal"} type={"submit"}  properties={"bg-light-purple text-black"}
            />

     </form>
   
   
  )
}
