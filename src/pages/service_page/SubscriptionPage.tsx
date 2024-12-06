import React, { useState } from 'react';
import { useGetSubscriptionListQuery } from '../../rtk-query/subscriptonApiSlice';
import SubscriptionPriceDetails from './SubscriptionPriceDetails';

const SubscriptionPage = () => {
  const { data: subscriptions, error, isLoading } = useGetSubscriptionListQuery(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<any>(null);

  if (isLoading) {
    return <div className="text-center mt-32">Loading subscriptions...</div>;
  }

  if (error || !subscriptions?.status) {
    return (
      <div className="text-center mt-32 text-red-600">
        Failed to load subscriptions. Please try again later.
      </div>
    );
  }

  const handleGetStarted = (subscription: any) => {
    setSelectedSubscription(subscription);
    setModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-8 w-full my-32">
        {subscriptions.data.map((subscription: any, subscriptionIndex: number) => (

          subscriptionIndex === 0 &&
          <div
            key={subscription?.id}
            className="bg-gradient-to-br from-[#CEC1B2] to-[#D8C9BB] w-[20rem] sm:w-[26rem] h-[13rem] sm:h-[15rem] flex justify-center items-center rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
          >
            <div className="bg-gradient-to-br from-[#B9A99A] to-[#CAB7A9] w-[18rem] sm:w-[23rem] h-[18rem] sm:h-[20rem] flex justify-center items-center rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-out">
              <div className="bg-gradient-to-br from-[#978776] to-[#B19C89] w-[15rem] sm:w-[20rem] h-[22rem] sm:h-[25rem] rounded-3xl shadow-2xl relative z-20 transform hover:scale-105 transition-transform duration-300 ease-out">
                <div className="absolute -top-8 sm:-top-12 left-[50%] transform -translate-x-[50%]">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#B9A99A] rounded-full flex justify-center items-center shadow-md">
                    <span className="text-3xl sm:text-4xl">💎</span>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <span className="inline-block bg-[#60594D] text-white text-xs px-4 py-1 rounded-full shadow-lg">
                    {subscription.name}
                  </span>
                </div>

                <div className="text-center mt-4 sm:mt-6 flex justify-center items-baseline">
                  <h3 className="text-[#F3EDE5] text-5xl sm:text-6xl font-bold drop-shadow-lg">
                    ${Math.min(...subscription.tenures.map((t: any) => t.subscriptionPrice.price))}
                  </h3>
                  <span className="text-[#F3EDE5] text-lg ml-1 drop-shadow-md">/MO</span>
                </div>

                <div className="text-center mt-6">
                  <span className="inline-block  text-white text-xs px-4 py-1 rounded-full ">
                    {subscription.description}
                  </span>
                </div>

                <div className="flex justify-center mt-6 sm:mt-8">
                  <button
                    className="bg-[#60594D] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 ease-out"
                    onClick={() => handleGetStarted(subscription)}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {/* <SubscriptionPriceDetails
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        selectedSubscription={selectedSubscription}
      /> */}
    </>
  );
};

export default SubscriptionPage;
