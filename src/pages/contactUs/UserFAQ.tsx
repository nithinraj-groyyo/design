import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { fetchFaqs } from "../../api/faqApi";
import { FAQ } from "../../types/faq";
import { setLoading } from "../../redux/shoppingBagSlice";
import { toast } from "react-toastify";

const UserFAQ = () => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const handleExpansion =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    const loadFaqs = async () => {
      try {
        const loadedFaqs = await fetchFaqs();
        setFaqs(loadedFaqs);
      } catch (error) {
        toast.error("Failed to load FAQs.");
      } finally {
        setLoading(false);
      }
    };
    loadFaqs();
  }, []);

  return (
    <div className="md:w-[65%] bg-white shadow-lg px-10 py-16 rounded-lg md:px-12 md:py-16 flex flex-col gap-6 font-normal text-sm border border-gray-200 h-[85vh] overflow-y-scroll">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      {/* Accordion Items */}
      {faqs.map((faq) => (
        <Accordion
          key={faq.id}
          expanded={expanded === `panel${faq.id}`}
          onChange={handleExpansion(`panel${faq.id}`)}
          className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-gray-600" />}
            aria-controls={`panel${faq.id}-content`}
            id={`panel${faq.id}-header`}
            className="hover:bg-gray-100 transition-colors duration-300"
          >
            <Typography className="font-medium text-gray-800">
              {faq.question ? faq.question : "NULL"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="bg-gray-50">
            <Typography className="text-gray-600">
              {faq.answer ? faq.answer : "Answer not available"}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default UserFAQ;
