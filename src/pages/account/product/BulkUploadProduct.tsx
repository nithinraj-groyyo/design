import { Button, IconButton } from '@mui/material';
import React, { useRef, useState } from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { bulkProductUploadResponse } from '../../../api/productsApi';
import { toast } from 'react-toastify';

const BulkUploadProduct: React.FC = () => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState<boolean>(false);

  const removeFile = () => {
    if (ref.current) {
      ref.current.value = "";
      setFile(null);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const inputFile = e.target.files[0];
      setFile(inputFile);
    }
    setUploaded(false);
  };

  const uploadFile = async () => {
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("fileName", file.name);

    try {
      const res = await bulkProductUploadResponse(data);
      if (res.message === "success") {
        removeFile();
        setUploaded(true);
        toast.success("File Uploaded Successfully")
      }
    } catch (error: any) {
      console.error("Error uploading file", error);
      toast.error(error?.message ?? "Error while uploading file")
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white m-4 rounded-lg">
      <div className="flex justify-between">
        <div className="font-bold">Bulk Upload Products</div>
      </div>
      <div>
        <div className="row row-gap-3">
          <div className="col-md-6">
            <label className="form-label">Select File</label>
            <div className="bulk-upload-file">
              <input
                className="form-control form-control-lg border border-black rounded-lg"
                type="file"
                name="bulkProduct"
                accept=".xlsx"
                onChange={handleOnChange}
                ref={ref}
              />
              <button
                disabled={!file}
                onClick={removeFile}
                type="button"
                className="ml-2"
              >
                <IconButton>
                    <CancelIcon />
                </IconButton>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Button
          variant="contained"
          className="w-[10rem] h-[3rem] !rounded-full !bg-[#a3865b] !text-white"
          disabled={!file}
          onClick={uploadFile}
        >
          <p className="text-base font-semibold">Upload</p>
        </Button>
        {uploaded && (
            <div style={{ textAlign: "center" }}>
            <p
                style={{ textDecoration: "underline" }}
                className="text-green-500"
            >
                File uploaded!
            </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default BulkUploadProduct;