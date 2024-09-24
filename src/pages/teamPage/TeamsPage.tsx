import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TeamPageModal from "./TeamPageModal";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { Button, IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

// Define a type for the member details
interface Member {
  id: number;
  name: string;
  role: string;
  description: string;
  linkedin: string;
}

interface MemberDetails {
  [key: string]: Member[];
}

const totalCards = 4;


const memberDetails: MemberDetails = {
  Sourcing: [
    {
      id: 1,
      name: "Devin Burns",
      role: "Chief Executive Officer",
      description:
        "Devin Burns, MBA, CPA, brings a wealth of experience to Inspectorio as CEO. He has over two decades of leadership experience in scaling high-growth companies and has been pivotal in fostering a culture of innovation and excellence. Under his leadership, the company has achieved significant milestones and expanded its global reach.",
      linkedin: "https://linkedin.com/in/devin-burns",
    },
    {
      id: 2,
      name: "Jordan Keny",
      role: "Chief Technical Officer",
      description:
        "Jordan Keny is the CTO at our company, leading the technology team in developing cutting-edge solutions. With a strong background in software engineering and product development, he is passionate about leveraging technology to drive business success. Jordan is committed to continuous improvement and innovation in all aspects of the organization.",
      linkedin: "https://linkedin.com/in/jordan-keny",
    },
    
  ],
  Design: [
    {
      id: 6,
      name: "Emily Johnson",
      role: "Head of Product",
      description:
        "Emily Johnson is the Head of Product and has been responsible for overseeing the development and launch of innovative products. With a keen eye for market trends and user experience, she works closely with cross-functional teams to ensure that the product vision aligns with customer needs. Emily has a strong background in product management and design thinking.",
      linkedin: "https://linkedin.com/in/emily-johnson",
    },
    {
      id: 7,
      name: "Carlos Mendoza",
      role: "Chief Operating Officer",
      description:
        "Carlos Mendoza, our COO, oversees the day-to-day operations of the company. He has a proven track record in operational excellence and is responsible for optimizing business processes. Carlos is committed to fostering a collaborative environment and empowering teams to achieve their goals. He holds a degree in Business Administration and has over a decade of experience in operations management.",
      linkedin: "https://linkedin.com/in/carlos-mendoza",
    },
    {
      id: 8,
      name: "Sophia Martinez",
      role: "UI/UX Designer",
      description:
        "Sophia Martinez is a talented UI/UX Designer with a passion for creating user-friendly interfaces. She combines creativity with analytical skills to design intuitive user experiences. Sophia has worked on several high-profile projects, enhancing brand identity and engagement through innovative design solutions. Her work has been recognized in various design competitions.",
      linkedin: "https://linkedin.com/in/sophia-martinez",
    },
    {
      id: 9,
      name: "Liam Patel",
      role: "Graphic Designer",
      description:
        "Liam Patel specializes in visual communication and branding. He has extensive experience in creating engaging graphics for both digital and print media. Liam’s creativity and attention to detail help in effectively conveying the company's message to clients and stakeholders.",
      linkedin: "https://linkedin.com/in/liam-patel",
    },
    {
      id: 10,
      name: "Olivia Chen",
      role: "Content Strategist",
      description:
        "Olivia Chen is responsible for developing content strategies that align with the company's goals. She conducts market research to identify trends and works with the design team to create impactful content that resonates with audiences.",
      linkedin: "https://linkedin.com/in/olivia-chen",
    },
  ],
  Consulting: [
    {
      id: 11,
      name: "Emma Robinson",
      role: "Consulting Director",
      description:
        "Emma Robinson leads the consulting team, providing strategic guidance to clients on best practices and operational improvements. With a strong background in management consulting, she helps organizations navigate complex challenges and drive transformation.",
      linkedin: "https://linkedin.com/in/emma-robinson",
    },
    {
      id: 12,
      name: "James Smith",
      role: "Senior Consultant",
      description:
        "James Smith specializes in operational efficiency and change management. He works closely with clients to identify areas for improvement and implements strategies that lead to sustainable growth and success.",
      linkedin: "https://linkedin.com/in/james-smith",
    },
    {
      id: 13,
      name: "Ava Williams",
      role: "Business Analyst",
      description:
        "Ava Williams conducts thorough analyses of client operations and market trends. She provides actionable insights and recommendations that assist clients in achieving their business objectives and improving performance.",
      linkedin: "https://linkedin.com/in/ava-williams",
    },
    {
      id: 14,
      name: "Noah Davis",
      role: "Project Manager",
      description:
        "Noah Davis oversees consulting projects from inception to completion. He ensures that projects are delivered on time and within budget while maintaining high-quality standards. Noah's leadership skills and attention to detail are key to successful project outcomes.",
      linkedin: "https://linkedin.com/in/noah-davis",
    },
    {
      id: 15,
      name: "Isabella Johnson",
      role: "Change Management Specialist",
      description:
        "Isabella Johnson focuses on helping organizations manage change effectively. She designs and implements change management strategies that facilitate smooth transitions and minimize disruptions during periods of transformation.",
      linkedin: "https://linkedin.com/in/isabella-johnson",
    },
  ],
};


const TeamsPage = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [currentDepartment, setCurrentDepartment] =
    useState<string>("Sourcing");


  const departments = Object.keys(memberDetails);

  const handleNextDepartment = () => {
    const currentIndex = departments.indexOf(currentDepartment);
    const nextIndex = (currentIndex + 1) % departments.length;
    setCurrentDepartment(departments[nextIndex]);
  };

  const handlePreviousDepartment = () => {
    const currentIndex = departments.indexOf(currentDepartment);
    const prevIndex =
      (currentIndex - 1 + departments.length) % departments.length;
    setCurrentDepartment(departments[prevIndex]);
  };

  const handleOpenDetailedView = (id: number) => {
    setSelectedMember(id);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const selectedDepartmentMembers = memberDetails[currentDepartment];
  const selectedMemberDetails = selectedDepartmentMembers.find(
    (member) => member.id === selectedMember
  );

  return (
    <BasicLayout>
      <div className="bg-[#e6e6e6] w-screen mt-[10rem] p-8 flex flex-col gap-8">
        <div className="flex mx-4 items-center">
          <div className="text-6xl font-semibold flex-1">Our Team</div>
          <div className="flex justify-evenly items-center">
            <IconButton
              className="text-3xl cursor-pointer"
              onClick={handlePreviousDepartment}
            >
              <ArrowCircleLeftIcon fontSize="large" />
            </IconButton>
            <div className="text-3xl min-w-36 text-center">
              {currentDepartment}
            </div>
            <IconButton
              className="text-3xl cursor-pointer"
              onClick={handleNextDepartment}
            >
              <ArrowCircleRightIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
        <div className={`flex whitespace-nowrap relative ${selectedDepartmentMembers.length < totalCards ? "justify-center" : "justify-between"}`}>
          <button className="absolute left-0 top-[50%] transform translate-y-[-50%] bg-opacity-70 bg-white rounded-full p-1 active:shadow-md"><KeyboardArrowLeftIcon fontSize="large"/></button>
          <button className="absolute right-0 top-[50%] transform translate-y-[-50%] bg-opacity-70 bg-white rounded-full p-1 active:shadow-md"><KeyboardArrowRightIcon fontSize="large"/></button>

          {selectedDepartmentMembers.length > 0 &&
            selectedDepartmentMembers.slice(0,totalCards).map((member) => (
              <div key={member.id} className="p-4 flex flex-col gap-4">
                <div className="min-w-[19rem]">
                  <img
                    src={"/images/landingPages/landingPage_2_2.png"}
                    alt="Thumbnail"
                    className="w-[19rem] h-[20rem] rounded-2xl"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-3xl font-semibold">{member.name}</div>
                  <div className="text-xl text-[gray]">{member.role}</div>
                </div>
                <div>
                  <div
                    className="cursor-pointer w-fit flex items-center"
                    onClick={() => handleOpenDetailedView(member.id)}
                  >
                    <span className="">View Profile</span>
                    <span className="text-blue-500 transition-transform duration-300 transform hover:translate-x-1 ">
                      <ArrowRightAltIcon />
                    </span>
                  </div>
                </div>
              </div>
            ))}


        </div>
      </div>

      <SwipeableDrawer
        anchor="right"
        open={selectedMember !== null}
        onClose={handleCloseModal}
        onOpen={() => {}}
        sx={{
          "& .MuiDrawer-paper": {
            width: "50%",
            backgroundColor: "#232323",
          },
        }}
      >
        {selectedMemberDetails && (
          <TeamPageModal
            memberDetails={selectedMemberDetails}
            onClose={handleCloseModal}
          />
        )}
      </SwipeableDrawer>
    </BasicLayout>
  );
};

export default TeamsPage;
