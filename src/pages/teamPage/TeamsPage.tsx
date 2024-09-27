import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TeamPageModal from "./TeamPageModal";

const memberDetails = [
  {
    id: 11,
    name: "Emma Robinson",
    img: "/images/landingPages/landingPage_3_2.png",
    role: "Consulting Director",
    description:
      "Emma Robinson: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida nisi at sem iaculis, sed lobortis nisi viverra. Aliquam at elementum lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis a finibus nibh. Sed sapien tortor, consequat sed mi sit amet, tincidunt fermentum nunc. Fusce eu nunc sed lacus tincidunt condimentum. Morbi tortor mauris, rhoncus imperdiet mattis non, mattis a tortor. In ut lorem ac enim ullamcorper molestie sed at justo. Vivamus consectetur feugiat nibh in vestibulum. Pellentesque quis imperdiet velit. In sed neque vitae turpis sagittis dapibus quis euismod felis. Donec congue elit nec tortor lobortis vestibulum. Sed ut egestas ipsum. Nam pulvinar id felis vitae fermentum",
    linkedin: "https://linkedin.com/in/emma-robinson",
  },
  {
    id: 12,
    name: "James Smith",
    img: "/images/landingPages/landingPage_1_2.png",
    role: "Senior Consultant",
    description:
      "James Smith: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer gravida nisi at sem iaculis, sed lobortis nisi viverra. Aliquam at elementum lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis a finibus nibh. Sed sapien tortor, consequat sed mi sit amet, tincidunt fermentum nunc. Fusce eu nunc sed lacus tincidunt condimentum. Morbi tortor mauris, rhoncus imperdiet mattis non, mattis a tortor. In ut lorem ac enim ullamcorper molestie sed at justo. Vivamus consectetur feugiat nibh in vestibulum. Pellentesque quis imperdiet velit. In sed neque vitae turpis sagittis dapibus quis euismod felis. Donec congue elit nec tortor lobortis vestibulum. Sed ut egestas ipsum. Nam pulvinar id felis vitae fermentum",
    linkedin: "https://linkedin.com/in/james-smith",
  },
];

const TeamsPage = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const handleOpenDetailedView = (id: number) => {
    setSelectedMember(id);
  };

  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const selectedMemberDetails = memberDetails.find(
    (member) => member.id === selectedMember
  );

  return (
    <BasicLayout>
      <div
        className="w-full px-6 py-16 flex flex-col gap-12 mt-[10rem]"
        style={{
          position: "relative",
          backgroundImage: "url('https://img.freepik.com/free-vector/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg')",
          backgroundSize: "cover", 
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute -top-24 -right-12 w-96 h-96 bg-blue-500 opacity-10 rounded-full"
            style={{ filter: "blur(100px)" }}
          />
          <div
            className="absolute -bottom-32 -left-16 w-80 h-80 bg-green-500 opacity-10 rounded-full"
            style={{ filter: "blur(100px)" }}
          />
        </div>

        <div className="text-center z-10">
          <h1 className="text-5xl font-bold text-gray-800">Meet Our Team</h1>
          <p className="text-lg text-gray-600 mt-4">
            Our dedicated professionals are here to help.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-12 z-10">
          {memberDetails.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl shadow-lg p-6 bg-white hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105"
              // style={{ width: "280px" }}
            >
              <div className="relative group">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-[320px] object-cover rounded-full transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-center mt-6">
                <h2 className="text-2xl font-semibold text-gray-800">{member.name}</h2>
                <p className="text-base text-gray-500">{member.role}</p>
                <div className="mt-4">
                  <button
                    onClick={() => handleOpenDetailedView(member.id)}
                    className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-300"
                  >
                    View Profile
                  </button>
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