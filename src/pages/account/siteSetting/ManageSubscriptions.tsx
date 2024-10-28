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
  IconButton,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';
import {
  useCreateSubscriptionMutation,
  useGetSubscriptionListQuery,
} from '../../../rtk-query/subscriptonApiSlice';

const AdminSubscriptionPage = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const token = JSON.parse(localStorage.getItem("authToken") as string);

  const [currentSubscription, setCurrentSubscription] = useState({
    name: '',
    features: [] as string[],
    prices: [{ duration: 1, price: 0 }]
  });

  // RTK Query hooks
  const [createSubscription] = useCreateSubscriptionMutation();
  const { data: subscriptions, error, isLoading } = useGetSubscriptionListQuery(null);
  console.log(subscriptions,"kkkk")

  const handleOpen = (subscription = null) => {
    setIsEditing(!!subscription);
    setCurrentSubscription(
      subscription || { name: '', features: [], prices: [{ duration: 1, price: 0 }] }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    const payload = {
      name: currentSubscription?.name,
      description: currentSubscription?.features.join(', '), 
      tenuresWithPrices: currentSubscription?.prices.map((d) => ({
        tenurePeriod: d.duration, 
        price: Number(d.price)      
      })),
    };
    
    
    try {
      const response = await createSubscription({ payload, token });
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {subscriptions?.data?.map((subscription: any) => (
    <Card
      key={subscription.id}
      className="p-6 border border-gray-200 rounded-lg bg-white"
    >
      <div className="flex justify-between mb-4">
        <Typography variant="h5" className="text-blue-600 font-semibold">
          {subscription.name}
        </Typography>
        <div className="flex items-center">
          <Typography variant="body2" className="text-gray-600 mr-2">
            Active:
          </Typography>
          <Switch aria-label="Switch demo" defaultChecked={subscription.isActive} color="primary" />
        </div>
      </div>

      <Typography variant="body1" className="mb-4 text-gray-700">
        {subscription.description}
      </Typography>

      {/* Displaying Tenures and Prices */}
      <div className="flex flex-col mb-4">
        <Typography variant="body1" className="font-semibold text-gray-800 mb-2">
          Tenures and Prices:
        </Typography>
        <ul className="list-disc pl-5 text-gray-600">
          {subscription.tenures.map((tenure: any) => (
            <li key={tenure.id} className="flex justify-between mb-1 text-sm">
              <span>{tenure.tenureInMonths} month(s)</span>
              <span className="font-semibold text-gray-800">
                ${tenure.subscriptionPrice.price}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Tooltip title="Edit">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleOpen(subscription)}
            className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white transition"
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