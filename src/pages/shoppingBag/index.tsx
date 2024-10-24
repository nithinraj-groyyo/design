// import BasicLayout from "../../layouts/BasicLayout";
// import ShoppingBagMobileView from "./ShoppingBagMobileView";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import ShoppingBagItem from "./ShoppingBagItem";
// import { getImagesFromUrl } from "../../utilities/helper";
// import ShoppingBagEmptyIcon from "@mui/icons-material/ShoppingCartOutlined";
// import { useNavigate } from "react-router-dom";
// import useFetchUserOrders from "../../hooks/useFetchUsersOrders";
// import useWindowWidth from "../../hooks/useWindowWidth";
// import { processOrder, processPayment } from "../../api/paymentApi";
// import { useEffect, useState } from "react";
// import {
//     getProfileAddressResponse,
//     setDefaultAddressResponse,
// } from "../../api/userApi";
// import { IAddressResponse } from "../../types/users";
// import { toast } from "react-toastify";
// import { Button, Modal, Radio, FormControlLabel, Grid, Typography, Box, Drawer, IconButton } from "@mui/material";
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import ColorOption from "./ColorOptions";
// import VariantsTable from "./VariantsTable";
// import CloseIcon from '@mui/icons-material/Close';

// const savedForLater = [
//     {
//         id: 3,
//         name: "RED SILK PARTY DRESS",
//         price: 999,
//         size: "S",
//         image: "/images/landingPages/landingPage_2_2.png",
//     },
// ];

// const ShoppingBag = () => {
//     //   const userId = JSON.parse(localStorage.getItem("userId") as string);
//     //   const { cart } = useSelector((state: RootState) => state.shoppingBag);
//     //   const [addresses, setAddresses] = useState<IAddressResponse[]>([]);
//     //   const [defaultAddress, setDefaultAddress] = useState<
//     //     IAddressResponse | undefined
//     //   >(undefined);
//     //   const [open, setOpen] = useState(false);
//     //   const [selectedAddress, setSelectedAddress] = useState<any>(null);

//       const navigate = useNavigate();
//       const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//       const [selectedCart, setSelectedCart] = useState<any>()
//     //   const { isMobileView } = useWindowWidth();

//     //   const handleOpen = () => setOpen(true);
//     //   const handleClose = () => setOpen(false);

//     //   const handleAddressChange = async (
//     //     event: React.ChangeEvent<HTMLInputElement>
//     //   ) => {
//     //     const selectedAddressId = +event.target.value;
//     //     setSelectedAddress(selectedAddressId);

//     //     const address = addresses.find(
//     //       (addr: any) => addr.id === selectedAddressId
//     //     );
//     //     if (address) {
//     //       setDefaultAddress(address);
//     //     }

//     //     handleClose();

//     //     await handleSetDefaultAddress(selectedAddressId);
//     //   };

//     //   const handleSetDefaultAddress = async (addressId: number) => {
//     //     try {
//     //       const response = await setDefaultAddressResponse({ addressId });
//     //       if (response) {
//     //         const address = addresses?.find((addr) => addr?.id === addressId);
//     //         if (address) {
//     //           setDefaultAddress(address);
//     //         }
//     //         toast.success("Updated Default Address Successfully");
//     //       }
//     //     } catch (error: any) {
//     //       toast.error("Unable to Set Default Address");
//     //       console.error(error?.message);
//     //     }
//     //   };

//     //   const handleCheckout = async () => {
//     //     const payload = {
//     //       userId,
//     //       paymentRefId: "",
//     //       coupon: "",
//     //       subTotal: cart?.totalPrice,
//     //       tax: 0,
//     //       discount: 0,
//     //       shipmentCost: 0,
//     //       totalAmount: cart?.totalPrice,
//     //       addressId: selectedAddress,
//     //     };

//     //     try {
//     //       const response = await processOrder(payload);

