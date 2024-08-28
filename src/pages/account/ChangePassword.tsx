import { Button, TextField } from "@mui/material";
import React from "react";

const ChangePassword = () => {
  return (
    <>
      <div className="flex flex-col bg-white p-4 m-6 rounded-xl gap-8">
        <div className="font-semibold">Change Password</div>
        <div className="flex justify-evenly w-full gap-4">
          <div className="w-full flex flex-col gap-8">
            <TextField
              id="outlined-basic"
              label="Current Password"
              variant="outlined"
              className="w-full"
            />
            <TextField
              id="outlined-basic"
              label="Re-Enter New Password"
              variant="outlined"
              className="w-full"
            />
          </div>
          <div className="w-full">
            <TextField
              id="outlined-basic"
              label="New Password"
              variant="outlined"
              className="w-full"
            />
          </div>
        </div>
        <div>
          <Button variant="outlined" className="w-[10rem] h-[3rem] !rounded-full"><b>Reset</b></Button>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
