
import { Button } from '@mui/material'
import React from 'react'
// import ProductTable from './ProductsData'
import { useNavigate } from 'react-router-dom'
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout'
import CatalogueTable from './CatalogueTable'

const AdminCatalogueList = () => {
    const navigate = useNavigate();

    const handleCreateCatalogue = () => {
        navigate("/account/add-catalogue")
    }
    return (
        <AccountSettingsLayout>
            <AccountSettingsLayout.Header title='All Catalogues'>
                <Button variant="contained" color="primary" onClick={() => handleCreateCatalogue()}>
                    Add New
                </Button>
            </AccountSettingsLayout.Header>
            <AccountSettingsLayout.Body>
              <CatalogueTable />
            </AccountSettingsLayout.Body>
        </AccountSettingsLayout>
    )
}

export default AdminCatalogueList