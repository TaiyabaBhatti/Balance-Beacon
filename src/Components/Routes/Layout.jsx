import Footer from "../Common Components/Footer";
import Header from "../Common Components/Header";
import React from 'react'

// For comman components

export default function Layout({children}) {
  return (
    <>
      <Header/>
      <main className="">{children}</main>
      <Footer/>
    </>
  )
}

