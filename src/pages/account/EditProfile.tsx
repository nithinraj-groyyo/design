import { Button, TextField } from '@mui/material'
import React from 'react'

const EditProfile = () => {
    
  return (
    <>
    <div className="p-4 bg-white m-4 rounded-lg flex flex-col gap-8">
      <div className="font-bold text-lg">Edit Details</div>
      <div className="flex gap-8">
        <div className="flex flex-col w-1/2 gap-4">
          <div className="flex flex-col w-full gap-2">
            <div className='font-semibold'>First Name</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="!w-full"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className='font-semibold'>Email</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="!w-full"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className='font-semibold'>Gender</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="!w-full"
            />
          </div>
        </div>
        <div className="flex flex-col w-1/2 gap-4">
          <div className="flex flex-col w-full gap-2">
            <div className='font-semibold'>LastName</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="!w-full"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className='font-semibold'>Contact Name</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="!w-full"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className='font-semibold'>Profile Photo</div>
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="!w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8 mt-4">
        <Button
          variant="contained"
          className="w-[10rem] h-[3rem] !rounded-full !bg-[#a3865b]"
          onClick={() => {}}
        >
          <p className="text-base font-semibold">Save</p>
        </Button>
      </div>
    </div>
  </>
  )
}

export default EditProfile
