// "use client";
// import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
// import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
// import { useSearchParams } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import Loader from "../components/Loader/Loader";
// import Header from "../components/Header";
// import Heading from "../utils/Heading";
// import { styles } from "../styles/style";
// import CourseCard from "../components/Course/CourseCard";
// import Footer from "../components/Footer";

// type Props = {};

// const Page = (props: Props) => {
//   const searchParams = useSearchParams();
//   const search = searchParams?.get("title");
//   const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
//   const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
//   const [route, setRoute] = useState("Login");
//   const [open, setOpen] = useState(false);
//   const [courses, setcourses] = useState([]);
//   const [category, setCategory] = useState("All");

//   useEffect(() => {
//     if (category === "All") {
//       setcourses(data?.courses);
//     }
//     if (category !== "All") {
//       setcourses(
//         data?.courses.filter((item: any) => item.categories === category)
//       );
//     }
//     if (search) {
//       setcourses(
//         data?.courses.filter((item: any) =>
//           item.name.toLowerCase().includes(search.toLowerCase())
//         )
//       );
//     }
//   }, [data, category, search]);

//   const categories = categoriesData?.layout?.categories;

//   return (
//     <div>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>
//           <Header
//             route={route}
//             setRoute={setRoute}
//             open={open}
//             setOpen={setOpen}
//             activeItem={1}
//           />
//           <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
//             <Heading
//               title={"All courses - Gyanoda"}
//               description={"Gyanoda: Your ultimate platform for All-India competitive exam preparation. Access comprehensive past years' solutions with detailed video explanations, attend expert-led doubt clearing classes, and practice with realistic mock tests. Elevate your exam performance with our innovative learning tools and personalized guidance for various competitive exams across India.."}
//               keywords={
//                 "Competitive Exams, Video Solutions, WBJEE, NEET, UPSC, SSC, JEE Main, JEE Advanced, All India Competitive Exams, Previous Years Questions, PYQs, Past 10 Years Solved Papers, Video Solutions, Gyanoda App, Exam Preparation, Online Coaching, Mock Tests, Study Materials, Doubt Clearing, WBJEE Preparation, NEET Preparation, JEE Preparation, UPSC Preparation, SSC Preparation, Engineering Entrance Exams, Medical Entrance Exams, Civil Services Exams, Government Job Exams, Exam Strategies, Test Series, Live Classes, Expert Faculty, Personalized Learning"
//               }
//             />
//             <br />
//             <div className="w-full flex items-center flex-wrap">
//               <div
//                 className={`h-[35px] ${
//                   category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
//                 } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
//                 onClick={() => setCategory("All")}
//               >
//                 All
//               </div>
//               {categories &&
//                 categories.map((item: any, index: number) => (
//                   <div key={index}>
//                     <div
//                       className={`h-[35px] ${
//                         category === item.title
//                           ? "bg-[crimson]"
//                           : "bg-[#5050cb]"
//                       } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
//                       onClick={() => setCategory(item.title)}
//                     >
//                       {item.title}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//             {courses && courses.length === 0 && (
//               <p
//                 className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
//               >
//                 {search
//                   ? "No courses found!"
//                   : "No courses found in this category. Please try another one!"}
//               </p>
//             )}
//             <br />
//             <br />
//             <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
//               {courses &&
//                 courses.map((item: any, index: number) => (
//                   <CourseCard item={item} key={index} />
//                 ))}
//             </div>
//           </div>
//           <Footer />
//         </>
//       )}
//     </div>
//   );
// };

// export default Page;
"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";

const PageContent = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading, error } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (error) {
      // Handle API errors
      console.error("Error fetching courses:", error);
      return;
    }

    if (isLoading) return;

    if (category === "All") {
      setCourses(data?.courses || []);
    } else {
      setCourses(
        (data?.courses || []).filter((item: any) => item.categories === category)
      );
    }

    if (search) {
      setCourses(
        (data?.courses || []).filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search, isLoading, error]);

  const categories = categoriesData?.layout?.categories || [];

  return (
    <>
      <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}
      />
      <div className="w-[95%] 800px:w-[85%] m-auto min-h-[70vh]">
        <Heading
          title={"All courses - Gyanoda"}
          description={"Gyanoda: Your ultimate platform for All-India competitive exam preparation. Access comprehensive past years' solutions with detailed video explanations, attend expert-led doubt clearing classes, and practice with realistic mock tests. Elevate your exam performance with our innovative learning tools and personalized guidance for various competitive exams across India.."}
          keywords={
            "Competitive Exams, Video Solutions, WBJEE, NEET, UPSC, SSC, JEE Main, JEE Advanced, All India Competitive Exams, Previous Years Questions, PYQs, Past 10 Years Solved Papers, Video Solutions, Gyanoda App, Exam Preparation, Online Coaching, Mock Tests, Study Materials, Doubt Clearing, WBJEE Preparation, NEET Preparation, JEE Preparation, UPSC Preparation, SSC Preparation, Engineering Entrance Exams, Medical Entrance Exams, Civil Services Exams, Government Job Exams, Exam Strategies, Test Series, Live Classes, Expert Faculty, Personalized Learning"
          }
        />
        <br />
        <div className="w-full flex items-center flex-wrap">
          <div
            className={`h-[35px] ${category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
              } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
            onClick={() => setCategory("All")}
          >
            All
          </div>
          {categories.map((item: any, index: number) => (
            <div key={index}>
              <div
                className={`h-[35px] ${category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"
                  } m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
                onClick={() => setCategory(item.title)}
              >
                {item.title}
              </div>
            </div>
          ))}
        </div>
        {courses.length === 0 && (
          <p
            className={`${styles.label} justify-center min-h-[50vh] flex items-center`}
          >
            {search
              ? "No courses found!"
              : "Loading.... Please wait...!"}
          </p>
        )}
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {courses.map((item: any, index: number) => (
            <CourseCard item={item} key={index} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

const Page = () => (
  <Suspense fallback={<Loader />}>
    <PageContent />
  </Suspense>
);

export default Page;
