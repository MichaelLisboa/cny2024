import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, easeInOut } from 'framer-motion';
import Image from '../Image';

const AnimalImage = styled(motion(Image))`
  min-height: 100% !important;
  max-height: 64vh;
  width: auto;
  position: relative;
  z-index: 2;
`;

const ElementImage = styled(motion(Image))`
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
    const [animalVisible, setAnimalVisible] = useState(false);
    const [elementVisible, setElementVisible] = useState(false);
    const [zodiacLabelVisible, setZodiacLabelVisible] = useState(false);

    useEffect(() => {

        const timer1 = setTimeout(() => setElementVisible(true), 500);
        const timer2 = setTimeout(() => setAnimalVisible(true), 5000);
        const timer3 = setTimeout(() => setZodiacLabelVisible(true), 1800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    if (!animal || !element) {
        return null;
    }

    const animalImage = require(`../../images/zodiac_actual/animals/${animal.toLowerCase()}.png`);
    const elementImage = require(`../../images/zodiac_actual/elements/${element.toLowerCase()}.png`);


    const animalVariants = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeInOut } }
    };

    const elementVariants = {
        visible: { opacity: 1, y: '-30%', transition: { duration: 1, ease: easeInOut } },
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
                initial="hidden"
                animate="visible"
                variants={elementVariants}
            />
            <AnimalImage
                src={animalImage}
                alt={animal}
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