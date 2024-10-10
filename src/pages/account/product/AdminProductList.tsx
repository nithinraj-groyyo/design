import { Button } from '@mui/material'
import React from 'react'
import ProductTable from './ProductsData'
import { useNavigate } from 'react-router-dom'
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout'

const AdminProductList = () => {
    const navigate = useNavigate();

    const handleCreateAddress = () => {
        navigate("/account/add-product")
    }
    return (
        <AccountSettingsLayout>
            <AccountSettingsLayout.Header title='All Products'>
                <Button variant="contained" color="primary" onClick={() => handleCreateAddress()}>
                    Add New
                </Button>
            </AccountSettingsLayout.Header>
            <AccountSettingsLayout.Body>
                <ProductTable />
            </AccountSettingsLayout.Body>
        </AccountSettingsLayout>
    )
}

export default AdminProductList