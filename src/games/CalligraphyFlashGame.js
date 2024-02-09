import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import Image from '../components/Image';
import Timer from '../components/Timer';
import { OrnateButton, OptionButton } from '../components/Button';

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

const GameContainer = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 20px;
`;

const FlashCardContainer = styled(motion.div)`
  margin: 0 auto;
`;

const CharacterButton = styled.button`
  padding: 10px 20px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.25);
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 16px !important;
    padding-right: 16px !important;

    * {
        font-size: 1rem;

        @media (max-width: 576px) { // When the viewport is 576px or less
            font-size: 0.875rem !important; // Reduce the font size even more
        }
    }
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
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

const CalligraphyFlashGame = ({ timeLimit = 30, onCompletionStatusChange }) => {
  const [activeCharacterIndex, setActiveCharacterIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const characterOptions = useMemo(() => {
    let options = shuffleArray(characterList.filter((_, index) => index !== activeCharacterIndex)).slice(0, 8);
    options.push(characterList[activeCharacterIndex]);
    return shuffleArray(options);
  }, [showOptions, activeCharacterIndex]);

  const handleButtonClick = () => {
    if (!timerStarted) setTimerStarted(true);
    setGameStarted(true)
    setShowOptions(!showOptions);
  };

  const handleCharacterChoice = (option) => {
    if (isTimeUp) return;
    const isCorrect = option.mandarin === characterList[activeCharacterIndex].mandarin;

    if (isCorrect) {
      setCorrectCount(prevCount => prevCount + 1);
    } else {
      setIncorrectCount(prevCount => prevCount + 1);
    }

    setActiveCharacterIndex((prevIndex) => (prevIndex + 1) % characterList.length);
    setShowOptions(false);
  };

  return (
    gameStarted ? (
      <GameContainer>
        <Timer
          timeLimit={timeLimit}
          puzzleActive={timerStarted}
          onCompletionStatusChange={() => {
            setIsTimeUp(true);
            onCompletionStatusChange(correctCount, incorrectCount);
          }}
          successMessage={``} />
        {!showOptions ? (
          <>
            {!isTimeUp &&
              <>
                <FlashCardContainer key="activeCharacter" variants={variants} initial="hidden" animate="visible" exit="exit">
                  <Image src={characterList[activeCharacterIndex].image} alt={characterList[activeCharacterIndex].english} />
                </FlashCardContainer>

                <ButtonContainer>
                  <OptionButton onClick={handleButtonClick}>{"Next"}</OptionButton>
                </ButtonContainer>
              </>
            }
          </>
        ) : (
          !isTimeUp &&
          <AnimatePresence>
            <OptionsGrid key="characterOptions" variants={variants} initial="hidden" animate="visible" exit="exit">
              {characterOptions.map((option, index) => (
                <CharacterButton key={index} onClick={() => handleCharacterChoice(option)}>
                  <Image src={option.image} alt={option.english} />
                </CharacterButton>
              ))}
            </OptionsGrid>
          </AnimatePresence>
        )}
        {isTimeUp && <h2>Time's Up!</h2>}
      </GameContainer>
    ) : (
      <ButtonContainer style={{ marginTop: "-50%" }}>
        <OrnateButton onClick={handleButtonClick}>Start Game</OrnateButton>
      </ButtonContainer>
    )
  );
};

export default CalligraphyFlashGame;