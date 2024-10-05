"use client";
import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

type Props = {};

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user?.name} profile - Gyanoda`}
          description="Gyanoda: Your ultimate platform for All-India competitive exam preparation. Access comprehensive past years' solutions with detailed video explanations, attend expert-led doubt clearing classes, and practice with realistic mock tests. Elevate your exam performance with our innovative learning tools and personalized guidance for various competitive exams across India."
         keywords="Competitive Exams, Video Solutions, WBJEE, NEET, UPSC, SSC, JEE Main, JEE Advanced, All India Competitive Exams, Previous Years Questions, PYQs, Past 10 Years Solved Papers, Video Solutions, Gyanoda App, Exam Preparation, Online Coaching, Mock Tests, Study Materials, Doubt Clearing, WBJEE Preparation, NEET Preparation, JEE Preparation, UPSC Preparation, SSC Preparation, Engineering Entrance Exams, Medical Entrance Exams, Civil Services Exams, Government Job Exams, Exam Strategies, Test Series, Live Classes, Expert Faculty, Personalized Learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default Page;
