import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Image from '../components/Image';
import Timer from '../components/Timer';

import graceful from '../images/calligraphy/graceful.svg';
import clever from '../images/calligraphy/clever.svg';
import energetic from '../images/calligraphy/energetic.svg';
import crafty from '../images/calligraphy/crafty.svg';
import strong from '../images/calligraphy/strong.svg';
import resilient from '../images/calligraphy/resilient.svg';
import persevering from '../images/calligraphy/persevering.svg';
import resourceful from '../images/calligraphy/resourceful.svg';
import curious from '../images/calligraphy/curious.svg';
import friendly from '../images/calligraphy/friendly.svg';
import brave from '../images/calligraphy/brave.svg';

// Styled Components
const GameContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const FlashCardContainer = styled(motion.div)`
  margin: 20px auto;
`;

const NextButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
`;

const OptionButton = styled.button`
  padding: 10px;
  cursor: pointer;
  background-color: transparent;
  border: 2px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #f0f0f0;
  }

  img {
    width: 100%;
    max-width: 60px;
  }
`;

// Animation Variants
const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Character Data
const characterList = [
  { mandarin: '友', english: 'Friendly', image: friendly },
  { mandarin: '灵', english: 'Clever', image: clever },
  { mandarin: '劲', english: 'Energetic', image: energetic },
  { mandarin: '狡', english: 'Crafty', image: crafty },
  { mandarin: '强', english: 'Strong', image: strong },
  { mandarin: '韧', english: 'Resilient', image: resilient },
  { mandarin: '保', english: 'Persevering', image: persevering },
  { mandarin: '优', english: 'Graceful', image: graceful },
  { mandarin: '智', english: 'Resourceful', image: resourceful },
  { mandarin: '奇', english: 'Curious', image: curious },
  { mandarin: '勇', english: 'Brave', image: brave },
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
const getRandomIndex = (length) => Math.floor(Math.random() * length);

const CalligraphyFlashGame = ({ timeLimit = 60 }) => {
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);

  // Preparing character options with useMemo
  const characterOptions = useMemo(() => {
    let options = shuffleArray(characterList.filter((_, index) => index !== activeCharacterIndex)).slice(0, 8);
    options.push(characterList[activeCharacterIndex]);
    return shuffleArray(options);
  }, [showOptions, activeCharacterIndex]);

  const handleButtonClick = () => {
    if (!timerStarted) setTimerStarted(true);
    setShowOptions(!showOptions);
  };

  const handleCharacterChoice = (option) => {
    if (isTimeUp) return;
    const isCorrect = option.mandarin === characterList[activeCharacterIndex].mandarin;
    console.log(`Choice was ${isCorrect ? "correct" : "incorrect"}.`);
    setActiveCharacterIndex((prevIndex) => (prevIndex + 1) % characterList.length);
    setShowOptions(false);
  };

  return (
    <GameContainer>
      <Timer timeLimit={timeLimit} puzzleActive={timerStarted} onCompletionStatusChange={() => setIsTimeUp(true)} />
      {!showOptions ? (
        <>
          <FlashCardContainer key="activeCharacter" variants={variants} initial="hidden" animate="visible" exit="exit">
            <Image src={characterList[activeCharacterIndex].image} alt={characterList[activeCharacterIndex].english} />
          </FlashCardContainer>
          <NextButton onClick={handleButtonClick}>{timerStarted ? "Next" : "Begin"}</NextButton>
        </>
      ) : (
        <AnimatePresence>
          <OptionsGrid key="characterOptions" variants={variants} initial="hidden" animate="visible" exit="exit">
            {characterOptions.map((option, index) => (
              <OptionButton key={index} onClick={() => handleCharacterChoice(option)}>
                <img src={option.image} alt={option.english} />
              </OptionButton>
            ))}
          </OptionsGrid>
        </AnimatePresence>
      )}
      {isTimeUp && <h2>Game Over</h2>}
    </GameContainer>
  );
};

export default CalligraphyFlashGame;
