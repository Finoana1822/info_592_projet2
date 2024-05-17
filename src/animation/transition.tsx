import { motion } from "framer-motion";
import React from "react";

type AnimatedProps = {
  children: React.ReactNode;
};

const animations = {
  initial: { opacity: 0, scale: 0 }, // Initialisé avec une opacité de 0 et une translation vers le bas
  animate: { opacity: 1, scale: 1}, // Animation vers l'opacité 1 et la translation de 0
  exit: { opacity: 0, scale: 0 }, // Sortie avec une opacité de 0 et une translation vers le haut
};

const transition = { duration: 0.4, ease: "easeInOut" };

const AnimatedPage = ({ children }: AnimatedProps) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
