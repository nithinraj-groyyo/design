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
  Radio
} from '@mui/material';
import BasicLayout from '../../layouts/BasicLayout';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  useFetchCategoryListQuery,
  useFetchSubCategoriesListQuery,
  useLazyFetchCatalogueListQuery
} from '../../rtk-query/catalogueApiSlice';
import CataloguePageMobile from './CataloguePageMobile';
import { useGetSubscriptionInfoQuery } from '../../rtk-query/subscriptonApiSlice';

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
  const itemsPerPage = 8;
  const token = JSON.parse(localStorage.getItem("authToken") || 'null');
  const [isMobile, setIsMobile] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

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
    const updateScreenOrientation = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateScreenOrientation();
    window.addEventListener('resize', updateScreenOrientation);
    return () => {
      window.removeEventListener('resize', updateScreenOrientation);
    };
  }, []);

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

  const [premiumUser, setPremiumUser] = useState<boolean>(true);  
  const { data: subscriptionData = [], error } = useGetSubscriptionInfoQuery({
    token: JSON.parse(localStorage.getItem("authToken") as string),
  });


  useEffect(()=>{
    if(subscriptionData.length===0){
      setPremiumUser(false);
    }else{
      setPremiumUser(true);
    }
  },[subscriptionData])


  const handleRedirectButton = () => {
    navigate("/account/rfq/list");
  };

  const handleOnMouseEnter = () => {
    setIsButtonVisible(true);
  }

  const handleOnMouseLeave = () => {
    setIsButtonVisible(false);
  }

  return (
    isMobile ? (
      <CataloguePageMobile premiumUser={premiumUser}/>
    ) : (
      <BasicLayout>
        <div className="flex">
          <div className="flex-1 p-4 max-w-fit bg-[#f9f9f9] border-r-2 shadow-md mt-[10rem]">
            <Typography variant="h6" className="!mt-10 !font-semibold">Categories</Typography>
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

            <Typography variant="h6" sx={{ marginTop: '1rem' }} className="!font-semibold">Subcategories</Typography>
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

          <div className="flex flex-col w-full">
            <div className="flex flex-col p-8 w-full mt-[10rem]">
              <Grid container spacing={3} sx={{ padding: '2rem' }}>
                {paginatedCatalogues.length > 0 ? (
                  <>
                    {paginatedCatalogues.filter((cat) => cat.isActive).map((catalogue) => (
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
                                alt={catalogue.name}
                                className="object-cover h-36 w-48"
                              />
                              <CardContent>
                                <Typography variant="h6" className="text-gray-800 font-semibold">
                                  {catalogue.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                  {catalogue.description || 'No description available'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </Link>
                      </Grid>
                    ))}

                    { !premiumUser && <Grid item xs={12} sm={6} md={4} lg={3} className="relative" onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave}>
                      {isButtonVisible && <Link to="/services">
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10 ml-3 mt-3 animate-fadeIn">
                          <div className="text-white font-bold bg-black hover:animate-pulse bg-opacity-70 px-4 py-2 rounded-lg text-lg">
                            Upgrade to Premium
                          </div>
                        </div>
                      </Link>}

                      <Card className="shadow-lg hover:shadow-2xl rounded-xl overflow-hidden blur-sm z-0 relative !bg-orange-200 border">
                        <CardMedia
                          component="img"
                          height="200"
                          image="/images/landingPages/landingPage_1_2.png"
                          alt="Premium Content"
                          className="object-cover h-36 w-48"
                        />
                        <CardContent>
                          <Typography variant="h6" className="text-gray-800 font-semibold">
                            Kids Wear Catalogue
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Kids Category
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>}



                  </>
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
        </div>
      </BasicLayout>
    )
  );
};

export default CataloguePage;
