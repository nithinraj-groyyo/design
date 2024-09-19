import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { createCartDataResponse } from '../../api/productsApi';
import { setUpdateCartApi } from '../../redux/cartSlice';
import { IAddToCartRequest } from '../../types/cart';

const AddToBagButton = () => {
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

    const handleAddToCart = async () => {
        if (userId === null) {
            toast.success("Kindly Login first, You are being redirected to the Login screen");
            navigate("/login");
        } else {
            try {
                const cartItems: IAddToCartRequest[] = items.map(item => ({
                    userid: userId,
                    productid: productId ?? 0,
                    size: item.sizeName,
                    qantity: item.quantity,
                    price: item.price,
                    color: product?.ProductColours[0]?.Color ?? "",
                    totalPrice: items.reduce((accumulator, item) =>  accumulator + (item.price * item.quantity), 0) 
                }));

                await Promise.all(cartItems.map((item) => createCartDataResponse(item)));

                dispatch(setUpdateCartApi(true));
                setAddToCart(false);
                toast.success("Items added to the cart successfully!");
            } catch (error) {
                console.log(error, "error")
                toast.error("Failed to add items to the cart. Please try again.");
            }
        }
    };

    const handleGoToCart = () => {
        navigate("/bag");
    };

    return (
        <Button 
            variant='outlined' 
            onClick={addToCart ? handleAddToCart : handleGoToCart} 
            className={`border !border-[#111010] w-full !text-[#111010] ${addToCart ? "cursor-not-allowed" : "cursor-pointer"}`}
            disabled={hasQuantity}
        >
            {addToCart ? "Add to Bag" : "Go to Bag"}
        </Button>
    );
};

export default AddToBagButton;
