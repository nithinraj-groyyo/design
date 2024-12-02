import React from 'react';
import SubscriptionModal from './SubscriptionModal';

const SubscriptionPriceDetails = ({
  isModalOpen,
  onClose,
  selectedSubscription,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  selectedSubscription: any;
}) => {
  return (
    <SubscriptionModal isOpen={isModalOpen} onClose={onClose}>
      {selectedSubscription && (
        <div className="w-full">
          <div>
            <h2 className="text-2xl font-extrabold mb-6 text-center">
              {selectedSubscription.name}
            </h2>
          </div>

          <div className="flex flex-row gap-8 justify-center overflow-x-auto p-6">
            {selectedSubscription.tenures.map((tenure: any) => (
              <div
                key={tenure.id}
                className="w-[250px] h-[300px] p-6 bg-gradient-to-br from-[#978776] to-[#B19C89] border rounded-3xl shadow-sm hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between items-center"
              >
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {tenure.tenureInMonths} Month{tenure.tenureInMonths > 1 && 's'}
                  </h3>
                </div>

                <div className="bg-white shadow-md w-[100px] h-[100px] rounded-full flex flex-col justify-center items-center border-2 border-gray-300 z-10">
                  <span className="text-3xl font-extrabold text-blue-500">
                  ₹{tenure.subscriptionPrice.price}
                  </span>
                  <p className="text-sm text-gray-600">/mo</p>
                </div>

                <button
                  className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition"
                  onClick={() =>
                    console.log(`Buying ${tenure.tenureInMonths} months`)
                  }
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>

          <button
            className="mt-8 bg-gray-700 text-white py-3 px-6 rounded-lg w-full hover:bg-gray-800 transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      )}
    </SubscriptionModal>
  );
};

export default SubscriptionPriceDetails;
