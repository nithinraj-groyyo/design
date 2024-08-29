import { Button } from '@mui/material'
import { useState } from 'react'
import AddAddress from './AddAddress';
import HomeIcon from '@mui/icons-material/Home';

const Address = () => {
  const [addAddressModal,setAddAddressModal] = useState(false);
  const addAddressHandler = () =>{
    setAddAddressModal(true);
  }
  return (
    <>
    {addAddressModal && <AddAddress setAddAddressModal={setAddAddressModal} />}
    {!addAddressModal && 
    <>
    <div className='flex flex-col p-4 bg-white m-4 rounded-lg'>
      <div className='flex justify-between'>
        <div className='font-bold'>All Addresses</div>
        <div className='mb-4 mr-4'>
          <Button variant="contained" className="w-[10rem] h-[3rem] !rounded-full !bg-[#a3865b]" onClick={addAddressHandler}><p className='text-base font-semibold'>Add New</p></Button>
        </div>
      </div>
      <div className='bg-[#f1f1f1] w-full h-fit flex align-middle'>
        <div className='bg-white p-4 m-4 w-full flex flex-col gap-4'>
          <div><HomeIcon/></div>
          <div className='flex flex-col gap-1 bg-[#f1f1f1]'>
            <div className=' p-4'>
              <div className='font-semibold'>Groyyo Banglore</div>
              <div>Groyyo HSR Sector 6 Banglore India</div>
            </div>
            <div className='p-4'>
              <div className='flex gap-2'>
              <Button variant="outlined" className="w-[20%] h-[3rem] !border-black !text-black"><b>Edit</b></Button>
              <Button variant="outlined" className="w-[20%] h-[3rem] !border-t-gray-400 !text-lime-700"><b>Default</b></Button>
              <Button variant="outlined" className="w-[20%] h-[3rem] !border-black !text-black"><b>Remove</b></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

      </>}
    </>
  )
}

export default Address