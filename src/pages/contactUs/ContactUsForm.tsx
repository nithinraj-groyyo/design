import React, { useState } from "react";
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
import { toast } from "react-toastify";
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
    countryId: "",
    subject: "",
    message: "",
  });
  const [file, setFile] = useState<File | null>(null);

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
    <div className="md:w-[65%] bg-white shadow-lg px-10 py-16 rounded-r-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:gap-8">
          <TextField
            label="Name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
            required
            fullWidth
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
            >
              <MenuItem value="">Select Preference</MenuItem>
              <MenuItem value="email">Email</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Phone Number"
            name="phone"
            value={formValues.email}
            onChange={handleInputChange}
            required
            fullWidth
          />

          {/* <FormControl fullWidth>
                        <InputLabel>Country ID</InputLabel>
                        <Select name="countryId" value={formValues.countryId} onChange={handleInputChange} fullWidth>
                            <MenuItem value="">Select Country</MenuItem>
                            <MenuItem value="IN">India</MenuItem>
                        </Select>
                    </FormControl> */}
        </div>
        <TextField
          label="Subject"
          name="subject"
          value={formValues.subject}
          onChange={handleInputChange}
          required
          fullWidth
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
        />
        <Button
          component="label"
          variant="outlined"
          className="!border !border-black !text-black h-12"
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
          className="!bg-black text-white h-12"
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ContactUsForm;
