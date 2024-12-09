import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, MenuItem, Select, FormControl, InputLabel, IconButton, Switch, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import NoDataAvailable from '../../../components/NoDataAvailable';
import { CONSTANT, PRODUCT_STATUS } from '../../../utilities/constants';
import { useLazyFetchCatalogueListQuery } from '../../../rtk-query/catalogueApiSlice';
import DownloadIcon from '@mui/icons-material/Download';

const CatalogueTable: React.FC = () => {
    const [catalogues, setCatalogues] = useState([]);
    const [filter, setFilter] = useState<{ status?: string }>({ status: PRODUCT_STATUS.ALL });
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);
    // const [itemCount, setItemCount] = useState<number>(CONSTANT.PAGE_LIMIT);
    const [totalCount, setTotalCount] = useState(0);

    const navigate = useNavigate();
    const token = JSON.parse(localStorage.getItem("authToken") || 'null');

    const [fetchCatalogues, { data, isLoading: isProductLoading }] = useLazyFetchCatalogueListQuery();

    // function getStatus(val: string) {
    //     switch (val) {
    //         case PRODUCT_STATUS.ALL:
    //             return undefined
    //         case PRODUCT_STATUS.ACTIVE:
    //             return true
    //         case PRODUCT_STATUS.INACTIVE:
    //             return false
    //         default:
    //             return undefined;
    //     }
    // }

    const loadCatalogues = async () => {
        const response = await fetchCatalogues(token);
        if (response?.data) {
            setCatalogues(response?.data || []);
            setPageCount(Math.ceil(response?.data?.total));
            // setTotalCount(response?.data?.total)
        }
    };




    useEffect(() => {
        loadCatalogues();
    }, [currentPage, filter]);

    const handleDownload = (url: string) => {
        if (url) {
            window.open(url, '_blank');
        } else {
            console.log("No file URL available.");
        }
    };


    // const [updateProductStatus] = useUpdateProductStatusMutation();


    // const handleToggle = async (id: number, currentStatus: boolean, productName: string) => {
    //     const newStatus = !currentStatus;

    //     try {
    //         const response = await updateProductStatus({ id, isProductActive: newStatus }).unwrap();

    //         if (response?.status) {
    //             setProducts((prevProducts: any) =>
    //                 prevProducts.map((product: any) =>
    //                     product.id === id ? { ...product, isProductActive: newStatus } : product
    //                 )
    //             );
    //             toast.success(`${productName} is now ${newStatus ? 'enabled' : 'disabled'}`);

    //         }
    //     } catch (error) {
    //         console.error(`Error updating product status for ${productName}:`, error);
    //         setProducts((prevProducts: any) =>
    //             prevProducts.map((product: any) =>
    //                 product.id === id ? { ...product, isProductActive: currentStatus } : product
    //             )
    //         );
    //     }
    // };

    // const goToEditPage = (productId: number) => {

    //     navigate(`/account/edit-product/${productId}`)

    // };

    // const handleStatusFilter = (e: any) => {
    //     setFilter({ status: e.target.value as string });
    //     setCurrentPage(1);
    // };

    // const handleItemsChange = (event: any) => {
    //     setItemCount(Number(event.target.value));
    //     setCurrentPage(1);
    // };

    // const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    //     setCurrentPage(value);
    // };

    // const renderSkeletonRows = (rowCount: number) => {
    //     return Array.from({ length: rowCount }).map((_, index) => (
    //         <Skeleton variant="text" width="100%" height={200} />
    //     ));
    // };

    return (
        <div className="p-4 flex flex-col h-full">
            {/* <div className="mb-4 flex w-full justify-end">
                <FormControl>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={filter.status || 'all'}
                        // onChange={handleStatusFilter}
                        label="Status"
                    >
                        <MenuItem value={PRODUCT_STATUS.ALL}>All</MenuItem>
                        <MenuItem value={PRODUCT_STATUS.ACTIVE}>Active</MenuItem>
                        <MenuItem value={PRODUCT_STATUS.INACTIVE}>Inactive</MenuItem>
                    </Select>
                </FormControl>
            </div> */}

            {isProductLoading ? (
                <></>
                // renderSkeletonRows(CONSTANT.PAGE_LIMIT)
            ) : (
                catalogues?.length > 0 ? (
                    <div className="flex-1 overflow-auto">
                        <TableContainer style={{ maxHeight: 'calc(100vh - 200px)' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><Typography className='!font-bold text-[1rem]'>Name</Typography></TableCell>
                                        <TableCell align="center"><Typography className='!font-bold text-[1rem]'>Category</Typography></TableCell>
                                        <TableCell align="center"><Typography className='!font-bold text-[1rem]'>Sub Category</Typography></TableCell>
                                        <TableCell align="center"><Typography className='!font-bold text-[1rem]'>Minimum Quantity</Typography></TableCell>
                                        <TableCell align="center"><Typography className='!font-bold text-[1rem]'>Premium</Typography></TableCell>
                                        <TableCell align="center"><Typography className='!font-bold text-[1rem]'>Active</Typography></TableCell>
                                        <TableCell align="center"><Typography className='!font-bold text-[1rem]'>Description</Typography></TableCell>
                                        <TableCell align="center"><Typography className='!font-bold text-[1rem]'>Thumbnail</Typography></TableCell>
                                        <TableCell align="center"><Typography className='!font-bold text-[1rem]'>Download File</Typography></TableCell>
                                        <TableCell align="center"><Typography className='!font-bold text-[1rem]'>Action</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {catalogues?.map((catalogue: any, catalogueIndex: number) => {
                                        return (
                                            <TableRow key={catalogueIndex} style={{ backgroundColor: catalogueIndex % 2 === 1 ? 'white' : '#F2F2F2' }}>
                                                <TableCell align="center" style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '10rem' }}>{catalogue?.name}</TableCell>
                                                <TableCell align="center" style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '10rem' }}>{catalogue?.category?.name ?? ''}</TableCell>
                                                <TableCell align="center" style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '10rem' }}>{catalogue?.subCategory?.name}</TableCell>
                                                <TableCell align="center" style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '10rem' }}>{catalogue?.minQty}</TableCell>
                                                <TableCell align="center" style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '10rem' }}>{!catalogue?.isPublic ? "true" : "false"}</TableCell>
                                                <TableCell align="center" style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '10rem' }}>{catalogue?.isActive ? "true" : "false"}</TableCell>
                                                <TableCell align="center" style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '10rem' }}>{catalogue?.description}</TableCell>
                                                <TableCell align="center" style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '10rem' }}>
                                                    <img alt='catalogue' src='/images/catalouges/catalouge1/image1.jpg' />
                                                </TableCell>
                                                <TableCell align="center" style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '10rem' }}>
                                                    <IconButton
                                                        onClick={() => handleDownload(catalogue?.originalFile)} 
                                                        color="primary"
                                                        title="Download Catalogue"
                                                        className='!text-black'
                                                    >
                                                        <DownloadIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell align="center" style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '10rem' }}>
                                                    <IconButton
                                                        // onClick={() => goToEditPage(1)}
                                                        onClick={() => navigate(`/account/edit-catalogue/${catalogue.id}`)}
                                                        color="primary"
                                                        title="Edit product"
                                                        className='!text-black'
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>

                        </TableContainer>
                    </div>
                ) : (
                    <NoDataAvailable />
                )
            )}

            {/* {catalogues.length > 0 && (
                <div className="mt-4 flex justify-between items-center sticky bottom-0 bg-white py-2">
                    <Typography>{totalCount} items total</Typography>
                    <Pagination
                        count={pageCount}
                        page={currentPage}
                        // onChange={handlePageChange}
                        variant="outlined"
                        color="primary"
                    />
                    <div className='flex items-center gap-2'>
                        <p>Items Per Page: </p>
                        <FormControl>
                            <Select
                                value={itemCount}
                                // onChange={handleItemsChange}
                                label=""
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={CONSTANT.PAGE_LIMIT}>{CONSTANT.PAGE_LIMIT}</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default CatalogueTable;