import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { FAQ } from '../../../../types/faq';


interface FAQFormProps {
  faq: FAQ | null;
  onSubmit: (faq: Partial<FAQ>) => void;
}

const FAQForm: React.FC<FAQFormProps> = ({ faq, onSubmit }) => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
    } else {
      setQuestion('');
      setAnswer('');
    }
  }, [faq]);

  const handleSubmit = () => {
    onSubmit({
      id: faq?.id,
      question,
      answer,
    });
  };

  return (
    <div className="flex flex-col gap-4 min-w-[30rem]">
      <TextField
        label="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        fullWidth
        multiline
        rows={2}
      />
      <TextField
        label="Answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        fullWidth
        multiline
        rows={3}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        {faq ? 'Update FAQ' : 'Add FAQ'}
      </Button>
    </div>
  );
};

export default FAQForm;
