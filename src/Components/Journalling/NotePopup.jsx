import React from 'react'
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { FaXmark } from "react-icons/fa6";

export default function NotePopup({contentHead="",contentDesc="",onClose}) {

  return (

<section className=' absolute inset-0 flex flex-col m-auto 
  items-center  justify-center'>
    <button onClick={onClose} className='text-4xl mb-10'>   <FaXmark/></button>
 <div id='note-popup' className="relative bg-note-color-green p-5 w-[calc(100vw-100px)] min-h-[60vh] max-h-[80vh] overflow-y-auto rounded-2xl shadow-lg">
   <h1 className='text-center font-semibold text-xl mb-5'>{contentHead}</h1>
   <ReactMarkdown 
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
   >
     {contentDesc}
   </ReactMarkdown>
   </div>
  


   </section>

  )
}
