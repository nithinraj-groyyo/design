import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@mui/material';
import BasicLayout from '../../layouts/BasicLayout';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const catalogues = [
  { id: 1, name: 'Catalogue 1', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Men', subcategory: 'T-Shirts' },
  { id: 2, name: 'Catalogue 2', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Men', subcategory: 'Shirts' },
  { id: 3, name: 'Catalogue 3', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Women', subcategory: 'Dresses' },
];

const categories = ['All', 'Men', 'Women', 'Kids'];
const subcategories = ['All', 'T-Shirts', 'Shirts', 'Dresses', 'Pants'];

const CataloguePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');

  const filteredCatalogues = catalogues.filter((catalogue) => {
    return (
      (selectedCategory === 'All' || catalogue.category === selectedCategory) &&
      (selectedSubcategory === 'All' || catalogue.subcategory === selectedSubcategory)
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
          <FormControl fullWidth variant="outlined">
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white rounded-lg shadow-lg"
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
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
              {subcategories.map((subcategory) => (
                <MenuItem key={subcategory} value={subcategory}>
                  {subcategory}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </motion.div>

        <Grid container spacing={3}>
          {filteredCatalogues.map((catalogue) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={catalogue.id}>
              <Link to={`/catalogue/${catalogue.id}`} style={{ textDecoration: 'none' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <Card
                    className="shadow-lg hover:shadow-2xl rounded-xl overflow-hidden"
                    style={{ backgroundColor: '#fff' }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={catalogue.thumbnail}
                      alt={catalogue.name}
                      className="object-cover"
                    />
                    <CardContent className="p-4">
                      <Typography variant="h6" component="div" className="text-gray-800 font-semibold">
                        {catalogue.name}
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
