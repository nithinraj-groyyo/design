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

const ServicePage = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
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
      setError("Failed to fetch services");
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
      {/* Carousel Section */}
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
          {/* Left Arrow */}
          <div
            className="flex items-center cursor-pointer absolute left-5 sm:left-10 lg:left-20"
            onClick={() => handleIndex(-1)}
          >
            <KeyboardArrowLeftIcon />
          </div>

          {/* Carousel Content */}
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
              >
                {carouselDetails[currentService]?.buttonName}
              </Button>
            </div>
          </motion.div>

          {/* Right Arrow */}
          <div
            className="flex items-center cursor-pointer absolute right-5 sm:right-10 lg:right-20"
            onClick={() => handleIndex(1)}
          >
            <KeyboardArrowRightIcon />
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-2">
            {carouselDetails.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${
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

      {/* Services Section */}
      {/* Services Section */}
<motion.div
  className="px-4 sm:px-16 lg:px-32 py-8 flex flex-col gap-8"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2 }}
>
  <div className="text-center font-semibold text-2xl sm:text-3xl lg:text-4xl">
    Services
  </div>

  {/* Grid Layout for Services */}
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


          {/* Subscription */}
      <section className="w-screen h-auto sm:h-[100vh] flex flex-col sm:flex-row">
        {/* Left Part */}
        <div className="bg-[#B7A99A] w-full sm:w-1/2 flex flex-col justify-center items-center py-8 sm:py-0">
          <div className="flex flex-col items-center">
            <img
              src="/images/DummyImages/contact.png"
              alt="Illustration"
              className="object-cover w-[18rem] h-[18rem] sm:w-[24rem] sm:h-[24rem] mb-4"
            />
            <h2 className="text-[#F3EDE5] text-3xl sm:text-4xl font-bold">
              Subscription
            </h2>
          </div>
        </div>

        {/* Right Part with layered boxes */}
        <div className="flex justify-center items-center w-full sm:w-1/2 relative py-8 sm:py-0 my-32 sm:my-0">
          {/* First Background Layer */}
          <div className="bg-gradient-to-br from-[#CEC1B2] to-[#D8C9BB] w-[20rem] sm:w-[26rem] h-[13rem] sm:h-[15rem] flex justify-center items-center rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-out">
            {/* Second Layer */}
            <div className="bg-gradient-to-br from-[#B9A99A] to-[#CAB7A9] w-[18rem] sm:w-[23rem] h-[18rem] sm:h-[20rem] flex justify-center items-center rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-out">
              {/* Main Card */}
              <div className="bg-gradient-to-br from-[#978776] to-[#B19C89] w-[15rem] sm:w-[20rem] h-[22rem] sm:h-[25rem] rounded-3xl shadow-2xl relative z-20 transform hover:scale-105 transition-transform duration-300 ease-out">
                {/* Bear Icon */}
                <div className="absolute -top-8 sm:-top-12 left-[50%] transform -translate-x-[50%]">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#B9A99A] rounded-full flex justify-center items-center shadow-md">
                    <span className="text-3xl sm:text-4xl">💎</span>
                  </div>
                </div>

                {/* Design + Label */}
                <div className="text-center mt-12">
                  <span className="inline-block bg-[#60594D] text-white text-xs px-4 sm:px-4 py-1 rounded-full shadow-lg">
                    Design +
                  </span>
                </div>

                {/* Price */}
                <div className="text-center mt-4 sm:mt-6 flex justify-center items-baseline">
                  <h3 className="text-[#F3EDE5] text-5xl sm:text-6xl font-bold drop-shadow-lg">
                    $10
                  </h3>
                  <span className="text-[#F3EDE5] text-lg ml-1 drop-shadow-md">
                    /MO
                  </span>
                </div>

                {/* Features List */}
                <div className="text-[#F3EDE5] text-center mt-6 sm:mt-8 text-opacity-90 space-y-2">
                  <p className="flex items-center justify-center">
                    <span className="mr-2">🔥</span> Best Price ever
                  </p>
                  <p className="flex items-center justify-center">
                    <span className="mr-2">✨</span> Best Design ever
                  </p>
                  <p className="flex items-center justify-center">
                    <span className="mr-2">🌟</span> 11:11 lorem ipsum
                  </p>
                </div>

                {/* Get Started Button */}
                <div className="flex justify-center mt-6 sm:mt-8">
                  <button className="bg-[#60594D] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BasicLayout>
  );
};

export default ServicePage;
