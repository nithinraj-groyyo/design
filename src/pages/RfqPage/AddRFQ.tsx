import React, { useRef } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, FormControl, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { useAddRFQMutation } from '../../rtk-query/rfqSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddRFQ = () => {
  const { catalogueId } = useParams<{ catalogueId: any }>();
  const [addRFQ, { isLoading }] = useAddRFQMutation();
  const token = JSON.parse(localStorage.getItem("authToken") as string);

  const fileInputRef = useRef<HTMLInputElement>(null); 

  const validationSchema = Yup.object({
    id: Yup.string(),
    brandName: Yup.string().required('Brand Name is required'),
    country: Yup.string().required('Country is required'),
    minOrderQty: Yup.number().required('Minimum Order Quantity is required'),
    targetCost: Yup.number(),
    designAlterationRequired: Yup.boolean(),
    description: Yup.string().optional().nullable(),
    file: Yup.mixed().optional().nullable(),
  });

  const initialValues = {
    id: catalogueId || '',
    brandName: '',
    country: '',
    minOrderQty: '',
    targetCost: '',
    designAlterationRequired: false,
    description: '',
    file: null,
  };

  const handleSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === 'file' && values[key]) {
          formData.append(key, values[key]);
        } else {

          formData.append(key, values[key] ?? undefined);
        }
      });
      formData.append("catalogueId", catalogueId || "");
      console.log(values,'fefe')

      const payload = {
        "id": values?.id,
        "brandName": values?.brandName,
        "country": values?.country,
        "minOrderQty": values?.minOrderQty,
        "targetCost": values?.targetCost,
        "designAlterationRequired": values?.designAlterationRequired,
        "description": values?.description?.length > 0 ?  values?.description : undefined,
        "file": values?.file
    }
    
      await addRFQ({ formData: payload, token, catalogueId }).unwrap();
      toast.success('RFQ submitted successfully');
      resetForm(); 
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
      }
    } catch (err) {
      console.error('Error submitting RFQ:', err);
      toast.error('Failed to submit RFQ');
    }
  };

  return (
    <div className="p-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Field
                    name="brandName"
                    as={TextField}
                    label="Brand Name"
                    variant="outlined"
                    fullWidth
                    helperText={<ErrorMessage name="brandName" />}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Field
                    name="country"
                    as={TextField}
                    label="Country"
                    variant="outlined"
                    fullWidth
                    helperText={<ErrorMessage name="country" />}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Field
                    name="minOrderQty"
                    as={TextField}
                    label="Minimum Order Quantity"
                    type="number"
                    variant="outlined"
                    fullWidth
                    helperText={<ErrorMessage name="minOrderQty" />}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Field
                    name="targetCost"
                    as={TextField}
                    label="Target Cost"
                    type="number"
                    variant="outlined"
                    fullWidth
                    helperText={<ErrorMessage name="targetCost" />}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl>
                  <FormControlLabel
                    control={
                      <Field
                        name="designAlterationRequired"
                        as={Checkbox}
                        color="primary"
                      />
                    }
                    label="Design Alterations Required"
                  />
                  <ErrorMessage name="designAlterationRequired" component="div" />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Field
                    name="description"
                    as={TextField}
                    label="Description"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    helperText={<ErrorMessage name="description" />}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <input
                    ref={fileInputRef} 
                    type="file"
                    name="file"
                    onChange={(event) => setFieldValue('file', event.target.files?.[0] || null)}
                  />
                  <ErrorMessage name="file" component="div" />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddRFQ;
