import React, { useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Tooltip } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';

const AdminSubscriptionPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState({
    name: '',
    price: '',
    features: '',
  });

  // Dummy subscription data
  const subscriptions = [
    { id: 1, name: 'Basic Plan', price: '$10/month', features: 'Basic Support, Feature A, Feature B' },
    { id: 2, name: 'Premium Plan', price: '$30/month', features: 'Premium Support, Feature C, Feature D' },
    { id: 3, name: 'Pro Plan', price: '$50/month', features: 'Pro Support, Feature E, Feature F' },
  ];

  const handleOpen = (subscription = null) => {
    setIsEditing(!!subscription);
    if (subscription) {
      setCurrentSubscription(subscription);
    } else {
      setCurrentSubscription({
        name: '',
        price: '',
        features: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setCurrentSubscription(1);
  };

  const handleSave = () => {
    // Handle save logic (add/edit subscription)
    handleClose();
  };

  return (
    <AccountSettingsLayout>
      <div className='p-8'>
        {/* Overview section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#ececec] p-6 rounded-lg shadow-md">
            <Typography variant="h5">Total Subscriptions</Typography>
            <Typography variant="h2" className="font-bold">120</Typography>
          </Card>
          <Card className="bg-[#ececec] p-6 rounded-lg shadow-md">
            <Typography variant="h5">Active Subscriptions</Typography>
            <Typography variant="h2" className="font-bold">95</Typography>
          </Card>
        </div>

        {/* Subscription cards */}
        <div className="grid grid-cols-3 gap-4">
          {subscriptions?.map((subscription:any) => (
            <div key={subscription.id} className="card-container">
              <Card className="p-6 shadow-md relative">
                <Typography variant="h6">{subscription.name}</Typography>
                <Typography variant="body1" className="mb-4">{subscription.price}</Typography>
                <Typography variant="body2" className="mb-4">{subscription.features}</Typography>

                <div className="flex justify-end space-x-2 absolute bottom-4 right-4">
                  <Tooltip title="Edit">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpen(subscription)}
                    >
                      <EditIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <Button variant="contained" color="secondary">
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Floating Action Button to Add Subscription */}
        <Button
          variant="contained"
          color="primary"
          sx={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            borderRadius: '50%',
            width: '3.5rem',
            height: '3.5rem',
            boxShadow: '0 6px 12px rgba(0,0,0,0.2)',
            "&:hover": {
              backgroundColor: '#4a90e2',
            },
          }}
          onClick={() => handleOpen()}
        >
          <AddIcon />
        </Button>

        {/* Add/Edit Subscription Modal */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? 'Edit Subscription' : 'Add Subscription'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Subscription Name"
              fullWidth
              variant="outlined"
              value={currentSubscription?.name || ''}
              onChange={(e) => setCurrentSubscription({ ...currentSubscription, name: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Price"
              fullWidth
              variant="outlined"
              type="text"
              value={currentSubscription?.price || ''}
              onChange={(e) => setCurrentSubscription({ ...currentSubscription, price: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Features"
              fullWidth
              variant="outlined"
              multiline
              rows={3}
              value={currentSubscription?.features || ''}
              onChange={(e) => setCurrentSubscription({ ...currentSubscription, features: e.target.value })}
            />
            {/* Add more fields as needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSave}>{isEditing ? 'Update' : 'Save'}</Button>
          </DialogActions>
        </Dialog>
      </div>
    </AccountSettingsLayout>
  );
};

export default AdminSubscriptionPage;
