import { useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import BasicLayout from '../../layouts/BasicLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFetchCategoryListQuery, useFetchSubCategoriesListQuery, useLazyFetchCatalogueListQuery } from '../../rtk-query/catalogueApiSlice';

interface ICategory {
  id: number;
  name: string;
}

interface ISubCategory {
  id: number;
  name: string;
}

interface ICatalogue {
  id: number;
  name: string;
  description: string | null;
  minQty: number;
  isPublic: boolean;
  isActive: boolean;
  catalogueImages: { id: number; signedUrl: string }[];
  category: { id: number; name: string; isActive: boolean };
  subCategory: { id: number; name: string; isActive: boolean };
}

const CataloguePage = () => {
  const [categoriesListArray, setCategoriesListArray] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [catalogues, setCatalogues] = useState<ICatalogue[]>([]);
  const token = JSON.parse(localStorage.getItem("authToken") || 'null');

  // Lazy fetch for catalogues
  const [fetchCatalogues, { data, isLoading: isProductLoading }] = useLazyFetchCatalogueListQuery();

  // Fetch categories list
  const { data: categories } = useFetchCategoryListQuery(token);
  
  // Fetch subcategories list based on selected category
  const { data: subCategories, refetch } = useFetchSubCategoriesListQuery(
    { categoryId: +selectedCategory || 0, token },
    { skip: !selectedCategory }
  );

  // Load catalogues based on category and subcategory selection
  const loadCatalogues = async () => {
    const response = await fetchCatalogues(token);
    if (response?.data) {
        setCatalogues(response?.data || []);
    }
};

  // Update categories and subcategories whenever category changes
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
      refetch?.(); // Refetch subcategories if category changes
    }
  }, [selectedCategory, refetch]);

  // Fetch catalogues when category or subcategory changes
  useEffect(() => {
    loadCatalogues();
  }, [selectedCategory, selectedSubcategory]);

  // Filtering catalogues based on selected filters
  const filteredCatalogues = catalogues.filter((catalogue) => {
    return (
      (selectedCategory === 'All' || catalogue?.category?.id === +selectedCategory) &&
      (selectedSubcategory === 'All' || catalogue?.subCategory?.id === +selectedSubcategory)
    );
  });
  

  return (
    <BasicLayout>
      <div className="p-4 sm:p-8 md:p-16 mt-[5rem] md:mt-[10rem] bg-gray-100 min-h-screen">
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Category Filter */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white rounded-lg shadow-lg"
            >
              <MenuItem value="All">All</MenuItem>
              {categoriesListArray?.map((category: any) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Subcategory Filter */}
          <FormControl fullWidth variant="outlined">
            <InputLabel>Subcategory</InputLabel>
            <Select
              value={selectedSubcategory}
              label="Subcategory"
              onChange={(e) => setSelectedSubcategory(e.target.value)}
              className="bg-white rounded-lg shadow-lg"
            >
              <MenuItem value="All">All</MenuItem>
              {subCategories?.map((subcategory: any) => (
                <MenuItem key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </motion.div>

        {/* Catalogues Display */}
        <Grid container spacing={3}>
          {filteredCatalogues.map((catalogue: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={catalogue.id}>
              <Link to={`/catalogue/${catalogue.id}`} style={{ textDecoration: 'none' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <Card className="shadow-lg hover:shadow-2xl rounded-xl overflow-hidden" style={{ backgroundColor: '#fff' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={catalogue.catalogueImages[0].signedUrl}
                      alt={catalogue?.name}
                      className="object-cover h-36 w-48"
                    />
                    <CardContent className="p-4">
                      <Typography variant="h6" component="div" className="text-gray-800 font-semibold">
                        {catalogue?.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </BasicLayout>
  );
};

export default CataloguePage;
