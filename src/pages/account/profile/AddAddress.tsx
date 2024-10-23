import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { IAddressRequest, IAddressResponse } from "../../../types/users";
import { Country, State } from "country-state-city";
import { AddAddressDTO, useAddAddressMutation } from "../../../rtk-query/addressApiSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  // address2: Yup.string(),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zip: Yup.string()
    .matches(/^\d+$/, "Zip code must be only digits")
    .required("Zip code is required"),
  phone: Yup.string(),
  landmark: Yup.string(),
  addressType: Yup.string().required("Address type is required"),
});

interface IAddAddressProps {
  setAddAddressModal: (val: boolean) => void;
  address: IAddressResponse | null
}

const AddAddress = ({ setAddAddressModal, address }: IAddAddressProps) => {
  const userId = JSON.parse(localStorage.getItem("userId") as string);
  const countries = Country.getAllCountries();
  const [states, setStates] = useState<any[]>([]);

  // Use the addAddress mutation
  const [addAddress] = useAddAddressMutation();

  const token = JSON.parse(localStorage.getItem('authToken') as string);

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      country: '',
      state: '',
      city: '',
      postalCode: '',
      phone: '',
      landmark: '',
      addressType: 'Home',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, {resetForm}) => {
      try {
        const addressPayload: AddAddressDTO = {
          street: values.address,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          country: values.country,
          isDefault: values.addressType === "Home", 
          addressType: values.addressType
        };

        const response = await addAddress({body: addressPayload, token}).unwrap();

        if (response?.status) {
          toast.success(response?.message);
          setAddAddressModal(false);
          resetForm()
        }
      } catch (error) {
        console.error('Error adding address:', error);
        toast.error('Failed to add address');
      }
    },
  });

  useEffect(() => {
    if (address) {
      formik.setValues({
        name: address.addressName,
        address: address.streetAddress,
        country: "India",
        state: address.state,
        city: address.city,
        postalCode: address.postalCode?.toString(),
        phone: address.phone,
        landmark: address.landmark,
        addressType: address.addressType,
      });

      const countryData = Country.getAllCountries().find(c => c.name === "India");
      if (countryData) {
        const statesData = State.getStatesOfCountry(countryData.isoCode);
        setStates(statesData);
      }
    }
  }, [address]);

  const handleCountryChange = (event: any) => {
    const country = event.target.value as string;

    const countryData = Country.getAllCountries().find(c => c.name === country);
    if (countryData) {
      const statesData = State.getStatesOfCountry(countryData.isoCode);
      setStates(statesData);
    }
    formik.setFieldValue('country', country);
    formik.setFieldValue('state', '');
  };

  const handleCancel = () => {
    formik.resetForm();
    setAddAddressModal(false);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-4 bg-white m-4 rounded-lg flex flex-col gap-8">
        <div className="font-bold text-lg">Add Address</div>
        <div className="flex gap-8">
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col w-full gap-2">
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                className="!w-full"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <TextField
                id="address"
                name="address"
                label="Address"
                variant="outlined"
                className="!w-full"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <FormControl variant="outlined" className="!w-full">
                <InputLabel>State</InputLabel>
                <Select
                  id="state"
                  name="state"
                  label="State"
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                >
                  {states.map((state) => (
                    <MenuItem key={state.isoCode} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formik.touched.state && formik.errors.state && (
                <div className="text-red-600 text-xs">{formik.errors.state}</div>
              )}
            </div>
            <div className="flex flex-col w-full gap-2">
              <TextField
                id="city"
                name="city"
                label="City"
                variant="outlined"
                className="!w-full"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <TextField
                id="landmark"
                name="landmark"
                label="Landmark"
                variant="outlined"
                className="!w-full"
                value={formik.values.landmark}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.landmark && Boolean(formik.errors.landmark)}
                helperText={formik.touched.landmark && formik.errors.landmark}
              />
            </div>
          </div>
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col w-full gap-2">
              <TextField
                id="phone"
                name="phone"
                label="Phone"
                variant="outlined"
                className="!w-full"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <FormControl variant="outlined" className="!w-full">
                <InputLabel>Country</InputLabel>
                <Select
                  id="country"
                  name="country"
                  label="Country"
                  value={formik.values.country}
                  onChange={handleCountryChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.country && Boolean(formik.errors.country)}
                >
                  {countries?.map((country) => (
                    <MenuItem key={country.isoCode} value={country.name}>
                      {country.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {formik.touched.country && formik.errors.country && (
                <div className="text-red-600 text-xs">{formik.errors.country}</div>
              )}
            </div>
            <div className="flex flex-col w-full gap-2">
              <TextField
                id="zip"
                name="zip"
                label="Zip Code"
                variant="outlined"
                className="!w-full"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                helperText={formik.touched.postalCode && formik.errors.postalCode}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <FormControl variant="outlined" className="!w-full">
                <InputLabel>Address Type</InputLabel>
                <Select
                  id="addressType"
                  name="addressType"
                  label="Address Type"
                  value={formik.values.addressType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.addressType && Boolean(formik.errors.addressType)}
                >
                  <MenuItem value="Home">Home</MenuItem>
                  <MenuItem value="Work">Work</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.addressType && formik.errors.addressType && (
                <div className="text-red-600 text-xs">{formik.errors.addressType}</div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="contained" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add Address
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddAddress;
