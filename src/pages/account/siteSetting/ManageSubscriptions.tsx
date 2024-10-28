import React, { useState } from 'react';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Tooltip,
  Switch,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';
import { useCreateSubscriptionMutation } from '../../../rtk-query/subscriptonApiSlice';

const AdminSubscriptionPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const token = JSON.parse(localStorage.getItem("authToken") as string);

  const [currentSubscription, setCurrentSubscription] = useState({
    name: '',
    features: [] as string[],
    prices: [{ duration: 1, price: 0 }]
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
      activeUser: 102,
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: 30,
      actualPrice: 50,
      duration: 'month',
      features: ['Premium Support', 'Feature C', 'Feature D'],
      active: false,
      activeUser: 95,
    },
    {
      id: 3,
      name: 'Pro Plan',
      price: 50,
      actualPrice: 80,
      duration: 'month',
      features: ['Pro Support', 'Feature E', 'Feature F'],
      active: true,
      activeUser: 34,
    },
  ];

  const [ createSubscription ] = useCreateSubscriptionMutation()

  const handleOpen = (subscription = null) => {
    setIsEditing(!!subscription);
    setCurrentSubscription(
      subscription || { name: '', features: [], prices: [{ duration: 1, price: 0 }] }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    console.log(currentSubscription, "currentSubscription");
    const payload = {
      name: currentSubscription?.name,
      description: currentSubscription?.features,
      tenuresWithPrice: currentSubscription?.prices?.map((d) => {
        return {
          tenurePeriod: d?.duration,
          price: d?.price
        }
      })
    }
    try {
      const response = await createSubscription({payload, token});
      console.log(response);
      handleClose();
    } catch (error) {
      
    }
  };

  const handleDurationChange = (index: number, event: any) => {
    const newPrices = [...currentSubscription.prices];
    newPrices[index].duration = event.target.value;
    setCurrentSubscription({ ...currentSubscription, prices: newPrices });
  };

  const handlePriceChange = (index: number, event: any) => {
    const newPrices = [...currentSubscription.prices];
    newPrices[index].price = event.target.value;
    setCurrentSubscription({ ...currentSubscription, prices: newPrices });
  };

  const handleAddPriceField = () => {
    setCurrentSubscription((prev) => ({
      ...prev,
      prices: [...prev.prices, { duration: 1, price: 0 }]
    }));
  };

  const handleRemovePriceField = (index: number) => {
    const newPrices = currentSubscription.prices.filter((_, i) => i !== index);
    setCurrentSubscription({ ...currentSubscription, prices: newPrices });
  };

  console.log(currentSubscription, "currentSubscription")
  return (
    <AccountSettingsLayout>
      <AccountSettingsLayout.Header title="Manage Subscription">
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Add New Subscription
        </Button>
      </AccountSettingsLayout.Header>
      
      <div className="grid grid-cols-3 gap-6">
          {subscriptions.map((subscription: any) => (
            <Card
              key={subscription.id}
              className="p-6 shadow-md hover:shadow-lg transition-shadow rounded-lg relative bg-white border border-gray-100"
            >
              <div className="flex justify-between">
                <Typography variant="h6" className="text-blue-600 font-bold">
                  {subscription.name}
                </Typography>
                <div className="flex items-center mb-4">
                  <Typography variant="body2" className="text-gray-500 mr-2">
                    Active:
                  </Typography>
                  <Switch aria-label="Switch demo" defaultChecked={subscription.active} />
                </div>
              </div>
              <Typography variant="body1" className="mb-4 text-gray-500">
                Discounted Price: <span className="!font-semibold !text-xl">${subscription.price}/month</span>
              </Typography>
              <Typography variant="body2" className="text-gray-600 mb-4">
                Actual Price: ${subscription.actualPrice}
              </Typography>

              <div className="flex flex-col mb-4">
                <Typography variant="body2" className="font-semibold text-gray-700">
                  Features:
                </Typography>
                <ul className="list-disc pl-5 text-gray-600">
                  {subscription.features.map((feature:any, idx:any) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <Typography variant="body2" className="font-semibold text-gray-700">
                    Number of Active Users:
                  </Typography>
                  <Typography variant="body2" className="font-semibold text-gray-700">
                    {subscription.activeUser}
                  </Typography>
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
              </div>
            </Card>
          ))}
        </div>
      
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{isEditing ? 'Edit Subscription' : 'Add Subscription'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Subscription Name"
            fullWidth
            variant="outlined"
            value={currentSubscription.name}
            onChange={(e) => setCurrentSubscription({ ...currentSubscription, name: e.target.value })}
          />

          {/* Dynamic Duration and Price Fields */}
          <Box display="flex" flexDirection="column" gap={2} marginY={2}>
            {currentSubscription.prices.map((priceItem, index) => (
              <Box key={index} display="flex" alignItems="center" gap={2}>
                <FormControl fullWidth>
                  <InputLabel>Duration (Months)</InputLabel>
                  <Select
                    value={priceItem.duration}
                    onChange={(event) => handleDurationChange(index, event)}
                    label="Duration (Months)"
                  >
                    {[1, 3, 6, 9, 12].map((month) => (
                      <MenuItem key={month} value={month}>{month} Month{month > 1 ? 's' : ''}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  label="Price"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={priceItem.price}
                  onChange={(event) => handlePriceChange(index, event)}
                  inputProps={{ min: 0 }}
                />

                {/* Delete Icon to remove the current duration-price entry */}
                <IconButton onClick={() => handleRemovePriceField(index)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            {/* Add button for adding new duration-price entry */}
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              color="primary"
              onClick={handleAddPriceField}
            >
              Add Duration and Price
            </Button>
          </Box>

          {/* Features Field */}
          <TextField
            margin="dense"
            label="Features"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={currentSubscription.features.join(', ')}
            onChange={(e) =>
              setCurrentSubscription({
                ...currentSubscription,
                features: e.target.value.split(', ')
              })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>{isEditing ? 'Update' : 'Save'}</Button>
        </DialogActions>
      </Dialog>
    </AccountSettingsLayout>
  );
};

export default AdminSubscriptionPage;