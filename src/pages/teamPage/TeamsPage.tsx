import React, { useState } from "react";
import BasicLayout from "../../layouts/BasicLayout";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TeamPageModal from "./TeamPageModal";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const TeamsPage = () => {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);  // Store the ID of selected team member

  const handleOpenDetailedView = (id: number) => {
    setSelectedMember(id); 
  };

  const handleCloseModal = () => {
    setSelectedMember(null); 
  };

  const memberDetails = [
    {
      id: 1,
      name: "Devin Burns",
      role: "Cheif Executive Officer",
      description: "Devin Burns, MBA, CPA, brings a wealth of experience to Inspectorio as CEO. He has over two decades of leadership experience in scaling high-growth companies. Under his guidance, the company has expanded its global reach and embraced innovative solutions for quality control in the supply chain. Devin's passion for technology and operations management drives his commitment to continuous improvement. As a result, Inspectorio has been recognized as a leader in quality assurance. Devin also prioritizes employee development, ensuring a strong, motivated team at every level.",
      linkedin: "https://linkedin.com/in/devin-burns"
    },
    {
      id: 2,
      name: "Jordan Keny",
      role: "Cheif Techincal Officer",
      description: "Jordan Keny is the CTO at our company, leading the technology team in developing cutting-edge solutions. With a deep background in software engineering, Jordan has been instrumental in shaping our technology roadmap. He excels in driving complex projects to completion, from concept to production. Jordan is a strong advocate for agile methodologies, fostering collaboration and iterative development across teams. His hands-on approach ensures that technical challenges are swiftly addressed, and his ability to innovate keeps us ahead of industry trends. Jordan's vision is key to our success in the digital age.",
      linkedin: "https://linkedin.com/in/jordan-keny"
    },
    {
      id: 3,
      name: "Samantha Lee",
      role: "Chief Marketing Officer",
      description: "Samantha Lee has been the CMO for over five years, driving the company's marketing strategy with creativity and data-driven insights. Her extensive experience in both digital and traditional marketing campaigns has helped increase brand visibility and customer engagement. Samantha's approach focuses on building meaningful connections with our target audience while leveraging the latest tools and technologies. She is known for her innovative thinking and ability to adapt quickly to market changes. Samantha has played a pivotal role in launching several successful campaigns that have enhanced our brand recognition globally.",
      linkedin: "https://linkedin.com/in/samantha-lee"
    },
    {
      id: 4,
      name: "Rajesh Patel",
      role: "Chief Financial Officer",
      description: "Rajesh Patel, CFA, serves as the CFO, where he oversees all financial aspects of the company. With over 15 years of experience in corporate finance, Rajesh brings a strategic mindset to financial planning and analysis. He has a proven track record in managing company resources, optimizing budgets, and improving profitability. Rajesh's expertise in risk management has ensured our financial stability through various market challenges. His collaborative approach allows him to work closely with other executives to align financial goals with business strategy. Rajesh is passionate about driving long-term growth and sustainability.",
      linkedin: "https://linkedin.com/in/rajesh-patel"
    },
    {
      id: 5,
      name: "Emily Johnson",
      role: "Head of Product",
      description: "Emily Johnson is the Head of Product and has been responsible for overseeing the development and launch of our most successful products. With a background in UX design and product management, Emily ensures that our products are user-friendly and aligned with market demands. She has an exceptional ability to translate customer needs into actionable product features. Emily works closely with engineering, design, and marketing teams to bring products to life. Her leadership has been critical in maintaining our competitive edge in a rapidly evolving industry. She is committed to delivering value to our customers through continuous innovation.",
      linkedin: "https://linkedin.com/in/emily-johnson"
    },
    {
      id: 6,
      name: "Carlos Mendoza",
      role: "Chief Operating Officer",
      description: "Carlos Mendoza, our COO, oversees the day-to-day operations of the company. With over 20 years of experience in operational management, Carlos has a deep understanding of how to scale and optimize processes. His expertise in supply chain management and logistics has been pivotal in streamlining operations across our global offices. Carlos's leadership ensures that our teams remain efficient and aligned with the company's long-term goals. He is committed to operational excellence and drives continuous improvement initiatives to enhance performance across the board. Carlos is known for his problem-solving skills and ability to execute complex strategies.",
      linkedin: "https://linkedin.com/in/carlos-mendoza"
    },
    {
      id: 7,
      name: "Lisa Nguyen",
      role: "Director of Human Resources",
      description: "Lisa Nguyen leads the Human Resources department with a focus on creating a positive and inclusive workplace culture. She has over a decade of experience in talent acquisition, employee relations, and organizational development. Lisa is dedicated to fostering a diverse work environment where all employees can thrive. Her efforts have been instrumental in reducing turnover and increasing employee satisfaction. Lisa implements programs that promote professional growth, employee well-being, and leadership development. She also ensures compliance with labor laws and best practices, helping the company navigate complex HR challenges with ease.",
      linkedin: "https://linkedin.com/in/lisa-nguyen"
    },
    {
      id: 8,
      name: "Ahmed Farouk",
      role: "Chief Legal Officer",
      description: "Ahmed Farouk serves as the Chief Legal Officer, providing strategic legal advice to the company. With over 15 years of experience in corporate law, Ahmed has successfully managed legal risks and ensured compliance across multiple jurisdictions. He specializes in contract negotiation, intellectual property rights, and regulatory issues. Ahmed works closely with other departments to align legal strategies with business objectives. His proactive approach has minimized legal exposure and protected the company's interests. Ahmed is passionate about navigating the complexities of the legal landscape and ensuring that our operations remain lawful and ethical.",
      linkedin: "https://linkedin.com/in/ahmed-farouk"
    }
  ];
  

  const selectedMemberDetails = memberDetails.find((member) => member.id === selectedMember); // Find the selected member's details

  return (
    <BasicLayout>
      <div className="bg-[#e6e6e6] w-screen mt-[10rem] p-8 flex flex-col gap-8">
        <div className="flex justify-between">
          <div className="text-6xl font-semibold">Our Team</div>
          <div className="flex gap-8">
            <div className="text-3xl">
              <ArrowCircleLeftIcon fontSize='large' />
            </div>
            <div className="text-3xl">
              <ArrowCircleRightIcon fontSize='large' />
            </div>
          </div>
        </div>
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
          {memberDetails.map((member) => (
            <div key={member.id} className="p-4 flex flex-col gap-4">
              <div className="min-w-[19rem]">
                <img
                  src={"/images/landingPages/landingPage_2_2.png"}
                  alt="Thumbnail"
                  className="w-[19rem] h-[20rem] rounded-2xl"
                />
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-semibold">{member.name}</div>
                <div className="text-xl text-[gray]">{member.role}</div>
              </div>
              <div>
                <div className="cursor-pointer w-fit" onClick={() => handleOpenDetailedView(member.id)}>
                  View Profile <ArrowRightAltIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SwipeableDrawer
        anchor="right"
        open={selectedMember !== null}  
        onClose={handleCloseModal}
        onOpen={() => {}} 
        sx={{
          "& .MuiDrawer-paper": {
            width: "50%",       
            backgroundColor: "#232323"
          }
        }} 
      >
        {selectedMemberDetails && (
          <TeamPageModal
            memberDetails={selectedMemberDetails}  
            onClose={handleCloseModal}
          />
        )}
      </SwipeableDrawer>
    </BasicLayout>
  );
};

export default TeamsPage;
