import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  address1: Yup.string().required("Address1 is required"),
  address2: Yup.string(),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zip: Yup.string().required("Zip code is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must be only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  landmark: Yup.string(),
  addressType: Yup.string().required("Address type is required"),
});

interface IAddAddressProps {
  setAddAddressModal: (val: boolean) => void
}

const AddAddress = ({setAddAddressModal}: IAddAddressProps) => {
  const navigate = useNavigate();

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
      
        const response = await fetch('/api/add-address', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response) {
          toast.success('Address added successfully');
        } 
      } catch (error) {
        console.error('Error adding address:', error);
        toast.error('Failed to add address')
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm();
    setAddAddressModal(false)
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-4 bg-white m-4 rounded-lg flex flex-col gap-8">
        <div className="font-bold text-lg">Add Address</div>
        <div className="flex gap-8">
          <div className="flex flex-col w-1/2 gap-4">
            <div className="flex flex-col w-full gap-2">
              <div>Name</div>
              <TextField
                id="name"
                name="name"
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
              <div>Address1</div>
              <TextField
                id="address1"
                name="address1"
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
              <div>Country</div>
              <TextField
                id="country"
                name="country"
                variant="outlined"
                className="!w-full"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <div>City</div>
              <TextField
                id="city"
                name="city"
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
              <div>Landmark</div>
              <TextField
                id="landmark"
                name="landmark"
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
              <div>Phone</div>
              <TextField
                id="phone"
                name="phone"
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
              <div>Address2</div>
              <TextField
                id="address2"
                name="address2"
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
              <div>State</div>
              <TextField
                id="state"
                name="state"
                variant="outlined"
                className="!w-full"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <div>Zip</div>
              <TextField
                id="zip"
                name="zip"
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