import { styles } from "@/app/styles/style";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";

type Props = {};

export const reviews = [
  {
        name: "Arnab Chatterjee",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Student | Kolkata",
        comment:
          "Gyanoda's WBJEE preparation course is exceptional! The comprehensive study materials and video solutions helped me understand complex topics easily. The mock tests are particularly useful in assessing my progress. I feel much more confident about facing the WBJEE now. Highly recommended for all WBJEE aspirants in West Bengal!",
      },
      {
        name: "Priya Banerjee",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Parent | Howrah",
        comment:
          "As a parent, I'm extremely satisfied with Gyanoda's WBJEE course for my daughter. The doubt clearing sessions are invaluable, and the quality of teaching is outstanding. The affordable pricing makes it accessible for many families. It's a relief to find such a reliable resource for WBJEE preparation in our locality.",
      },
      {
        name: "Sourav Dutta",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        profession: "Student | Siliguri",
        comment:
          "Gyanoda's WBJEE course has been a game-changer for me. Living in Siliguri, I was worried about accessing quality coaching, but their online platform solved that problem. The previous years' question papers with detailed solutions are incredibly helpful. I've seen a significant improvement in my problem-solving skills since joining.",
      },
      {
        name: "Mitali Sen",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Student | Durgapur",
        comment:
          "I'm thoroughly impressed with Gyanoda's WBJEE preparation materials. The video explanations are clear and concise, making even the toughest concepts easy to grasp. As a student from Durgapur, I feel I now have access to the same quality of education as students in Kolkata.",
      },
      {
        name: "Ranjan Ghosh",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        profession: "Guardian | Asansol",
        comment:
          "Gyanoda's WBJEE course is a blessing for students in smaller towns like Asansol. The structured study plan and regular mock tests have helped my son stay on track with his preparation. The progress reports are very helpful for us to monitor his performance. Thank you, Gyanoda, for this excellent initiative!",
      },
      {
        name: "Sudipa Mukherjee",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        profession: "Student | Bardhaman",
        comment:
          "Joining Gyanoda for WBJEE preparation was the best decision I made. Their focus on practical problem-solving and exam strategies has boosted my confidence. The peer interaction in doubt-clearing sessions is an added bonus. I feel well-prepared for WBJEE and recommend Gyanoda to all my friends in Bardhaman and beyond.",
      },
];

const Reviews = (props: Props) => {
  return (
    <div className="w-[90%] 800px:w-[85%] m-auto">
      <div className="w-full 800px:flex items-center">
        <div className="800px:w-[50%] w-full">
          <Image
            src={require("../../../public/assets/business-img.png")}
            alt="business"
            width={700}
            height={700}
          />
        </div>
        <div className="800px:w-[50%] w-full">
          <h3 className={`${styles.title} 800px:!text-[40px]`}>
            Our Students Are <span className="text-gradient">Our Strength</span>{" "}
            <br /> See What They Say About Us
          </h3>
          <br />
          <p className={styles.label}>
            At Gyanoda, we take pride in helping students across West Bengal prepare effectively for WBJEE.
            Our comprehensive courses, expert guidance, and innovative learning methods have earned us the trust of
            students and parents alike. Here is what some of our valued learners have to say about their experience with Gyanoda. 
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
        {reviews &&
          reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
      </div>
    </div>
  );
};

export default Reviews;
// import { styles } from "@/app/styles/style";
// import Image from "next/image";
// import React from "react";
// import ReviewCard from "../Review/ReviewCard";

// type Props = {};

// export const reviews = [
//   {
//     name: "Arnab Chatterjee",
//     avatar: "https://randomuser.me/api/portraits/men/1.jpg",
//     profession: "Student | Kolkata",
//     comment:
//       "Gyanoda's WBJEE preparation course is exceptional! The comprehensive study materials and video solutions helped me understand complex topics easily. The mock tests are particularly useful in assessing my progress. I feel much more confident about facing the WBJEE now. Highly recommended for all WBJEE aspirants in West Bengal!",
//   },
//   {
//     name: "Priya Banerjee",
//     avatar: "https://randomuser.me/api/portraits/women/1.jpg",
//     profession: "Parent | Howrah",
//     comment:
//       "As a parent, I'm extremely satisfied with Gyanoda's WBJEE course for my daughter. The doubt clearing sessions are invaluable, and the quality of teaching is outstanding. The affordable pricing makes it accessible for many families. It's a relief to find such a reliable resource for WBJEE preparation in our locality.",
//   },
//   {
//     name: "Sourav Dutta",
//     avatar: "https://randomuser.me/api/portraits/men/2.jpg",
//     profession: "Student | Siliguri",
//     comment:
//       "Gyanoda's WBJEE course has been a game-changer for me. Living in Siliguri, I was worried about accessing quality coaching, but their online platform solved that problem. The previous years' question papers with detailed solutions are incredibly helpful. I've seen a significant improvement in my problem-solving skills since joining.",
//   },
//   {
//     name: "Mitali Sen",
//     avatar: "https://randomuser.me/api/portraits/women/2.jpg",
//     profession: "Student | Durgapur",
//     comment:
//       "I'm thoroughly impressed with Gyanoda's WBJEE preparation materials. The video explanations are clear and concise, making even the toughest concepts easy to grasp. As a student from Durgapur, I feel I now have access to the same quality of education as students in Kolkata.",
//   },
//   {
//     name: "Ranjan Ghosh",
//     avatar: "https://randomuser.me/api/portraits/men/3.jpg",
//     profession: "Guardian | Asansol",
//     comment:
//       "Gyanoda's WBJEE course is a blessing for students in smaller towns like Asansol. The structured study plan and regular mock tests have helped my son stay on track with his preparation. The progress reports are very helpful for us to monitor his performance. Thank you, Gyanoda, for this excellent initiative!",
//   },
//   {
//     name: "Sudipa Mukherjee",
//     avatar: "https://randomuser.me/api/portraits/women/4.jpg",
//     profession: "Student | Bardhaman",
//     comment:
//       "Joining Gyanoda for WBJEE preparation was the best decision I made. Their focus on practical problem-solving and exam strategies has boosted my confidence. The peer interaction in doubt-clearing sessions is an added bonus. I feel well-prepared for WBJEE and recommend Gyanoda to all my friends in Bardhaman and beyond.",
//   },
// ];

// const Reviews = (props: Props) => {
//   return (
//     <div className="w-[90%] 800px:w-[85%] m-auto">
//       <div className="w-full 800px:flex items-center">
//         <div className="800px:w-[50%] w-full">
//           <Image
//             src={require("../../../public/assets/business-img.png")}
//             alt="business"
//             width={700}
//             height={700}
//           />
//         </div>
//         <div className="800px:w-[50%] w-full">
//           <h3 className={`${styles.title} 800px:!text-[40px]`}>
//             Our Students Are <span className="text-gradient">Our Strength</span>{" "}
//             <br /> See What They Say About Us
//           </h3>
//           <br />
//           <p className={styles.label}>
//             At Gyanoda, we take pride in helping students across West Bengal prepare effectively for WBJEE. 
//             Our comprehensive courses, expert guidance, and innovative learning methods have earned us the trust of 
//             students and parents alike. Here is what some of our valued learners have to say about their experience with Gyanoda.
//           </p>
//         </div>
//         <br />
//         <br />
//       </div>
//       <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]">
//         {reviews &&
//           reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
//       </div>
//     </div>
//   );
// };

// export default Reviews;