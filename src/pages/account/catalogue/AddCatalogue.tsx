import { Button, Card, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLoadCategoriesWithPaginationQuery, useLoadSubCategoriesWithIdQuery } from "../../../rtk-query/categoriesApiSlice";
import { Formik, Field, Form } from 'formik';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';

interface ICategory {
  id: number;
  name: string;
}

const AddCatalogue = () => {
  const [categoriesListArray, setCategoriesListArray] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const { data: categories, isLoading: isCategoriesLoading } = useLoadCategoriesWithPaginationQuery({ pageIndex: 0, pageSize: 10 });

  const {
    data: subCategories,
    refetch,
    isLoading: isSubCatLoading,
  } = useLoadSubCategoriesWithIdQuery(
    {
      categoryId: selectedCategory || 0,
      pageIndex: 0,
      pageSize: 10,
    },
    { skip: !selectedCategory }
  );

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
    setFieldValue('subCategory', ''); // Reset subcategory when category changes
  };

  useEffect(() => {
    if (selectedCategory) {
      refetch?.();
    }
  }, [selectedCategory, refetch]);

  return (
    <AccountSettingsLayout>
            <AccountSettingsLayout.Header title='Add Catalogue'>
            </AccountSettingsLayout.Header>
        <Formik
      initialValues={{
        name: '',
        category: '',
        subCategory: '',
        minQty: '',
        noOfFreePages: '',
        isPremium: false,
        description: '',
        media: null,
      }}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('minQty', values.minQty);
        formData.append('description', values.description);
        formData.append('isPublic', values.isPremium ? 'true' : 'false');
        formData.append('categoryId', values.category);
        formData.append('subCategoryId', values.subCategory);
        formData.append('noOfFreePages', values.noOfFreePages);
        if (values.media) {
          formData.append('file', values.media);
        }

        fetch('http://localhost:3000/catalogue/add', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form>
          <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
            <Card className="p-4 flex flex-col gap-4">
              {/* Name Field */}
              <Field
                name="name"
                render={({ field }: any) => (
                  <TextField {...field} label="Name" fullWidth required />
                )}
              />

              {/* Category and Subcategory Fields */}
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
            <div className='flex gap-6'>
                {/* Min Quantity Field */}
                <Field
                    name="minQty"
                    render={({ field }: any) => (
                    <TextField {...field} label="Minimum Quantity" fullWidth required type="number" />
                    )}
                />

                {/* No of Free Pages Field */}
                <Field
                    name="noOfFreePages"
                    render={({ field }: any) => (
                    <TextField {...field} label="Number of Free Pages" fullWidth required type="number" />
                    )}
                />
            </div>

              {/* Premium Checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    name="isPremium"
                    checked={values.isPremium}
                    onChange={handleChange}
                  />
                }
                label="Is this a premium product?"
              />

              {/* Description Field */}
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

              {/* File Upload */}
              <div className="flex flex-col gap-2">
                <label htmlFor="upload-media" className="text-gray-700 font-medium">
                  Upload Media
                </label>
                <input
                  id="upload-media"
                  type="file"
                  accept=".png,.jpeg,.jpg,.webp,.pdf"
                  onChange={(e: any) => setFieldValue('media', e.target.files[0])}
                />
                {values.media && (
                  <p className="text-sm text-green-500">File Uploaded</p>
                )}
              </div>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end mt-4">
              <Button type="submit" variant="contained" color="primary">
                Submit
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
