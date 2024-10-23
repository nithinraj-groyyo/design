import { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TeamPageModal from "./TeamPageModal";
import { useFetchAllTeamMembersQuery } from "../../rtk-query/teamsApiSlice";


const TeamsPage = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);

  const handleOpenDetailedView = (id: number) => {
    setSelectedMember(id);
  };


  const { data: teamMembers, refetch: refetchTeamMembers } =
    useFetchAllTeamMembersQuery();


  const handleCloseModal = () => {
    setSelectedMember(null);
  };

  const selectedMemberDetails = teamMembers?.data?.find(
    (member:any) => member.id === selectedMember
  );

  return (
    <BasicLayout>
      <div
        className="w-full px-6 py-4 flex flex-col gap-4 mt-[5rem] lg:mt-[10rem] relative z-10"
        style={{
          // background: "linear-gradient(135deg, #FFF 0%, #F4K6F7 100%)",
          backgroundImage: "linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div
            className="absolute -top-24 -right-12 w-96 h-96 bg-white opacity-20 rounded-full"
            style={{ filter: "blur(150px)" }}
          />
          <div
            className="absolute -bottom-32 -left-16 w-80 h-80 bg-purple-500 opacity-20 rounded-full"
            style={{ filter: "blur(120px)" }}
          />
        </div>
        
        <div className="text-center z-10 !text-black">
          <h1 className="text-5xl font-bold ">Meet Our Team</h1>
          <p className="text-lg  mt-4">
            Our dedicated professionals are here to help.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-12 z-10">
          {teamMembers?.data?.map((member: any) => (
            <div
              key={member.id}
              className="rounded-2xl shadow-lg p-6 bg-white hover:shadow-2xl transition-shadow duration-300 transform "
            >
              <div className="relative group">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-[320px] object-cover rounded-full transform transition-transform duration-300"
                />
              </div>
              <div className="text-center mt-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {member.name}
                </h2>
                <p className="text-base text-gray-500">{member.role}</p>
                <div className="mt-4">
                  <button
                    onClick={() => handleOpenDetailedView(member.id!)}
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
            width: {
              xs: "100%", 
              sm: "100%", 
              md: "50%",  
            },
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