//     //       if (response?.orderNumber) {
//     //         const paymentPayload = {
//     //           orderId: response?.orderNumber,
//     //           totalAmount: cart?.totalPrice,
//     //           billingName: defaultAddress?.addressName,
//     //           billingAddress: defaultAddress?.streetAddress1,
//     //           billingCity: defaultAddress?.city,
//     //           billingState: defaultAddress?.state,
//     //           billingZip: defaultAddress?.zip,
//     //           billingCountry: defaultAddress?.country,
//     //           billingMobileNo: defaultAddress?.phone,
//     //           billingEmail: defaultAddress?.emailId,
//     //         };
//     //         const res = await processPayment(paymentPayload);
//     //         if (res?.payment) {
//     //           // {
//     //           //     "request": "58061f7027f07575dcc2791af4f7d948b3b89957111a80bde8c9df7a5c346ace75b0bfd66bf7cadf35b7d17b70394d798f3b57069c2b36787aee89796da168c7762ba773f3be9560cfeb00d00ad98b8f0a7e8ea74263af3609c6d46706468a19f6b4f4cef614e4df8336b64cac334ef3bbf9fb6a0f691bc6e177c47d3951bb39635d0288b58ab2222f02df7bd7684282b4f61b13c52e2c2796e834e24d5694cb561817a830e549cb66f1812a8c348315d4586e70d851d2581d2b88b57ffb9c43b83d294b4b32eafe7f4c601d3fea506ebb9ad65590048f19be9ad219c4232890b71918cf46a7e196c968bcfc0a12aed95e9eb1ec4b15a33df15e017b0027a6e3fea0a8ff6bc6c4d2f7394fc004369b45aad474cab4b11950793f15f3e73a153ca4da99ac56ceff20acb8c7f6973d652d3a9b26d7dfa75a4732a653165e7edbba1f4102473560fbea8d3a300875c841d5404422a12700bcff267467b7962d4e68e62e492782face46ea8e3426e508a2b2acec0e866e9d2c187d9f53314aa09d389c714f5b6fc8e0f380e166fac835bae063e396c5f9f6104e1a63f4c8c5edae3547f226528ab2ac12a14251c51821320c5839167bafb9e469a6ecbee5063c3a784346ee565cd130c694446811824d6f1256db0ae4940ed59c078fef95393d32e74e74d6774512cbf3a00c093052493c290320a5d733e617c3a4699ebc75a2f724fcbce7f4b9ed159f2d16db204faae0aff046a7dd46f4e2f17fc8ed662ebd13692a6df8008fe0589e95039af1cbd5d0a8775cd5981949075156ffcfb0247025ff9dc94f17febfe082ddb05fc9b4defd62cc659912ee4defb62dd8b931ad5da10c87f39eacb3d90c7000fa45079b77f195fce8aa98ee3a81ea1791563143b5846ec6466e9b1471e1a68a005f8e452af80a",
//     //           //     "access": "AVAN25KJ29CA06NAAC"
//     //           // }
//     //           // toast?.success("Payment Successful")
//     //         }
//     //       }
//     //     } catch (error) {
//     //       console.error(error);
//     //     }
//     //   };

//     //   useFetchUserOrders(userId, false);

//     //   useEffect(() => {
//     //     const fetchUserAddress = async () => {
//     //       try {
//     //         const response = await getProfileAddressResponse({ userId });
//     //         if (response) {
//     //           setAddresses(response?.address);
//     //           const defaultAddr = response?.address?.find(
//     //             (addr: IAddressResponse) => addr?.flag
//     //           );
//     //           setDefaultAddress(defaultAddr || null);
//     //         }
//     //       } catch (error: any) {
//     //         toast.error("Unable to Fetch Addresses");
//     //         console.error(error?.message);
//     //       }
//     //     };
//     //     fetchUserAddress();
//     //   }, []);

//       const handleStartShopping = () => {
//         navigate("/");
//       };

