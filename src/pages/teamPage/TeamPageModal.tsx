import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

interface TeamPageModalProps {
  memberDetails: {
    name: string;
    role: string;
    description: string;
    linkedin: string;
  };
  onClose: () => void;
}

const TeamPageModal: React.FC<TeamPageModalProps> = ({ memberDetails, onClose }) => {
  return (
    <div className='flex justify-end h-screen  text-white'> 
      <div className='w-full p-12 flex flex-col gap-20'>
        <div className='flex justify-between mt-4'>
          <div className='flex flex-col gap-2'>
            <div className='text-6xl'>{memberDetails.name}</div>
            <div className='text-2xl'>{memberDetails.role}</div>
          </div>
          <div onClick={onClose}><CloseIcon fontSize='large' className="cursor-pointer" /></div>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='text-2xl font-extralight '>{memberDetails.description}</div>
          <div className='font-semibold'>
            <a href={memberDetails.linkedin} target="_blank" rel="noopener noreferrer"><span className='text-[#0077b5]'><LinkedInIcon fontSize='large'/></span></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPageModal;
