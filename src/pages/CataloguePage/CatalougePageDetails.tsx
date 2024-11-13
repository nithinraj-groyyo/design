import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import HTMLFlipBook from 'react-pageflip';
import BasicLayout from '../../layouts/BasicLayout';
import { motion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useRef, useState } from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CatalougePageDetails = () => {
    const flipBookRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(0); 

    const onFlip = (e: any) => {
        setCurrentPage(e.data);
        // console.log(currentPage," ", isCentered, totalPages, "cccc")

    };

    const totalPages = 5; 
    const isCentered = 
        currentPage === 0 || 
        (currentPage === totalPages - 1 && totalPages % 2 === 0);



    const catalogues = [
        { id: 1, name: 'Catalogue 1', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Men', subcategory: 'T-Shirts' },
        { id: 2, name: 'Catalogue 2', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Men', subcategory: 'Shirts' },
        { id: 3, name: 'Catalogue 3', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Women', subcategory: 'Dresses' },
        { id: 1, name: 'Catalogue 1', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Men', subcategory: 'T-Shirts' },
        { id: 2, name: 'Catalogue 2', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Men', subcategory: 'Shirts' },
        { id: 3, name: 'Catalogue 3', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Women', subcategory: 'Dresses' },
    ]
    return (
        <BasicLayout>
            <div className="relative flex flex-col gap-8 justify-center items-center p-8 h-screen overflow-hidden mt-[5rem]">

                {/* Animated title */}
                <div className='flex justify-around w-full'>
                        <motion.div
                            className="text-3xl font-semibold text-[#fff] flex items-center"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            Catalogue 1
                        </motion.div>
                        <div className="flex">
                            <motion.button
                                className="px-6 py-3 rounded-lg bg-[#ee572f] text-black font-semibold shadow-md focus:outline-none min-w-[10rem]"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                RFQ
                            </motion.button>
                        </div>

                </div>

                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url(/images/landingPages/floralPattern4.png)",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(10px) brightness(0.6)',
                        zIndex: -1
                    }}
                ></div>

                <motion.div
                    className={`relative z-10 ${isCentered ? 'items-center' : ''}`}
                    style={{ overflow: 'visible' }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <HTMLFlipBook
                        style={{}}
                        ref={flipBookRef}
                        startZIndex={1}
                        width={960}
                        height={540}
                        minWidth={700}
                        maxWidth={1200}
                        minHeight={400}
                        maxHeight={675}
                        size="stretch"
                        drawShadow={true}
                        flippingTime={1000}
                        usePortrait={false}
                        startPage={0}
                        autoSize={true}
                        maxShadowOpacity={0.5}
                        showCover={true}
                        mobileScrollSupport={true}
                        clickEventForward={true}
                        useMouseEvents={true}
                        swipeDistance={30}
                        showPageCorners={true}
                        disableFlipByClick={false}
                        className="flipbook"
                        onFlip={onFlip}
                    >
                        <div className="page">
                            <img src="/images/catalouges/catalouge1/image1.jpg" alt="Fashion cover" className="w-full h-full object-cover" />
                        </div>
                        <div className="page">
                            <img src="/images/catalouges/catalouge1/image2.jpg" alt="About us page" className="w-full h-full object-cover" />
                        </div>
                        <div className="page">
                            <img src="/images/catalouges/catalouge1/image3.jpg" alt="Product categories" className="w-full h-full object-cover" />
                        </div>
                        <div className="page">
                            <img src="/images/catalouges/catalouge1/image4.jpg" alt="Featured products" className="w-full h-full object-cover" />
                        </div>
                        <div className="page">
                            <img src="/images/catalouges/catalouge1/image5.jpg" alt="Best sellers" className="w-full h-full object-cover" />
                        </div>
                    </HTMLFlipBook>
                    <div className="text-center text-white mt-4">
                        Click or swipe to flip pages!
                    </div>
                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-4 items-center justify-center">
                        <motion.button
                            onClick={() => flipBookRef.current && flipBookRef.current.pageFlip().flipPrev()}
                            className="px-4 py-2 rounded-full bg-white text-black font-semibold shadow-md"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <ArrowBackIosIcon />
                        </motion.button>
                        <motion.button
                            onClick={() => flipBookRef.current && flipBookRef.current.pageFlip().flipNext()}
                            className="px-4 py-2 rounded-full bg-white text-black font-semibold shadow-md"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <ArrowForwardIos />
                        </motion.button>
                    </div>
                </motion.div>



            </div>
            <div className="flex flex-col gap-6 my-6 p-12">
            <div className="text-xl font-semibold text-gray-800">YOU MAY ALSO LIKE</div>

            <div className="flex gap-6 overflow-x-auto py-4">
                {catalogues.map((catalogue) => (
                    <Link to={`/catalogue/${catalogue.id}`} key={catalogue.id} style={{ textDecoration: 'none' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            className="w-60" // Card width
                        >
                            <Card className="shadow-lg hover:shadow-2xl rounded-xl overflow-hidden" style={{ backgroundColor: '#fff' }}>
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
                ))}
            </div>
        </div>
        </BasicLayout>
    );
}

export default CatalougePageDetails;
