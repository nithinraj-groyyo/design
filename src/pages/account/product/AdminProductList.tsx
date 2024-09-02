import { Button } from '@mui/material'
import React from 'react'
import ProductTable from './ProductsData'

const AdminProductList = () => {
    return (
        <div className='flex flex-col p-4 bg-white m-4 rounded-lg'>
            <div className='flex justify-between'>
                <div className='font-bold'>All Products</div>
                <div className='mb-4 mr-4'>
                    <Button
                        variant="contained"
                        className="w-[10rem] h-[3rem] !rounded-full !bg-[#a3865b]"
                        // onClick={handleCreateAddress}
                    >
                        <p className='text-base font-semibold'>Add New</p>
                    </Button>
                </div>
            </div>
            <div>
                <ProductTable />
            </div>
        </div>
    )
}

export default AdminProductList