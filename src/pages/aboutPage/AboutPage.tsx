import React, { useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ClientsLogosSlider from "./ClientsLogoSlider";
import { MISC } from "../../utilities/enum";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <BasicLayout>
      <div className="mt-[5rem] lg:mt-[10rem] font-poppins">
        <div className="flex flex-col gap-8 py-4 bg-gradient-to-b from-[#f9f9f9] to-transparent">          
          <div className="text-center font-bold tracking-wide text-2xl md:text-4xl">
            {MISC.ABOUT_US}
          </div>
          
          <div className="text-center w-full flex justify-center px-4 md:px-0">
            <div className="w-full md:w-[75%] tracking-wider text-justify text-sm md:text-base">
              Founded in 2021 and based in Gurgaon, Groyyo Design Studio is a
              one-stop solution for fashion and lifestyle design needs. Blending
              creativity with innovation, the studio crafts unique,
              trend-forward designs that help brands stand out in the fast-paced
              fashion industry. By merging timeless elegance with modern flair,
              classic aesthetics are revived with a fresh, contemporary twist.
              In addition to offering ready-made collections, clients can book
              appointments for personalized customization services to bring
              their vision to life. Whether it's original designs or bespoke
              solutions, Groyyo Design Studio delivers exceptional quality,
              style, and craftsmanship to elevate any brand.
            </div>
          </div>
          
          <div className="text-center mb-8 mt-4">
            <Link to={"/services"}>
              <Button
                variant="outlined"
                sx={{
                  color: "white",
                  borderColor: "black",
                  backgroundColor: "black",
                  padding: "1rem",
                  minWidth: "12rem",
                  fontSize: "0.875rem",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderColor: "black",
                    color: "black",
                  },
                }}
              >
                {MISC.Go_to_our_Services}
              </Button>
            </Link>
          </div>
        </div>
        
        <ClientsLogosSlider />
      </div>
    </BasicLayout>
  );
};

export default AboutPage;