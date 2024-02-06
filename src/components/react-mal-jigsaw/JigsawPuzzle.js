import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import clickSoundFile from './clickSound.mp3';

const PuzzleContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridSize}, 1fr);
  display: grid;
  gap: ${props => props.isPuzzleComplete ? '0' : '2px'};
  width: 300px;
  height: 300px;
  position: relative;
  overflow: hidden;
  transition: gap 0.5s ease-in;
`;

const DraggablePiece = styled(motion.div)`
  background-size: cover;
  cursor: grab;
  user-select: none;
  width: calc(100% / ${(props) => props.gridSize});
  height: calc(100% / ${(props) => props.gridSize});
`;

const Countdown = styled.h2`
  text-align: center;
  color: rgba(156, 19, 19, 1);
`;

function formatTime(seconds) {
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${paddedMinutes}:${paddedSeconds}`;
}

const JigsawPuzzle = ({ imageSrc, gridSize, timeLimit, onCompletionStatusChange }) => {
    const [pieces, setPieces] = useState([]);
    const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);
    const [puzzleActive, setPuzzleActive] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const clickSound = new Audio(clickSoundFile);
    const containerRef = useRef();

    useEffect(() => {
        setPieces(createShuffledPieces(gridSize, imageSrc));
    }, []);

    useEffect(() => {
        if (pieces.length > 0) {
            const isComplete = pieces.every((piece, index) => piece.id === index);
            setIsPuzzleComplete(isComplete);

            if (isComplete) {
                setPuzzleActive(false);
                onCompletionStatusChange(true);
            }
        }
    }, [pieces, onCompletionStatusChange]);

    useEffect(() => {
        let timerInterval = null;

        if (puzzleActive) {
            timerInterval = setInterval(() => {
                setElapsedTime((prevTime) => {
                    if (prevTime < timeLimit) {
                        return prevTime + 1;
                    } else {
                        clearInterval(timerInterval); // Stop the interval if time limit is reached
                        setPuzzleActive(false);
                        setIsTimeUp(true); // Set isTimeUp to true when time is up
                        onCompletionStatusChange(false);
                        return prevTime;
                    }
                });
            }, 1000);
        }

        return () => {
            clearInterval(timerInterval);
        };
    }, [timeLimit, puzzleActive, onCompletionStatusChange]);

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
            const piece = newPieces[index];
            const origX = piece.origX; // Get the original X position
            const origY = piece.origY; // Get the original Y position
            piece.x = origX; // Reset to the original X position
            piece.y = origY; // Reset to the original Y position
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
            {!isPuzzleComplete && !isTimeUp ? (
                <Countdown>{formatTime(timeLimit - elapsedTime)}</Countdown>
            ) : (
                <Countdown>{!isTimeUp ? "Success!" : "Time's Up!"}</Countdown>
            )}


            <PuzzleContainer
                ref={containerRef}
                gridSize={gridSize}
                isPuzzleComplete={isPuzzleComplete}>
                {pieces.map((piece, index) => (
                    <DraggablePiece
                        key={piece.id}
                        style={{
                            ...piece.style,
                            x: piece.x,
                            y: piece.y,
                        }}
                        drag={!isPuzzleComplete && puzzleActive && timeLimit - elapsedTime > 1} // Set drag prop based on puzzle activityag prop based on puzzle activity
                        dragConstraints={containerRef}
                        onDragEnd={(event, info) => onDragEnd(index, event, info)}
                        whileDrag={{
                            zIndex: 200,
                            scale: 1.025,
                            boxShadow: '0px 2px 24px rgba(50, 50, 50, 0.25)'
                        }}
                        animate={{ x: 0, y: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        gridSize={gridSize}
                    />
                ))}
            </PuzzleContainer>
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
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
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
