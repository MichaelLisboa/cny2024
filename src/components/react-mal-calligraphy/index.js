// Import React, styled-components, and framer-motion
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Timer from '../Timer';
import graceful from '../../images/calligraphy/graceful.svg';
import clever from '../../images/calligraphy/clever.svg';
import energetic from '../../images/calligraphy/energetic.svg';
import crafty from '../../images/calligraphy/crafty.svg';
import strong from '../../images/calligraphy/strong.svg';
import resilient from '../../images/calligraphy/resilient.svg';
import persevering from '../../images/calligraphy/persevering.svg';
import resourceful from '../../images/calligraphy/resourceful.svg';
import curious from '../../images/calligraphy/curious.svg';
import friendly from '../../images/calligraphy/friendly.svg';


// Styled components for the game container and canvas
const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const StyledCanvas = styled.canvas`
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 24px;
`;

const CalligraphyCanvas = React.memo(({ characterImage }) => {
    const canvasRef = useRef(null);

    // Corrected event handling
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 300;
        ctx.lineWidth = 12;
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'rgba(156, 19, 19, 1)';

        const image = new Image();
        image.onload = () => ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        image.src = characterImage;

        let isDrawing = false;

        const drawStart = (event) => {
            isDrawing = true;
            ctx.beginPath();
            // Use correct coordinates for both touch and mouse events
            const { offsetX, offsetY } = event.touches ? getTouchCoordinates(event, canvas) : getMouseCoordinates(event);
            ctx.moveTo(offsetX, offsetY);
        };

        const drawing = (event) => {
            if (!isDrawing) return;
            const { offsetX, offsetY } = event.touches ? getTouchCoordinates(event, canvas) : getMouseCoordinates(event);
            ctx.lineTo(offsetX, offsetY);
            ctx.stroke();
        };

        const drawEnd = () => {
            isDrawing = false;
        };

        // Attach event listeners
        canvas.addEventListener("mousedown", drawStart);
        canvas.addEventListener("mousemove", drawing);
        canvas.addEventListener("mouseup", drawEnd);
        canvas.addEventListener("mouseleave", drawEnd);

        canvas.addEventListener("touchstart", drawStart);
        canvas.addEventListener("touchmove", drawing);
        canvas.addEventListener("touchend", drawEnd);

        return () => {
            // Detach event listeners
            canvas.removeEventListener("mousedown", drawStart);
            canvas.removeEventListener("mousemove", drawing);
            canvas.removeEventListener("mouseup", drawEnd);
            canvas.removeEventListener("mouseleave", drawEnd);

            canvas.removeEventListener("touchstart", drawStart);
            canvas.removeEventListener("touchmove", drawing);
            canvas.removeEventListener("touchend", drawEnd);
        };
    }, [characterImage]);

    // Helper functions to get coordinates
    function getTouchCoordinates(event, canvas) {
        const touch = event.touches[0];
        const rect = canvas.getBoundingClientRect();
        return {
            offsetX: touch.clientX - rect.left,
            offsetY: touch.clientY - rect.top,
        };
    }

    function getMouseCoordinates(event) {
        return {
            offsetX: event.offsetX,
            offsetY: event.offsetY,
        };
    }

    return <StyledCanvas ref={canvasRef} />;
});


// Main CalligraphyGame component
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
        // Whenever the index changes, we set puzzleActive to true to restart the timer
        setPuzzleActive(true);
    }, [currentIndex]);

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
                    <CalligraphyCanvas characterImage={characterList[currentIndex].image} />
                    <div>{characterList[currentIndex].english}</div>
                    <button onClick={handleNextCharacter}>Next Character</button>
                </>
            )}
        </GameContainer>
    );
};

export default CalligraphyGame;
