"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Policy from "./Policy";

type Props = {};

const Page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");

  return (
    <div>
      <Heading
        title="Policy - Gyanoda"
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
      <Policy />
      <Footer />
    </div>
  );
};

export default Page;
