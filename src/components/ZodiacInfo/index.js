import React from 'react';
import styled from 'styled-components';
import { motion, easeInOut } from 'framer-motion';

const AnimalImage = styled(motion.img)`
  width: 150%;
  height: auto;
  position: relative;
  z-index: 2;
`;

const ElementImage = styled(motion.img)`
  width: 70%;
  position: absolute;
  left: -5%;
  top: -30%;
  z-index: 1;
`;

const ZodiacLabel = styled(motion.div)`
  position: relative;
  margin-top: 32px;
  text-align: center;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ZodiacInfo = ({ animal, element }) => {
    if (!animal || !element) {
        return null;
    }

    const animalImage = require(`../../images/zodiac_actual/animals/${animal.toLowerCase()}.png`);
    const elementImage = require(`../../images/zodiac_actual/elements/${element.toLowerCase()}.png`);

    const containerVariants = {
        hidden: { opacity: 0, y: "150%" },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeInOut } }
    };

    const animalVariants = {
        hidden: { opacity: 0, y: "150%" },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeInOut } }
    };

    const zodiacLabelAnimation = {
        hidden: { opacity: 0, y: "150%" },
        visible: { opacity: 1, y: 0, transition: { duration: 1.5, ease: easeInOut } }
    };

    return (
        <ImageContainer>
            <ElementImage
                src={elementImage}
                alt={element}
                loading="lazy"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            />
            <AnimalImage
                src={animalImage}
                alt={animal}
                loading="lazy"
                initial="hidden"
                animate="visible"
                variants={animalVariants}
            />
            <ZodiacLabel
                initial="hidden"
                animate="visible"
                variants={zodiacLabelAnimation}>
                <h2>{element} {animal}</h2>
            </ZodiacLabel>
        </ImageContainer>
    );
};

export default ZodiacInfo;