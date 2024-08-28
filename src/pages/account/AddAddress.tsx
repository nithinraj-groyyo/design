import { Button, TextField } from "@mui/material";
import React from "react";

const AddAddress = () => {    
  return (
    <>
      <div className="p-4 bg-white m-4 rounded-lg flex flex-col gap-8">
        <div className="font-bold text-lg">Add Address</div>
        <div className="flex gap-8">
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col w-full gap-2">
              <div>Name</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="!w-full"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <div>Address1</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="!w-full"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <div>Country</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="!w-full"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <div>City</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="!w-full"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <div>Landmark</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="!w-full"
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col w-full gap-2">
              <div>Phone</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="!w-full"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <div>Address2</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="!w-full"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <div>State</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="!w-full"
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <div>Zip</div>
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="!w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-semibold">Save Address as</div>
          <div className="flex gap-4">
            <div className="border p-2 rounded-full w-[6rem] text-center">Home</div>
            <div className="border p-2 rounded-full w-[6rem] text-center">Work</div>
          </div>
        </div>
        <div className="flex gap-4 mb-16 mt-8">
          <Button
            variant="contained"
            className="w-[10rem] h-[3rem] !rounded-full !bg-[#a3865b]"
            onClick={() => {}}
          >
            <p className="text-base font-semibold">Save</p>
          </Button>
          <Button
            variant="contained"
            className="w-[10rem] h-[3rem] !rounded-full !bg-[#a3865b]"
            onClick={() => {}}
          >
            <p className="text-base font-semibold">Cancel</p>
          </Button>
        </div>
      </div>
    </>
  );
};

export default AddAddress;
