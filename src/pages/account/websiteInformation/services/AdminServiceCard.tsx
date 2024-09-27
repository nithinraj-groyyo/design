import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { Service } from '../../../../types/service';

interface AdminServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

const AdminServiceCard: React.FC<AdminServiceCardProps> = ({ service, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const limitWords = (text: string, limit: number = 10) => {
    const words = text.split(' ');
    return words.length > limit ? words.slice(0, limit).join(' ') + '...' : text;
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-col justify-between gap-4 min-h-[55vh]"
    > 
      <div>
        {service.imagePath?.length > 0 && (
          <img src={service.imagePath} alt={service.title} className="aspect-[4/3] object-cover rounded-xl mb-2" />
        )}
        <h3 className="text-lg font-bold">{service.title}</h3>
                
        <p className="text-gray-600">
          {isExpanded ? service.description : limitWords(service.description)}
        </p>
        
        {isExpanded && (
          <ul className="list-disc list-inside mt-2">
            {service.featuresList?.map((desc, index) => (
              <li key={index} className="text-gray-500">
                <strong>{desc.featureName}: </strong>{desc.featureDetail}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <Button
        variant="text"
        color="primary"
        className="mt-2"
        onClick={toggleExpand}
      >
        {isExpanded ? 'View Less' : 'View More'}
      </Button>

      <div className='flex justify-between'>
        <Button
          variant="contained"
          color="primary"
          className="mt-4"
          onClick={() => onEdit(service)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className="mt-4 ml-2"
          onClick={() => onDelete(service)}
        >
          Delete
        </Button>
      </div>
    </motion.div>
  );
};

export default AdminServiceCard;
