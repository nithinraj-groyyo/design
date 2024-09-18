import BasicLayout from "../../layouts/BasicLayout";
import AccordionComponent from "./AccordianDetails";

export const ContactUs = () => {
  return (
    <>
      <BasicLayout>
        <div className="xxs:mt-[8rem] lg:mt-32 md:px-10 lg:pl-32 lg:pr-8 xs:py-16 xxs:px-2  flex w-full gap-[8rem] flex-row md:flex-col  sm:flex-col">
          <div className="xxs:hidden form-section flex flex-col gap-[0.70rem] flex-2">
            {[
              "Contact Us",
              "FAQs",
              "Order and Delivery",
              "Returns and Refunds",
              "Payments and Pricing",
              // "Groyyo Studio Customer Promise",
            ].map((item, index) => (
              <div key={index} className="font-light tracking-widest">
                {item}
              </div>
            ))}
          </div>
          <div className="contact-section flex-1 ">
            <div className="text-3xl mb-8 tracking-[0.145em]">Contact Us</div>
            <div className="flex flex-col gap-3 mb-8 ">
              <div className="font-light text-xs tracking-[0.145em]">
                Customer Service
              </div>
              <div className="flex flex-col gap-[0.65rem]">
                <div className="font-normal text-xs tracking-[0.145em]">
                  Email Service: design@groyyo.com
                </div>
                <div className="font-[275] text-xs tracking-[0.145em] italic">
                  Monday to Friday: 24 hours a day
                </div>
                <div className="font-[275] text-xs tracking-[0.145em] italic">
                  Saturday - Sunday: 8 AM - 3 PM IST
                </div>
              </div>
              <div className="flex flex-col gap-[0.65rem]">
                <div className="font-normal text-xs tracking-[0.145em] italic">
                  Phone Service: +91 8808988089
                </div>
                <div className="font-[275] text-xs tracking-[0.145em] italic">
                  Monday to Friday: 8 AM - 7 PM IST
                </div>
              </div>
            </div>
            <AccordionComponent />
          </div>
        </div>
      </BasicLayout>
    </>
  );
};
