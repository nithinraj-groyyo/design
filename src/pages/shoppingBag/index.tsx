import BasicLayout from '../../layouts/BasicLayout';
import ShoppingBagMobileView from './ShoppingBagMobileView';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import ShoppingBagItem from './ShoppingBagItem';
import { getImagesFromUrl } from '../../utilities/helper';
import ShoppingBagEmptyIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import useFetchUserOrders from '../../hooks/useFetchUsersOrders';
import useWindowWidth from '../../hooks/useWindowWidth';

const ShoppingBag = () => {
    const userId = JSON.parse(localStorage.getItem("userId") as string);
    const { cart } = useSelector((state: RootState) => state.shoppingBag);

    const navigate = useNavigate();

    const {isMobileView } = useWindowWidth();

    const handleCheckout = () => {
        console.log("Checkout");
    };

    useFetchUserOrders(userId, false)

    const handleStartShopping = () => {
        navigate("/")
    }

    const renderEmptyCart = () => (
        <div className="flex flex-col items-center justify-center min-h-[20vh] text-center">
            <ShoppingBagEmptyIcon className="text-[5rem] text-gray-400" />
            <p className="text-2xl font-semibold text-gray-600 mt-4">Your Shopping Bag is Empty</p>
            <p className="text-lg text-gray-500 mt-2">Add items to your bag to see them here</p>
            <button className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800" onClick={handleStartShopping}>
                Start Shopping
            </button>
        </div>
    );

    return (
        <BasicLayout showHeader={!isMobileView}>
            <section className="xxs:hidden lg:block cart-section mt-[12rem] min-h-[50vh]">
                <div className="flex px-6 gap-12">
                    <div className="flex flex-[3] flex-col gap-2 px-[4rem] ml-[4rem]">
                        <div className="text-[1rem] font-medium text-[#000000] tracking-wider">SHOPPING BAG</div>
                        {cart?.data?.length > 0 ? (
                            cart?.data?.map((cartItem) => {
                                 return (
                                    <ShoppingBagItem
                                        key={cartItem.productId}
                                        imageSrc={getImagesFromUrl(cartItem?.product?.CoverImageLink ?? "")}
                                        productId={cartItem?.product?.id}
                                        price={+cartItem?.product?.price}
                                        productName={cartItem?.product?.name}
                                        sizes={cartItem?.sizes}
                                        isAlreadyInWishlist={cartItem?.product?.WishLists?.length > 0 && (cartItem?.product?.WishLists[0]?.productId === cartItem?.product?.id)}
                                        isSavedItem={false}
                                    />
                                )})
                        ) : (
                            renderEmptyCart() 
                        )}

                        {cart?.savedItems?.length > 0 && (
                            <>
                                <div className="text-[1rem] font-medium text-[#000000] tracking-wider uppercase mt-8">
                                    Save For Later
                                </div>
                                {cart?.savedItems?.map((savedItem) => (
                                    <ShoppingBagItem
                                        key={savedItem?.productId}
                                        imageSrc={getImagesFromUrl(savedItem?.product?.CoverImageLink ?? "")}
                                        productId={savedItem?.product?.id}
                                        price={+savedItem?.product?.price}
                                        productName={savedItem?.product?.name}
                                        sizes={savedItem?.sizes}
                                        isAlreadyInWishlist={savedItem?.product?.WishLists?.length > 0 && (savedItem?.product?.WishLists[0]?.productId === savedItem?.product?.id)}
                                        isSavedItem={true}
                                    />
                                ))}
                            </>
                        )}
                    </div>
                    {cart?.data?.length > 0 && (
                        <div className="flex flex-col flex-[1] gap-8">
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <p>Subtotal</p>
                                    <p>
                                        <span>&#8377; </span>
                                        {cart?.totalPrice}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <p>Delivery</p>
                                    <p>Free</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between bottom-0">
                                    <p className="font-semibold text-[1rem] text-[#2D2D2A]">Total</p>
                                    <p className="font-semibold text-[1rem] text-[#2D2D2A]">
                                        <span>&#8377; </span>
                                        {cart?.totalPrice}
                                    </p>
                                </div>
                                <div className="text-xs">Tax Included</div>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-[100%] h-[3.5rem] bg-black text-white rounded"
                            >
                                Checkout
                            </button>
                        </div>
                    )}
                </div>
            </section>
            {isMobileView && <ShoppingBagMobileView />}
        </BasicLayout>
    );
};

export default ShoppingBag;