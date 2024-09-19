import React from 'react'
import CustomerService from './CustomerService'
import About from './About'
import Region from './Region'

const Footer = () => {
  return (
    <footer className='lg:h-[25rem] w-full'>
      <div className='grid grid-cols-1 gap-8 lg:gap-0 lg:grid-cols-3 bg-[#F9F9F9] h-full py-[3rem] px-2  md:px-[0rem] xl:px-[5rem]'>
        <div className='flex justify-center items-start'>
          <CustomerService />
        </div>
        <div className='flex justify-center lg:items-start '>
          <About />
        </div>
        <div className='flex justify-center lg:items-start'>
          <Region />
        </div>
      </div>
    </footer>
  )
}

export default Footer