"use client";
import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AdminSidebar from "../../components/Admin/Sidebar/AdminSidebar";
import EditFaq from "../../components/Admin/Customization/EditFaq";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Gyanoda - Admin"
          description="Gyanoda: Your ultimate platform for All-India competitive exam preparation. Access comprehensive past years' solutions with detailed video explanations, attend expert-led doubt clearing classes, and practice with realistic mock tests. Elevate your exam performance with our innovative learning tools and personalized guidance for various competitive exams across India."
          keywords="Competitve Exams Video Solutions,Competitve Exams,WBJEE,NEET,UPSC,SSC,JEE MAIN.JEE ADVANCED,All India Competitive Exams,Previous Years Questions ,Past 10 Years Solved Papers,Past 10 Years Solved Papaer Video Solution,PYQ'S,Gyanoda App,Engineering Entrance Exams, Medical Entrance Exams, Civil Services Exams, Government Job Exams, Exam Strategies, Test Series, Live Classes, Expert Faculty, Personalized Learning"
        />
        <div className="flex min-h-screen">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero />
            <EditFaq />
            <br />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default page;
