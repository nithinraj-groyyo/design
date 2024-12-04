import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import BasicLayout from '../../layouts/BasicLayout';
import { motion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useEffect, useRef, useState } from 'react';
import { ArrowForwardIos } from '@mui/icons-material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import FlipBook from './FlipBook';
import { useFetchCatalogueByIdQuery, useLazyFetchCatalogueListQuery } from '../../rtk-query/catalogueApiSlice';

const CatalougePageDetails = () => {
    const flipBookRef = useRef<any>(null);
    const [catalogues, setCatalogues] = useState([]);
    const [pageImages, setPageImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isPotraitMode, setIsPotraitMode] = useState(false);

    const token = JSON.parse(localStorage.getItem('authToken') || 'null');
    const [fetchCatalogues, { data, isLoading: isProductLoading }] = useLazyFetchCatalogueListQuery();

    const { catalogueId } = useParams<{ catalogueId: string }>();

    const { data: catalogueDetials, isLoading, isError, error } = useFetchCatalogueByIdQuery({
        catalogueId: Number(catalogueId),
        token,
    });

    useEffect(() => {
        if (catalogueDetials) {
            console.log('Catalogue Details:', catalogueDetials);
        }
    }, [catalogueDetials]);

    const loadCatalogues = async () => {
        try {
            const response = await fetchCatalogues(token);
            if (response?.data) {
                setCatalogues(response?.data || []);

                if (response.data[0]?.catalogueImages) {
                    const images = response.data[0].catalogueImages.map((image: any) => ({
                        src: image.signedUrl,
                        alt: image.name || 'Catalogue Page',
                    }));
                    setPageImages(images);
                    setTotalPage(images.length);
                }
            } else {
                console.warn('No data received from API.');
            }
        } catch (error) {
            console.error('Error fetching catalogues:', error);
        }
    };

    useEffect(() => {
        loadCatalogues();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();

    const handleNavigation = () => {
        if (catalogueId) {
            navigate(`/rfq/${catalogueId}`);
        } else {
            alert("Catalogue ID is missing!");
        }
    };


    useEffect(() => {
        setIsPotraitMode(currentPage === totalPage - 1);
    }, [currentPage, totalPage]);

    const onFlip = (e: any) => {
        setCurrentPage(e.data);
        getCurrentPage();
    };

    const getCurrentPage = () => {
        if (flipBookRef.current) {
            const currentPageIndex = flipBookRef.current.pageFlip().getCurrentPageIndex();
            const totalPageCount = flipBookRef.current.pageFlip().getPageCount();
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

        window.addEventListener('resize', updateScreenOrientation);
        return () => {
            window.removeEventListener('resize', updateScreenOrientation);
        };
    }, []);

    return (
        <BasicLayout>
            <div className="relative flex flex-col gap-8 justify-center items-center p-8 h-screen overflow-hidden mt-[5rem]">
                <div className="flex justify-center w-full mt-6 gap-10">
                    <motion.div
                        className="text-3xl font-semibold flex items-center text-white"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {catalogueDetials?.name}
                    </motion.div>

                    <div className="flex justify-center">
                        <motion.button
                            className="px-6 py-3 rounded-lg bg-black text-white font-semibold shadow-md focus:outline-none min-w-[10rem]"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            onClick={handleNavigation}
                        >
                            RFQ
                        </motion.button>
                    </div>
                </div>
                <div
                    className="absolute inset-0"
                    style={{
                        // backgroundImage: `url(${catalogueDetials?.catalogueImages[0])}`,
                        backgroundImage: `url(${catalogueDetials?.catalogueImages[0]?.signedUrl})`,
                        // backgroundColor: "red",
                        // backgroundSize: 'cover', 
                        backgroundPosition: 'center',
                        filter: 'blur(15px) brightness(0.6)',
                        zIndex: -1,
                    }}
                ></div>

                <motion.div
                    className="relative z-10"
                    style={{ overflow: 'visible' }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    <FlipBook
                        ref={flipBookRef}
                        pageImages={catalogueDetials?.catalogueImages}
                        isPortrait={isMobile || isPotraitMode}
                        onFlip={onFlip}
                        isMobile={isMobile}
                    />
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col items-center mt-4">
                            <div className="flex justify-center gap-6 items-center">
                                <motion.button
                                    onClick={() =>
                                        flipBookRef.current && flipBookRef.current.pageFlip().flipPrev()
                                    }
                                    className="px-4 py-2 rounded-full bg-white text-black font-semibold shadow-md flex items-center justify-center"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <ArrowBackIosIcon />
                                </motion.button>
                                <motion.button
                                    onClick={() =>
                                        flipBookRef.current && flipBookRef.current.pageFlip().flipNext()
                                    }
                                    className="px-4 py-2 rounded-full bg-white text-black font-semibold shadow-md flex items-center justify-center border border-white"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <ArrowForwardIos />
                                </motion.button>
                            </div>
                            <div className="text-center mt-2 text-white">
                                Click or swipe to flip pages!
                            </div>
                        </div>



                    </div>
                </motion.div>
            </div>
            <div className="flex flex-col gap-6 my-6 p-12">
                <div className="text-xl font-semibold text-gray-800">YOU MAY ALSO LIKE</div>
                <div className="flex gap-6 overflow-x-auto py-4">
                    {catalogues.map((catalogue: any) => {
                        return (
                            <Link
                                to={`/catalogue/${catalogue?.id}`}
                                key={catalogue?.id}
                                style={{ textDecoration: 'none' }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                    className="w-60"
                                >
                                    <Card
                                        className="shadow-lg hover:shadow-2xl rounded-xl overflow-hidden"
                                        style={{ backgroundColor: '#fff' }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={catalogue?.catalogueImages[0]?.signedUrl}
                                            alt={catalogue?.name || 'Catalogue'}
                                            className="object-cover !w-[full] !h-36"
                                        />
                                        <CardContent className="p-4">
                                            <Typography
                                                variant="h6"
                                                component="div"
                                                className="text-gray-800 font-semibold"
                                            >
                                                {catalogue?.name || 'Untitled'}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                            >
                                                {catalogue?.category
                                                    ? `${catalogue?.category?.name}`
                                                    : 'No category available'}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </BasicLayout>
    );
};

export default CatalougePageDetails;
