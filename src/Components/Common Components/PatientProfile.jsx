import React from 'react'

import PastPage from './PastPage';

export default function PatientProfile({children,gap=null,path=""}) {
  return (
     <section className="min-h-full bg-dark-purple">

<div className='bg-dark-purple absolute top-0 left-0 -z-50 w-full h-32'></div>

           <section className='p-10'>
          <PastPage path={path} textColor={"text-light-purple"}/>
            
               <div
                 id="dashboard-about-heading"
                 className={`max-w-4xl px-10 flex flex-col items-center ${gap?gap:"gap-y-6"}  m-auto text-white`}
               >
   
             {children}
               
               </div>
               </section>
             </section>
  )
}
