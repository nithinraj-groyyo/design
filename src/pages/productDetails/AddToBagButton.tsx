import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { createCartDataResponse } from '../../api/productsApi';
import { setUpdateCartApi } from '../../redux/cartSlice';
import { IAddToCartRequest } from '../../types/cart';

interface IAddToBagButtonProps {
    totalAmount: number;
    openDrawer: () => void;
}

const AddToBagButton = ({totalAmount, openDrawer}: IAddToBagButtonProps) => {
    const [addToCart, setAddToCart] = useState<boolean>(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {items, productId} = useSelector((state: RootState) => state.productSize);
    const {product} = useSelector((state: RootState) => state.products.singleProductData);
    const [hasQuantity, setHasQuantity] = useState(false);
    const userId = JSON.parse(localStorage.getItem("userId") as string);

    useEffect(() => {
        const hasValidQuantity = items.some(item => item.quantity > 0);
        setHasQuantity(!hasValidQuantity);
    }, [items]);

    useEffect(() => {
        setAddToCart(Boolean(totalAmount))
    } , [totalAmount]);

    const handleVariantsSelection = () => {
        openDrawer()
    }

    // const handleAddToCart = async () => {
    //     if (userId === null) {
    //         // toast.success("Kindly Login first, You are being redirected to the Login screen");
    //         // navigate("/login");
    //     } else {
    //         try {
    //             // const cartItems: IAddToCartRequest[] = items.map(item => ({
    //             //     userid: userId,
    //             //     productid: productId ?? 0,
    //             //     size: item.sizeName,
    //             //     qantity: item.quantity,
    //             //     price: item.price,
    //             //     color: product?.ProductColours[0]?.Color ?? "",
    //             //     totalPrice: items.reduce((accumulator, item) =>  accumulator + (item.price * item.quantity), 0) 
    //             // }));

    //             // await Promise.all(cartItems.map((item) => createCartDataResponse(item)));

    //             // dispatch(setUpdateCartApi(true));
    //             // setAddToCart(false);
    //             // toast.success("Items added to the cart successfully!");
    //         } catch (error) {
    //             // console.log(error, "error")
    //             // toast.error("Failed to add items to the cart. Please try again.");
    //         }
    //     }
    // };

    // const handleGoToCart = () => {
    //     navigate("/bag");
    // };

    return (
        <Button 
            variant='outlined' 
            onClick={handleVariantsSelection} 
            className={`!bg-black w-full cursor-pointer !text-white`}
        >
            Select Your Variants
        </Button>
    );
};

export default AddToBagButton;
