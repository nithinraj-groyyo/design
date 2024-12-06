import React, { useEffect, useState } from 'react';
import { useSubscribeUserMutation, useGetSubscriptionListQuery } from '../../rtk-query/subscriptonApiSlice';

const SubscriptionPriceDetails = () => {
  const { data: subscriptions, error, isLoading } = useGetSubscriptionListQuery(null);
  const token = JSON.parse(localStorage.getItem('authToken') as string);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);

  const [subscribeUser, { isSuccess, isError }] = useSubscribeUserMutation();
  const [loadingButton, setLoadingButton] = useState<number | null>(null); // Track which button is loading

  useEffect(() => {
    if (subscriptions?.data && subscriptions.data.length > 0) {
      setSelectedSubscription(subscriptions.data[0]);
    }
  }, [subscriptions]);

  const handleSubscribe = async (subscriptionPriceId: number) => {
    setLoadingButton(subscriptionPriceId); // Set the loading state for the clicked button
    try {
      await subscribeUser({ userId: subscriptionPriceId, token }).unwrap();
      alert('Subscription successful!');
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Subscription failed. Please try again.');
    } finally {
      setLoadingButton(null); // Reset the loading state
    }
  };

  if (isLoading) {
    return <div className="text-center mt-32 text-lg font-medium">Loading subscriptions...</div>;
  }

  if (error || !subscriptions?.status) {
    return (
      <div className="text-center mt-32 text-red-600 text-lg font-medium">
        Failed to load subscriptions. Please try again later.
      </div>
    );
  }

  return (
    <div className="px-6">
      {selectedSubscription && (
        <div className="flex flex-col items-center">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-10 text-center text-gray-800 ">
            {/* {selectedSubscription.name} */}
            Design +
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
            {selectedSubscription.tenures.map((tenure: any) => (
              <div
                key={tenure.id}
                className="bg-gradient-to-br from-[#CEC1B2] to-[#D8C9BB] border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 flex flex-col items-center"
              >
                {/* Badge/Icon */}
                <div className="flex justify-center items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#978776] to-[#B19C89] rounded-full flex justify-center items-center shadow-md">
                    <span className="text-2xl text-white">💎</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col items-center text-center mb-4 space-y-2">
                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-800">
                    {tenure.tenureInMonths} Month{tenure.tenureInMonths > 1 && 's'}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline space-x-2">
                    <p className="text-xl font-bold text-gray-800">₹{tenure.subscriptionPrice.price}</p>
                    <p className="text-sm text-gray-500">per month</p>
                  </div>
                </div>

                {/* Button */}
                <button
                  className={`w-full py-2 mt-auto rounded-full text-white text-sm font-medium transition-transform transform hover:scale-105 duration-300 ${
                    loadingButton === tenure.subscriptionPrice.id
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-br from-[#978776] to-[#B19C89] hover:from-[#b4a093] hover:to-[#c6b4a6]'
                  }`}
                  onClick={() => handleSubscribe(tenure.subscriptionPrice.id)}
                  disabled={loadingButton === tenure.subscriptionPrice.id}
                >
                  {loadingButton === tenure.subscriptionPrice.id ? (
                    <div className="flex items-center justify-center">
                      <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></span>
                      Processing...
                    </div>
                  ) : (
                    'Buy Now'
                  )}
                </button>
              </div>
            ))}
          </div>
          {isError && <p className="text-red-500 text-center mt-4">Something went wrong. Please try again.</p>}
          {isSuccess && <p className="text-green-500 text-center mt-4">Subscription successful!</p>}
        </div>
      )}
    </div>
  );
};

export default SubscriptionPriceDetails;
