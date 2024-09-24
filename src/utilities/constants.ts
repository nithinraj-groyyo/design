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

export const initialServices: Service[] = [
    {
      title: "Exclusive Apparel Designs",
      description: "Explore our collection of unique, pre-designed apparel. Each design is carefully crafted by our in-house designers, tailored to the latest trends and market demands.",
      descriptionListKeys: [
        { key: "Industry Expertise", detail: "Leverage our experience in the apparel sector to get design recommendations tailored to your target market." },
        { key: "Trend Forecasting", detail: "Stay ahead with our trend analysis and market insights." },
      ],
      buttonName: "Explore our Designs",
      imageUrl: "/images/landingPages/landingPage_2_2.png", 
      buttonRedirectionUrl: "https://example.com/explore-designs", 
    },
    {
      title: "Customization Services",
      description: "We offer customization services to tailor designs to your specific needs.",
      descriptionListKeys: [
        { key: "Tailored for You", detail: "Modify colors, patterns, or fabrics to match your brand." },
        { key: "Bespoke Creations", detail: "Work with us to develop a design from scratch that aligns with your vision." },
      ],
      buttonName: "Book an appointment",
      imageUrl: "/images/landingPages/landingPage_2_2.png",
      buttonRedirectionUrl: "https://example.com/book-appointment",
    },
    {
      title: "Design Consultation",
      description: "Expert guidance to perfect your design ideas.",
      descriptionListKeys: [
        { key: "Industry Expertise", detail: "Leverage our experience in the apparel sector to get design recommendations tailored to your market." },
        { key: "Trend Forecasting", detail: "Stay ahead with our trend analysis and insights." },
      ],
      buttonName: "Contact us",
      imageUrl: "/images/landingPages/landingPage_2_2.png",
      buttonRedirectionUrl: "https://example.com/contact",
    },
  ];
  