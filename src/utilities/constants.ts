import { FAQ } from "../types/faq";
import { Service } from "../types/service";

export const CONSTANT = {
    PAGE_LIMIT: 10,
}


export const clientData = [
    { url: '/images/ClientsLogos/DeFacto.png', name: 'DeFacto' },
    { url: '/images/ClientsLogos/Ross.png', name: 'Ross' },
    { url: '/images/ClientsLogos/Sinsay.png', name: 'Sinsay' },
    { url: '/images/ClientsLogos/Reserved.png', name: 'Reserved' },
    { url: '/images/ClientsLogos/Boohoo.png', name: 'Boohoo' },
    { url: '/images/ClientsLogos/oxxo.svg', name: 'Oxxo' },
    { url: '/images/ClientsLogos/Mango.png', name: 'Mango', mixBlendMode: 'color-burn' },
    { url: '/images/ClientsLogos/Myntra.png', name: 'Myntra' },
    { url: '/images/ClientsLogos/hottopic.png', name: 'Hot Topic' },
    { url: '/images/ClientsLogos/r&bb.png', name: 'R&B' }
];

export const aboutUsContent = "Founded in 2021 and based in Gurgaon, Groyyo Design Studio is a one-stop solution for fashion and lifestyle design needs. Blending creativity with innovation, the studio crafts unique, trend-forward designs that help brands stand out in the fast-paced fashion industry. By merging timeless elegance with modern flair, classic aesthetics are revived with a fresh, contemporary twist. In addition to offering ready-made collections, clients can book appointments for personalized customization services to bring their vision to life. Whether it's original designs or bespoke solutions, Groyyo Design Studio delivers exceptional quality, style, and craftsmanship to elevate any brand."

// export const initialServices: Service[] = [
//     {
//       title: "Exclusive Apparel Designs",
//       description: "Explore our collection of unique, pre-designed apparel. Each design is carefully crafted by our in-house designers, tailored to the latest trends and market demands.",
//       descriptionListKeys: [
//         { key: "Industry Expertise", detail: "Leverage our experience in the apparel sector to get design recommendations tailored to your target market." },
//         { key: "Trend Forecasting", detail: "Stay ahead with our trend analysis and market insights." },
//       ],
//       buttonName: "Explore our Designs",
//       imageUrl: "/images/landingPages/landingPage_2_2.png", 
//       buttonRedirectionUrl: "https://example.com/explore-designs", 
//     },
//     {
//       title: "Customization Services",
//       description: "We offer customization services to tailor designs to your specific needs.",
//       descriptionListKeys: [
//         { key: "Tailored for You", detail: "Modify colors, patterns, or fabrics to match your brand." },
//         { key: "Bespoke Creations", detail: "Work with us to develop a design from scratch that aligns with your vision." },
//       ],
//       buttonName: "Book an appointment",
//       imageUrl: "/images/landingPages/landingPage_2_2.png",
//       buttonRedirectionUrl: "https://example.com/book-appointment",
//     },
//     {
//       title: "Design Consultation",
//       description: "Expert guidance to perfect your design ideas.",
//       descriptionListKeys: [
//         { key: "Industry Expertise", detail: "Leverage our experience in the apparel sector to get design recommendations tailored to your market." },
//         { key: "Trend Forecasting", detail: "Stay ahead with our trend analysis and insights." },
//       ],
//       buttonName: "Contact us",
//       imageUrl: "/images/landingPages/landingPage_2_2.png",
//       buttonRedirectionUrl: "https://example.com/contact",
//     },
//   ];
  
  export const initialFAQs: FAQ[] = [
    { id: '1', question: 'What is the return policy?', answer: 'You can return any item within 30 days.' },
    { id: '2', question: 'How do I track my order?', answer: 'You will receive a tracking link via email.' },
    { id: '3', question: 'What payment methods do you accept?', answer: 'We accept credit cards, PayPal, and bank transfers.' },
    { id: '4', question: 'Do you ship internationally?', answer: 'Yes, we ship to most countries worldwide.' },
    { id: '5', question: 'What should I do if I receive a defective item?', answer: 'Please contact our customer service for a replacement.' },
    { id: '6', question: 'Can I change my order after it has been placed?', answer: 'Orders can be modified within 1 hour of placement.' },
    { id: '7', question: 'How do I cancel my order?', answer: 'You can cancel your order by contacting customer support.' },
    { id: '8', question: 'Do you offer gift wrapping services?', answer: 'Yes, we offer gift wrapping for an additional fee.' },
    { id: '9', question: 'What if I forgot my password?', answer: 'Use the “Forgot Password” link on the login page to reset it.' },
    { id: '10', question: 'How can I contact customer service?', answer: 'You can reach customer service via email or phone.' },
    { id: '11', question: 'Do you have a loyalty program?', answer: 'Yes, we offer a loyalty program for frequent customers.' },
    { id: '12', question: 'What if I receive the wrong item?', answer: 'Please contact our support team to resolve this issue.' },
    { id: '13', question: 'Can I return an item if I opened it?', answer: 'Opened items can be returned if they are defective.' },
    { id: '14', question: 'Is there a warranty on the products?', answer: 'Most products come with a one-year warranty.' },
    { id: '15', question: 'How do I subscribe to the newsletter?', answer: 'You can subscribe through our website footer.' },
];