//     const renderEmptyCart = () => (
//         <div className="flex flex-col items-center justify-center min-h-[20vh] text-center">
//             <ShoppingBagEmptyIcon className="text-[5rem] text-gray-400" />
//             <p className="text-2xl font-semibold text-gray-600 mt-4">
//                 Your Shopping Bag is Empty
//             </p>
//             <p className="text-lg text-gray-500 mt-2">
//                 Add items to your bag to see them here
//             </p>
//             <button
//                 className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
//                 onClick={handleStartShopping}
//             >
//                 Start Shopping
//             </button>
//         </div>
//     );

//     return (
//         <BasicLayout>
//             <section className="cart-section flex justify-center items-start min-h-screen mt-[12rem]">
//                 <div className="flex gap-8 justify-center w-[90%]  mx-auto">
//                     <div className="flex flex-col w-3/4">
//                         {
//                             shoppingBag?.length > 0 && (
//                                 <div className="bg-white p-4 mb-6 shadow-md">
//                                     <button className="px-4 py-2 bg-black text-white font-semibold">
//                                         ADD ADDRESS
//                                     </button>
//                                 </div>
//                             )
//                         }

//                         {
//                             shoppingBag?.length > 0 ? (
//                                 <>
//                                     <h2 className="text-lg font-bold mb-2">SHOPPING BAG</h2>
//                                     <div className="bg-white p-6 shadow-md mb-6">
//                                         {shoppingBag.map((bag) => {
//                                             const minVariantsToBeShown = 2
//                                             return (
//                                                 <div
//                                                     key={bag.id}
//                                                     className="flex flex-col justify-between border-b pb-4 mb-4 gap-6"
//                                                 >
//                                                     <div className="flex">
//                                                         <img
//                                                             src={bag.product.image}
//                                                             alt={bag.product.name}
//                                                             className="w-28 h-40 object-cover mr-4"
//                                                         />
//                                                         <div className="flex flex-col gap-2">
//                                                             <h3 className="font-light text-sm">
//                                                                 {bag.product.name}
//                                                             </h3>
//                                                             <p className="text-sm"><CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} />{bag.price}</p>

//                                                             {bag?.cartItemVariants?.length > 0 && (
//                                                                 <div>
//                                                                     <p className="text-xs text-[#646463] font-normal mb-2">Selected Variants:</p>

//                                                                     <div className="flex flex-row gap-3 rounded-lg">
//                                                                         {bag?.cartItemVariants?.slice(0, minVariantsToBeShown).map((cartItemVariant) => {
//                                                                             return (
//                                                                                 <div
//                                                                                     key={cartItemVariant?.id}
//                                                                                     className="flex items-center justify-between bg-white p-2 rounded-lg shadow-md relative cursor-pointer"
//                                                                                     onClick={() => {
//                                                                                         setSelectedCart(bag)
//                                                                                         setIsDrawerOpen(true)
//                                                                                     }}
//                                                                                 >
//                                                                                     <div className="flex items-center gap-2 relative">
//                                                                                         <div
//                                                                                             className="w-8 h-8 rounded-full border-2 border-white shadow-md"
//                                                                                             style={{ backgroundColor: cartItemVariant?.productColor?.color?.name }}
//                                                                                         />
//                                                                                         <p className="text-sm font-medium">
//                                                                                             {cartItemVariant?.productColor?.color?.name} / {cartItemVariant?.productSize?.size?.name}
//                                                                                         </p>
//                                                                                         <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
//                                                                                             x{cartItemVariant?.quantity}
//                                                                                         </div>
//                                                                                     </div>
//                                                                                 </div>
//                                                                             );
//                                                                         })}

