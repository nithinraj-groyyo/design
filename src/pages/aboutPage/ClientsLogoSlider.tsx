import React from 'react';
import { motion } from 'framer-motion';

const ClientsLogosSlider: React.FC = () => {
  const slidingAnimation = {
    x: ['0%', '-100%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 15,
        ease: 'linear',
      },
    },
  };

  const logos = [
    { src: 'images/ClientsLogos/DeFacto.png', alt: 'DeFacto' },
    { src: 'images/ClientsLogos/Ross.png', alt: 'Ross' },
    { src: 'images/ClientsLogos/Sinsay.png', alt: 'Sinsay' },
    { src: 'images/ClientsLogos/Reserved.png', alt: 'Reserved' },
    { src: 'images/ClientsLogos/Boohoo.png', alt: 'Boohoo' },
    { src: 'images/ClientsLogos/oxxo.svg', alt: 'Oxxo' },
    { src: 'images/ClientsLogos/Mango.png', alt: 'Mango', mixBlendMode: 'color-burn' },
    { src: 'images/ClientsLogos/Myntra.png', alt: 'Myntra' },
    { src: 'images/ClientsLogos/hottopic.png', alt: 'Hot Topic' },
    { src: 'images/ClientsLogos/r&bb.png', alt: 'R&B' }
  ];

  return (
    <div className="p-8 flex flex-col gap-4 items-center min-h-64">
      <div className="text-center font-semibold text-4xl tracking-wider text-white">
        SOME OF OUR CLIENTS
      </div>
      <div className="w-full overflow-hidden py-14 whitespace-nowrap relative">
        <motion.div
          className="flex animate-slide"
          animate={slidingAnimation}
        >
          {logos.map((logo, index) => (
            <img
              key={index}
              className="w-40 h-auto mx-10 object-contain"
              src={logo.src}
              alt={logo.alt}
            />
          ))}

          {logos.map((logo, index) => (
            <img
              key={`duplicate-${index}`}
              className="w-40 h-auto mx-10 object-contain"
              src={logo.src}
              alt={logo.alt}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientsLogosSlider;
