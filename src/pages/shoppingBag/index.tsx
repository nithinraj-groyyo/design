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
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Box,
    Drawer,
    IconButton,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    RadioGroup,
    FormControlLabel,
    Radio,
    CircularProgress,
} from "@mui/material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CloseIcon from '@mui/icons-material/Close';
import VariantsTable from "./VariantsTable";
import { useRemoveCartMutation } from "../../rtk-query/cartApiSlice";
import { toast } from "react-toastify";
import { useGetAddressesQuery, useLazyGetAddressesQuery, useUpdateDefaultAddressMutation } from "../../rtk-query/addressApiSlice";
import { useCreateOrderCheckoutMutation } from "../../rtk-query/orderApiSlice";
import CheckoutButton from "../../components/CheckoutButton";
import { useAddToWishListMutation } from "../../rtk-query/wishlistApiSlice";
import { setWishListTriggered } from "../../redux/wishlistSlice";

const ShoppingBag = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem('authToken') as string);

    const { cart } = useSelector(
        (state: RootState) => state.bag
    );

    const { wishlistTriggered } = useSelector((state: RootState) => state.wishlist)

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [openRemovalDialog, setOpenRemovalDialog] = useState(false);
    const [openAddressSelectionModal, setOpenAddressSelectionModal] = useState(false);

    const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

    const { data: addresses } = useGetAddressesQuery({ token });
    // const [addresses, setAddresses] = useState<any>([])
    const [getAddress] = useLazyGetAddressesQuery();

    useEffect(() => {
        if (token) {
            getAddress({ token })
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [removeCart] = useRemoveCartMutation();
    const [addToWishlist] = useAddToWishListMutation();
    const [updateDefaultAddress] = useUpdateDefaultAddressMutation();
    const [createOrderCheckout, { isLoading: isCheckoutLoading }] = useCreateOrderCheckoutMutation();

    const handleOpenAddressesModal = () => {
        setOpenAddressSelectionModal(true);
        const defaultAddress: any = addresses && addresses?.data?.find((address: any) => address.isDefault);
        if (defaultAddress && defaultAddress?.id) {
            setSelectedAddress(defaultAddress?.id)
        };
    };

    const handleAddressesCloseModal = () => {
        setOpenAddressSelectionModal(false)
    }

    const handleSaveAddress = async () => {
        if (selectedAddress) {
            try {
                const response = await updateDefaultAddress({ addressId: selectedAddress, token }).unwrap();
                if (response?.status) {
                    toast.success(response?.message);
                    setOpenAddressSelectionModal(false);
                }
            } catch (error) {
                console.error('Error updating address:', error);
            }
        }
    };

    const handleAddressChange = (event: any) => {
        setSelectedAddress(Number(event.target.value));
    };
    console.log(addresses, "kekfne")


    const handleClickOpen = () => {
        setOpenRemovalDialog(true);
    };

    const handleClose = () => {
        setOpenRemovalDialog(false);
    };

    const handleConfirmRemove = (productId: number) => {
        handleRemoveCart(productId);
        setOpenRemovalDialog(false);
    };

    const handleStartShopping = () => {
        navigate("/");
    };

    const handleDrawer = (bag: BagItem) => {
        dispatch(setSelectedCart(bag));
        setIsDrawerOpen(true);
    }

    const handleBuyLater = (productId: number) => {
        handleConfirmRemove(productId);
    }

    const handleCheckout = async () => {
        const defaultAddress: any = addresses?.data?.find((address: any) => address.isDefault);

        if (defaultAddress) {
            const payload = {
                cartId: cart?.cartId,
                addressId: defaultAddress?.id,
                phoneNumber: defaultAddress?.phoneNumber
            }
            const response = await createOrderCheckout({ payload, token }).unwrap();
            console.log(response, "response order")
            if (response?.status) {
                toast.success(response?.message);
                handleOrderSuccess()
            }

        } else {
            toast.warn("Select Address before Checkout")
        }
    }

    const [openThanksDialog, setOpenThanksDialog] = useState(false);

    const handleThanksClose = () => {
        setOpenThanksDialog(false);
    };

    const handleOrderSuccess = () => {
        setOpenThanksDialog(true);

    };

    const handleConfirmThanks = () => {
        handleThanksClose();
        navigate('/');
        window.location.reload();
    };

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

    const handleRemoveCart = async (productId: number) => {
        const response = await removeCart({ cartId: cart?.cartId, token, productId }).unwrap();
        if (response?.status) {
            toast.success(response?.message);
            window.location.reload();
            // await addToWishlist({ productId, token });
            // dispatch(setWishListTriggered(!wishlistTriggered));
        }
    }

    return (
        <BasicLayout>
            <section className="cart-section flex justify-center items-start min-h-screen mt-[5rem] md:mt-[10rem]">
                <div className="flex flex-col md:flex-row gap-8 justify-center w-[90%] mx-auto">
                    <div className="flex flex-col w-full lg:w-3/4 px-4">
                        {cart.data.length > 0 && (
                            <div className="bg-white p-4 mb-6 shadow-md">
                                {addresses?.data
                                    ?.filter((address: any) => address?.isDefault)
                                    .map((address: any) => (
                                        <div key={address.id} className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
                                            <div className="flex-[3]">
                                                <div>
                                                    <span>Deliver To: </span>
                                                    <span className="font-semibold">{address?.name}</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span>{address?.street}, </span>
                                                    <span>{address?.city}</span>
                                                </div>
                                                <div className="text-sm">
                                                    <span>{address?.state}, </span>
                                                    <span>{address?.country} </span>
                                                    <span>{address?.postalCode}</span>
                                                </div>
                                            </div>
                                            <div className="flex-[1]">
                                                <Button
                                                    variant="outlined"
                                                    className="!text-black !border !border-black"
                                                    onClick={handleOpenAddressesModal}
                                                >
                                                    Change Address
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                {!addresses?.data?.filter((address: any) => address?.isDefault).length && (
                                    <div className="flex justify-end">
                                        <button
                                            className="px-4 py-2 bg-black text-white font-semibold w-full lg:w-auto"
                                            onClick={() => navigate("/account/address")}
                                        >
                                            ADD ADDRESS
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {cart?.data?.length > 0 ? (
                            <>
                                <h2 className="text-lg lg:text-xl font-bold mb-2">SHOPPING BAG</h2>
                                <div className="bg-white p-4 lg:p-6 shadow-md mb-6">
                                    {cart?.data?.map((bag) => {
                                        const minVariantsToBeShown = 2;
                                        return (
                                            <div key={bag.id} className="flex flex-col border-b pb-4 mb-4 gap-6">
                                                <div className="flex flex-col lg:flex-row gap-4">
                                                    <Link to={`/product-details/${bag?.product?.id}`}>
                                                        <img
                                                            src={bag?.product?.imageData?.signedUrl}
                                                            alt={bag?.product?.name}
                                                            className="w-full lg:w-28 h-auto lg:h-40 object-cover"
                                                        />

                                                    </Link>
                                                    <div className="flex flex-col gap-2">
                                                        <h3 className="font-light text-sm">{bag.product.name}</h3>
                                                        <p className="text-sm">
                                                            <CurrencyRupeeIcon sx={{ fontSize: "inherit" }} />
                                                            {Number(bag.unitPrice * bag.totalQuantity)?.toFixed(2)}
                                                        </p>
                                                        {bag.cartItemVariants.length > 0 && (
                                                            <div>
                                                                <p className="text-xs text-[#646463] font-normal mb-2">
                                                                    Selected Variants:
                                                                </p>
                                                                <div className="flex flex-col lg:flex-row gap-3 rounded-lg">
                                                                    {bag.cartItemVariants
                                                                        .slice(0, minVariantsToBeShown)
                                                                        .map((cartItemVariant: any) => (
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
                                                                                                cartItemVariant?.productColor?.color?.name,
                                                                                        }}
                                                                                    />
                                                                                    <p className="text-sm font-medium">
                                                                                        {cartItemVariant?.productColor?.color?.name} /{" "}
                                                                                        {cartItemVariant?.productSize?.size?.name}
                                                                                    </p>
                                                                                    <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow-md">
                                                                                        x{cartItemVariant?.quantity}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    {bag.cartItemVariants.length > minVariantsToBeShown && (
                                                                        <div
                                                                            className="flex items-center justify-center bg-gray-200 p-2 rounded-lg shadow-md h-auto min-w-28 cursor-pointer"
                                                                            onClick={() => handleDrawer(bag)}
                                                                        >
                                                                            <p className="text-sm font-bold text-center whitespace-nowrap">
                                                                                +{bag.cartItemVariants.length - minVariantsToBeShown} more
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
                                                        className="text-sm text-red-500"
                                                        onClick={handleClickOpen}
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
                                                            <Typography variant="h6" sx={{ p: 2 }}>Cart Variants</Typography>
                                                            <IconButton
                                                                onClick={() => setIsDrawerOpen(false)}
                                                            >
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </Box>

                                                        <VariantsTable setIsDrawerOpen={setIsDrawerOpen} />
                                                    </Box>
                                                </Drawer>
                                                <Dialog
                                                    open={openRemovalDialog}
                                                    onClose={handleClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">{"Remove Item?"}</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Are you sure you want to remove this item from the bag?
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button variant="outlined" className="!border !border-red-500 !text-red-500" onClick={handleClose} color="primary">
                                                            Cancel
                                                        </Button>
                                                        <Button variant="outlined" onClick={() => handleConfirmRemove(bag?.product?.id)} color="primary" autoFocus>
                                                            Confirm
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                                <Dialog
                                                    hideBackdrop
                                                    open={openThanksDialog}

                                                    onClose={handleThanksClose}
                                                    aria-labelledby="alert-dialog-title"
                                                    aria-describedby="alert-dialog-description"
                                                >
                                                    <DialogTitle id="alert-dialog-title">{"Order Successful!"}</DialogTitle>
                                                    <DialogContent>
                                                        <DialogContentText id="alert-dialog-description">
                                                            Thanks for Ordering! You will be redirected to the home page.
                                                        </DialogContentText>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button variant="outlined" onClick={handleConfirmThanks} color="primary" autoFocus>
                                                            Go to Home
                                                        </Button>
                                                    </DialogActions>
                                                </Dialog>
                                                <Dialog
                                                    open={openAddressSelectionModal}
                                                    onClose={handleAddressesCloseModal}
                                                >
                                                    <DialogTitle>Change Address</DialogTitle>
                                                    <DialogContent style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                                                        <RadioGroup value={selectedAddress} onChange={handleAddressChange}>
                                                            {addresses?.data?.map((address: any) => (
                                                                <div key={address.id} className="flex flex-row items-start mb-4">
                                                                    <FormControlLabel
                                                                        value={address.id}
                                                                        control={<Radio checked={selectedAddress === address.id} />}
                                                                        label={
                                                                            <div className="flex flex-col">
                                                                                <div>
                                                                                    <span>Deliver To: </span>
                                                                                    <span className="font-semibold">{address.name}</span>
                                                                                </div>
                                                                                <div className="text-sm">
                                                                                    <span>{address.street}, </span>
                                                                                    <span>{address.city}</span>
                                                                                </div>
                                                                                <div className="text-sm">
                                                                                    <span>{address.state}, </span>
                                                                                    <span>{address.country} </span>
                                                                                    <span>{address.postalCode}</span>
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                    />
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                        <button
                                                            className="px-4 py-2 text-black font-semibold w-full lg:w-auto border border-1 border-black"
                                                            onClick={() => navigate("/account/address")}
                                                        >
                                                            ADD ADDRESS
                                                        </button>
                                                    </DialogContent>
                                                    <DialogActions>
                                                        <Button onClick={handleAddressesCloseModal} color="primary">Cancel</Button>
                                                        <Button onClick={handleSaveAddress} color="primary">Save</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            renderEmptyCart()
                        )}
                    </div>


                    <div className="w-full md:w-1/4 px-4">
                        <div className="bg-white p-4 md:p-6 shadow-md">
                            <h2 className="font-bold text-lg md:text-xl mb-4">Subtotal</h2>
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

                            <button
                                disabled={cart?.data?.length === 0 || isCheckoutLoading}
                                className={`w-full bg-black text-white font-semibold py-2 ${(cart?.data?.length === 0 || isCheckoutLoading) ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                                onClick={handleCheckout}
                            >
                                {isCheckoutLoading ? <CircularProgress /> : "Checkout"}
                            </button>
                        </div>
                    </div>

                </div>
            </section>
        </BasicLayout>
    );
};

export default ShoppingBag;