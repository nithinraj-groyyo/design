import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleExpansion =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div className="md:w-[65%] bg-white shadow-lg px-10 py-16 rounded-lg md:px-12 md:py-16 flex flex-col gap-6 font-normal text-sm border border-gray-200">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Frequently Asked Questions
      </h2>

      {/* Accordion Item 1 */}
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleExpansion("panel1")}
        className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-gray-600" />}
          aria-controls="panel1-content"
          id="panel1-header"
          className="hover:bg-gray-100 transition-colors duration-300"
        >
          <Typography className="font-medium text-gray-800">
            To cancel your order:
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-gray-50">
          <Typography className="text-gray-600">
            1. Go to Orders & Returns if you have an account, or if you placed
            an order as a guest, enter your guest order details here.
            <br />
            2. Select the items you want to cancel and your reason for
            cancellation.
            <br />
            3. We'll email you confirmation of your cancelled order.
            <br />
            If your order has already been prepared, we can't cancel your order
            — but we do offer a free returns service.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Accordion Item 2 */}
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleExpansion("panel2")}
        className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-gray-600" />}
          aria-controls="panel2-content"
          id="panel2-header"
          className="hover:bg-gray-100 transition-colors duration-300"
        >
          <Typography className="font-medium text-gray-800">
            Here’s what you need to do to book your return:
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-gray-50">
          <Typography className="text-gray-600">
            1. Go to Orders & Returns if you have an account. If you placed
            your order as a guest, enter your guest order details here.
            <br />
            2. Find the order you want to return and click Return Item(s).
            <br />
            3. Select each item and your reason for returning.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Accordion Item 3 */}
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleExpansion("panel3")}
        className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-gray-600" />}
          aria-controls="panel3-content"
          id="panel3-header"
          className="hover:bg-gray-100 transition-colors duration-300"
        >
          <Typography className="font-medium text-gray-800">
            Ways to return your items:
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-gray-50">
          <Typography className="text-gray-600">
            1. Book a free returns collection: Select your collection address and number of packages,
            schedule a collection date, and click Book Collection.
            <br />
            2. Return for free at a drop-off point: Select the in-store or drop-off option in your account and
            take the return to your chosen FARFETCH partner boutique or courier drop-off point.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Accordion Item 4 */}
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleExpansion("panel4")}
        className="border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow"
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className="text-gray-600" />}
          aria-controls="panel4-content"
          id="panel4-header"
          className="hover:bg-gray-100 transition-colors duration-300"
        >
          <Typography className="font-medium text-gray-800">
            Prepare your return:
          </Typography>
        </AccordionSummary>
        <AccordionDetails className="bg-gray-50">
          <Typography className="text-gray-600">
            1. Place the item inside the Groyyo Studio packaging – don't
            forget any brand boxes, dust bags, or cases.
            <br />
            2. Attach your Return Label to the outside of the packaging.
            <br />
            3. If you received a Return Note, attach it to the package.
            <br />
            4. Give the Waybill Doc to the courier and track your return using the Waybill Number.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FAQ;
