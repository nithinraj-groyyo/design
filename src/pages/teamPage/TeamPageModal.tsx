import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Team } from '../../types/team';
import DOMPurify from 'dompurify';

interface TeamPageModalProps {
  memberDetails: Team;
  onClose: () => void;
}

const TeamPageModal: React.FC<TeamPageModalProps> = ({ memberDetails, onClose }) => {
  const sanitizedDescription = DOMPurify.sanitize(memberDetails?.description);

  return (
    <div className="relative h-screen p-8 text-white">      
      <div className="absolute top-4 right-4">
        <CloseIcon
          fontSize="large"
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      
      <div className="flex flex-col h-full justify-start">
        <div className="w-full md:w-3/4 lg:w-2/3 flex flex-col gap-10">
          <div className="flex flex-col gap-2 text-center">
            <div className="text-5xl md:text-6xl text-left">{memberDetails.name}</div>
            <div className="text-xl md:text-2xl text-left">{memberDetails.role}</div>
          </div>

          <div className="flex flex-col gap-8">            
            <p
              className="text-xl md:text-2xl font-extralight"
              dangerouslySetInnerHTML={{
                __html: sanitizedDescription
              }}
            />
            <div className="font-semibold">
              <a
                href={memberDetails.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="text-[#0077b5]">
                  <LinkedInIcon fontSize="large" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamPageModal;