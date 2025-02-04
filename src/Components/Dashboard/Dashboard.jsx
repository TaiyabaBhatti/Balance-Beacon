import React, { useContext, useEffect, useState } from "react";
import dashboardBg from "../../assets/images/background.jpg";
import Card from "../Common Components/Card";
import Button from "../Common Components/Button";
import Wrapper from "../Common Components/Wrapper";
import AuthContext from "../context/authContext";
import LoadingAnim from "../Common Components/LoadingAnim";
import Content from "../Common Components/Content";
export default function Dashboard() {
  const { patientName, authSuccess } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(!patientName);
  }, [patientName, authSuccess]);

  return (
    <>
      {/* About */}
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
          <Button text={"Explore dashboard"}
           properties={"text-black bg-white"}
           href="#explore-dashboard"
           />
        </Content>
      </section>

      {/* Track */}

<section id="explore-dashboard">
      <Wrapper properties={"min-h-screen bg-light-purple flex items-center"}>
        <Content contentProperties={"text-black"}>
          <h1 className="text-center font-bold text-6xl ">
            Mood Tracker Summary
          </h1>
          <p className="text-center font-normal text-4xl">
            Effortlessly log your daily feelings, identify triggers, and monitor
            your emotional trends. The Mood Tracker helps you understand your
            mental health better.
          </p>
          <Button
            text={"Update now"}
            bgColor={"bg-greyish-purple"}
            textColor={"text-white"}
            to={"/moodtracker"}
            properties={"text-white bg-greyish-purple"}
          />
        </Content>
      </Wrapper>

      {/* Dashboards Cards */}
      <Wrapper properties={"h-screen flex items-center"}>
        <div className="lmd:flex-row m-auto  flex justify-center gap-5 flex-col">
          <Card
            contentHead={"User Notes"}
            contentDesc={
              " You are not your thoughts; you are the awareness behind them."
            }
            btnText={"Open Now"}
            to={"/Journal/all-notes"}
          />

          <Card
            contentHead={"Help Seek"}
            contentDesc={
              "Empowers you to stay prepared and take control when it matters most"
            }
            btnText={"Open Now"}
            to="/support/help-page"
          />
        </div>
      </Wrapper>

      {/* Journal */}
      <Wrapper properties={"min-h-screen bg-light-purple flex items-center"}>
        <Content contentProperties={"text-black"}>
          <h1 className="text-center font-bold text-6xl ">Journal</h1>
          <p className="text-center font-normal text-4xl ">
            Journaling helps you process emotions, reflect on your day, and
            track your personal growth over time.
          </p>
          <Button
            to={"/journal"}
            text={"Open now"}
        
            properties={"text-white bg-greyish-purple"}
          />
        </Content>
      </Wrapper>
      </section>
      {loading && <LoadingAnim />}
    </>
  );
}
