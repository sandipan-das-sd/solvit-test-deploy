"use client";
import React from "react";
import AdminSidebar from "../../../components/Admin/Sidebar/AdminSidebar";
import Heading from "../../../../app/utils/Heading";
import DashboardHeader from "../../../../app/components/Admin/DashboardHeader";
import EditCourse from "../../../components/Admin/Course/EditCourse";

type Props = {};

const page = ({ params }: any) => {
  const id = params?.id;

  return (
    <div>
      <Heading
        title="Gyanoda - Admin"
        description="Gyanoda: Your ultimate platform for All-India competitive exam preparation. Access comprehensive past years' solutions with detailed video explanations, attend expert-led doubt clearing classes, and practice with realistic mock tests. Elevate your exam performance with our innovative learning tools and personalized guidance for various competitive exams across India."
       keywords="Competitive Exams, Video Solutions, WBJEE, NEET, UPSC, SSC, JEE Main, JEE Advanced, All India Competitive Exams, Previous Years Questions, PYQs, Past 10 Years Solved Papers, Video Solutions, Gyanoda App, Exam Preparation, Online Coaching, Mock Tests, Study Materials, Doubt Clearing, WBJEE Preparation, NEET Preparation, JEE Preparation, UPSC Preparation, SSC Preparation, Engineering Entrance Exams, Medical Entrance Exams, Civil Services Exams, Government Job Exams, Exam Strategies, Test Series, Live Classes, Expert Faculty, Personalized Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
