import React from 'react';
import styled from 'styled-components';
import { motion, easeInOut } from 'framer-motion';
import Image from '../Image';

const StyledAnimalImage = styled.div`
  width: auto;
  position: absolute;
  top: -72px;
  z-index: 2;
`;

const StyledElementImage = styled.div`
  width: 80%;
  position: relative;
  z-index: 1;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 100% !important;
`;

const ZodiacInfo = ({ animal, element }) => {
    if (!animal || !element) {
        return null;
    }

    const animalImage = require(`../../images/zodiac_actual/animals/${animal.toLowerCase()}.png`);
    const elementImage = require(`../../images/zodiac_actual/elements/${element.toLowerCase()}.png`);

    const elementVariants = {
        hidden: { opacity: 0, y: 100, x: -30 },
        visible: { opacity: 1, y: -200, x: -30, transition: { duration: 1, delay: 0, ease: easeInOut } }
    };

    const animalVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 30, transition: { duration: 0.7, delay: .4, ease: easeInOut } }
    };

    const zodiacLabelAnimation = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 32, transition: { duration: 0.7, delay: .8, ease: easeInOut } }
    };

    return (
        <ImageContainer>
            <motion.div initial="hidden" animate="visible" variants={elementVariants}>
                <StyledElementImage>
                    <Image src={elementImage} alt={element} />
                </StyledElementImage>
            </motion.div>
            <motion.div initial="hidden" animate="visible" variants={animalVariants} style={{ position: 'absolute', top: 0, width: '100%' }}>
                <StyledAnimalImage>
                    <Image src={animalImage} alt={animal} />
                </StyledAnimalImage>
            </motion.div>
        </ImageContainer>
    );
};

export default ZodiacInfo;
