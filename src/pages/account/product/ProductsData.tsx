import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination, MenuItem, Select, FormControl, InputLabel, IconButton, Switch } from '@mui/material';
import { getAllAdminProductsResponse } from '../../../api/siteAdminApis';
import { useNavigate } from 'react-router-dom';
import { IProductResponse } from '../../../types/products';
import { CONSTANT } from '../../../utilities/constants';
import EditIcon from '@mui/icons-material/Edit';
import { updateProductStatusResponse } from '../../../api/productsApi';
import { toast } from 'react-toastify';

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<IProductResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<{ status?: string }>({});
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [itemCount, setItemCount] = useState<number>(CONSTANT.PAGE_LIMIT);
  const [totalProductCount, setTotalProductCount] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllAdminProductsResponse({
          page: currentPage + 1,
          pageSize: itemCount,
          status: filter.status || 'all',
        });
        setProducts(data?.products?.rows || []);
        setTotalProductCount(data?.products?.count || 0);
        setPageCount(Math.ceil((data?.products?.count || 0) / itemCount));
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filter, currentPage, itemCount]);

  const handleEdit = (id: number) => {
    console.log(`Edit product with ID: ${id}`);
  };

  const handleToggle = async (id: number, currentStatus: boolean, productName: string) => {
    try {
      const response = await updateProductStatusResponse({ id, status: !currentStatus });
      if (response?.message === "success") {
        toast.success(!currentStatus ? `${productName} is Active` : `${productName} is Inactive`);
        setProducts((prev) =>
          prev?.map((p) => (p?.id === id ? { ...p, status: !currentStatus } : p))
        );
      }
    } catch (error: any) {
      console.log(error?.message);
      toast.error(
        error?.message ?? (!currentStatus ? "Unable to activate" : "Unable to deactivate")
      );
    }
  };

  const goToEditPage = (product: IProductResponse) => {
    navigate('/account/edit-product', {
      state: { product },
    });
  };

  const handleStatusFilter = (e: any) => {
    setFilter({ status: e.target.value as string });
    setCurrentPage(0);
  };

  const handleItemsChange = (event: any) => {
    setItemCount(Number(event.target.value));
    setCurrentPage(0);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value - 1);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

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

      {products.length === 0 && (
        <Typography align="center">No product available</Typography>
      )}

      {products.length > 0 && (
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
                {products.map((item, index) => (
                  <TableRow key={item.id} style={{ backgroundColor: index % 2 === 0 ? 'white' : '#F2F2F2' }}>
                    <TableCell style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '15rem' }}>{item.name}</TableCell>
                    <TableCell style={{ wordWrap: 'break-word', whiteSpace: 'normal', minWidth: '15rem' }}>{item.StyleName}</TableCell>
                    <TableCell style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{item.description}</TableCell>
                    <TableCell style={{minWidth:'7rem'}}>
                      {item.ProductImages[0] ? (
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${item.ProductImages[0].filePath}`}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        <img
                          src="/images/products/Pending-upload.png"
                          alt="Upload Pending"
                          title="Upload Pending"
                          className="w-16 h-16 object-cover"
                        />
                      )}
                    </TableCell>
                    <TableCell sx={{display:"flex", alignItems:"center", justifyContent:"center"}} className='!h-32'>
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
      )}

      {products.length > 0 && (
        <div className="mt-4 flex justify-between items-center sticky bottom-0 bg-white py-2">
          <Typography>{totalProductCount} items total</Typography>
          <Pagination
            count={pageCount}
            page={currentPage + 1}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
          <div className='flex items-center gap-2'>
            <p>Items Per Page: </p>
            <FormControl>
              <InputLabel></InputLabel>
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