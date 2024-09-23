import { Button, TextField } from '@mui/material';
import React from 'react';

interface Client {
    name: string;
    logo: string | null;
    file: File | null;
}


interface EditFormProps {
    aboutContent: string;
    setAboutContent: (content: string) => void;
    clients: Client[];
    setClients: (clients: Client[]) => void;
}

const EditForm: React.FC<EditFormProps> = ({
    aboutContent,
    setAboutContent,
    clients,
    setClients,
}) => {

    const handleNameChange = (index: number, newName: string) => {
        const updatedClients = [...clients];
        updatedClients[index].name = newName;
        setClients(updatedClients);
    };

    const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const img = new Image();
            const reader = new FileReader();

            reader.onload = (e: any) => {
                img.src = e.target.result;

                img.onload = () => {
                    const updatedClients = [...clients];
                    updatedClients[index].logo = img.src;
                    updatedClients[index].file = file;
                    setClients(updatedClients);
                };
            };

            reader.readAsDataURL(file);
        }
    };

    const handleAddClient = () => {
        setClients([...clients, { name: '', logo: null, file: null }]);
    };

    const handleDeleteClient = (index: number) => {
        const updatedClients = clients.filter((_, i) => i !== index);
        setClients(updatedClients);
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
                onChange={(e) => setAboutContent(e.target.value)}
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

                        <div className="flex items-center">
                            {client.logo ? (
                                <div>
                                    <div>Image Preview:</div>
                                    <img
                                        src={client.logo}
                                        alt="Client Logo Preview"
                                        className="w-[100px] h-auto border"
                                    />
                                </div>
                            ) : (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(index, e)}
                                    className="mb-2"
                                />
                            )}
                        </div>

                        <Button
                            variant="contained"
                            color="secondary"
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


export default EditForm