import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { fetchAllServices } from "../../api/servicesApi";
import { setError, setLoading } from "../../redux/shoppingBagSlice";
import { Service } from "../../types/service";



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
    img: "/images/DummyImages/service1.png",
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
    img: "/images/DummyImages/service2.png",
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
    img: "/images/DummyImages/service3.png",
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

const ServicePage = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null); // Track which card is expanded
  const [currentService, setCurrentService] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const handleIndex = (val: number) => {
    setCurrentService((currentService + val + 3) % 3);
  };

  const handleToggleDetails = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const loadServices = async () => {
    setLoading(true);
    try {
        const data: any = await fetchAllServices();
        setServices(data?.data);
    } catch (error) {
        setError('Failed to fetch services');
    } finally {
        setLoading(false);
    }
};
useEffect(() => {
  loadServices();
}, []);

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
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentService ? "bg-black" : "bg-gray-400"
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
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="text-center font-semibold text-4xl">Services</div>

        <div className="flex flex-row gap-16 flex-wrap justify-center">
          {services.map((serviceDetail, index) => {
            return (
              <motion.div
                key={index}
                className="px-10 py-8 flex flex-col gap-16 shadow-lg rounded-lg border-none bg-[#f5f5f5] bg-opacity-40 max-w-xs h-fit"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <div className="flex flex-col gap-6 justify-between">
                  <div className="flex justify-center items-center">
                    <img
                      src={serviceDetail?.imagePath}
                      alt="Thumbnail"
                      className="h-48 w-64 object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex-2">
                    <div className="font-bold text-lg text-center">
                      {serviceDetail?.title}
                    </div>
                    <div className="whitespace-normal text-justify my-4 text-xs min-h-20">
                      {serviceDetail?.description}
                    </div>

                    {expandedCard===index && serviceDetail?.featuresList?.map((feature,featureIndex)=>{
                      return <>
                        <div className="flex flex-col gap-2">
                          <li className="text-xs">
                            <span className="font-semibold">{feature?.featureName}</span>
                            <span className="ml-2">{feature?.featureDetail}</span>
                          </li>
                            </div>
                      </>
                    })}

                    {/* {expandedCard === index &&
                      serviceDetail?.featuresList?.map(
                        (featureList, i) => (
                          <div key={i} className="flex flex-col gap-2">
                            {Object.entries(featureList).map(
                              ([key, value]) => (
                                <li key={key} className="text-xs">
                                  <span className="font-semibold">{key}:</span>
                                  <span className="ml-2">{value}</span>
                                </li>
                              )
                            )}
                          </div>
                        )
                      )} */}

                    <Button
                      onClick={() => handleToggleDetails(index)}
                      className="cursor-pointer"
                      sx={{
                        fontSize: "0.725rem",
                        borderRadius: "0.5rem",
                      }}
                    >
                      {expandedCard === index ? "View Less" : "View More"}
                    </Button>
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
                    >
                      {serviceDetail?.buttonLabel}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </BasicLayout>
  );
};

export default ServicePage;
