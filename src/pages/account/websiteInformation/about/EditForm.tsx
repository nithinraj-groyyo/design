import { Button, TextField, IconButton } from '@mui/material';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ClearIcon from '@mui/icons-material/Clear';
import { Client } from '../../../../reducer/adminAboutControlReducer';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface EditFormProps {
    aboutContent: string;
    clients: Client[];
    dispatch: React.Dispatch<any>;
}

const EditForm: React.FC<EditFormProps> = ({ aboutContent, clients, dispatch }) => {
    const handleNameChange = (index: number, newName: string) => {
        dispatch({ type: 'UPDATE_CLIENT_NAME', index, name: newName });
    };

    const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                dispatch({
                    type: 'UPDATE_CLIENT_LOGO',
                    index,
                    logo: e.target.result,
                    file,
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteClient = (index: number) => {
        dispatch({ type: 'DELETE_CLIENT', index });
    };

    const handleRemoveImage = (index: number) => {
        dispatch({
            type: 'UPDATE_CLIENT_LOGO',
            index,
            logo: null,
            file: null,
        });
    };

    const handleAddClient = () => {
        dispatch({ type: 'ADD_CLIENT' });
    };

    return (
        <div className="py-2 px-4 flex flex-col gap-4">
            <TextField
                multiline
                rows={10}
                id="about-content"
                name="about-content"
                className="p-2"
                fullWidth
                label="About Content"
                value={aboutContent}
                onChange={(e) => dispatch({ type: 'SET_ABOUT_CONTENT', payload: e.target.value })}
            />

            <div className="flex flex-col gap-4">
                <div className="font-bold">Add Clients</div>
                {clients.map((client, index) => (
                    <div key={index} className="flex items-center justify-between gap-4 mb-4 w-full">
                        <TextField
                            name="client-name"
                            id={`client-name-${index}`}
                            label="Client Name"
                            className="w-[20rem]"
                            value={client.name}
                            onChange={(e) => handleNameChange(index, e.target.value)}
                        />

                        <div className="">
                            {client.logo ? (
                                <div className="relative">
                                    <button
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-[0px] right-[-10px] bg-white rounded-full shadow-lg border-2 border-white"
                                    >
                                        <ClearIcon fontSize="small" />
                                    </button>
                                    <img
                                        src={client.logo}
                                        alt="Client Logo Preview"
                                        className="w-[100px] shadow-md p-2"
                                    />
                                </div>
                            ) : (
                                <label htmlFor={`file-upload-${index}`} className="cursor-pointer">
                                    <Button 
                                        variant="outlined" 
                                        startIcon={<AttachFileIcon />} 
                                        component="span"
                                    >
                                        Upload Image
                                    </Button>
                                    <input
                                        id={`file-upload-${index}`}
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(index, e)}
                                        className="hidden"
                                    />
                                </label>
                            )}
                        </div>

                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: 'red',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#cc0000',
                                },
                                '&:active': {
                                    backgroundColor: '#990000',
                                },
                            }}
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteClient(index)}
                        >
                            Delete
                        </Button>
                    </div>
                ))}

                <Button variant="contained" color="primary" onClick={handleAddClient}>
                    Add Client
                </Button>
            </div>
        </div>
    );
};

export default EditForm;
