import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagEmptyIcon from "@mui/icons-material/ShoppingCartOutlined";
import { FormControl, MenuItem, Modal, Select, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import { fetchUserOrdersResponse } from "../../../api/userApi";

const OrderReturns = () => {
  const userId = JSON.parse(localStorage.getItem("userId") as string);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchUserOrdersResponse({userId});
        console.log(response, "response");
      } catch (error) {
        console.error(error, "error");
      }
    }
    fetchOrders();
  }, [])

  return (
    <div className="bg-white p-4 m-4 rounded-lg flex flex-col gap-4">
      <div className="font-semibold">All Orders</div>

      <div className="flex">

        <TextField id="outlined-basic" label="Search by product name/order status..." variant="outlined" className="w-full ">
        </TextField>
        <div className="border border-[#a3865b] rounded-md p-4 flex">
          <SearchIcon className="text-[#a3865b]"/>
          <div className="text-[#a3865b]">Search</div>
        </div>
      </div>

      <div className="bg-[#f1f1f1] flex flex-col ">
        <div className="flex flex-col">
          <div className="flex justify-between px-4 py-2 bg-white mt-4">
            <div className="flex gap-4">
              <div className="rounded-full p-4 bg-[#bfbf2d]">
                <ShoppingBagEmptyIcon />
              </div>
              <div className="flex flex-col">
                <div className="text-[#bfbf2d] font-semibold">
                  Aborted - 7806-731877-0847
                </div>
                <div>On Aug 20, 2024</div>
              </div>
            </div>
            <div
              className="text-[#a3865b] underline cursor-pointer hover:text-base hover:font-bold transition-all duration-200"
              onClick={handleOpen}
            >
              Customer Info
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] bg-white rounded-lg p-4">
                <div className="flex flex-col gap-4">
                  <div className="text-[#a3865b] font-medium text-2xl">
                    Customer Information
                  </div>
                  <Divider />
                  <div>
                    <div className="flex gap-16">
                      <div className="flex flex-col ">
                        <div className="font-normal">Name & Email:</div>
                        <div className="font-normal">Delivery address:</div>
                      </div>
                      <div className="flex flex-col ">
                        <div className="font-thin">
                          esdrft , nithinraj@groyyo.com
                        </div>
                        <div className="font-thin">
                          erdftg, hujiko, yui, tyui, Assam, 878787
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full justify-end ">
                    <div
                      className="border border-[#DB4A31] px-4 py-2 rounded-md text-[#DB4A31] cursor-pointer"
                      onClick={handleClose}
                    >
                      Close
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
            <div className="flex gap-4">
              <div className="">
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                    value={0}
                    onChange={() => {}}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      height: "32px",
                      fontSize: "0.875rem",
                      padding: "4px 12px",
                    }}
                  >
                    <MenuItem value={0}>-Change Order Status-</MenuItem>
                    <MenuItem value={1}>Received</MenuItem>
                    <MenuItem value={2}>Confirmed</MenuItem>
                    <MenuItem value={3}>In-Progress</MenuItem>
                    <MenuItem value={4}>In-Transit</MenuItem>
                    <MenuItem value={5}>Delivered</MenuItem>
                    <MenuItem value={6}>Cancelled</MenuItem>
                    <MenuItem value={7}>Refunded</MenuItem>
                    <MenuItem value={8}>Exchange in Progress</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="flex flex-col mr-8">
                <div className="text-[#bfbf2d] font-semibold">Total</div>
                <div>$1990</div>
              </div>
            </div>
          </div>

          {/* Optional */}
          <div className="flex gap-8 px-4 py-2">
            <div>
              <img
                className="h-[10rem] w-[8rem]"
                src={"/images/products/pic5.png"}
                alt="Image 5"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-semibold">
                Cotton Mesh Printed Shirt Blue Green
              </div>
              <div>
                Luxuriate in the ethereal beauty of LO/OC's Cotton Printed
                Crochet Shirt Crafted with 100% cotton and featuring mesh work,
                this hand-crafted each order to ensure absolute precision and
                quality in every stitch
              </div>
              <div className="w-full">
                <table className="w-full border-collapse">
                  <tbody>
                    <tr>
                      <th className="font-semibold text-left">Size</th>
                      <td>S</td>
                      <td>XL</td>
                      <td>L</td>
                      <td>M</td>
                    </tr>
                    <tr>
                      <th className="font-semibold text-left">Quantity</th>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                      <td>1</td>
                    </tr>
                    <tr>
                      <th className="font-semibold text-left">Price</th>
                      <td>₹1999</td>
                      <td>₹1999</td>
                      <td>₹1999</td>
                      <td>₹1999</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReturns;
