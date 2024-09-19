import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const ProductPricing = () => {
    const { product } = useSelector((state: RootState) => state.products.singleProductData);

    if (!product?.ProductPricings || product.ProductPricings.length === 0) {
        return <div className="bg-gray-100 w-full p-4">No pricing information available.</div>;
    }

    return (
        <div className="bg-gray-100 w-full p-4">
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-800 mb-2">
                <p className="font-medium text-center">Quantity</p>
                <p className="font-medium text-center">Price</p>
            </div>

            <div className="grid gap-4">
                {product.ProductPricings.map((pricing) =>{
                    return (
                    <div key={pricing.id} className={`grid grid-cols-2 gap-4  border-gray-300 py-2 ${+pricing?.id === +product?.ProductPricings[product?.ProductPricings.length - 1]?.id ? '' : 'border-b'}`}>
                        <p className="text-gray-800 text-center">
                            {pricing.MinQuantity} - {pricing.MaxQuantity} <span className="ml-2">pcs</span>
                        </p>
                        <p className="text-gray-800 text-center">
                            ₹{pricing.Price} <span className="ml-2">/ pc</span>
                        </p>
                    </div>
                )})}
            </div>
        </div>
    );
};

export default ProductPricing;