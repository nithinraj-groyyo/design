import React, { useState } from 'react';
import { IconButton, List, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FAQ } from '../../../../types/faq';
import NoDataAvailable from '../../../../components/NoDataAvailable';
import { motion } from 'framer-motion';

interface FAQListProps {
  faqs: FAQ[];
  onEdit: (faq: FAQ) => void;
  onConfirmDelete: (faqId: string | number) => void;
}

const FAQList: React.FC<FAQListProps> = ({ faqs, onEdit, onConfirmDelete }) => {
  const [expanded, setExpanded] = useState<string | number | false>(false);

  const handleChange = (faqId: string | number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? faqId : false);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          transition: {
            staggerChildren: 0.2,
          },
        },
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
    >
      <List>
        {faqs?.length > 0 ? faqs?.map((faq, index) => (
          <motion.div
            key={faq.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
          >
            <Accordion 
              expanded={expanded === faq.id} 
              onChange={handleChange(faq.id)} 
              sx={{ minHeight: '5rem' }}
            >
              <AccordionSummary 
                expandIcon={<ExpandMoreIcon />} 
                aria-controls={`panel-${faq.id}-content`} 
                id={`panel-${faq.id}-header`}
              >
                <Typography className="!font-medium !text-xl">{faq.question}</Typography>
              </AccordionSummary>
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: expanded === faq.id ? 1 : 0, height: expanded === faq.id ? 'auto' : 0 }} 
                transition={{ duration: 0.3 }}
              >
                <AccordionDetails>
                  <Typography className="!font-normal">{faq.answer}</Typography>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                    <IconButton edge="end" onClick={() => onEdit(faq)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => onConfirmDelete(faq.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </AccordionDetails>
              </motion.div>
            </Accordion>
          </motion.div>
        )): (
          <NoDataAvailable />
        )}
      </List>
    </motion.div>
  );
};

export default FAQList;
