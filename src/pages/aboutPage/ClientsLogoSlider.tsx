import React from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";

const ClientsLogosSlider: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)"); // Adjust screen size breakpoint as needed

  const slidingAnimation = {
    x: ["0%", "-100%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 15,
        ease: "linear",
      },
    },
  };

  const logos = [
    { src: "images/ClientsLogos/DeFacto.png", alt: "DeFacto" },
    { src: "images/ClientsLogos/Ross.png", alt: "Ross" },
    { src: "images/ClientsLogos/Sinsay.png", alt: "Sinsay" },
    { src: "images/ClientsLogos/Reserved.png", alt: "Reserved" },
    { src: "images/ClientsLogos/Boohoo.png", alt: "Boohoo" },
    { src: "images/ClientsLogos/oxxo.svg", alt: "Oxxo" },
    {
      src: "images/ClientsLogos/Mango.png",
      alt: "Mango",
      mixBlendMode: "color-burn",
    },
    { src: "images/ClientsLogos/Myntra.png", alt: "Myntra" },
    { src: "images/ClientsLogos/hottopic.png", alt: "Hot Topic" },
    { src: "images/ClientsLogos/r&bb.png", alt: "R&B" },
  ];

  return (
    <div className="p-8 flex flex-col gap-2 items-center min-h-64">
      <div
        className="text-center font-semibold text-2xl md:text-4xl tracking-wider"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        SOME OF OUR CLIENTS
      </div>

      {isMobile ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-6 justify-center">
          {logos.map((logo, index) => (
            <img
              key={index}
              className="w-[60%] h-auto object-contain mx-auto"
              src={logo.src}
              alt={logo.alt}
            />
          ))}
        </div>
      ) : (
        <div className="w-full overflow-hidden py-6 whitespace-nowrap relative">
          <motion.div className="flex animate-slide" animate={slidingAnimation}>
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
      )}
    </div>
  );
};

export default ClientsLogosSlider;
