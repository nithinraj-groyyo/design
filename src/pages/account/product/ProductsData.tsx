import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, MenuItem, Select, FormControl, InputLabel, IconButton, Switch, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useLazyFetchProductsQuery } from '../../../rtk-query/productApiSlice';
import NoDataAvailable from '../../../components/NoDataAvailable';
import { CONSTANT } from '../../../utilities/constants';

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState<{ status?: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(CONSTANT.PAGE_LIMIT);

  const navigate = useNavigate();

  const [fetchProducts, { data, isLoading: isProductLoading }] = useLazyFetchProductsQuery();


  const loadProducts = async () => {
    const response = await fetchProducts({
      page: currentPage,
      limit: itemCount,
    });

    if (response?.data) {
      setProducts(response?.data?.data || []);
      setPageCount(Math.ceil(response?.data?.total / itemCount));
    }
  };


  useEffect(() => {
    loadProducts();
  }, [currentPage, itemCount, filter]);

  const handleEdit = (id: number) => {
    console.log(`Edit product with ID: ${id}`);
  };

  const handleToggle = async (id: number, currentStatus: boolean, productName: string) => {

  };

  const goToEditPage = (product: any) => {
    navigate('/account/edit-product', {
      state: { product },
    });
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
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
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
                          onClick={() => goToEditPage(item)}
                          color="primary"
                          title="Edit product"
                          className='!text-black'
                        >
                          <EditIcon />
                        </IconButton>
                        <Switch
                          title={`${item.status ? 'Disable' : 'Enable'} product`}
                          checked={item.status}
                          onChange={() => handleToggle(item.id, item.status, item?.name)}
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
          <Typography>{data?.total} items total</Typography>
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