import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});

export const ContactUsForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contactPreference: "",
    phone: "",  
    subject: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg transition duration-300 hover:shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <TextField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
            fullWidth
            className="transition duration-300 focus:!border-black"
          />
          <TextField
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
            fullWidth
            className="transition duration-300 focus:!border-black"
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <FormControl fullWidth>
            <InputLabel id="contact-preference-label">
              Contact Preference
            </InputLabel>
            <Select
              labelId="contact-preference-label"
              name="contactPreference"
              value={formValues.contactPreference}
              onChange={handleInputChange}
              label="Contact Preference"
              fullWidth
              className="transition duration-300 focus:!border-black"
            >
              <MenuItem value="">Select Preference</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="phone">Phone</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Phone Number"
            name="phone"
            value={formValues.phone}
            onChange={handleInputChange}
            required
            fullWidth
            className="transition duration-300 focus:!border-black"
          />
        </div>
        <TextField
          label="Subject"
          name="subject"
          value={formValues.subject}
          onChange={handleInputChange}
          required
          fullWidth
          className="transition duration-300 focus:!border-black"
        />
        <TextField
          label="Message"
          name="message"
          value={formValues.message}
          onChange={handleInputChange}
          required
          fullWidth
          multiline
          rows={4}
          className="transition duration-300 focus:!border-black"
        />
        <Button
          component="label"
          variant="outlined"
          className="!border !border-black !text-black h-12 transition duration-300 hover:!border-gray-500"
          fullWidth
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="!bg-black text-white h-12 transition duration-300 hover:!bg-gray-900"
        >
          Send
        </Button>
      </form>
    </div>
  );
};
