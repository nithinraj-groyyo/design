import React, { useEffect, useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Button } from "@mui/material";
import { motion } from "framer-motion";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { fetchAllServices } from "../../api/servicesApi";
import { setError, setLoading } from "../../redux/shoppingBagSlice";
import { Service } from "../../types/service";
import DOMPurify from "dompurify";
import { useNavigate } from "react-router-dom";
import { useFetchAllServicesQuery } from "../../rtk-query/serviceApiSlice";
import SubscriptionPage from "./SubscriptionPage";
import SubscriptionPriceDetails from "./SubscriptionPriceDetails";

export enum ServiceButtons {
  ExploreDesigns = "Explore our Designs",
  BookAppointment = "Book an appointment",
  ContactUs = "Contact us"
}

const carouselDetails = [
  {
    title: "Exclusive Apparel Designs",
    description: "Discover ready-made, trend-driven apparel for your brand.",
    buttonName: ServiceButtons.ExploreDesigns,
  },
  {
    title: "Customization Services",
    description: "Create apparel tailored to your brand’s unique vision.",
    buttonName: ServiceButtons.BookAppointment,
  },
  {
    title: "Design Consultation",
    description: "Expert guidance to perfect your design ideas.",
    buttonName: ServiceButtons.ContactUs,
  },
];

const ServicePage = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [currentService, setCurrentService] = useState(0);
  const navigate = useNavigate();
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);


  const { data: services = [] } = useFetchAllServicesQuery();

  const handleIndex = (val: number) => {
    setCurrentService((currentService + val + 3) % 3);
  };

  const handleToggleDetails = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      handleIndex(1);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [currentService]);

  const navigateButtons = (buttonName: ServiceButtons) => {
    switch (buttonName) {
      case ServiceButtons.ExploreDesigns:
        return "/";
      case ServiceButtons.BookAppointment:
      case ServiceButtons.ContactUs:
        return "/contact-us?tab=contact-us";
      default:
        return null;
    }
  };

  const handleButtonClick = (buttonName: ServiceButtons) => {
    const path = navigateButtons(buttonName);
    if (path) {
      navigate(path);
    }
  };

  return (
    <BasicLayout>
      <motion.div
        className="relative w-full min-h-[70vh] mt-[4rem] sm:mt-[6rem] lg:mt-[10rem] flex justify-center items-center"
        style={{
          backgroundImage: "url(/images/landingPages/floralPattern4.png)",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          fontFamily: "Poppins",
        }}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="p-4 sm:p-6 lg:p-8 flex items-center justify-between rounded-xl w-full max-w-[90vw] lg:max-w-[50vw]"
          style={{
            position: "relative",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="flex items-center cursor-pointer absolute left-5 sm:left-10 lg:left-20"
            onClick={() => handleIndex(-1)}
          >
            <KeyboardArrowLeftIcon />
          </div>

          <motion.div
            className="flex flex-col gap-4 sm:gap-6 lg:gap-8 bg-white p-4 sm:p-6 lg:p-8 rounded w-full text-center min-w-[80vw] sm:min-w-[50vw] lg:min-w-[30vw] shadow-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              {carouselDetails[currentService]?.title}
            </div>
            <div
              className="text-xs sm:text-sm p-2"
              style={{ fontFamily: "Poppins" }}
            >
              {carouselDetails[currentService]?.description}
            </div>
            <div>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "black",
                  backgroundColor: "black",
                  padding: "0.75rem",
                  minWidth: "12rem",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderColor: "black",
                    color: "black",
                  },
                }}
                onClick={() => handleButtonClick(carouselDetails[currentService]?.buttonName)}
              >
                {carouselDetails[currentService]?.buttonName}
              </Button>
            </div>
          </motion.div>

          <div
            className="flex items-center cursor-pointer absolute right-5 sm:right-10 lg:right-20"
            onClick={() => handleIndex(1)}
          >
            <KeyboardArrowRightIcon />
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
            {carouselDetails.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${index === currentService ? "bg-black" : "bg-gray-400"
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
        className="px-4 sm:px-16 lg:px-32 py-8 flex flex-col gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="text-center font-semibold text-2xl sm:text-3xl lg:text-4xl">
          Services
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 lg:gap-16 justify-center">
          {services.map((serviceDetail, index) => {
            const sanitizedDescription = DOMPurify.sanitize(serviceDetail?.description);
            return (
              <motion.div
                key={index}
                className="px-6 py-4 sm:px-8 sm:py-8 flex flex-col gap-8 shadow-lg rounded-lg border-none bg-[#f5f5f5] bg-opacity-40 w-full h-fit"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
              >
                <div className="flex flex-col gap-6 justify-between">
                  <div className="flex justify-center items-center">
                    <img
                      src={serviceDetail?.imagePath}
                      alt="Thumbnail"
                      className="h-40 sm:h-48 w-full sm:w-64 object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex-2">
                    <div className="font-bold text-md sm:text-lg text-center">
                      {serviceDetail?.title}
                    </div>
                    <div
                      className="whitespace-normal text-justify my-2 text-xs sm:text-sm"
                      dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                    />
                    {expandedCard === index &&
                      serviceDetail?.featuresList?.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex flex-col gap-2">
                          <li className="text-xs">
                            <span className="font-semibold">{feature?.featureName}</span>
                            <span className="ml-2">{feature?.featureDetail}</span>
                          </li>
                        </div>
                      ))}
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
                      onClick={() => handleButtonClick(serviceDetail?.buttonLabel as ServiceButtons)}
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

      <section className="w-screen h-auto sm:h-[100vh] flex flex-col sm:flex-row bg-gradient-to-b from-white via-gray-100 to-white">
  {/* Left Section */}
  <div className="w-full sm:w-1/3 flex flex-col justify-center items-center py-8 sm:py-12 px-6 sm:px-10 bg-gradient-to-br from-white to-gray-100 shadow-md rounded-b-lg sm:rounded-r-none sm:rounded-l-lg">
    <div className="flex flex-col items-center bg-white shadow-xl rounded-lg p-6 sm:p-10 max-w-lg">
      <h2 className="text-gray-800 text-2xl sm:text-4xl font-extrabold mb-6 text-center">
        Why Go Premium?
      </h2>
      <ul className="text-gray-700 text-base sm:text-lg space-y-4 list-disc pl-8">
        <li>
          <span className="font-medium">24*7 Customer Support</span>
        </li>
        <li>
          <span className="font-medium">Access to Premium Designs</span>
        </li>
        <li>
          <span className="font-medium">High-Resolution Downloads</span>
        </li>
        <li>
          <span className="font-medium">Interactive Catalogues</span>
        </li>
      </ul>
      <div className="mt-8">
        <img
          src="/images/DummyImages/contact.png"
          alt="Illustration"
          className="object-contain w-[12rem] h-[12rem] sm:w-[16rem] sm:h-[16rem] lg:w-[20rem] lg:h-[20rem] mx-auto"
        />
      </div>
    </div>
  </div>

  {/* Right Section */}
  <div className="w-full sm:w-2/3 flex justify-center items-start bg-white mt-8 sm:mt-0 p-6 sm:p-12 rounded-t-lg sm:rounded-l-none sm:rounded-r-lg shadow-md">
    <div className="w-full px-4 sm:px-8 lg:px-12">
      <SubscriptionPriceDetails />
    </div>
  </div>
</section>



    </BasicLayout>
  );
};

export default ServicePage;


