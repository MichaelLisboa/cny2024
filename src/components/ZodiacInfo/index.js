import React from 'react';
import styled from 'styled-components';
import { motion, easeInOut } from 'framer-motion';
import Image from '../Image';

const StyledAnimalImage = styled.div`
  height: 70vh !important;
  max-height: 70vh;
  width: auto;
  position: absolute;
  top: 0;
  z-index: 2;
`;

const StyledElementImage = styled.div`
  width: 80%;
  position: relative;
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
  min-height: 60vh !important;
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
        visible: { opacity: 1, y: 80, transition: { duration: 1.5, delay: .8, ease: easeInOut } }
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
            <ZodiacLabel initial="hidden" animate="visible" variants={zodiacLabelAnimation}>
                <h2>{element} {animal}</h2>
            </ZodiacLabel>
        </ImageContainer>
    );
};

export default ZodiacInfo;
