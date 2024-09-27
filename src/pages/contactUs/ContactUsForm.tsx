import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { toast } from 'react-toastify';
import { submitContactForm } from '../../api/categoriesApi';
import { SelectChangeEvent } from '@mui/material';

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  
  export const ContactUsForm = () => {
    const [formValues, setFormValues] = useState({
      name: "",
      email: "",
      contactPreference: "",
      countryId: "",
      queryType: "",
      subject: "",
      message: "",
    });
  
    const [file, setFile] = useState<File | null>(null);
  
    const handleInputChange = (
      event:
        | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        | SelectChangeEvent<string>
    ) => {
      const { name, value } = event.target as { name: string; value: string };
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        setFile(event.target.files[0]);
      }
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const formData = new FormData();
      Object.keys(formValues).forEach((key) =>
        formData.append(key, formValues[key as keyof typeof formValues])
      );
      if (file) {
        formData.append("filePath", file);
      }
  
      try {
        await submitContactForm(formData);
        setFormValues({
          name: "",
          email: "",
          contactPreference: "",
          countryId: "",
          queryType: "",
          subject: "",
          message: "",
        });
        setFile(null);
        toast.success("Submitted Successfully");
      } catch (error) {
        toast.error("Submission Failed");
        console.error("Error:", error);
      }
    };

    return (
        <>
        <div className="md:w-[65%] bg-white shadow-lg px-10 py-16">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex-1 flex flex-col">
            <TextField
              required
              label="Name"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <div className="flex-1 flex flex-col">
            <TextField
              required
              label="Email ID"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <div className="flex flex-col w-full">
            <FormControl fullWidth>
              <InputLabel id="contact-preference-label">Contact Preference</InputLabel>
              <Select
                labelId="contact-preference-label"
                id="contact-preference"
                name="contactPreference"
                value={formValues.contactPreference}
                label="Contact Preference"
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>Select Preference</em>
                </MenuItem>
                <MenuItem value="poa">POA</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="flex flex-col w-full">
            <FormControl fullWidth>
              <InputLabel id="country-id-label">Country ID</InputLabel>
              <Select
                labelId="country-id-label"
                id="country-id"
                name="countryId"
                value={formValues.countryId}
                label="Country ID"
                onChange={handleInputChange}
              >
                <MenuItem value="">
                  <em>Select Country</em>
                </MenuItem>
                <MenuItem value="IN">India</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="flex flex-col">
          <TextField
            required
            label="Subject"
            name="subject"
            value={formValues.subject}
            onChange={handleInputChange}
            fullWidth
          />
        </div>

        <div className="flex flex-col">
          <TextField
            required
            label="Message"
            name="message"
            value={formValues.message}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={4}
          />
        </div>

        <div className="flex flex-col">
          <Button
            component="label"
            fullWidth
            className="h-[3.5rem] text-black border shadow-none !bg-blue-500"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              type="file"
              onChange={handleFileChange}
            />
          </Button>
        </div>

        <div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            className="h-[3.5rem] !bg-green-700 text-white"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
        </>
    );
};

export default ContactUsForm;