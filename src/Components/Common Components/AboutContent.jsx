import React from 'react'

export default function AboutContent({
    children,
    properties
}) {
  return (
     <section
            className={`${
              loading ? "blur-sm" : ""
            } h-screen mb-10 -mt-24 flex items-center px-10`}
          >
            {/* dashboard-about-screen-bg-image */}
            <img
              src={dashboardBg}
              alt=""
              className="h-screen absolute top-0 -z-50 w-screen bg-no-repeat object-cover left-0"
            />
    
            <Content contentProperties={"text-white"}>
              <h1 className="text-center font-bold text-6xl ">Dashboard</h1>
              <p className="text-center font-normal text-4xl">
                Hello, {patientName || "Lisa"}! How are you feeling today?
              </p>
              <Button text={"Explore dashboard"} bgColor={"bg-white"} />
            </Content>
          </section>
  )
}
