import React from 'react';
import { motion } from 'framer-motion';

export const TextPerCharAnimation = ({ text, animationVariant }) => {
    const chars = text.split('').map((char, index) => (
        <motion.span
            key={index}
            custom={index}
            variants={animationVariant}
            initial="hidden"
            animate="visible"
        >
            {char}
        </motion.span>
    ));

    return <>{chars}</>;
};
