import { useEffect, useState } from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Grid, 
  Pagination, 
  Button, 
  Box 
} from '@mui/material';
import BasicLayout from '../../layouts/BasicLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  useFetchCategoryListQuery, 
  useFetchSubCategoriesListQuery, 
  useLazyFetchCatalogueListQuery 
} from '../../rtk-query/catalogueApiSlice';

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page
  const token = JSON.parse(localStorage.getItem("authToken") || 'null');

  const [fetchCatalogues, { data, isLoading: isProductLoading }] = useLazyFetchCatalogueListQuery();
  const { data: categories } = useFetchCategoryListQuery(token);
  const { data: subCategories, refetch } = useFetchSubCategoriesListQuery(
    { categoryId: +selectedCategory || 0, token },
    { skip: !selectedCategory }
  );

  const loadCatalogues = async () => {
    const response = await fetchCatalogues(token);
    if (response?.data) {
      setCatalogues(response?.data || []);
    }
  };

  useEffect(() => {
    if (categories && Array.isArray(categories)) {
      setCategoriesListArray(categories.map((cat: any) => ({ id: cat.id, name: cat.name })));
    }
  }, [categories]);

  useEffect(() => {
    if (selectedCategory) {
      refetch?.();
    }
  }, [selectedCategory, refetch]);

  useEffect(() => {
    loadCatalogues();
  }, [selectedCategory, selectedSubcategory]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const filteredCatalogues = catalogues.filter((catalogue) => (
    (selectedCategory === 'All' || catalogue?.category?.id === +selectedCategory) &&
    (selectedSubcategory === 'All' || catalogue?.subCategory?.id === +selectedSubcategory)
  ));

  const totalPages = Math.ceil(filteredCatalogues.length / itemsPerPage);

  const paginatedCatalogues = filteredCatalogues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <BasicLayout>
      {/* Header Section */}
      <Box
        sx={{
          background: '#b8a99a',
          color: '#fff',
          padding: '3rem 1rem',
          textAlign: 'center',
          borderRadius: '0 0 20px 20px',
          marginTop: "10rem"
        }}
        
      >
        <Typography variant="h3" gutterBottom className='!font-bold !tracking-wide text-black'>
          Explore Our Exclusive Catalogue
        </Typography>
        <Typography variant="subtitle1" className='!text-black !mb-6'>
          Discover the best products tailored for your needs.
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          sx={{
            marginTop: '1rem',
            backgroundColor: '#000000',
            color: '#fff',
            textTransform: 'none',
          }}
        >
          Learn More
        </Button>
      </Box>

      {/* Filters Section */}
      <Box sx={{ padding: '2rem', backgroundColor: '#f9f9f9' }}>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white rounded-lg shadow-lg"
            >
              <MenuItem value="All">All</MenuItem>
              {categoriesListArray?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
      </Box>

      {/* Catalogue Cards */}
      <Grid container spacing={3} sx={{ padding: '2rem' }}>
        {paginatedCatalogues.length > 0 ? (
          paginatedCatalogues.map((catalogue) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={catalogue.id}>
              <Link to={`/catalogue/${catalogue.id}`} style={{ textDecoration: 'none' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <Card className="shadow-lg hover:shadow-2xl rounded-xl overflow-hidden">
                    <CardMedia
                      component="img"
                      height="200"
                      image={catalogue.catalogueImages[0]?.signedUrl || ''}
                      alt={catalogue?.name}
                      className="object-cover h-36 w-48"
                    />
                    <CardContent>
                      <Typography variant="h6" className="text-gray-800 font-semibold">
                        {catalogue?.name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {catalogue.description || 'No description available'}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Link>
            </Grid>
          ))
        ) : (
          <Box sx={{ textAlign: 'center', width: '100%', padding: '2rem' }}>
            <Typography variant="h5" color="textSecondary">
              No catalogues available
            </Typography>
          </Box>
        )}
      </Grid>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </Box>
      )}

      {/* Footer */}
      <Box sx={{ padding: '1rem', textAlign: 'center', backgroundColor: '#f1f1f1', marginTop: '2rem' }}>
        <Typography variant="body2" color="textSecondary">
          © 2024 Your Company Name. All rights reserved.
        </Typography>
      </Box>
    </BasicLayout>
  );
};

export default CataloguePage;
