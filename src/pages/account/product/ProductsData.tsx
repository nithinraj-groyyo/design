import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, MenuItem, Select, FormControl, InputLabel, IconButton, Switch, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useLazyFetchProductsQuery, useUpdateProductStatusMutation } from '../../../rtk-query/productApiSlice';
import NoDataAvailable from '../../../components/NoDataAvailable';
import { CONSTANT, PRODUCT_STATUS } from '../../../utilities/constants';
import { toast } from 'react-toastify';

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState<{ status?: string }>({status: PRODUCT_STATUS.ALL});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(CONSTANT.PAGE_LIMIT);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  const [fetchProducts, { data, isLoading: isProductLoading }] = useLazyFetchProductsQuery();

  function getStatus(val: string) {
    switch (val){
      case PRODUCT_STATUS.ALL:
        return undefined
      case PRODUCT_STATUS.ACTIVE:
        return true
      case PRODUCT_STATUS.INACTIVE:
        return false
      default:
        return undefined;
    }
  }

  const loadProducts = async () => {
    const response = await fetchProducts({
      page: currentPage,
      limit: itemCount,
      isProductActive: getStatus(filter.status ?? PRODUCT_STATUS.ALL)
    });

    if (response?.data) {
      setProducts(response?.data?.data || []);
      setPageCount(Math.ceil(response?.data?.total / itemCount));
      setTotalCount(response?.data?.total)
    }
  };


  useEffect(() => {
    loadProducts();
  }, [currentPage, itemCount, filter]);


  const [updateProductStatus] = useUpdateProductStatusMutation(); 


  const handleToggle = async (id: number, currentStatus: boolean, productName: string) => {
    const newStatus = !currentStatus; 

    try {
      const response = await updateProductStatus({ id, isProductActive: newStatus }).unwrap();

      if(response?.status){
        setProducts((prevProducts:any) =>
          prevProducts.map((product:any) =>
            product.id === id ? { ...product, isProductActive: newStatus } : product
          )
        );
        toast.success(`${productName} is now ${newStatus ? 'enabled' : 'disabled'}`);
        
      }
    } catch (error) {
      console.error(`Error updating product status for ${productName}:`, error);
      setProducts((prevProducts:any) =>
        prevProducts.map((product:any) =>
          product.id === id ? { ...product, isProductActive: currentStatus } : product
        )
      );
    }
  };

  const goToEditPage = (productId: number) => {

    navigate(`/account/edit-product/${productId}`)
    
  };

  const handleStatusFilter = (e: any) => {
    setFilter({ status: e.target.value as string });
    setCurrentPage(1);
  };

  const handleItemsChange = (event: any) => {
    setItemCount(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const renderSkeletonRows = (rowCount: number) => {
    return Array.from({ length: rowCount }).map((_, index) => (
      <Skeleton variant="text" width="100%" height={200} />
    ));
  };

  return (
    <div className="p-4 flex flex-col h-full">
      <div className="mb-4 flex w-full justify-end">
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            value={filter.status || 'all'}
            onChange={handleStatusFilter}
            label="Status"
          >
            <MenuItem value={PRODUCT_STATUS.ALL}>All</MenuItem>
            <MenuItem value={PRODUCT_STATUS.ACTIVE}>Active</MenuItem>
            <MenuItem value={PRODUCT_STATUS.INACTIVE}>Inactive</MenuItem>
          </Select>
        </FormControl>
      </div>

      {isProductLoading ? (
        renderSkeletonRows(CONSTANT.PAGE_LIMIT)
      ) : (
        products?.length > 0 ? (
          <div className="flex-1 overflow-auto">
            <TableContainer style={{ maxHeight: 'calc(100vh - 200px)' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><Typography className='!font-bold text-[1rem]'>Name</Typography></TableCell>
                    <TableCell><Typography className='!font-bold text-[1rem]'>Style Name</Typography></TableCell>
                    <TableCell><Typography className='!font-bold text-[1rem]'>Description</Typography></TableCell>
                    <TableCell><Typography className='!font-bold text-[1rem]'>Image</Typography></TableCell>
                    <TableCell><Typography className='!font-bold text-[1rem] text-center'>Action</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((item: any, index: number) => (
                    <TableRow key={item.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F2F2F2' }}>
                      <TableCell style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '15rem' }}>{item.name}</TableCell>
                      <TableCell style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '15rem' }}>{item.styleName}</TableCell>
                      <TableCell style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.description}</TableCell>
                      <TableCell style={{ minWidth: '7rem' }}>
                        {/* Render the product image */}
                      </TableCell>
                      <TableCell sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} className='!h-32'>
                        <IconButton
                          onClick={() => goToEditPage(item?.id)}
                          color="primary"
                          title="Edit product"
                          className='!text-black'
                        >
                          <EditIcon />
                        </IconButton>
                        <Switch
                          title={`${item.isProductActive ? 'Disable' : 'Enable'} product`}
                          checked={item.isProductActive}
                          onChange={() => handleToggle(item.id, item.isProductActive, item?.name)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <NoDataAvailable />
        )
      )}

      {products.length > 0 && (
        <div className="mt-4 flex justify-between items-center sticky bottom-0 bg-white py-2">
          <Typography>{totalCount} items total</Typography>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
          <div className='flex items-center gap-2'>
            <p>Items Per Page: </p>
            <FormControl>
              <Select
                value={itemCount}
                onChange={handleItemsChange}
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
      )}
    </div>
  );
};

export default ProductTable;