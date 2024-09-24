import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { Service } from '../../../../types/service';

interface AdminServiceCardProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

const AdminServiceCard: React.FC<AdminServiceCardProps> = ({ service, onEdit, onDelete }) => {
  return (
    <motion.div
      className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-col justify-between gap-4"
    > 
      <div>
        {service.imageUrl?.length > 0 && <img src={service.imageUrl} alt={service.title} className="aspect-[4/3] object-cover rounded-xl mb-2" />}
        <h3 className="text-lg font-bold">{service.title}</h3>
        <p className="text-gray-600">{service.description}</p>
        {/* <p className="text-primary font-bold">{service.buttonName}</p> */}
        {/* <a href={service.buttonRedirectionUrl} target="_blank" rel="noopener noreferrer">
          <Button variant="contained" color="primary" className="mt-2">
            {service.buttonName}
          </Button>
        </a> */}
        <ul className="list-disc list-inside mt-2">
          {service.descriptionListKeys?.map((desc, index) => (
            <li key={index} className="text-gray-500">
              <strong>{desc.key}: </strong>{desc.detail}
            </li>
          ))}
        </ul>
      </div>
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
