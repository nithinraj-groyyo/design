import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Button } from "@mui/material";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const ServicePage = () => {
  const carouselDetails = [
    {
      title: "Exclusive Apparel Designs",
      description: "Discover ready-made, trend-driven apparel for your brand.",
      buttonName: "Explore our Designs",
    },
    {
      title: "Customization Services",
      description: "Create apparel tailored to your brand’s unique vision.",
      buttonName: "Book an appointment",
    },
    {
      title: " Design Consultation",
      description:
        "Expert guidance to perfect your design ideas.",
      buttonName: "Contact us",
    },
  ];
  const [currentService, setCurrentService] = useState(0);

  const handleIndex = (val: number) => {
    setCurrentService((currentService + val + 3) % 3);
  };

  return (
    <BasicLayout>
      <div
        className="w-screen min-h-[70vh] mt-[10rem]"
        style={{
          backgroundImage: "url(/images/landingPages/floralPattern1.jpg)",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          position: "relative",
          fontFamily: "Poppins",
        }}
      >
        <div
          className="p-8 flex items-center justify-between rounded-xl min-w-[50vw] "
          style={{
            height: "auto",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="flex p-4 items-center cursor-pointer"
            onClick={() => handleIndex(-1)}
          >
            <ArrowCircleLeftIcon />
          </div>
          <div className="flex flex-col gap-8 bg-white p-8 rounded w-full min-w-[30vw] min-h-[32.5vh] text-center">
            <div className="text-4xl font-bold whitespace-nowrap">
              {carouselDetails[currentService]?.title}
            </div>
            <div>{carouselDetails[currentService]?.description}</div>
            
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
                  {carouselDetails[currentService]?.buttonName}
                </Button>
              </div>
            
          </div>
          <div
            className="flex p-4 items-center cursor-pointer"
            onClick={() => handleIndex(1)}
          >
            <ArrowCircleRightIcon />
          </div>
        </div>
      </div>

      <div
        className="px-32 py-8   flex flex-col gap-8"
        style={{ fontFamily: "Poppins" }}
      >
        <div className="text-center font-semibold text-lg">Services</div>

        <div className=" px-32 py-8 flex flex-col gap-16 shadow-md rounded-lg border border-none bg-[#ffc2ab] bg-opacity-40">
          <div
            className="text-center font-bold tracking-[0.25em] text-5xl"
            style={{ fontFamily: "Pompiere" }}
          >
            Exclusive Apparel Designs
          </div>
          <div className="flex gap-16">
            <div>
              <img
                src={"/images/landingPages/landingPage_2_2.png"}
                alt="Thumbnail"
                className="w-[20rem] h-[15rem] object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col gap-6">
              <div>
                Explore our collection of unique, pre-designed apparel. Each
                design is carefully crafted by our in-house designers, tailored
                to the latest trends and market demands.
              </div>
              <div className="flex flex-col gap-2">
                <li>
                  <span className="font-semibold">Industry Expertise:</span>{" "}
                  Leverage our experience in the apparel sector to get design
                  recommendations tailored to your target market.
                </li>
                <li>
                  <span className="font-semibold">Trend Forecasting:</span> Stay
                  ahead with our trend analysis and market insights.
                </li>
              </div>
              <div className="text-center">
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    borderColor: "black",
                    marginTop: "1rem",
                    minWidth: "15rem",
                    padding: "1rem",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                      borderColor: "black",
                    },
                  }}
                >
                  Explore our Designs
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 ">
          <div className=" w-full p-16 flex flex-col gap-8 shadow-md rounded-lg border border-none bg-[#ffc2ab] bg-opacity-40">
            <div className="flex justify-center">
              <img
                src={"/images/auth/login_img_1.jpeg"}
                alt="Thumbnail"
                className="w-[10rem] h-[10rem] object-cover rounded-xl"
              />
            </div>
            <div
              className="text-center font-bold tracking-[0.25em] text-3xl"
              style={{ fontFamily: "Pompiere" }}
            >
              Customization Services
            </div>
            <div className="flex flex-col gap-4">
              <div>
                We offer customization services to tailor designs to your
                specific needs.
              </div>
              <div className="flex flex-col gap-2">
                <li>
                  <span className="font-semibold">Tailored for You:</span>{" "}
                  Modify colors, patterns, or fabrics to match your brand.
                </li>
                <li>
                  <span className="font-semibold">Bespoke Creations:</span> Work
                  with us to develop a design from scratch that aligns with your
                  vision.
                </li>
              </div>
            </div>
            <div className="text-center">
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
                Book an appointment
              </Button>
            </div>
          </div>

          <div className="shadow-md w-full  p-16 flex flex-col gap-8 rounded-lg border border-none bg-[#ffc2ab] bg-opacity-40">
            <div className="flex justify-center">
              <img
                src={"/images/auth/login_img_1.jpeg"}
                alt="Thumbnail"
                className="w-[10rem] h-[10rem] object-cover rounded-xl"
              />
            </div>
            <div
              className="text-center font-bold tracking-[0.25em] text-3xl"
              style={{ fontFamily: "Pompiere" }}
            >
              Design Consultation
            </div>
            <div className="flex flex-col gap-4">
              <div>
                Our expert team offers personalized consultation services to
                guide you through the process.
              </div>
              <div className="flex flex-col gap-2">
                <li>
                  <span className="font-semibold">Industry Expertise:</span>{" "}
                  Leverage our experience in the apparel sector to get design
                  recommendations tailored to your market.
                </li>
                <li>
                  <span className="font-semibold">Trend Forecasting:</span> Stay
                  ahead with our trend analysis and insights.
                </li>
              </div>
              <div className="text-center">
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
                Contact us
              </Button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default ServicePage;
