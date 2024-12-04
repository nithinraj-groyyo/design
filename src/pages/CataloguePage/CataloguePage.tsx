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
  Box,
  RadioGroup,
  FormControlLabel,
  Radio
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
          sx={{
            marginTop: '1rem',
            backgroundColor: '#000000',
            color: '#fff',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#333333',
              color: '#fff',
            },
          }}
        >
          RFQ Logs
        </Button>

      </Box>

      <div className='flex'>
        <div className='flex-1 p-4 max-w-fit'>
          <Typography variant="h6" className='!mt-10 !font-semibold'>Categories</Typography>
          <RadioGroup
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubcategory('All');
            }}
          >
            <FormControlLabel value="All" control={<Radio />} label="All Categories" />
            {categoriesListArray.map((category) => (
              <FormControlLabel
                key={category.id}
                value={category.id.toString()}
                control={<Radio />}
                label={category.name}
              />
            ))}
          </RadioGroup>

          <Typography variant="h6" sx={{ marginTop: '1rem' }} className=' !font-semibold'>Subcategories</Typography>
          <RadioGroup
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <FormControlLabel style={{ whiteSpace: "nowrap" }} value="All" control={<Radio />} label="All Subcategories" />
            {subCategories?.map((subcategory: any) => (
              <FormControlLabel
                key={subcategory.id}
                value={subcategory.id.toString()}
                control={<Radio />}
                label={subcategory.name}
              />
            ))}
          </RadioGroup>
        </div>
        <div className='flex flex-col p-8 w-full'>
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
        </div>
      </div>



    </BasicLayout>
  );
};

export default CataloguePage;
