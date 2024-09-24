import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

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
      title: "Design Consultation",
      description: "Expert guidance to perfect your design ideas.",
      buttonName: "Contact us",
    },
  ];
  const serviceDetails = [
    {
      title: "Exclusive Apparel Designs",
      description:
        "Explore our collection of unique, pre-designed apparel. Each design is carefully crafted by our in-house designers, tailored to the latest trends and market demands.",
      descriptionListKeys: [
        {
          "Industry Expertise":
            " Leverage our experience in the apparel sector to get design recommendations tailored to your target market.",
        },

        {
          "Trend Forecasting":
            " Stay ahead with our trend analysis and market insights.",
        },
      ],
      buttonName: "Explore our Designs",
    },
    {
      title: "Customization Services",
      description:
        " We offer customization services to tailor designs to your specific needs.",
      descriptionListKeys: [
        {
          "Tailored for You":
            " Modify colors, patterns, or fabrics to match your brand.",
        },
        {
          "Bespoke Creations":
            " Work with us to develop a design from scratch that aligns with your vision.",
        },
      ],
      buttonName: "Book an appointment",
    },
    {
      title: "Design Consultation",
      description: "Expert guidance to perfect your design ideas.",
      descriptionListKeys: [
        {
          "Industry Expertise":
            " Leverage our experience in the apparel sector to get design recommendations tailored to your market.",
        },
        {
          "Trend Forecasting":
            " Stay ahead with our trend analysis and insights.",
        },
      ],
      buttonName: "Contact us",
    },
  ];
  const [currentService, setCurrentService] = useState(0);

  const handleIndex = (val: number) => {
    setCurrentService((currentService + val + 3) % 3);
  };

  // useEffect(() => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleIndex(1);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentService]);

  return (
    <BasicLayout>
      <motion.div
        className="w-screen min-h-[70vh] mt-[10rem]"
        style={{
          backgroundImage: "url(/images/landingPages/floralPattern4.png)",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          position: "relative",
          fontFamily: "Poppins",
        }}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="p-8 flex items-center justify-between rounded-xl w-full max-w-[50vw]"
          style={{
            height: "auto",
            position: "absolute",
            top: "25%",
            left: "25%",
            transform: "translate(-25%, -25%)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="flex items-center cursor-pointer absolute left-20"
            onClick={() => handleIndex(-1)}
          >
            <KeyboardArrowLeftIcon />
          </div>

          <motion.div
            className="flex flex-col gap-8 bg-white p-8 rounded w-full min-w-[30vw] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div
              className="text-4xl font-bold whitespace-nowrap"
              style={{ fontFamily: "'Space Mono', monospace" }}
            >
              {carouselDetails[currentService]?.title}
            </div>
            <div style={{ fontFamily: "Poppins" }}>
              {carouselDetails[currentService]?.description}
            </div>

            <div>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "black",
                  backgroundColor: "black",
                  padding: "1rem",
                  minWidth: "15rem",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderColor: "black",
                    color: "black",
                  },
                }}
              >
                {carouselDetails[currentService]?.buttonName}
              </Button>
            </div>
          </motion.div>

          <div
            className="flex items-center cursor-pointer absolute right-20"
            onClick={() => handleIndex(1)}
          >
            <KeyboardArrowRightIcon />
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
            {carouselDetails.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${index === currentService ? "bg-black" : "bg-gray-400"
                  }`}
                onClick={() => setCurrentService(index)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="px-32 py-8 flex flex-col gap-8"
        style={{ fontFamily: "Poppins" }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="text-center font-semibold text-lg">Services</div>

        {serviceDetails.map((serviceDetail, serviceDetailIndex) => {
          return (
            <>
              <motion.div
                className="px-20 2xl:mx-12 py-8 flex flex-col gap-16 shadow-lg rounded-lg border border-none bg-[#f5f5f5] bg-opacity-40"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              // viewport={{ once: true }}
              >
                <div className="flex gap-16">
                  <div className="flex-[1] flex justify-center items-center">
                    <img
                      src={"/images/landingPages/landingPage_2_2.png"}
                      alt="Thumbnail"
                      className="xl:w-64 xl:h-5w-64 2xl:w-64 2xl:h-64 object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex flex-[2] flex-col gap-6 justify-between">
                    <div className="flex-2">
                      <div
                        className="font-bold text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl "
                        style={{ fontFamily: "'Space Mono', monospace" }}
                      >
                        {serviceDetail?.title}
                      </div>
                      <div className="whitespace-normal text-justify my-4 text-xs xl:text-sm 2xl:text-[1rem] 3xl:text-xl">{serviceDetail?.description} </div>
                      
                      {serviceDetail?.descriptionListKeys?.map((descriptionListKey, index) => (
                        <div key={index} className="flex flex-col gap-2">
                          {Object.entries(descriptionListKey).map(([key, value]) => (
                            <li key={key} className="flex text-xs xl:text-sm 2xl:text-[1rem] 3xl:text-xl">
                              <span className="font-semibold whitespace-nowrap">{key}:</span>
                              <span className="ml-2">{value}</span>
                            </li>
                          ))}
                        </div>
                      ))}

                    </div>

                    <div className="text-center">
                      <Button
                        variant="outlined"
                        sx={{
                          color: "black",
                          borderColor: "black",
                          backgroundColor: "transparent",
                          minWidth: "12rem",
                          "&:hover": {
                            backgroundColor: "black",
                            color: "white",
                          },
                        }}
                        className="!text-xs xl:!text-sm 2xl:!text-[1rem] !p-[0.5rem] 2xl:!p-[1rem]"
                      >
                        {serviceDetail?.buttonName}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          );
        })}
      </motion.div>
    </BasicLayout>
  );
};

export default ServicePage;
