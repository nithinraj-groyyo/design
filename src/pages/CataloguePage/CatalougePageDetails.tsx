import { Card, CardContent, CardMedia,Typography } from '@mui/material';
import BasicLayout from '../../layouts/BasicLayout';
import { motion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useRef, useState } from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import FlipBook from './FlipBook';

const catalogues = [
    { id: 1, name: 'Catalogue 1', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Men', subcategory: 'T-Shirts' },
    { id: 2, name: 'Catalogue 2', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Men', subcategory: 'Shirts' },
    { id: 3, name: 'Catalogue 3', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Women', subcategory: 'Dresses' },
    { id: 1, name: 'Catalogue 1', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Men', subcategory: 'T-Shirts' },
    { id: 2, name: 'Catalogue 2', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Men', subcategory: 'Shirts' },
    { id: 3, name: 'Catalogue 3', thumbnail: '/images/catalouges/catalouge1/image1.jpg', category: 'Women', subcategory: 'Dresses' },
];

const pageImages = [
    { src: '/images/catalouges/catalouge1/image1.jpg', alt: 'Fashion cover' },
    { src: '/images/catalouges/catalouge1/image2.jpg', alt: 'About us page' },
    { src: '/images/catalouges/catalouge1/image3.jpg', alt: 'Product categories' },
    { src: '/images/catalouges/catalouge1/image4.jpg', alt: 'Featured products' },
    { src: '/images/catalouges/catalouge1/image5.jpg', alt: 'Best sellers' },
];

const CatalougePageDetails = () => {
    const flipBookRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isPotraitMode, setIsPotraitMode] = useState(false)

    useEffect(() => {
        setTotalPage(pageImages?.length);
    }, [])


    useEffect(() => {
        console.log(currentPage === totalPage - 1, currentPage , totalPage - 1)
        setIsPotraitMode(currentPage === totalPage - 1)

    }, [currentPage, totalPage]);

    useEffect(() => {
        console.log("isMobile:", isMobile, "isPotraitMode:", isPotraitMode);
    }, [isMobile, isPotraitMode]);
    

    const onFlip = (e: any) => {
        setCurrentPage(e.data);
        getCurrentPage();
    };

    const getCurrentPage = () => {
        if (flipBookRef.current) {
            const currentPageIndex = flipBookRef.current.pageFlip().getCurrentPageIndex();
            const totalPageCount = flipBookRef.current.pageFlip().getPageCount();
            console.log("Current Page Index:", currentPageIndex);
            setCurrentPage(currentPageIndex);
            setTotalPage(totalPageCount);
        }
    };

    useEffect(() => {
        const updateScreenOrientation = () => {
            const isPortrait = window.innerHeight > window.innerWidth;
            setIsMobile(window.innerWidth <= 768); 
            setIsPotraitMode(isPortrait); 
        };
    
        updateScreenOrientation();
    
        window.addEventListener("resize", updateScreenOrientation);
        return () => {
            window.removeEventListener("resize", updateScreenOrientation);
        };
    }, []);

    return (
        <BasicLayout>
            <div className="relative flex flex-col gap-8 justify-center items-center p-8 h-screen overflow-hidden mt-[5rem]">
                <div className='flex justify-around w-full mt-10'>
                    <motion.div
                        className="text-3xl font-semibold text-[#fff] flex items-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Catalogue 1
                    </motion.div>
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
                    className={`relative z-10 `}
                    style={{ overflow: 'visible' }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <FlipBook
                        ref={flipBookRef}
                        pageImages={pageImages}
                        isPortrait={isMobile || isPotraitMode}
                        onFlip={onFlip}
                        isMobile={isMobile}
                    />
                    <div className='flex flex-col gap-4'>
                        <div className="text-center text-white mt-4">
                            Click or swipe to flip pages!
                        </div>
                        <div className="flex gap-4 items-center justify-center">
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
                        <div className="flex justify-center">
                            <motion.button
                                className="px-6 py-3 rounded-lg bg-[#ee572f] text-black font-semibold shadow-md focus:outline-none min-w-[10rem]"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                RFQ
                            </motion.button>
                        </div>
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
                                className="w-60"
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
                                        <Typography variant="body2" color="textSecondary">
                                            {catalogue.category} - {catalogue.subcategory}
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
};

export default CatalougePageDetails;
