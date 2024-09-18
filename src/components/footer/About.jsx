import React from 'react'
import SocialMedia from './SocialMediaIcons'
import { Typography } from '@mui/material'

const About = () => {
  return (
    <div className='flex flex-col gap-2 lg:gap-10 justify-start min-w-[16rem] md:min-w-[25rem]  xxs:p-0 md:px-[2rem] xl:px-[5rem]'>
        <Typography className='text-[#8E8E8E] !tracking-[0.3rem] font-semibold'>ABOUT</Typography>

        <div className='flex flex-col gap-2'>
            <div>
                <Typography className='text-[#8E8E8E] font-light !tracking-[0.15rem]'>About us</Typography>
            </div>
            <div>
                <Typography className='text-[#8E8E8E] font-light !tracking-[0.15rem]'>Groyyo Plus
                </Typography>
            </div>
            {/* <div>
                <Typography className='text-[#8E8E8E] font-light !tracking-[0.15rem]'>FOLLOW US</Typography>
                <SocialMedia />
            </div> */}
        </div>
    </div>
  )
}

export default About