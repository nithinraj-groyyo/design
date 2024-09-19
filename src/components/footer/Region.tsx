import { Typography } from '@mui/material'
import React, { useState } from 'react'
import SelectCountryModal from './SelectCountryModal'
import RegionIcon from '../../assets/svg/footer/RegionIcon';
import ChevronIcon from '../../assets/svg/footer/ChevronIcon';

const Region = () => {
    const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  return (
    <div className='flex flex-col gap-2 lg:gap-10 min-w-[16rem] md:min-w-[25rem]  xxs:p-0 md:px-[2rem] xl:px-[5rem]'>
        <Typography className='text-[#8E8E8E] !tracking-[0.3rem] font-semibold'>REGION</Typography>

        
        <div
          className="flex gap-3 items-center mt-2 lg:mt-5 font-light text-stone-950 cursor-pointer"
          onClick={handleOpen}
        >
          <div className="flex items-center gap-2">
                <RegionIcon />
                <Typography className='text-[#8E8E8E] font-light !tracking-[0.15rem]'>India</Typography>
            </div>
            <ChevronIcon />
          </div>
        <SelectCountryModal open={openModal} handleClose={handleClose} />
    </div>
  )
}

export default Region