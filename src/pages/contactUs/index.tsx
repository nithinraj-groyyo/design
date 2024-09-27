import BasicLayout from "../../layouts/BasicLayout";
import React from "react";
import ContactUsForm from "./ContactUsForm";
import UserFAQ from "./UserFAQ";

export const ContactUs = () => {
  return (
    <BasicLayout>
      <div className="w-full p-10 bg-gray-100 mt-[10rem] flex flex-col md:flex-row justify-cente ">

        <div className="md:w-[35%] bg-[#1E201E] p-8 text-center text-xl font-bold flex flex-col items-center">
        {/* <div className="text-3xl mb-8 tracking-[0.145em] text-white">Contact Us</div> */}

          <div className="mb-4">
            <img
              alt="Contact Us"
              src="/images/DummyImages/contact.png"
              className="rounded-md shadow-lg w-full h-auto flex text-center"
            />
          </div>
      
          <div className="contact-section flex-1 text-white">
            <div className="flex flex-col gap-3 mb-8">
              <div className="font-light text-xs tracking-[0.145em]">
                Customer Service
              </div>
              <div className="flex flex-col gap-[0.65rem]">
                <div className="font-normal text-xs tracking-[0.145em]">
                  Email Service: <a href="mailto:design@groyyo.com" className="text-blue-300">design@groyyo.com</a>
                </div>
                <div className="font-[275] text-xs tracking-[0.145em] italic">
                  Monday to Friday: 24 hours a day
                </div>
                <div className="font-[275] text-xs tracking-[0.145em] italic">
                  Saturday - Sunday: 8 AM - 3 PM IST
                </div>
              </div>
              <div className="flex flex-col gap-[0.65rem]">
                <div className="font-normal text-xs tracking-[0.145em] italic">
                  Phone Service: +91 8808988089
                </div>
                <div className="font-[275] text-xs tracking-[0.145em] italic">
                  Monday to Friday: 8 AM - 7 PM IST
                </div>
              </div>
            </div>
          </div>
        </div>

        
          <UserFAQ />
          {/* <ContactUsForm /> */}
      </div>
    </BasicLayout>
  );
};
