// "use client";
// import React, { FC, useEffect, useState } from "react";
// import Heading from "./utils/Heading";
// import Header from "./components/Header";
// import Hero from "./components/Route/Hero";
// import Courses from "./components/Route/Courses";
// import Reviews from "./components/Route/Reviews";
// import FAQ from "./components/FAQ/FAQ";
// import Footer from "./components/Footer";

// interface Props {}

// const Page: FC<Props> = (props) => {
//   const [open, setOpen] = useState(false);
//   const [activeItem, setActiveItem] = useState(0);
//   const [route, setRoute] = useState("Login");

//   return (
//     <>
//       <Heading
//         title="Gyanoda"
//         description="Gyanoda: Your ultimate platform for All-India competitive exam preparation. Access comprehensive past years' solutions with detailed video explanations, attend expert-led doubt clearing classes, and practice with realistic mock tests. Elevate your exam performance with our innovative learning tools and personalized guidance for various competitive exams across India."
//         keywords="WBJEE, NEET, Phy..."
//       />
//       <div>
//         <Header
//           open={open}
//           setOpen={setOpen}
//           activeItem={activeItem}
//           setRoute={setRoute}
//           route={route}
//         />
//         <Hero />
//         <Courses />
//         <Reviews />
//         <FAQ />
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default Page;
"use client";

import React, { FC, useState } from "react";
import Head from "next/head";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer";

interface Props {}

const Page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");

  return (
    <>
      <Head>
        <title>Gyanoda - Expert Exam Preparation for Competitve Exams Like  WBJEE, NEET, and More</title>
        <meta name="description" content="Gyanoda is a platform for students to learn and get help from teachers for WBJEE, NEET, and more exam preparations." />
        <meta name="keywords" content="WBJEE, NEET, Physics, Chemistry, Mathematics, Exam Preparation, Online Courses" />
        <link rel="canonical" href="https://gyanoda.com" />
      </Head>
      <div>
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
        <main>
          <Hero />
          <Courses />
          <Reviews />
          <FAQ />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Page;