import React, { useState } from 'react';
import { IconButton, List, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { FAQ } from '../../../../types/faq';

interface FAQListProps {
    faqs: FAQ[];
    onEdit: (faq: FAQ) => void;
    onConfirmDelete: (faqId: string) => void;
}

const FAQList: React.FC<FAQListProps> = ({ faqs, onEdit, onConfirmDelete }) => {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (faqId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? faqId : false);
    };

    return (
        <List>
            {faqs.map((faq) => (
                <Accordion key={faq.id} expanded={expanded === faq.id} onChange={handleChange(faq.id)} sx={{ minHeight: '5rem' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${faq.id}-content`} id={`panel-${faq.id}-header`}>
                        <Typography className='!font-medium !text-xl'>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className='!font-normal'>{faq.answer}</Typography>
                        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                            <IconButton edge="end" onClick={() => onEdit(faq)} color="primary">
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" onClick={() => onConfirmDelete(faq.id)} color="secondary">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </List>
    );
};

export default FAQList;
