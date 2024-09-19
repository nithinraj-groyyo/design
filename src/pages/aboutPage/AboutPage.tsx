import React from "react";
import BasicLayout from "../../layouts/BasicLayout";

const AboutPage = () => {

    const aboutDetails = [
        {
            "title":"LAUNCHED IN",
            "value":"2021"
        },
        {
            "title":"TEAM",
            "value":"100+"
        },
        {
            "title":"FACTORIES",
            "value":"360+"
        },
        {
            "title":"BRANDS",
            "value":"110+"
        }
    ]
  return (
    <BasicLayout>
      <div className="mt-[9rem]" style={{ fontFamily:"Poppins"}}>
        <div
          className="flex flex-col gap-8 py-4"
          style={{ background: "linear-gradient(0deg, #ede3e3, transparent)" }}
        >
          <div className="text-center font-bold tracking-wide text-4xl" style={{ fontFamily: "'Space Mono', monospace" }}>
            About Groyyo Design Studio
          </div>
          <div className="text-center w-full flex justify-center">
            <div className="w-[70%] text-center" style={{ fontFamily: "'Space Mono', monospace" }}>
              {" "}
              Groyyo Design Studio offers a one-stop solution for fashion and
              lifestyle design needs. We understand the importance of embracing
              the evolution of fashion and reviving classic designs with a
              modern twist. Our team combines timeless beauty with contemporary
              elements to create unique and innovative designs.
            </div>
          </div>
          <div className="flex text-center w-full gap-6 justify-center my-4">
            {aboutDetails.map((aboutDetail, aboutDetailKey)=>{
                return <>
                    <div className="flex flex-col gap-4 border border-none px-[3.5rem] py-[2.5rem] rounded-xl shadow-lg bg-white">
                        <div className="font-semibold">{aboutDetail?.title}</div>
                        <div className="text-7xl" style={{ fontFamily: "'Space Mono', monospace" }}>{aboutDetail?.value}</div>
                    </div>
                </>
            })}
          </div>
        </div>

        <div className="flex flex-col gap-4 mx-8 my-12 items-center">
          <div className="text-center font-semibold text-4xl tracking-wider " >IN THE NEWS</div>
          <div className="flex mt-8 gap-4 justify-center w-[90%]">
            <div className="w-full flex items-center justify-center">
              <img src="images/news/1.jpg" alt="news" />
            </div>
            <div className="w-full flex items-center justify-center">
              <img src="images/news/2.jpg" alt="news" />
            </div>
            <div className="w-full flex items-center justify-center">
              <img src="images/news/3.jpg" alt="news" />
            </div>
            <div className="w-full flex items-center justify-center">
              <img src="images/news/4.jpg" alt="news" />
            </div>
            <div className="w-full flex items-center justify-center">
              <img src="images/news/5.jpg" alt="news" />
            </div>
            <div className="w-full flex items-center justify-center">
              <img src="images/news/6.jpg" alt="news" />
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default AboutPage;
