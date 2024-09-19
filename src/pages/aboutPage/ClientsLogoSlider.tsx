import React, { useEffect, useRef } from "react";
import './ClientsLogos.css'; 

const ClientsLogosSlider: React.FC = () => {
  const logosSlideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (logosSlideRef.current) {
      const clone = logosSlideRef.current.cloneNode(true) as HTMLDivElement;
      logosSlideRef.current.parentNode?.appendChild(clone);
    }
  }, []);

  return (
    <div className="logos">
      <div className="logos-slide !flex !bg-black !overflow-x-hidden" ref={logosSlideRef}>
        <img src="images/ClientsLogos/DeFacto.png" alt="DeFacto" />
        <img src="images/ClientsLogos/Ross.png" alt="Ross" />
        <img src="images/ClientsLogos/Sinsay.png" alt="Sinsay" />
        <img src="images/ClientsLogos/Reserved.png" alt="Reserved" />
        <img src="images/ClientsLogos/Boohoo.png" alt="Boohoo" />
        <img src="images/ClientsLogos/oxxo.svg" alt="Oxxo" />
        <img src="images/ClientsLogos/Mango.png" style={{mixBlendMode:"color-burn"}} alt="Mango" />
        <img src="images/ClientsLogos/Myntra.png" alt="Myntra" />
        <img src="images/ClientsLogos/hottopic.png" alt="Hot Topic" />
        <img src="images/ClientsLogos/r&bb.png" alt="R&B" />

        
      </div>
    </div>
  );
};

export default ClientsLogosSlider;
