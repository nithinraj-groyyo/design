import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { addUpdateAddressResponse } from "../../api/userApi";
import { IAddressRequest, IAddressResponse } from "../../types/users";
import { Country, State } from "country-state-city";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address1: Yup.string().required("Address1 is required"),
  address2: Yup.string(),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zip: Yup.string()
    .matches(/^\d+$/, "Zip code must be only digits")
    .required("Zip code is required"),
  phone: Yup.string(),
    // .matches(/^[0-9]+$/, "Phone number must be only digits")
    // .min(10, "Phone number must be at least 10 digits")
    // .required("Phone number is required"),
  landmark: Yup.string(),
  addressType: Yup.string().required("Address type is required"),
});

interface IAddAddressProps {
  setAddAddressModal: (val: boolean) => void;
  address: IAddressResponse | null
}

const AddAddress = ({setAddAddressModal, address}: IAddAddressProps) => {
  const userId = JSON.parse(localStorage.getItem("userId") as string);
  const countries = Country.getAllCountries();
  const [states, setStates] = useState<any[]>([]);

  const formik = useFormik({
    initialValues: {
      name: '',
      address1: '',
      address2: '',
      country: '',
      state: '',
      city: '',
      zip: '',
      phone: '',
      landmark: '',
      addressType: 'Home',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const addressPayload: IAddressRequest = {
          addressId: address ? address?.id : "",
          userId,
          addressName: values.name,
          addressType: values.addressType,
          streetAddress1: values.address1,
          streetAddress2: values.address2 ?? "",
          phone: values.phone,
          landmark: values.landmark ?? "",
          city: values.city,
          state: values.state,
          zip: values.zip,
        };
        
        const response = await addUpdateAddressResponse({ data: addressPayload });

        if (response?.message === "success") {
          toast.success('Address added successfully');
          setAddAddressModal(false);
          window.location.reload();
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
        address1: address.streetAddress1,
        address2: address.streetAddress2,
        country: "India",
        state: address.state,
        city: address.city,
        zip: address.zip?.toString(),
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
                id="address1"
                name="address1"
                label="Address1"
                variant="outlined"
                className="!w-full"
                value={formik.values.address1}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address1 && Boolean(formik.errors.address1)}
                helperText={formik.touched.address1 && formik.errors.address1}
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
              <TextField
                id="address2"
                name="address2"
                label="Address2"
                variant="outlined"
                className="!w-full"
                value={formik.values.address2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address2 && Boolean(formik.errors.address2)}
                helperText={formik.touched.address2 && formik.errors.address2}
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
                id="zip"
                name="zip"
                label="Zip"
                variant="outlined"
                className="!w-full"
                value={formik.values.zip}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.zip && Boolean(formik.errors.zip)}
                helperText={formik.touched.zip && formik.errors.zip}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="font-semibold">Save Address as</div>
          <div className="flex gap-4">
            <div
              className={`border p-2 rounded-full w-[6rem] text-center cursor-pointer ${
                formik.values.addressType === "Home" ? "text-[#A2865B] border border-[#A2865B]" : ""
              }`}
              onClick={() => formik.setFieldValue("addressType", "Home")}
            >
              Home
            </div>
            <div
              className={`border p-2 rounded-full w-[6rem] text-center cursor-pointer ${
                formik.values.addressType === "Work" ? "text-[#A2865B] border border-[#A2865B]" : ""
              }`}
              onClick={() => formik.setFieldValue("addressType", "Work")}
            >
              Work
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-16 mt-8">
          <Button
            variant="contained"
            className="w-[10rem] h-[3rem] !rounded-full !bg-[#a3865b]"
            type="submit"
          >
            <p className="text-base font-semibold">Save</p>
          </Button>
          <Button
            variant="contained"
            className="w-[10rem] h-[3rem] !rounded-full !bg-[#D7B889]"
            onClick={handleCancel}
          >
            <p className="text-base font-semibold">Cancel</p>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default AddAddress;