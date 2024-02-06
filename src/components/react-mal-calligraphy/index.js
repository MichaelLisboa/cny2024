// Import React, styled-components, and framer-motion
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
`;

const TimeLeft = styled(motion.div)`
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: bold;
`;

// Timer component
const Timer = ({ onTimeout, duration }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeout();
            return;
        }
        const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timerId);
    }, [timeLeft, onTimeout]);

    return <TimeLeft>Time Left: {timeLeft}s</TimeLeft>;
};

// Main CalligraphyGame component
const CalligraphyGame = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);

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

    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        canvas.width = 300;
        canvas.height = 300;

        // Clear the canvas before drawing a new character outline
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Load and draw the character outline
        const image = new Image();
        image.src = characterList[currentIndex].image; // Corrected to use the 'image' property
        image.onload = () => {
            // Draw the image on the canvas
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
        };

        let drawing = false;

        const getCoordinates = (event) => {
            if (event.touches) {
                // Touch event
                const canvasRect = canvas.getBoundingClientRect();
                return {
                    offsetX: event.touches[0].clientX - canvasRect.left,
                    offsetY: event.touches[0].clientY - canvasRect.top,
                };
            } else {
                // Mouse event
                return { offsetX: event.offsetX, offsetY: event.offsetY };
            }
        };

        const startDrawing = (event) => {
            drawing = true;
            event.preventDefault(); // Prevent scrolling on touch devices
            draw(event);
        };

        const endDrawing = () => {
            drawing = false;
            context.beginPath(); // Begin a new path to avoid drawing continuous lines when moving the mouse
        };

        const draw = (event) => {
            if (!drawing) return;
            const { offsetX, offsetY } = getCoordinates(event);

            context.lineWidth = 6;
            context.lineCap = 'round';
            context.strokeStyle = 'black'; // Change as needed

            context.lineTo(offsetX, offsetY);
            context.stroke();
            context.beginPath(); // Start a new path for the next segment
            context.moveTo(offsetX, offsetY);
        };

        // Event listeners for drawing actions
        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mouseup', endDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('touchstart', startDrawing, { passive: false });
        canvas.addEventListener('touchend', endDrawing);
        canvas.addEventListener('touchmove', draw, { passive: false });

        // Cleanup function to remove event listeners
        return () => {
            canvas.removeEventListener('mousedown', startDrawing);
            canvas.removeEventListener('mouseup', endDrawing);
            canvas.removeEventListener('mousemove', draw);
            canvas.removeEventListener('touchstart', startDrawing);
            canvas.removeEventListener('touchend', endDrawing);
            canvas.removeEventListener('touchmove', draw);
        };
    }, [currentIndex, characterList]); // Depend on currentIndex to update the image



    const handleTimeout = () => {
        if (currentIndex < characterList.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsGameOver(true);
        }
    };

    return (
        <GameContainer>
            {!isGameOver ? (
                <>
                    <Timer duration={100 / characterList.length} onTimeout={handleTimeout} />
                    <StyledCanvas ref={canvasRef} />
                    <div>Draw: {characterList[currentIndex].mandarin}</div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    Game Over! Review your characters.
                </motion.div>
            )}
        </GameContainer>
    );
};

export default CalligraphyGame;