//                                                                         {bag?.cartItemVariants?.length > minVariantsToBeShown && (
//                                                                             <div
//                                                                                 className="flex items-center justify-center bg-gray-200 p-2 rounded-lg shadow-md h-auto min-w-28 cursor-pointer"
//                                                                                 onClick={() => {
//                                                                                     setSelectedCart(bag)
//                                                                                     setIsDrawerOpen(true)
//                                                                                 }}
//                                                                             >
//                                                                                 <p className="text-sm font-bold text-center whitespace-nowrap">
//                                                                                     +{bag?.cartItemVariants?.length - minVariantsToBeShown} more
//                                                                                 </p>
//                                                                             </div>
//                                                                         )}
//                                                                     </div>
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                     </div>
//                                                     <div className="flex gap-4">
//                                                         <button className="text-sm text-[#646463]">
//                                                             Buy Later
//                                                         </button>
//                                                         <button className="text-sm text-red-500">Remove</button>
//                                                     </div>
//                                                 <Drawer
//                                                     anchor="right"
//                                                     open={isDrawerOpen}
//                                                     onClose={() => setIsDrawerOpen(false)}
//                                                     PaperProps={{ sx: { width: '50%' } }}
//                                                 >
//                                                     <Box sx={{ p: 2 }}>
//                                                         <Box display="flex" justifyContent="space-between" alignItems="center">
//                                                             <Typography variant="h6">Cart Variants</Typography>
//                                                             <IconButton onClick={() => setIsDrawerOpen(false)}>
//                                                                 <CloseIcon />
//                                                             </IconButton>
//                                                         </Box>

//                                                         <VariantsTable bag={selectedCart} />
//                                                     </Box>
//                                                 </Drawer>
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 </>
//                             ) : renderEmptyCart()
//                         }

//                         <h2 className="text-lg font-bold">Saved For Later</h2>
//                         <div className="bg-white p-6 shadow-md">
//                             {savedForLater.map((product) => (
//                                 <div
//                                     key={product.id}
//                                     className="flex items-center justify-between mt-4"
//                                 >
//                                     <img
//                                         src={product.image}
//                                         alt={product.name}
//                                         className="w-20 h-32 object-cover"
//                                     />
//                                     <div className="flex flex-col gap-2">
//                                         <h3 className="font-light text-sm tracking-widest">
//                                             {product.name}
//                                         </h3>
//                                         <p className="text-sm"><CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} />{product.price}</p>
//                                         <p className="text-xs text-[#646463] font-normal">
//                                             Size: {product.size}
//                                         </p>
//                                     </div>
//                                     <button className="text-sm text-red-500">Remove</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="w-1/4">
//                         <div className="bg-white p-6 shadow-md">
//                             <h2 className="font-bold text-xl mb-4">Subtotal</h2>
//                             <div className="flex justify-between mb-2">
//                                 <span>Subtotal</span>
//                                 <span>
//                                     <CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} />
//                                     {shoppingBag.reduce(
//                                         (total, item) => total + item.price * item.quantity,
//                                         0
//                                     )}
//                                 </span>
//                             </div>
//                             <div className="flex justify-between mb-2">
//                                 <span>Delivery</span>
//                                 <span>Free</span>
//                             </div>
//                             <div className="flex justify-between font-bold mb-6">
//                                 <span>Total</span>
//                                 <span>
//                                     <CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} />
//                                     {shoppingBag.reduce(
//                                         (total, item) => total + item.price * item.quantity,
//                                         0
//                                     )}
//                                 </span>
//                             </div>

//                             <button className="w-full bg-black text-white font-semibold py-2">
//                                 Checkout
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* <section className="xxs:hidden lg:block cart-section mt-[12rem] min-h-[50vh]">
//                 <div className="flex px-6 gap-12">
//                     <div className="flex flex-[3] flex-col gap-2 px-[4rem] ml-[4rem]">
//                         {defaultAddress && (
//                             <>
//                                 <div className="flex justify-between border rounded-md p-4">
//                             <div>
//                                 <div className="flex gap-2">
//                                     <span>Deliver To: </span>
//                                     <span className="font-bold">
//                                         {defaultAddress?.addressName}, {defaultAddress?.zip}
//                                     </span>
//                                 </div>
//                                 <div className="flex gap-1">
//                                     <span>{defaultAddress?.streetAddress1},</span>
//                                     <span>{defaultAddress?.streetAddress2},</span>
//                                     <span>{defaultAddress?.city},</span>
//                                     <span>{defaultAddress?.state}</span>
//                                 </div>
//                             </div>
//                             <div>
//                                 <Button
//                                     className="!border !border-[#C9B79F] !bg-white !text-[#C9B79F]"
//                                     onClick={handleOpen}
//                                 >
//                                     Change Address
//                                 </Button>
//                             </div>
//                         </div>

