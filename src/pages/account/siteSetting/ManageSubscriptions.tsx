import React, { useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, Tooltip, Switch } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';

const AdminSubscriptionPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState({
    name: '',
    price: '',
    features: [] as string[], // Initialize features as an empty array
  });

  const subscriptions = [
    { 
      id: 1, 
      name: 'Basic Plan', 
      price: 10, 
      actualPrice: 20, 
      duration: 'month', 
      features: ['Basic Support', 'Feature A', 'Feature B'],
      active: true,
      activeUser:102,
    },
    { 
      id: 2, 
      name: 'Premium Plan', 
      price: 30, 
      actualPrice: 50, 
      duration: 'month',
      features: ['Premium Support', 'Feature C', 'Feature D'],
      active: false,
      activeUser:95,
    },
    { 
      id: 3, 
      name: 'Pro Plan', 
      price: 50, 
      actualPrice: 80, 
      duration: 'month',
      features: ['Pro Support', 'Feature E', 'Feature F'],
      active: true,
      activeUser:34,
    },
  ];

  const handleOpen = (subscription = null) => {
    setIsEditing(!!subscription);
    if (subscription) {
      setCurrentSubscription(subscription);
    } else {
      setCurrentSubscription({
        name: '',
        price: '',
        features: [],
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Handle save logic (add/edit subscription)
    handleClose();
  };

  return (
    <AccountSettingsLayout>
      <AccountSettingsLayout.Header title="Manage Subscription">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleOpen()}
          >
            Add New Subscription
          </Button>
        </AccountSettingsLayout.Header>
      <div className='p-8'>
        {/* Overview Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg">
            <Typography variant="h5" className="font-semibold">Total Subscriptions</Typography>
            <Typography variant="h2" className="font-bold mt-2">120</Typography>
          </Card>
          <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-lg shadow-lg">
            <Typography variant="h5" className="font-semibold">Active Subscriptions</Typography>
            <Typography variant="h2" className="font-bold mt-2">95</Typography>
          </Card>
        </div>

        {/* Subscription Cards */}
        <div className="grid grid-cols-3 gap-6">
          {subscriptions?.map((subscription:any) => (
            <Card key={subscription.id} className="p-6 shadow-md hover:shadow-lg transition-shadow rounded-lg relative bg-white border border-gray-100">
              <div className='flex justify-between'>
                <Typography variant="h6" className="text-blue-600 font-bold">{subscription.name}</Typography>
                <div className="flex items-center mb-4">
                <Typography variant="body2" className="text-gray-500 mr-2">Active:</Typography>
                <Switch aria-label="Switch demo" defaultChecked />
              </div>
              </div>
              <Typography variant="body1" className="mb-4 text-gray-500">Discounted Price: <span className='!font-semibold !text-xl'>${subscription.price}/month</span></Typography>
              <Typography variant="body2" className="text-gray-600 mb-4">Actual Price: ${subscription.actualPrice}</Typography>
              
              <div className="flex flex-col mb-4">
                <Typography variant="body2" className="font-semibold text-gray-700">Features:</Typography>
                <ul className="list-disc pl-5 text-gray-600">
                  {subscription.features.map((feature:any, idx:any) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              
              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-4">
                <div className='flex gap-2'>
                  <Typography variant="body2" className="font-semibold text-gray-700">Number of Active Users: </Typography>
                  <Typography variant="body2" className="font-semibold text-gray-700">{subscription?.activeUser} </Typography>

                </div>
              

                <Tooltip title="Edit">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleOpen(subscription)}
                  >
                    <EditIcon />
                  </Button>
                </Tooltip>
                {/* <Tooltip title="Delete">
                  <Button variant="contained" color="secondary">
                    <DeleteIcon />
                  </Button>
                </Tooltip> */}
              </div>
            </Card>
          ))}
        </div>

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
              type="number"
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
              value={currentSubscription?.features.join(', ') || ''}
              onChange={(e) => setCurrentSubscription({ ...currentSubscription, features: e.target.value.split(', ') })}
            />
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
