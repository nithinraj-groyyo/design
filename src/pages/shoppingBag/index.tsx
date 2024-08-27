import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import BasicLayout from '../../layouts/BasicLayout';
import ShoppingBagMobileView from './ShoppingBagMobileView';

const ShoppingBag = () => {

    const handleCheckout = () => {
        console.log("Checkout")
    }
    return (
        <BasicLayout>
            <section className="xxs:hidden lg:block cart-section mt-[12rem] min-h-[50vh]">
                <div className="flex px-6 gap-12">
                    <div className="flex flex-[3] flex-col gap-2  px-[4rem]  ml-[4rem]">
                        <div className="text-[1rem] font-medium text-[#000000] tracking-wider">SHOPPING BAG </div>
                        <div className="border-b-1 border-[#E6E6E6]">
                            <div className="flex items-start gap-4">
                                <img src={"/images/products/pic1.png"} className="w-[6.25rem] h-[10rem]" alt="image1" />
                                <div className="">
                                    <p className="text-[#000000] text-sm font-light uppercase">Black Cutwork Embroidery Dress</p>
                                    <p className="text-[#000000] text-sm font-light"><span>&#8377; </span>599</p>
                                    <p className="text-[#646463] text-sm font-normal">Quantity : 1 ( XS )</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2"><span><FavoriteBorderOutlined /></span><span className="text-[#646463] text-sm font-light">Buy Later</span></div>
                                <div><span className="text-[#646463] text-sm font-light">Remove</span></div>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col flex-[1] gap-8">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <p>Subtotal</p>
                                <p><span>&#8377; </span>599</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>Delivery</p>
                                <p>Free</p>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between bottom-0">
                                <p className="font-semibold text-[1rem] text-[#2D2D2A]">Total</p>
                                <p className="font-semibold text-[1rem] text-[#2D2D2A]"><span>&#8377; </span>599</p>
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
                </div>
            </section>
            <ShoppingBagMobileView />
        </BasicLayout>
    )
}

export default ShoppingBag