import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TeamPageModal from "./TeamPageModal";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { IconButton } from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

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
  Design: [
    {
      id: 7,
      name: "Carlos Mendoza",
      role: "Chief Operating Officer",
      description:
        "Carlos Mendoza, our COO, oversees the day-to-day operations of the company...",
      linkedin: "https://linkedin.com/in/carlos-mendoza",
    },
    {
      id: 8,
      name: "Sophia Martinez",
      role: "UI/UX Designer",
      description:
        "Sophia Martinez is a talented UI/UX Designer with a passion for creating user-friendly interfaces...",
      linkedin: "https://linkedin.com/in/sophia-martinez",
    },
    {
      id: 9,
      name: "Liam Patel",
      role: "Graphic Designer",
      description:
        "Liam Patel specializes in visual communication and branding...",
      linkedin: "https://linkedin.com/in/liam-patel",
    },
    {
      id: 10,
      name: "Olivia Chen",
      role: "Content Strategist",
      description:
        "Olivia Chen is responsible for developing content strategies...",
      linkedin: "https://linkedin.com/in/olivia-chen",
    },
    {
      id: 21,
      name: "Kesss Chen",
      role: "Content sss",
      description:
        "Olivia Chen is responsible for developing content strategies...",
      linkedin: "https://linkedin.com/in/olivia-chen",
    },
  ],
  Sourcing: [
    {
      id: 1,
      name: "Devin Burns",
      role: "Chief Executive Officer",
      description:
        "Devin Burns, MBA, CPA, brings a wealth of experience as CEO...",
      linkedin: "https://linkedin.com/in/devin-burns",
    },
    {
      id: 2,
      name: "Jordan Keny",
      role: "Chief Technical Officer",
      description:
        "Jordan Keny is the CTO at our company, leading the technology team...",
      linkedin: "https://linkedin.com/in/jordan-keny",
    },
  ],
  Consulting: [
    {
      id: 11,
      name: "Emma Robinson",
      role: "Consulting Director",
      description:
        "Emma Robinson leads the consulting team, providing strategic guidance...",
      linkedin: "https://linkedin.com/in/emma-robinson",
    },
    {
      id: 12,
      name: "James Smith",
      role: "Senior Consultant",
      description:
        "James Smith specializes in operational efficiency and change management...",
      linkedin: "https://linkedin.com/in/james-smith",
    },
  ],
};

const TeamsPage = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [currentDepartment, setCurrentDepartment] =
    useState<string>("Sourcing");
  const [startCardMember, setStartCardMember] = useState(0);

  const departments = Object.keys(memberDetails);

  const handleNextDepartment = () => {
    const currentIndex = departments.indexOf(currentDepartment);
    const nextIndex = (currentIndex + 1) % departments.length;
    setCurrentDepartment(departments[nextIndex]);
    setStartCardMember(0);
  };

  const handlePreviousDepartment = () => {
    const currentIndex = departments.indexOf(currentDepartment);
    const prevIndex =
      (currentIndex - 1 + departments.length) % departments.length;
    setCurrentDepartment(departments[prevIndex]);
    setStartCardMember(0);
  };

  const handleOpenDetailedView = (id: number) => {
    setSelectedMember(id);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const handlePrevCard = () => {
    setStartCardMember(
      (startCardMember - 1 + selectedDepartmentMembers.length) %
        selectedDepartmentMembers.length
    );
  };

  const handleNextCard = () => {
    setStartCardMember(
      (startCardMember + 1) % selectedDepartmentMembers.length
    );
  };

  const selectedDepartmentMembers = memberDetails[currentDepartment];
  const selectedMemberDetails = selectedDepartmentMembers.find(
    (member) => member.id === selectedMember
  );

  return (
    <BasicLayout>
      <div
        className="bg-[#e6e6e6] w-screen  mt-[10rem] px-4 sm:px-6 py-8 flex flex-col gap-6 sm:gap-8 relative"
        style={{ fontFamily: "Poppins" }}
      >
        {/* Header Section */}
        <div className="flex mx-4 items-center z-20 relative">
          <div className="text-3xl sm:text-6xl font-semibold flex-1">Our Team</div>
          <div className="flex justify-evenly items-center">
            <IconButton
              className="text-2xl sm:text-3xl cursor-pointer"
              onClick={handlePreviousDepartment}
              style={{ zIndex: 10 }}
            >
              <ArrowCircleLeftIcon fontSize="large" />
            </IconButton>
            <div className="text-xl sm:text-3xl min-w-20 sm:min-w-36 text-center">
              {currentDepartment}
            </div>
            <IconButton
              className="text-2xl sm:text-3xl cursor-pointer"
              onClick={handleNextDepartment}
              style={{ zIndex: 10 }}
            >
              <ArrowCircleRightIcon fontSize="large" />
            </IconButton>
          </div>
        </div>

        {/* Team Member Cards Section */}
        <div
          className={`flex whitespace-nowrap overflow-x-hidden gap-4 relative ${
            selectedDepartmentMembers.length < totalCards
              ? "justify-center"
              : "justify-evenly"
          }`}
        >
          <button
            className={`absolute left-0 top-[50%] transform translate-y-[-50%] rounded-full p-1 z-20 bg-white ${
              startCardMember > 0
                ? "active:shadow-md bg-opacity-70 !bg-white"
                : "bg-opacity-100 !bg-[EBEBE4]"
            }`}
            onClick={handlePrevCard}
            disabled={startCardMember === 0}
          >
            <KeyboardArrowLeftIcon fontSize="large" />
          </button>

          <button
            className={`absolute right-0 top-[50%] transform translate-y-[-50%] rounded-full p-1 z-20 bg-white ${
              startCardMember + totalCards < selectedDepartmentMembers.length
                ? "active:shadow-md bg-opacity-70 !bg-white"
                : "bg-opacity-100 !bg-[#EBEBE4]"
            }`}
            onClick={handleNextCard}
            disabled={
              startCardMember + totalCards >= selectedDepartmentMembers.length
            }
          >
            <KeyboardArrowRightIcon fontSize="large" />
          </button>

          {selectedDepartmentMembers.length > 0 &&
            selectedDepartmentMembers
              .slice(startCardMember, startCardMember + totalCards)
              .map((member) => (
                <div
                  key={member.id}
                  className="p-4 flex flex-col gap-4 mt-2 bg-white rounded-2xl transform transition-transform duration-300 hover:-translate-y-1 z-10 min-w-[14rem] sm:min-w-[19rem]"
                >
                  <div className="min-w-[14rem] sm:min-w-[19rem]">
                    <img
                      src={"/images/landingPages/landingPage_1_2.png"}
                      alt="Thumbnail"
                      className="w-full h-[16rem] sm:h-[20rem] rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-xl sm:text-3xl font-semibold">
                      {member.name}
                    </div>
                    <div className="text-sm sm:text-xl text-[gray]">
                      {member.role}
                    </div>
                  </div>
                  <div>
                    <div
                      className="cursor-pointer w-fit flex items-center"
                      onClick={() => handleOpenDetailedView(member.id)}
                    >
                      <span>View Profile</span>
                      <span className="text-blue-500 transition-transform duration-300 transform hover:translate-x-1">
                        <ArrowRightAltIcon />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

      {/* Modal Drawer */}
      <SwipeableDrawer
        anchor="right"
        open={selectedMember !== null}
        onClose={handleCloseModal}
        onOpen={() => {}}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100%", // Full screen on mobile
            sm: { width: "50%" }, // Half screen on larger devices
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