import React from 'react'
import { Outlet } from 'react-router-dom'
import BasicLayout from '../../layouts/BasicLayout'

const AccountPage = () => {
  return (
    <BasicLayout showFooter={false}>
      <div className='flex mt-[10rem]'  style={{ minHeight: 'calc(100vh - 10rem)' }}>
        <div className='flex-[1]'>
          Sidebar 
        </div>
        <div className='flex-[5] bg-[#f1f1f1]'>
          
          {<Outlet />}
        </div>
      </div>
    </BasicLayout>
  )
}

export default AccountPage