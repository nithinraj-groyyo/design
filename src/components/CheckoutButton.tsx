import React, { useState } from "react";

const CheckoutButton = () => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 4000); // Reset after 4 seconds
  };

  return (
    <div className="relative w-full h-16">
      <button
        className={`w-full h-full bg-black text-white font-semibold py-2 overflow-hidden relative flex justify-center items-center ${
          checkoutSuccess ? "pointer-events-none" : ""
        }`}
        onClick={handleCheckout}
      >
        {checkoutSuccess ? (
          <div className="relative flex items-center justify-center w-full h-full">
            {/* Order Icon */}
            <div className="order-icon absolute right-4 w-10 h-10">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 8H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-9c0-1.1-.9-2-2-2zm-8 10c-2.21 0-4-1.79-4-4h2c0 1.1.9 2 2 2s2-.9 2-2h2c0 2.21-1.79 4-4 4zm6.26-10l-2.44-3.66c-.2-.3-.64-.3-.84 0L12.5 8h7.51zM7.74 8l2.44-3.66c.2-.3.64-.3.84 0L11.5 8H7.74z" />
              </svg>
            </div>

            {/* Truck Animation */}
            <div className="truck-animation absolute flex items-center h-full">
              <div className="truck-icon flex items-center gap-2">
                {/* Truck Cabin */}
                <div className="truck-cabin bg-gray-700 w-10 h-6 rounded-t-lg"></div>
                {/* Truck Cargo */}
                <div className="truck-cargo bg-gray-500 w-16 h-6"></div>
                {/* Truck Wheels */}
                <div className="truck-wheels flex gap-2 mt-1">
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                  <div className="w-4 h-4 bg-black rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <span>Checkout</span>
        )}
      </button>

      {/* Truck and Order Animation */}
      <style>{`
        .truck-animation {
          position: absolute;
          left: 0;
          bottom: 10px;
          animation: moveTruck 4s ease-in-out forwards;
        }

        .order-icon {
          animation: fadeOutOrder 4s ease-in-out forwards;
        }

        @keyframes moveTruck {
          0% {
            left: -50px;
          }
          100% {
            left: calc(100% - 80px); /* Truck moves across to reach the order */
          }
        }

        @keyframes fadeOutOrder {
          0% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutButton;