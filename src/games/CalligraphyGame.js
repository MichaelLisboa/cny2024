import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CalligraphyCanvas from './CalligraphyCanvas';
import styled from 'styled-components';
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

const GameContainer = styled.div`
  /* Add your styling here */
`;

const CalligraphyGame = ({ timeLimit = 60 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [puzzleActive, setPuzzleActive] = useState(true);

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
  

  const onCompletionStatusChange = (isComplete) => {
    setPuzzleActive(false);
    setIsGameComplete(isComplete);
  };

  const handleNextCharacter = () => {
    if (currentIndex < characterList.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } else {
      onCompletionStatusChange(true);
    }
  };

  useEffect(() => {
    setPuzzleActive(true);
  }, [currentIndex]);

  const characterSvgData = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 240 240">
  <path fill="#337C76" fill-opacity=".6" d="M181.2 137.4s-6.4-4.2-22.5-6.3h-8.3c-.7 0-.8-.5-1.1-1-2.6-4.6-6.7-7-12-7.5 0 0-10.2-1-21.5 4l-.8 1.6c-3 5.8-7.6 9.8-13 13A76 76 0 0 1 73 151c-5.9 1-9.5 5.7-8.6 11.6.9 5.5 4.5 8.7 9.6 10.4 7.2 2.3 14.2.8 20.9-2.1 3.4-1.5 6.6-3.3 9.9-5.2.8 3.1.7 3.2-1 5.4-7 9-14 17.9-21.4 26.6A220.9 220.9 0 0 1 53 228c-2.3 1.8-4.8 3.4-6.8 5.6-.7.7-1.5 1.5-1 2.6.3 1 1.4 1 2.3 1.2l1.4.1c4.5.4 8.7-.8 12.7-2.6 9.3-4.2 17.2-10.6 24.8-17.3 7.7-6.8 14.9-14.2 22-22l.5 1.6a91 91 0 0 0 6 17c3.6 7.6 8.4 14.7 9.8 23.2.2 1.2 1.2 2 2.5 2.2 7.8 1.2 15-.1 21-5.5a81 81 0 0 0 14.2-17.7c8-12.3 14.3-25.4 20.8-38.5 2.8-5.7 5.5-11.5 10.5-15.8.6-.5.9-1.3 1-2 .9-3.8-.5-7-2.4-10-3-5-7-9-11.2-12.7Zm-15.8 18.3c-.6 4.8-2.3 9.3-4.1 13.7a217.8 217.8 0 0 1-17 32.6c-2.9 4.7-7.6 6-12.7 3.8-5.8-2.5-10-7-13.1-12.4-3.2-5.3-3.2-5.3.8-10.1a464.9 464.9 0 0 0 23.9-32.1 7.2 7.2 0 0 1 4.3-3.2 34 34 0 0 1 8.8-1.5l2.7.4c4.5.9 7 4.3 6.4 8.8Z"/>
  <path fill="#337C76" fill-opacity=".6" d="M137.4 122.6c-1.5-.1-1.5-.7-1.5-2 .1-2.7 1.4-3.7 3.8-4.3 3.8-1 7.5-2.2 11.3-3.3 4.7-1.4 6.4-6.1 4-10.4-2.4-4-6.1-6-10.5-7-2-.4-1.5-.8-.6-2 3.5-4 7-7.9 11.6-10.8 2.2-1.3 2.9-5 2-8.4a13.7 13.7 0 0 0-13-9.6H143c4.5-2.3 9-4.8 13.8-6.5 2.4-.9 4.5-.2 6.5 1.4 4.2 3.5 5.7 8.2 6 13.4a262.8 262.8 0 0 1-1.5 44.8c-1 5-3.6 7-8.8 6.6-1.2-.1-2.6-.7-3.3.8-.6 1.4.5 2.5 1.4 3.5.5.6 1.3 1 2 1.6l-.3.7c16 2 22.5 6.3 22.5 6.3-1-1-1.2-1.6-.9-2.9.8-3.3 1.6-6.6 2-10 2.6-17 3.7-34 4.2-51.2.3-7.1-2.5-12.9-7.9-17.5a28.1 28.1 0 0 0-15.4-6.3c-1.6-.2-2.7-.6-3.4-2.3a19.2 19.2 0 0 0-4.9-7.7c-.7-.6-.3-1 0-1.5 1.4-1.7 3.2-2.7 5-3.5 3.4-1.5 7-2 10.6-2.9 4.5-1 6.5-3.6 6.4-8.2-.1-5-2-9.3-4.2-13.5A18 18 0 0 0 159 .5a41 41 0 0 0-18.3 1.4c-14 4-27.6 9.1-41.3 14-3.4 1.2-6.7 2.9-10.3 3.6-2.2.5-3.3 0-4.2-2.2-.4-.8-.7-1.7-1.2-2.5-1.3-2-4.3-3-6.7-2.4-2.4.6-2.3 2.6-2.5 4.4-.5 4.5-.5 9-.2 13.4.3 5.9 1.3 11.6 4.2 16.9 2.4 4.3 4 4.8 8.3 2.6l1-.6a389.8 389.8 0 0 0 38.8-25.8c6-4.4 12-9.1 18-13.7 2.8-2.2 6-3.4 9.8-2.8 1.5.3 1.7 1.1 1 2.3-.5 1-1.3 1.8-2.1 2.6a1382 1382 0 0 1-13 11.4 32.1 32.1 0 0 1-14.2 7.8c-1.1.3-2 .9-3 1.6a17.7 17.7 0 0 0-4.7 19.7c.7 1.7.5 3-1 4.2a15 15 0 0 1-4.1 2.3c-9.6 3.4-19.2 6.2-29.4 6.8-6.8.4-10.7 6-8.6 12.4.4 1.4 1.1 2.7 2 4 1.4 2 2.3 4.4 2.5 7 .5 5 0 10-.7 15-.9 6.1-1 12.2 1 18.1a29 29 0 0 0 7.6 11.6c.8.7 1.7 1.3 2.9.9 1.2-.6 1.5-1.7 1.6-2.8v-3c-.5-8-1.1-16-.5-24 .4-5 1-10 .3-15-.6-3.5.8-5.4 3.4-7l1.6-1.2c6.2-3.8 13-6.4 19.7-9 .2-.2.6-.3.9.2l-.8.4c-7 4-13 9.1-18 15.2a8.5 8.5 0 0 0-1.1 10.2c1 1.8 2.3 2.7 4.4 2.6 4-.1 8-.7 12.1-1.5 0 1.3-.8 2-1.5 2.6a16 16 0 0 1-5 3.1 8.7 8.7 0 0 0-5.8 7.5l-.4 3.4c-.2 3-.5 6.2.2 9.3.7 3.5 2.3 4.6 5.8 3.7a28 28 0 0 0 6.6-2.7l1.6-.8v.9c11.3-5 21.6-4 21.6-4ZM90 80a26.7 26.7 0 0 1-2.7-6.5c-.7-2.8.2-4.4 2.9-5.2 3.6-1 7.4-.9 11.7-1-4.2 4.3-8.2 8.3-12 12.7Z"/>
</svg>
`

  return (
    <GameContainer>
      {!isGameComplete && (
        <Timer
          timeLimit={timeLimit}
          puzzleActive={puzzleActive}
          onCompletionStatusChange={onCompletionStatusChange}
        />
      )}
      {isGameComplete ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Game Over! Review your characters.
        </motion.div>
      ) : (
        <>
          <CalligraphyCanvas characterSvgData={characterSvgData} />
          <div>{characterList[currentIndex].english}</div>
          <button onClick={handleNextCharacter}>Next Character</button>
        </>
      )}
    </GameContainer>
  );
};

export default CalligraphyGame;
