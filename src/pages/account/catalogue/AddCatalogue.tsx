import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';
import {
  useFetchCategoryListQuery,
  useFetchSubCategoriesListQuery,
  useAddCatalogueMutation,
} from '../../../rtk-query/catalogueApiSlice';
import { toast } from 'react-toastify';

interface ICategory {
  id: number;
  name: string;
}

const AddCatalogue = () => {
  const [categoriesListArray, setCategoriesListArray] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);
  const token = JSON.parse(localStorage.getItem("authToken") as string);

  const { data: categories } = useFetchCategoryListQuery(token);
  const { data: subCategories, refetch } = useFetchSubCategoriesListQuery(
    { categoryId: selectedCategory || 0, token },
    { skip: !selectedCategory }
  );

  const [addCatalogue, { isLoading: isAdding }] = useAddCatalogueMutation();

  useEffect(() => {
    if (categories && Array.isArray(categories)) {
      const formattedCategories = categories.map((cat: Record<string, any>) => ({
        id: cat.id,
        name: cat.name,
      })) as ICategory[];
      setCategoriesListArray(formattedCategories);
    } else {
      setCategoriesListArray([]);
    }
  }, [categories]);

  const handleCategoryChange = (setFieldValue: any, selectedCategoryId: number) => {
    setSelectedCategory(selectedCategoryId);
    setFieldValue('category', selectedCategoryId);
    setFieldValue('subCategory', '');
  };

  const handleToggleButtons = ({ method, setMethod }: { method: boolean; setMethod: React.Dispatch<React.SetStateAction<boolean>> }) => {
    setMethod(!method);
  };

  useEffect(() => {
    if (selectedCategory) {
      refetch?.();
    }
  }, [selectedCategory, refetch]);

  return (
    <AccountSettingsLayout>
      <AccountSettingsLayout.Header title="Add Catalogue" />
      <Formik
        initialValues={{
          name: '',
          category: '',
          subCategory: '',
          minQty: '',
          isPublic: false,
          isActive:false,
          description: '',
          media: null,
        }}
        onSubmit={async (values, { resetForm }) => {
          const formData = new FormData();
          formData.append('name', values.name);
          formData.append('minQty', values.minQty);
          formData.append('description', values.description);
          formData.append('isPublic', values.isPublic ? 'true' : 'false');
          formData.append('isActive', values.isActive ? 'true' : 'false');
          formData.append('category', values.category);
          formData.append('subCategory', values.subCategory);
          if (values.media) {
            formData.append('file', values.media);
          }

          try {
            await addCatalogue({formData,token}).unwrap();
            console.log(formData,"verma")
            toast.success('Catalogue added successfully');
            resetForm();
          } catch (error) {
            console.error('Failed to add catalogue:', error);
            toast.success('Error adding catalogue');
          }
        }}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form>
            <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
              <Card className="p-4 flex flex-col gap-6">

                <div className="flex gap-6">
                  <Field
                    name="name"
                    render={({ field }: any) => (
                      <TextField {...field} label="Name" fullWidth required />
                    )}
                  />
                  <Field
                    name="minQty"
                    render={({ field }: any) => (
                      <TextField {...field} label="Minimum Quantity" fullWidth required type="number" />
                    )}
                  />
                </div>

                <div className="w-full flex gap-6">
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={values.category}
                      label="Category"
                      onChange={(e) => handleCategoryChange(setFieldValue, +e.target.value)}
                      required
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {categoriesListArray.map((cat) => (
                        <MenuItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Subcategory</InputLabel>
                    <Select
                      name="subCategory"
                      label="Sub Category"
                      value={values.subCategory}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="">--Select--</MenuItem>
                      {subCategories &&
                        subCategories.map((subCat: any) => (
                          <MenuItem key={subCat.id} value={subCat.id}>
                            {subCat.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </div>
                <div className='flex gap-6 w-full justify-between'>

                  <FormControlLabel
                    className='w-full'
                    control={
                      <Checkbox
                        name="isPublic"
                        checked={isPublic}
                        onChange={() => handleToggleButtons({ method: isPublic, setMethod: setIsPublic })}
                      />
                    }
                    label="Is this a premium product?"
                  />

                  <FormControlLabel
                    className='w-full'
                    control={
                      <Checkbox
                        name="isActive"
                        checked={isActive}
                        onChange={() => handleToggleButtons({ method: isActive, setMethod: setIsActive })}
                      />
                    }
                    label="Is this an Active product?"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full mb-2">
                  <label htmlFor="upload-media" className="text-gray-700 font-medium">
                    Upload Media
                  </label>
                  <input
                    id="upload-media"
                    type="file"
                    accept=".pdf,.pptx"
                    onChange={(e: any) => setFieldValue('media', e.target.files[0])}
                  />
                  {values.media && (
                    <p className="text-sm text-green-500">File Uploaded</p>
                  )}
                </div>

                <Field
                  name="description"
                  render={({ field }: any) => (
                    <TextField
                      {...field}
                      label="Description"
                      fullWidth
                      multiline
                      rows={3}
                      required
                    />
                  )}
                />
              </Card>

              <div className="flex justify-end mt-4">
                <Button type="submit" variant="contained" color="primary" disabled={isAdding}>
                  {isAdding ? 'Submitting...' : 'Submit'}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </AccountSettingsLayout>
  );
};

export default AddCatalogue;
