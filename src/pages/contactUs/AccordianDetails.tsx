import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import ContactUsForm from "./ContactUsForm";
// import FAQ from "./FAQ";

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  border: "none",
  "&:not(:last-child)": {
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "0",
  },
}));

const AccordionComponent: React.FC = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionData = [
    // {
    //   title: "How to cancel an order or start a return",
    //   content: <FAQ />,
    // },
    {
      title: "Email our Customer Service Team",
      content: <ContactUsForm />,
    },
  ];

  return (
    <div>
      {accordionData.map((accordionItem, index) => (
        <CustomAccordion
          key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          className="border-none shadow-none"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <div className="tracking-[0.145em] font-normal">
              {accordionItem.title}
            </div>
          </AccordionSummary>
          <AccordionDetails>{accordionItem.content}</AccordionDetails>
        </CustomAccordion>
      ))}
    </div>
  );
};

export default AccordionComponent;