//                         <Modal open={open} onClose={handleClose}>
//                             <div className="flex justify-center items-center min-h-screen">
//                                 <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
//                                     <h2 className="text-lg font-bold mb-4">Select Address</h2>
//                                     {addresses.map((address) => {
//                                         console.log(selectedAddress, "selectedAddress", address?.id)
//                                         return (
//                                         <FormControlLabel
//                                             key={address.id}
//                                             value={address.id}
//                                             control={
//                                                 <Radio
//                                                     checked={+selectedAddress === +address.id}
//                                                     onChange={handleAddressChange}
//                                                 />
//                                             }
//                                             label={
//                                                 <div>
//                                                     <div>{address.addressName}, {address.zip}</div>
//                                                     <div>{address.streetAddress1}, {address.streetAddress2}, {address.city}, {address.state}</div>
//                                                 </div>
//                                             }
//                                         />
//                                     )})}
//                                     <div className="flex justify-end mt-4">
//                                         <Button onClick={handleClose} className="!bg-[#C9B79F] !text-white">
//                                             Close
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Modal>
//                             </>
//                         )}

//                         <div className="text-[1rem] font-medium text-[#000000] tracking-wider">SHOPPING BAG</div>
//                         {cart?.data?.length > 0 ? (
//                             cart.data.map((cartItem) => (
//                                 <ShoppingBagItem
//                                     key={cartItem.productId}
//                                     imageSrc={getImagesFromUrl(cartItem?.product?.CoverImageLink ?? "")}
//                                     productId={cartItem?.product?.id}
//                                     price={+cartItem?.product?.price}
//                                     productName={cartItem?.product?.name}
//                                     sizes={cartItem?.sizes}
//                                     isAlreadyInWishlist={
//                                         cartItem?.product?.WishLists?.length > 0 &&
//                                         cartItem?.product?.WishLists[0]?.productId === cartItem?.product?.id
//                                     }
//                                     isSavedItem={false}
//                                     product={cartItem}
//                                 />
//                             ))
//                         ) : (
//                             renderEmptyCart()
//                         )}

//                         {cart?.savedItems?.length > 0 && (
//                             <>
//                                 <div className="text-[1rem] font-medium text-[#000000] tracking-wider uppercase mt-8">
//                                     Save For Later
//                                 </div>
//                                 {cart.savedItems.map((savedItem) => (
//                                     <ShoppingBagItem
//                                         key={savedItem?.productId}
//                                         imageSrc={getImagesFromUrl(savedItem?.product?.CoverImageLink ?? "")}
//                                         productId={savedItem?.product?.id}
//                                         price={+savedItem?.product?.price}
//                                         productName={savedItem?.product?.name}
//                                         sizes={savedItem?.sizes}
//                                         isAlreadyInWishlist={
//                                             savedItem?.product?.WishLists?.length > 0 &&
//                                             savedItem?.product?.WishLists[0]?.productId === savedItem?.product?.id
//                                         }
//                                         isSavedItem={true}
//                                         product={savedItem}
//                                     />
//                                 ))}
//                             </>
//                         )}
//                     </div>

