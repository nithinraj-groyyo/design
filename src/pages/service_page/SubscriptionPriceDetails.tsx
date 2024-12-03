import React from 'react';
import SubscriptionModal from './SubscriptionModal';
import { useSubscribeUserMutation } from '../../rtk-query/subscriptonApiSlice';

const SubscriptionPriceDetails = ({
  isModalOpen,
  onClose,
  selectedSubscription,
}: {
  isModalOpen: boolean;
  onClose: () => void;
  selectedSubscription: any;
}) => {

  const token = JSON.parse(localStorage.getItem('authToken') as string);

  const [subscribeUser, { isLoading, isSuccess, isError }] = useSubscribeUserMutation();

  const handleSubscribe = async (subscriptionPriceId: number) => {
    try {
      await subscribeUser({ userId: subscriptionPriceId, token: token }).unwrap();
      alert('Subscription successful!');
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Please try again.');
    }
  };

  return (
    <SubscriptionModal isOpen={isModalOpen} onClose={onClose}>
      {selectedSubscription && (
        <div className="w-full">
          <div>
            <h2 className="text-3xl font-extrabold mb-8 text-center text-gray-900 tracking-wide">
              {selectedSubscription.name}
            </h2>
          </div>

          <div className="flex flex-row gap-8 justify-center overflow-x-auto p-6">
            {selectedSubscription.tenures.map((tenure: any) => (
              <div
                key={tenure.id}
                className="w-[250px] h-[320px] p-6 bg-gradient-to-br from-[#978776] to-[#B19C89] backdrop-blur-lg bg-opacity-30 rounded-3xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 flex flex-col justify-between items-center border border-white/30"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3 tracking-wide">
                    {tenure.tenureInMonths} Month{tenure.tenureInMonths > 1 && 's'}
                  </h3>
                </div>

                <div className="bg-white shadow-md w-[120px] h-[120px] rounded-full flex flex-col justify-center items-center border-4 border-[#978776] z-10">
                  <span className="text-4xl font-bold text-gray-800">
                    ₹{tenure.subscriptionPrice.price}
                  </span>
                  <p className="text-sm text-gray-600">/mo</p>
                </div>

                <button
                  className="mt-6 bg-gradient-to-r from-[#4A403A] to-[#2C2B2A] text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-transform"
                  onClick={() => handleSubscribe(tenure.subscriptionPrice.id)}
                >
                  {isLoading ? 'Processing...' : 'Buy Now'}
                </button>
              </div>
            ))}
          </div>

          <button
            className="mt-8 bg-gradient-to-r from-[#4A403A] to-[#2C2B2A] text-white py-3 px-8 rounded-lg w-full hover:shadow-xl transform transition-transform duration-300"
            onClick={onClose}
          >
            Close
          </button>

          {isError && <p className="text-red-500 text-center mt-4">Something went wrong. Please try again.</p>}
          {isSuccess && <p className="text-green-500 text-center mt-4">Subscription successful!</p>}
        </div>
      )}
    </SubscriptionModal>
  );
};

export default SubscriptionPriceDetails;
