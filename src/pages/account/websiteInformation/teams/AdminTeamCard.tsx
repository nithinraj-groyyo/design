import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import { Team } from '../../../../types/team';

interface AdminTeamCardProps {
  teamMember: Team;
  onEdit: (teamMember: Team) => void;
  onDelete: (teamMember: Team) => void;
}

const AdminTeamCard: React.FC<AdminTeamCardProps> = ({ teamMember, onEdit, onDelete }) => {
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
      className="bg-white shadow-md rounded-lg p-4 m-2 flex flex-col justify-between gap-4 min-h-[40vh]"
    >
      <div>
        {teamMember?.imageUrl && teamMember?.imageUrl?.length > 0 && (
          <img src={teamMember.imageUrl} alt={teamMember.name} className="aspect-[4/3] object-cover rounded-xl mb-2" />
        )}
        <h3 className="text-lg font-bold">{teamMember.name}</h3>
        <p className="text-gray-600 font-semibold">{teamMember.role}</p>

        <p className="text-gray-600">
          {isExpanded ? teamMember.description : limitWords(teamMember.description)}
        </p>
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
          onClick={() => onEdit(teamMember)}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className="mt-4 ml-2"
          onClick={() => onDelete(teamMember)}
        >
          Delete
        </Button>
      </div>
    </motion.div>
  );
};

export default AdminTeamCard;