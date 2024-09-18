import { Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

const CustomerService = () => {
  const navigate = useNavigate();

  const handleContactUs = () => {
    navigate('/contact-us')
  }

  return (
    <div className='flex flex-col gap-2 lg:gap-10 justify-start min-w-[16rem] md:min-w-[25rem]  xxs:p-0 md:px-[2rem] xl:px-[3rem]'>
        <Typography className='text-[#8E8E8E] !tracking-[0.3rem] font-semibold text-left'>CUSTOMER SERVICE</Typography>

        <div className='flex flex-col xxs:gap-1 lg:gap-3'>
            <Typography className='text-[#8E8E8E] xxs:text-xs lg:text-[1rem] font-light xxs:!tracking-[0] md:!tracking-[0.15rem] cursor-pointer' onClick={handleContactUs} >Contact us</Typography>
            <Typography className='text-[#8E8E8E] xxs:text-xs lg:text-[1rem] font-light xxs:!tracking-[0] md:!tracking-[0.15rem]'>FAQs</Typography>
            <Typography className='text-[#8E8E8E] xxs:text-xs lg:text-[1rem] font-light xxs:!tracking-[0] md:!tracking-[0.15rem]'>Orders and Delivery</Typography>
            <Typography className='text-[#8E8E8E] xxs:text-xs lg:text-[1rem] font-light xxs:!tracking-[0] md:!tracking-[0.15rem]'>Returns and refunds</Typography>
            <Typography className='text-[#8E8E8E] xxs:text-xs lg:text-[1rem] font-light xxs:!tracking-[0] md:!tracking-[0.15rem]'>Payments and Pricing</Typography>
            {/* <Typography className='text-[#8E8E8E] xxs:text-xs lg:text-[1rem] font-light xxs:!tracking-[0] md:!tracking-[0.15rem]'>Groyyo Studio Customer Promise</Typography> */}
        </div>
    </div>
  )
}

export default CustomerService