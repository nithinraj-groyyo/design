import { Button, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
  return (
    <>
      <div className="flex relative min-h-screen opacity-65 bg-white">
        <div className=" w-full  flex-1 min-w-[40%] h-screen">
          <img
            className="w-full h-full"
            src="/images/auth/login_img_1.jpeg"
            alt="login_bg1"
          />
        </div>
        <div className=" w-full  flex-2 h-screen">
          <img
            className="w-full h-full"
            src="/images/auth/login_img_2.jpeg"
            alt="login_bg2"
          />
        </div>
      </div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(153, 153, 153, 0.3) 198.83%)",
          }}
          className="w-[30rem] rounded p-4 flex flex-col gap-4 "
        >
          <div>Create your account</div>
          <div className="flex flex-col gap-4">
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Email"
                multiline
                maxRows={4}
                className="w-full"
              />
            </div>
            <div>
              <TextField
                id="outlined-multiline-flexible"
                label="Password"
                multiline
                maxRows={4}
                className="w-full"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button
                variant="contained"
                className="w-[100%] h-[3.5rem] bg-black text-white rounded"
              >
                Sign Up
              </Button>
              <div className="w-full text-right text-xs">
                Already a user?{" "}
                <Link to={"/login"}>
                  <span className="underline font-semibold">Log in</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
