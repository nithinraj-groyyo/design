import React, { useEffect } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import ClientsLogosSlider from "./ClientsLogoSlider";
// import NewsSection from "./NewsSection";

const AboutPage = () => {
  // const aboutDetails = [
  //   {
  //     title: "LAUNCHED IN",
  //     value: "2021",
  //   },
  //   {
  //     title: "TEAM",
  //     value: "100+",
  //   },
  //   {
  //     title: "FACTORIES",
  //     value: "360+",
  //   },
  //   {
  //     title: "BRANDS",
  //     value: "110+",
  //   },
  // ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [])

  return (
    <BasicLayout>
      <div className="mt-[10rem]" style={{ fontFamily: "Poppins" }}>
        <div
          className="flex flex-col gap-8 py-4"
          style={{ background: "linear-gradient(0deg, #f9f9f9, transparent)" }}
        >
          <div
            className="text-center font-bold tracking-wide text-4xl"
            style={{ fontFamily: "'Space Mono', monospace" }}
          >
            ABOUT GROYYO DESIGN STUDIO
          </div>
          <div className="text-center w-full flex justify-center">
            <div
              className="w-[75%]  tracking-wider text-justify"
              // style={{ fontFamily: "'Space Mono', monospace" }}
            >
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
                  minWidth: "15rem",
                  "&:hover": {
                    backgroundColor: "transparent",
                    borderColor: "black",
                    color: "black",
                  },
                }}
              >
                Go to our Services
              </Button>
            </Link>
          </div>
          {/* <div className="flex text-center w-full gap-6 justify-center my-4">
            {aboutDetails.map((aboutDetail, aboutDetailKey) => {
              return (
                <>
                  <div className="flex flex-col gap-4 border border-none px-[3.5rem] py-[2.5rem] rounded-xl shadow-lg bg-white">
                    <div className="font-semibold">{aboutDetail?.title}</div>
                    <div
                      className="text-7xl"
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {aboutDetail?.value}
                    </div>
                  </div>
                </>
              );
            })}
          </div> */}
        </div>
        

        <ClientsLogosSlider/>

        {/* <NewsSection /> */}
      </div>
    </BasicLayout>
  );
};

export default AboutPage;
