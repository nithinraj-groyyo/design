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
    <div className="bg-white shadow-lg p-6 md:p-10 rounded-lg border border-gray-200 h-[85vh] overflow-y-auto">
      <h2 className="text-base md:text-3xl font-semibold mb-4 md:mb-6 text-gray-800 text-center">
        Frequently Asked Questions
      </h2>

      {/* Accordion Items */}
      {faqs.map((faq) => (
        <Accordion
          key={faq.id}
          expanded={expanded === `panel${faq.id}`}
          onChange={handleExpansion(`panel${faq.id}`)}
          className="border border-gray-200 rounded-lg shadow-sm mb-2 md:mb-4 hover:shadow-lg transition-shadow"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-gray-600" />}
            aria-controls={`panel${faq.id}-content`}
            id={`panel${faq.id}-header`}
            className="hover:bg-gray-100 transition-colors duration-300"
          >
            <Typography className="font-medium text-gray-800 text-xs md:text-base">
              {faq.question ? faq.question : "NULL"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="bg-gray-50">
            <Typography className="text-gray-600 text-xs md:text-sm">
              {faq.answer ? faq.answer : "Answer not available"}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default UserFAQ;
