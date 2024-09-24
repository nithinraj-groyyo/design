import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Button } from "@mui/material";
import TeamPageModal from "./TeamPageModal";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const TeamsPage = () => {
  const [showDetailMember1, setShowDetailMember1] = useState(false);
  const [showDetailMember2, setShowDetailMember2] = useState(false);

  const handleOpenDetailedView = (id: number) => {
    if (id === 1) {
      setShowDetailMember1(!showDetailMember1);
    } else if (id === 2) {
      setShowDetailMember2(!showDetailMember2);
    }
  };
  return (
    <BasicLayout>
      {/* <div
        className="w-screen min-h-[75vh] mt-[10rem]"
        style={{
          backgroundImage: "url(/images/landingPages/floralPattern3.png)",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          position: "relative",
          fontFamily: "Poppins",
        }}
      >
        <div className="flex justify-center p-6 px-8">
          <div className="p-8 flex gap-8 flex-col bg-white w-fit rounded-xl">

            <div
              className="text-center font-bold tracking-wide text-4xl "
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              Meet our Team
            </div>

            <div className="flex w-full gap-16 justify-center">

              <div
                className=" flex flex-col justify-center p-4 gap-8 rounded-xl shadow-lg bg-[#b6d4c4] min-w-[25rem] max-w-[25rem] items-center min-h-[25rem] cursor-pointer"
                onClick={() => handleOpenDetailedView(1)}
              >
                {!showDetailMember1 && (
                  <>
                    <div className="flex justify-center">
                      <img
                        src={"/images/landingPages/landingPage_2_2.png"}
                        alt="Thumbnail"
                        className="w-[20rem] h-[15rem] rounded-xl"
                      />
                    </div>
                    <div className="text-center flex flex-col gap-4">
                      <div className="text-3xl font-semibold">
                        Johnstone Nigorima
                      </div>
                      <div>Techincal Recruiter</div>
                    </div>
                  </>
                )}

                {showDetailMember1 && (
                  <>
                    <div className="text-3xl font-semibold">
                      Johnstone Nigorima
                    </div>
                    <div className="text-center">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,
                    </div>
                    <div>
                      <Button
                        variant="outlined"
                        sx={{
                          color: "black",
                          borderColor: "black",
                          padding: "1rem",
                          minWidth: "15rem",
                          "&:hover": {
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "black",
                          },
                        }}
                      >
                        Hello{" "}
                      </Button>
                    </div>
                  </>
                )}
              </div>

              <div
                className="flex flex-col justify-center p-4 gap-8 rounded-xl shadow-lg bg-[#b6d4c4] min-w-[25rem] max-w-[25rem] items-center cursor-pointer"
                onClick={() => handleOpenDetailedView(2)}
              >
                {!showDetailMember2 && (
                  <>
                    <div className="flex justify-center">
                      <img
                        src={"/images/landingPages/landingPage_2_2.png"}
                        alt="Thumbnail"
                        className="w-[20rem] h-[15rem] rounded-xl"
                      />
                    </div>
                    <div className="text-center flex flex-col gap-4">
                      <div className="text-3xl font-semibold">Jordan Keny</div>
                      <div>Non-Techincal Recruiter</div>
                    </div>
                  </>
                )}

                {showDetailMember2 && (
                  <>
                    <div className="text-3xl font-semibold">Jordan Keny</div>
                    <div className="text-center">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s,
                    </div>
                    <div>
                      <Button
                        variant="outlined"
                        sx={{
                          color: "black",
                          borderColor: "black",
                          padding: "1rem",
                          minWidth: "15rem",
                          "&:hover": {
                            backgroundColor: "black",
                            color: "white",
                            borderColor: "black",
                          },
                        }}
                      >
                        Hello{" "}
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-[#e6e6e6] w-screen mt-[10rem] p-8 flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="text-6xl font-semibold">Our Team</div>
          <div className="flex gap-8">
            <div className="text-3xl"><ArrowCircleLeftIcon fontSize='large'/></div>
            <div>Sourcing</div>
            <div className="text-3xl"><ArrowCircleRightIcon fontSize='large'/></div>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
          <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <div key={n} className="p-4 flex flex-col gap-4">
                <div className="min-w-[19rem]">
                  <img
                    src={"/images/landingPages/landingPage_2_2.png"}
                    alt="Thumbnail"
                    className="w-[19rem] h-[20rem] rounded-2xl"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-3xl font-semibold">Jordan Keny</div>
                  <div className="text-xl text-[gray]">CEO</div>
                </div>
                <div>View Profile</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TeamPageModal/>
    </BasicLayout>
  );
};

export default TeamsPage;
