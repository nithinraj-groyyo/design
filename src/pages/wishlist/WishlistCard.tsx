import React from "react";
import { Delete as DeleteIcon } from "@mui/icons-material";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

interface WishlistCardProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  onRemove: (id: number) => void;
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  id,
  imageUrl,
  name,
  price,
  onRemove,
}) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <p className="  text-gray-800 truncate">
          {name}
        </p>
        <div className="uppercase font-semibold text-xs">
            <span><CurrencyRupeeIcon sx={{ fontSize: 'inherit' }} /></span>
            <span>{price}</span>
        </div>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow hover:bg-red-600 transition"
      >
        <DeleteIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default WishlistCard;