//                     {cart?.data?.length > 0 && (
//                         <div className="flex flex-col flex-[1] gap-8">
//                             <div className="flex flex-col gap-2">
//                                 <div className="flex items-center justify-between">
//                                     <p>Subtotal</p>
//                                     <p>
//                                         <span>&#8377; </span>
//                                         {cart?.totalPrice}
//                                     </p>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                     <p>Delivery</p>
//                                     <p>Free</p>
//                                 </div>
//                             </div>
//                             <div>
//                                 <div className="flex items-center justify-between bottom-0">
//                                     <p className="font-semibold text-[1rem] text-[#2D2D2A]">Total</p>
//                                     <p className="font-semibold text-[1rem] text-[#2D2D2A]">
//                                         <span>&#8377; </span>
//                                         {cart?.totalPrice}
//                                     </p>
//                                 </div>
//                                 <div className="text-xs">Tax Included</div>
//                             </div>
//                             <button
//                                 onClick={handleCheckout}
//                                 className="w-[100%] h-[3.5rem] bg-black text-white rounded"
//                             >
//                                 Checkout
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </section> */}

//             {/* {isMobileView && <ShoppingBagMobileView />} */}
//         </BasicLayout>
//     );
// };

// export default ShoppingBag;
import BasicLayout from "../../layouts/BasicLayout";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import {
    removeFromCart,
    moveToSavedForLater,
    setSelectedCart,
    BagItem,
    setCartItems,
} from "../../redux/bagSlice";
import ShoppingBagEmptyIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Box,
    Drawer,
    IconButton,
    Typography,
    Button,
} from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CloseIcon from '@mui/icons-material/Close';
import VariantsTable from "./VariantsTable";
import { useRemoveCartMutation } from "../../rtk-query/cartApiSlice";
import { toast } from "react-toastify";

