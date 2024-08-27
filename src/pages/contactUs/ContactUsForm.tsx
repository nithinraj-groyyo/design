import React, { useState } from 'react';
import { Button, FormControl, MenuItem, Select, TextField } from '@mui/material';
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

const ContactUsForm = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        contactPreference: '',
        countryId: '',
        queryType: '',
        subject: '',
        message: '',
    });

    const [file, setFile] = useState<File | null>(null);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
    ) => {
        const { name, value } = event.target as { name: string; value: string };
        setFormValues(prevValues => ({
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
        Object.keys(formValues).forEach(key => formData.append(key, formValues[key as keyof typeof formValues]));
        if (file) {
            formData.append('filePath', file);
        }

        try {
            await submitContactForm(formData);
            setFormValues({
                name: '',
                email: '',
                contactPreference: '',
                countryId: '',
                queryType: '',
                subject: '',
                message: '',
            });
            setFile(null);
            toast.success("Submitted Successfully");
        } catch (error) {
            toast.error("Submission Failed");
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3 font-semibold">Help Center</div>
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <div>Name</div>
                    <TextField
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        className="xxs:w-full lg:w-[60%]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div>Email id</div>
                    <TextField
                        name="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                        className="xxs:w-full lg:w-[60%]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div>Contact Preference</div>
                    <FormControl className="w-full">
                        <Select
                            name="contactPreference"
                            value={formValues.contactPreference}
                            onChange={handleInputChange}
                            displayEmpty
                            className="xxs:w-full lg:w-[60%]"
                        >
                            <MenuItem value="poa">POA</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="flex flex-col gap-2">
                    <div>Country ID</div>
                    <FormControl className="w-full">
                        <Select
                            name="countryId"
                            value={formValues.countryId}
                            onChange={handleInputChange}
                            displayEmpty
                            className="xxs:w-full lg:w-[60%]"
                        >
                            <MenuItem value="IN">India</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="flex flex-col gap-2">
                    <div>Query Type</div>
                    <FormControl className="w-full">
                        <Select
                            name="queryType"
                            value={formValues.queryType}
                            onChange={handleInputChange}
                            displayEmpty
                            className="xxs:w-full lg:w-[60%]"
                        >
                            <MenuItem value="jx">JX</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="flex flex-col gap-2">
                    <div>Subject</div>
                    <TextField
                        name="subject"
                        value={formValues.subject}
                        onChange={handleInputChange}
                        className="xxs:w-full lg:w-[60%]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div>Message</div>
                    <TextField
                        name="message"
                        value={formValues.message}
                        onChange={handleInputChange}
                        className="xxs:w-full lg:w-[60%]"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <Button
                        component="label"
                        className="xxs:w-full lg:w-[60%] h-[3.5rem] text-black border shadow-none !bg-black"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                    </Button>
                </div>
                <div>
                    <Button
                        type="submit"
                        variant="contained"
                        className="xxs:w-full lg:w-[60%] h-[3.5rem] !bg-black text-white"
                    >
                        Send
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default ContactUsForm;