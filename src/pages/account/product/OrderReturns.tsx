import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagEmptyIcon from "@mui/icons-material/ShoppingCartOutlined";
import { FormControl, MenuItem, Modal, Select, TextField } from "@mui/material";
import Divider from "@mui/material/Divider";
import { fetchUserOrdersResponse } from "../../../api/userApi";

const dummyOrders = [
  {
    orderId: "7806-731877-0847",
    orderType: "success",
    date: "Aug 20, 2024",
    customer: {
      name: "Nithin Raj",
      email: "nithinraj@groyyo.com",
      address: "123 Main St, Guwahati, Assam, 781001",
    },
    status: 1,
    total: 1999,
    product: {
      name: "Cotton Mesh Printed Shirt Blue Green",
      description:
        "Luxuriate in the ethereal beauty of this cotton mesh printed shirt featuring high-quality fabric and intricate design.",
      image: "/images/products/pic5.png",
      sizes: ["S", "M", "L", "XL"],
      quantities: [1, 1, 1, 1],
      prices: [1999, 1999, 1999, 1999],
    },
  },
  {
    orderId: "8734-123876-0984",
    orderType: "return",
    date: "Sep 05, 2024",
    customer: {
      name: "John Doe",
      email: "john.doe@example.com",
      address: "123 Example St, Cityville, State, 12345",
    },
    status: 3,
    total: 3500,
    product: {
      name: "Silk Embroidered Dress",
      description:
        "This silk embroidered dress is crafted with fine silk and exquisite embroidery. A perfect blend of style and elegance.",
      image: "/images/products/pic5.png",
      sizes: ["S", "M", "L"],
      quantities: [2, 1, 1],
      prices: [2500, 2500, 2500],
    },
  },
  {
    orderId: "5678-654321-9876",
    orderType: "success",
    date: "Sep 15, 2024",
    customer: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      address: "789 Ocean Blvd, Miami, FL, 33101",
    },
    status: 2,
    total: 4599,
    product: {
      name: "Leather Jacket",
      description:
        "A premium leather jacket made with the finest leather. It combines style with comfort, perfect for any season.",
      image: "/images/products/pic5.png",
      sizes: ["M", "L"],
      quantities: [1, 1],
      prices: [4599, 4599],
    },
  },
  {
    orderId: "9012-654123-4567",
    orderType: "return",
    date: "Sep 25, 2024",
    customer: {
      name: "Robert Brown",
      email: "robert.brown@example.com",
      address: "456 Maple Ave, Springfield, IL, 62701",
    },
    status: 4,
    total: 3200,
    product: {
      name: "Woolen Scarf and Hat Set",
      description:
        "Keep yourself warm with this luxurious woolen scarf and hat set, crafted with the softest wool for ultimate comfort.",
      image: "/images/products/pic5.png",
      sizes: ["One Size"],
      quantities: [1, 1],
      prices: [1600, 1600],
    },
  },
  {
    orderId: "3456-987654-1234",
    orderType: "return",
    date: "Oct 01, 2024",
    customer: {
      name: "Emily Clark",
      email: "emily.clark@example.com",
      address: "987 Elm St, Los Angeles, CA, 90001",
    },
    status: 5,
    total: 2599,
    product: {
      name: "Denim Jeans",
      description:
        "Classic denim jeans, crafted with high-quality fabric for durability and comfort. Perfect for everyday wear.",
      image: "/images/products/pic5.png",
      sizes: ["M", "L", "XL"],
      quantities: [1, 1, 1],
      prices: [2599, 2599, 2599],
    },
  },
];


const OrderReturns = () => {
  const userId = JSON.parse(localStorage.getItem("userId") as string);

  const [open, setOpen] = useState<number | null>(null);
  const handleOpen = (index: number) => setOpen(index);
  const handleClose = () => setOpen(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchUserOrdersResponse({ userId });
        console.log(response, "response");
      } catch (error) {
        console.error(error, "error");
      }
    };
    fetchOrders();
  }, [userId]);

  return (
    <div className="bg-white p-4 m-4 rounded-lg flex flex-col gap-4">
      <div className="font-semibold">All Orders</div>

      <div className="flex">
        <TextField
          id="outlined-basic"
          label="Search by product name/order status..."
          variant="outlined"
          className="w-full"
        />
        <div className="border border-[#a3865b] rounded-md p-4 flex">
          <SearchIcon className="text-[#a3865b]" />
          <div className="text-[#a3865b]">Search</div>
        </div>
      </div>

      <div className="bg-[#f1f1f1] flex flex-col gap-4 p-4 rounded-md">
        {dummyOrders.map((order, index) => (
          <div key={order.orderId} className="flex flex-col ">
            <div className= {`${order.orderType==="success"? "bg-green-100" : "bg-red-100"} rounded-md bg-opacity-50`}>
                <div className="flex justify-between px-4 py-2 bg-white  ">
                  <div className="flex gap-4 ">
                    <div className="rounded-full p-4 bg-[#bfbf2d]">
                      <ShoppingBagEmptyIcon />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[#bfbf2d] font-semibold">
                        Aborted - {order.orderId}
                      </div>
                      <div>On {order.date}</div>
                    </div>
                  </div>
                  <div
                    className="text-[#a3865b] underline cursor-pointer hover:text-base hover:font-bold transition-all duration-200"
                    onClick={() => handleOpen(index)}
                  >
                    Customer Info
                  </div>

                  <Modal
                    open={open === index}
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
                                {order.customer.name} , {order.customer.email}
                              </div>
                              <div className="font-thin">
                                {order.customer.address}
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
                          value={order.status}
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
                      <div>${order.total}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-8 px-4 py-2">
                  <div>
                    <img
                      className="h-[10rem] w-[8rem]"
                      src={order.product.image}
                      alt={order.product.name}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="font-semibold">{order.product.name}</div>
                    <div>{order.product.description}</div>
                    <div className="w-full">
                      <table className="w-full border-collapse">
                        <tbody>
                          <tr>
                            <th className="font-semibold text-left">Size</th>
                            {order.product.sizes.map((size) => (
                              <td key={size}>{size}</td>
                            ))}
                          </tr>
                          <tr>
                            <th className="font-semibold text-left">Quantity</th>
                            {order.product.quantities.map((quantity, idx) => (
                              <td key={idx}>{quantity}</td>
                            ))}
                          </tr>
                          <tr>
                            <th className="font-semibold text-left">Price</th>
                            {order.product.prices.map((price, idx) => (
                              <td key={idx}>₹{price}</td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderReturns;
