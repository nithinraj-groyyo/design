import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ContactUsForm } from "./ContactUsForm";
import { Box, Tab, Tabs } from "@mui/material";
import BasicLayout from "../../layouts/BasicLayout";
import UserFAQ from "./UserFAQ";

export const ContactUs = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tabParam = queryParams.get("tab");

    if (tabParam === "faq") {
      setActiveTab(1);
    } else {
      setActiveTab(0); // Default to "Contact Us"
    }
  }, [location.search]);

  return (
    <BasicLayout>
      <div className="w-full p-6 sm:p-8 md:p-10 bg-gray-100 mt-20 flex flex-col md:flex-row justify-center items-stretch space-y-8 md:space-y-0 md:space-x-8">
        {/* Left Side */}
        <div className="md:w-[35%] bg-[#1E201E] p-6 md:p-8  text-xl font-bold flex flex-col items-center">
          <div className="mb-4 w-full">
            <img
              alt="Contact Us"
              src="/images/DummyImages/contact.png"
              className="rounded-md shadow-lg w-full h-auto"
            />
          </div>

          <div className="contact-section flex-1 text-white">
            <div className="flex flex-col gap-3 mb-6 text-xs sm:text-sm">
              <div className="font-light tracking-wide">Customer Service</div>
              <div className="flex flex-col gap-2">
                <div>Email Service:{" "}
                  <a href="mailto:design@groyyo.com" className="text-blue-300">
                    design@groyyo.com
                  </a>
                </div>
                <div>Mon - Fri: 24 hours</div>
                <div>Sat - Sun: 8 AM - 3 PM IST</div>
              </div>
              <div className="flex flex-col gap-2">
                <div>Phone Service: +91 8808988089</div>
                <div>Mon - Fri: 8 AM - 7 PM IST</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side with Tabs */}
        <div className="md:w-[65%] bg-white p-4 sm:p-6">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
              <Tab label="Contact Us" />
              <Tab label="FAQ" />
            </Tabs>
          </Box>

          <Box sx={{ paddingTop: 2 }}>
            {activeTab === 0 && <ContactUsForm />}
            {activeTab === 1 && <UserFAQ />}
          </Box>
        </div>
      </div>
    </BasicLayout>
  );
};
