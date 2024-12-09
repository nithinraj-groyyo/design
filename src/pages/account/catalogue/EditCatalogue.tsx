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
import { useParams, useNavigate } from 'react-router-dom';
import AccountSettingsLayout from '../../../layouts/AccountSettingsLayout';
import {
  useFetchCategoryListQuery,
  useFetchSubCategoriesListQuery,
  useFetchCatalogueByIdQuery,
  useUpdateCatalogueMutation,
} from '../../../rtk-query/catalogueApiSlice';
import { skipToken } from '@reduxjs/toolkit/query';
import { toast } from 'react-toastify';

interface ICategory {
  id: number;
  name: string;
}

const EditCatalogue = () => {
  const { catalogueId } = useParams();
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem('authToken') || 'null');

  const [categoriesListArray, setCategoriesListArray] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const { data: categories } = useFetchCategoryListQuery(token);
  const { data: subCategories, refetch } = useFetchSubCategoriesListQuery(
    { categoryId: selectedCategory || 0, token },
    { skip: !selectedCategory }
  );

  const { data: catalogueDetails, isLoading: isFetchingCatalogue } = useFetchCatalogueByIdQuery(
    catalogueId && token ? { catalogueId: Number(catalogueId), token } : skipToken
  );

  const [updateCatalogue, { isLoading: isUpdating, error }] = useUpdateCatalogueMutation();

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

  useEffect(() => {
    if (selectedCategory) {
      refetch?.();
    }
  }, [selectedCategory, refetch]);

  useEffect(() => {
    if (catalogueDetails) {
      setSelectedCategory(catalogueDetails.category?.id || null);
      setIsActive(catalogueDetails.isActive || false);
      setIsPublic(catalogueDetails.isPublic || false);
    }
  }, [catalogueDetails]);

  const handleCategoryChange = (setFieldValue: any, selectedCategoryId: number) => {
    setSelectedCategory(selectedCategoryId);
    setFieldValue('category', selectedCategoryId);
    setFieldValue('subCategory', '');
  };

  const handleToggleButtons = ({
    method,
    setMethod,
  }: {
    method: boolean;
    setMethod: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    setMethod(!method);
  };

  if (isFetchingCatalogue) return <div>Loading...</div>;

  return (
    <AccountSettingsLayout>
      <AccountSettingsLayout.Header title="Edit Catalogue" />
      <Formik
        initialValues={{
          name: catalogueDetails?.name || '',
          category: catalogueDetails?.category?.id || '',
          subCategory: catalogueDetails?.subCategory?.id || '',
          minQty: catalogueDetails?.minQty || '',
          isPremium: catalogueDetails?.isPublic || false,
          isActive: catalogueDetails?.isActive || false,
          description: catalogueDetails?.description || '',
        }}
        onSubmit={async (values) => {
          try {
            const jsonData = {
              name: values.name,
              minQty: values.minQty,
              description: values.description,
              isPublic: !values.isPremium,
              isActive: !values.isActive,
              categoryId: values.category,
              subCategoryId: values.subCategory,
            };

            if (catalogueId) {
              await updateCatalogue({
                jsonData,
                catalogueId: Number(catalogueId),
                token,
              }).unwrap();
              toast.success('Catalogue updated successfully');
              navigate('/account/catalogue-list');
            }
          } catch (err) {
            console.error('Failed to update catalogue:', err);
            toast.error('Error updating catalogue');
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
                      <TextField
                        {...field}
                        label="Minimum Quantity"
                        fullWidth
                        required
                        type="number"
                      />
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
                <div className="flex gap-6 w-full justify-between">
                  <FormControlLabel
                    className="w-full"
                    control={
                      <Checkbox
                        name="isPremium"
                        checked={!isPublic}
                        onChange={() =>
                          handleToggleButtons({ method: isPublic, setMethod: setIsPublic })
                        }
                      />
                    }
                    label="Is this a premium product?"
                  />
                  <FormControlLabel
                    className="w-full"
                    control={
                      <Checkbox
                        name="isActive"
                        checked={isActive}
                        onChange={() =>
                          handleToggleButtons({ method: isActive, setMethod: setIsActive })
                        }
                      />
                    }
                    label="Is this an Active product?"
                  />
                </div>
                <Field
                  name="description"
                  render={({ field }: any) => (
                    <TextField {...field} label="Description" fullWidth multiline rows={3} required />
                  )}
                />
              </Card>
              <div className="flex justify-end mt-4">
                <Button type="submit" variant="contained" color="primary">
                  {isUpdating ? 'Updating...' : 'Update'}
                </Button>
              </div>
              {error && <p style={{ color: 'red' }}>Error: Please try again later</p>}
            </div>
          </Form>
        )}
      </Formik>
    </AccountSettingsLayout>
  );
};

export default EditCatalogue;
