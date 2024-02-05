import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import clickSoundFile from './clickSound.mp3';

const PuzzleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridSize}, 1fr);
  gap: 2px;
  width: 300px;
  height: 300px;
  position: relative;
  overflow: hidden;
`;

const DraggablePiece = styled(motion.div)`
  background-size: cover;
  cursor: grab;
  user-select: none;
  width: calc(100% / ${(props) => props.gridSize});
  height: calc(100% / ${(props) => props.gridSize});
`;

const Countdown = styled.h3`
  text-align: center;
  color: rgba(156, 19, 19, 1);
`;

const JigsawPuzzle = ({ imageSrc, gridSize, timeLimit }) => {
    const [pieces, setPieces] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [puzzleActive, setPuzzleActive] = useState(true); // State to control puzzle activity
    const [isPuzzleComplete, setIsPuzzleComplete] = useState(false); // State to track puzzle completion
    const clickSound = new Audio(clickSoundFile);
    const containerRef = useRef();

    useEffect(() => {
        setPieces(createShuffledPieces(gridSize, imageSrc));
    }, [imageSrc, gridSize]);

    useEffect(() => {
        let timerInterval = null;

        if (elapsedTime < timeLimit && !isPuzzleComplete) {
            timerInterval = setInterval(() => {
                if (elapsedTime < timeLimit && !isPuzzleComplete) {
                    setElapsedTime((prevTime) => prevTime + 1);
                } else {
                    clearInterval(timerInterval); // Stop the interval if time limit is reached or puzzle is complete
                    if (isPuzzleComplete) {
                        console.log('Puzzle is complete!');
                        setPuzzleActive(false);
                    } else {
                        console.log('Time is up!');
                        setPuzzleActive(false);
                    }
                }
            }, 1000); // Increment elapsed time every second
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [elapsedTime, timeLimit, isPuzzleComplete]);



    const onDragEnd = (dragIndex, event, info) => {
        if (!puzzleActive) return; // If puzzle is not active, do nothing

        const dropTargetIndex = calculateDropTargetIndex(info.point, containerRef.current, gridSize);

        if (dropTargetIndex !== null && dropTargetIndex !== dragIndex) {
            swapPieces(dragIndex, dropTargetIndex);
            clickSound.play().catch((error) => console.error('Failed to play sound:', error));

            // Check for puzzle completion after swapping pieces
            const completed = pieces.every((piece, index) => piece.id === index);
            if (completed) {
                setIsPuzzleComplete(true); // Set isPuzzleComplete to true when puzzle is completed
                setPuzzleActive(false); // Disable puzzle interaction
            }
        } else {
            resetPiecePosition(dragIndex);
        }
    };


    const resetPiecePosition = (index) => {
        setPieces((pieces) => {
            const newPieces = Array.from(pieces);
            newPieces[index].x = 0;
            newPieces[index].y = 0;
            return newPieces;
        });
    };

    const swapPieces = (sourceIndex, destinationIndex) => {
        setPieces((pieces) => {
            const newPieces = Array.from(pieces);
            [newPieces[sourceIndex], newPieces[destinationIndex]] = [newPieces[destinationIndex], newPieces[sourceIndex]];
            return newPieces;
        });
    };

    return (
        <div>
            {isPuzzleComplete ? 
                <Countdown>Puzzle completed in {elapsedTime} seconds!</Countdown>
            : 
                <Countdown>{timeLimit - elapsedTime} seconds remaining</Countdown>
            }
            <PuzzleContainer ref={containerRef} gridSize={gridSize}>
                {pieces.map((piece, index) => (
                    <DraggablePiece
                        key={piece.id}
                        style={{
                            ...piece.style,
                            x: piece.x,
                            y: piece.y,
                        }}
                        drag={puzzleActive} // Set drag prop based on puzzle activity
                        dragConstraints={containerRef}
                        onDragEnd={(event, info) => onDragEnd(index, event, info)}
                        whileDrag={{ zIndex: 200, scale: 1.025, boxShadow: '0px 2px 24px rgba(50, 50, 50, 0.25)' }}
                        animate={{ x: 0, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        gridSize={gridSize}
                    />
                ))}
            </PuzzleContainer>
            {isPuzzleComplete && <p>Puzzle completed in {elapsedTime} seconds!</p>}
        </div>
    );
};


function createShuffledPieces(gridSize, imageSrc) {
    const pieceSize = 300 / gridSize;
    let pieces = [];
    for (let i = 0; i < gridSize * gridSize; i++) {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        pieces.push({
            id: i,
            style: {
                backgroundImage: `url(${imageSrc})`,
                backgroundPosition: `${-col * pieceSize}px ${-row * pieceSize}px`,
                backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                width: pieceSize,
                height: pieceSize,
            },
        });
    }
    return shuffleArray(pieces);
}

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function calculateDropTargetIndex(point, container, gridSize) {
    if (!container) return null; // If ref is not attached yet

    const pieceSize = container.offsetWidth / gridSize;
    const rect = container.getBoundingClientRect();
    const x = point.x - rect.left; // Adjust for the container's position
    const y = point.y - rect.top;
    const col = Math.floor(x / pieceSize);
    const row = Math.floor(y / pieceSize);
    const index = row * gridSize + col;
    return index >= 0 && index < gridSize * gridSize ? index : null;
}

export default JigsawPuzzle;
