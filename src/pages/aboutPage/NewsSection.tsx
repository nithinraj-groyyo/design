import React from 'react';
import { motion } from 'framer-motion';

const NewsSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.3 },
  };

  return (
    <motion.section
      className="flex flex-col gap-4 mx-8 my-12 items-center"
      initial="hidden"
      whileInView="visible"
    //   viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="text-center font-semibold text-4xl tracking-wider">
        IN THE NEWS
      </div>
      <div className="flex mt-8 gap-4 justify-center w-[90%]">
        {['1', '2', '3', '4', '5', '6'].map((num) => (
          <motion.div
            key={num}
            className="w-full flex items-center justify-center"
            whileHover={hoverEffect}
          >
            <img src={`images/news/${num}.jpg`} alt={`news ${num}`} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default NewsSection;
