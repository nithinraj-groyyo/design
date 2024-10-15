import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { IProduct } from '../../types/products';

interface IProductPricingProps {
    product: IProduct;
}

const ProductPricing = ({product}: IProductPricingProps) => {
    if (!product?.productPrices || product?.productPrices?.length === 0) {
        return <div className="bg-gray-100 w-full p-4">No pricing information available.</div>;
    }

    return (
        <div className="bg-gray-100 w-full p-4">
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-800 mb-2">
                <p className="font-medium text-center">Quantity</p>
                <p className="font-medium text-center">Price</p>
            </div>

            <div className="grid gap-4">
                {product && product?.productPrices.map((pricing) =>{
                    return (
                    <div key={pricing.id} className={`grid grid-cols-2 gap-4  border-gray-300 py-2 ${+pricing?.id === +product?.productPrices[product?.productPrices?.length - 1]?.id ? '' : 'border-b'}`}>
                        <p className="text-gray-800 text-center">
                            {pricing?.minQty} - {Boolean(pricing?.maxQty) ? pricing?.maxQty: "above"} <span className="ml-2">pcs</span>
                        </p>
                        <p className="text-gray-800 text-center">
                            ₹{pricing?.pricePerPiece} <span className="">/pc</span>
                        </p>
                    </div>
                )})}
            </div>
        </div>
    );
};

export default ProductPricing;