import { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Pagination,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Drawer
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import BasicLayout from '../../layouts/BasicLayout';
import { Link, useNavigate } from 'react-router-dom';
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

const CataloguePageMobile = (premiumUser:any) => {
  const [categoriesListArray, setCategoriesListArray] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [catalogues, setCatalogues] = useState<ICatalogue[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const itemsPerPage = 8;
  const token = JSON.parse(localStorage.getItem('authToken') || 'null');
  const navigate = useNavigate();

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
      <div className="flex flex-col md:flex-row mt-[5rem] md:mt-[10rem]">
        {/* Drawer Toggle Button for Mobile */}
        <IconButton
          edge="start"
          className="md:hidden fixed top-4 left-4 z-50"
          color="primary"
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>

        <div className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 p-4 bg-[#f9f9f9] shadow-md">
          <Typography variant="h6" className="!mt-[10rem] !font-semibold">
            Categories
          </Typography>
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
          <Typography variant="h6" className="!mt-10 !font-semibold">
            Subcategories
          </Typography>
          <RadioGroup
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <FormControlLabel value="All" control={<Radio />} label="All Subcategories" />
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

        {/* Drawer for Mobile */}
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          className="md:hidden"
        >
          <Box sx={{ width: 250, padding: 2 }}>
            <IconButton
              edge="end"
              onClick={() => setIsDrawerOpen(false)}
              style={{ float: 'right' }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className="!mt-10 !font-semibold">
              Categories
            </Typography>
            <RadioGroup
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubcategory('All');
                setIsDrawerOpen(false); // Close drawer on selection
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

            <Typography variant="h6" className="!mt-10 !font-semibold">
              Subcategories
            </Typography>
            <RadioGroup
              value={selectedSubcategory}
              onChange={(e) => {
                setSelectedSubcategory(e.target.value);
                setIsDrawerOpen(false); // Close drawer on selection
              }}
            >
              <FormControlLabel value="All" control={<Radio />} label="All Subcategories" />
              {subCategories?.map((subcategory: any) => (
                <FormControlLabel
                  key={subcategory.id}
                  value={subcategory.id.toString()}
                  control={<Radio />}
                  label={subcategory.name}
                />
              ))}
            </RadioGroup>
          </Box>
        </Drawer>

        {/* Catalogue Cards */}
        <div className="flex flex-col w-full">
        <Grid container spacing={3} sx={{ padding: '2rem' }}>
  {paginatedCatalogues.length > 0 ? (
    paginatedCatalogues.map((catalogue) => (
      <Grid item xs={12} sm={6} md={4} lg={3} className="relative" key={catalogue.id}>
        {catalogue.isPublic ? (
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
        ) : (
          <Link to="/services">
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 ml-3 mt-3">
              <div className="text-white font-bold bg-black hover:animate-pulse bg-opacity-70 px-4 py-2 rounded-lg text-lg">
                Upgrade to Premium
              </div>
            </div>
            <Card className="shadow-lg hover:shadow-2xl rounded-xl overflow-hidden blur-sm z-0 relative !bg-orange-200">
              <CardMedia
                component="img"
                height="200"
                image="/images/landingPages/landingPage_1_2.png"
                alt="Premium Content"
                className="object-cover h-36 w-48"
              />
              <CardContent>
                <Typography variant="h6" className="text-gray-800 font-semibold">
                  {catalogue?.name || 'Premium Content'}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {catalogue.description || 'Premium Category'}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        )}
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

export default CataloguePageMobile;