const ShoppingBag = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem('authToken') as string);

    const { cart } = useSelector(
        (state: RootState) => state.bag
    );

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleStartShopping = () => {
        navigate("/");
    };

    const handleDrawer = (bag: BagItem) => {
        dispatch(setSelectedCart(bag));
        setIsDrawerOpen(true);
    }

    const [removeCart] = useRemoveCartMutation()

    const renderEmptyCart = () => (
        <div className="flex flex-col items-center justify-center min-h-[20vh] text-center">
            <ShoppingBagEmptyIcon className="text-[5rem] text-gray-400" />
            <p className="text-2xl font-semibold text-gray-600 mt-4">
                Your Shopping Bag is Empty
            </p>
            <p className="text-lg text-gray-500 mt-2">
                Add items to your bag to see them here
            </p>
            <button
                className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
                onClick={handleStartShopping}
            >
                Start Shopping
            </button>
        </div>
    );

    const handleRemoveCart = async(productId: number) => {
        // dispatch(removeFromCart(bag.id))
        const response = await removeCart({cartId: cart?.cartId, token, productId}).unwrap();
        if(response?.status){
            toast.success(response?.message)
        }
    }

    return (
        <BasicLayout>
            <section className="cart-section flex justify-center items-start min-h-screen mt-[12rem]">
                <div className="flex gap-8 justify-center w-[90%] mx-auto">
                    <div className="flex flex-col w-3/4">
                        {cart.data.length > 0 && (
                            <div className="bg-white p-4 mb-6 shadow-md">
                                <button className="px-4 py-2 bg-black text-white font-semibold">
                                    ADD ADDRESS
                                </button>
                            </div>
                        )}

                        {cart.data.length > 0 ? (
                            <>
                                <h2 className="text-lg font-bold mb-2">SHOPPING BAG</h2>
                                <div className="bg-white p-6 shadow-md mb-6">
                                    {cart.data.map((bag) => {
                                        const minVariantsToBeShown = 2;
                                        return (
                                            <div
                                                key={bag.id}
                                                className="flex flex-col justify-between border-b pb-4 mb-4 gap-6"
                                            >
                                                <div className="flex">
                                                    <img
                                                        src={bag.product?.imageData?.signedUrl}
                                                        alt={bag.product.name}
                                                        className="w-28 h-40 object-cover mr-4"
                                                    />
                                                    <div className="flex flex-col gap-2">
                                                        <h3 className="font-light text-sm">
                                                            {bag.product.name}
                                                        </h3>
                                                        <p className="text-sm">
                                                            <CurrencyRupeeIcon
                                                                sx={{ fontSize: "inherit" }}
                                                            />
                                                            {Number(bag.unitPrice * bag.totalQuantity)?.toFixed(2)}
                                                        </p>

                                                        {bag.cartItemVariants.length > 0 && (
                                                            <div>
                                                                <p className="text-xs text-[#646463] font-normal mb-2">
                                                                    Selected Variants:
                                                                </p>

                                                                <div className="flex flex-row gap-3 rounded-lg">
                                                                    {bag.cartItemVariants
                                                                        .slice(0, minVariantsToBeShown)
                                                                        .map((cartItemVariant: any) => {
                                                                            return (
                                                                                <div
                                                                                    key={cartItemVariant?.id}
                                                                                    className="flex items-center justify-between bg-white p-2 rounded-lg shadow-md relative cursor-pointer"
                                                                                    onClick={() => handleDrawer(bag)}
                                                                                >
                                                                                    <div className="flex items-center gap-2 relative">
                                                                                        <div
                                                                                            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                                                                                            style={{
                                                                                                backgroundColor:
                                                                                                    cartItemVariant?.productColor
                                                                                                        ?.color?.name,
                                                                                            }}
                                                                                        />
                                                                                        <p className="text-sm font-medium">
                                                                                            {cartItemVariant?.productColor?.color?.name}{" "}
                                                                                            / {cartItemVariant?.productSize?.size?.name}
                                                                                        </p>
                                                                                        <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
                                                                                            x{cartItemVariant?.quantity}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        })}

                                                                    {bag.cartItemVariants.length >
                                                                        minVariantsToBeShown && (
                                                                            <div
                                                                                className="flex items-center justify-center bg-gray-200 p-2 rounded-lg shadow-md h-auto min-w-28 cursor-pointer"
                                                                                onClick={() => handleDrawer(bag)}
                                                                            >
                                                                                <p className="text-sm font-bold text-center whitespace-nowrap">
                                                                                    +{bag.cartItemVariants.length -
                                                                                        minVariantsToBeShown}{" "}
                                                                                    more
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-4">
                                                    <button
                                                        className="text-sm text-[#646463]"
                                                        onClick={() => dispatch(moveToSavedForLater(bag.id))}
                                                    >
                                                        Buy Later
                                                    </button>
                                                    <button
                                                        className="text-sm text-red-500"
                                                        onClick={() => handleRemoveCart(bag?.product?.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <Drawer
                                                    anchor="right"
                                                    BackdropProps={{
                                                        sx: { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                                                    }}
                                                    open={isDrawerOpen}
                                                    onClose={() => setIsDrawerOpen(false)}
                                                    PaperProps={{ sx: { width: "50%" } }}
                                                >
                                                    <Box>
                                                        <Box
                                                            display="flex"
                                                            justifyContent="space-between"
                                                            alignItems="center"
                                                        >
                                                            <Typography variant="h6" sx={{p:2}}>Cart Variants</Typography>
                                                            <IconButton
                                                                onClick={() => setIsDrawerOpen(false)}
                                                            >
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </Box>

                                                        <VariantsTable setIsDrawerOpen={setIsDrawerOpen} />
                                                    </Box>
                                                </Drawer>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            renderEmptyCart()
                        )}
                    </div>

                    <div className="w-1/4">
                        <div className="bg-white p-6 shadow-md">
                            <h2 className="font-bold text-xl mb-4">Subtotal</h2>
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>
                                    <CurrencyRupeeIcon sx={{ fontSize: "inherit" }} />
                                    {cart?.totalPrice.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Delivery</span>
                                <span>Free</span>
                            </div>
                            <div className="flex justify-between font-bold mb-6">
                                <span>Total</span>
                                <span>
                                    <CurrencyRupeeIcon sx={{ fontSize: "inherit" }} />
                                    {cart?.totalPrice.toFixed(2)}
                                </span>
                            </div>

                            <button className="w-full bg-black text-white font-semibold py-2">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </BasicLayout>
    );
};

export default ShoppingBag;