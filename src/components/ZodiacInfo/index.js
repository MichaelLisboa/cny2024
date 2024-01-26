import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence, easeInOut } from 'framer-motion';
import Image from '../Image';

import rat from "../../images/zodiac_actual/animals/rat.png";
import ox from "../../images/zodiac_actual/animals/ox.png";
import tiger from "../../images/zodiac_actual/animals/tiger.png";
import rabbit from "../../images/zodiac_actual/animals/rabbit.png";
import dragon from "../../images/zodiac_actual/animals/dragon.png";
import snake from "../../images/zodiac_actual/animals/snake.png";
import horse from "../../images/zodiac_actual/animals/horse.png";
import goat from "../../images/zodiac_actual/animals/goat.png";
import monkey from "../../images/zodiac_actual/animals/monkey.png";
import rooster from "../../images/zodiac_actual/animals/rooster.png";
import dog from "../../images/zodiac_actual/animals/dog.png";
import pig from "../../images/zodiac_actual/animals/pig.png";
import earth from "../../images/zodiac_actual/elements/earth.png";
import fire from "../../images/zodiac_actual/elements/fire.png";
import metal from "../../images/zodiac_actual/elements/metal.png";
import water from "../../images/zodiac_actual/elements/water.png";
import wood from "../../images/zodiac_actual/elements/wood.png";

const AnimalImage = styled(motion(Image))`
  min-height: 100%;
  max-height: 64vh;
  width: auto;
  z-index: 2;
`;

const ElementImage = styled(motion(Image))`
  width: 70%;
  position: absolute;
  z-index: -1;
  left: -5%;
  top: -30%;
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

// Create a mapping from animal names to images
const animalImages = {
    rat,
    ox,
    tiger,
    rabbit,
    dragon,
    snake,
    horse,
    goat,
    monkey,
    rooster,
    dog,
    pig,
  };
  
  // Create a mapping from element names to images
  const elementImages = {
    wood,
    fire,
    earth,
    metal,
    water,
  };

const ZodiacInfo = ({ animal, element }) => {
    if (!animal || !element) return null;

    const elementVariants = {
        // hidden: { opacity: 0, y: '200%' },
        visible: {
            opacity: 1,
            y: '-30%',
            transition: {
                duration: 0.8,
                ease: easeInOut
            }
        },
    };

    const animalVariants = {
        // hidden: { opacity: 0, y: '200%' },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.2,
                ease: easeInOut,
                delay: 1 // Delayed start
            }
        },
    };

    const zodiacLabelAnimation = {
        hidden: { opacity: 0, y: '150%' },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1.3,
                ease: easeInOut,
                delay: 1.2 // Delayed start
            }
        },
    };

    return (
        <ImageContainer>
            <AnimatePresence>
                <ElementImage
                    key="elementImage"
                    src={elementImages[element.toLowerCase()]}
                    alt={element}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={elementVariants}
                />
                <AnimalImage
                    key="animalImage"
                    src={animalImages[animal.toLowerCase()]}
                    alt={animal}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={animalVariants}
                />
                <ZodiacLabel
                    key="zodiacLabel"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={zodiacLabelAnimation}>
                    <h2>{element} {animal}</h2>
                </ZodiacLabel>
            </AnimatePresence>
        </ImageContainer>
    );
};

export default ZodiacInfo;
