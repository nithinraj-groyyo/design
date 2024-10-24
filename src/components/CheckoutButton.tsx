// import React, { useState } from 'react';

// const CheckoutButton = () => {
//   const [checkoutSuccess, setCheckoutSuccess] = useState(false);

//   const handleCheckout = async () => {
//     // Simulate the checkout process
//     setCheckoutSuccess(true);
//     // Reset the state after the animation (for demo purposes)
//     setTimeout(() => {
//       setCheckoutSuccess(false);
//     }, 3000);
//   };

//   return (
//     <div className="relative w-full">
//       <button
//         className={`w-full bg-black text-white font-semibold py-2 overflow-hidden relative ${
//           checkoutSuccess ? 'pointer-events-none' : ''
//         }`}
//         onClick={handleCheckout}
//       >
//         {checkoutSuccess ? (
//           <div className="relative flex items-center justify-center">
//             <span>Processing</span>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="truck-animation">
//                 <div className="truck-body">
//                   <span className="block w-[30px] h-[15px] bg-gray-600 rounded-t-[5px]"></span>
//                   <span className="block w-[40px] h-[15px] bg-gray-700 ml-1"></span>
//                   <div className="flex gap-1 mt-1 justify-center">
//                     <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
//                     <span className="w-2.5 h-2.5 bg-black rounded-full"></span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <span>Checkout</span>
//         )}
//       </button>

//       {/* Custom Animation */}
//       <style jsx>{`
//         .truck-animation {
//           position: absolute;
//           left: 0;
//           width: 100%;
//           animation: moveTruck 2s ease-out;
//         }
//         @keyframes moveTruck {
//           0% {
//             left: -100%;
//           }
//           100% {
//             left: 100%;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CheckoutButton;

import React from 'react'

const CheckoutButton = () => {
  return (
    <div>CheckoutButton</div>
  )
}

export default CheckoutButton