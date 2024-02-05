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
  overflow: hidden; // Prevent pieces from being dragged outside
`;

const DraggablePiece = styled(motion.div)`
  background-size: cover;
  cursor: grab;
  user-select: none;
  width: calc(100% / ${(props) => props.gridSize});
  height: calc(100% / ${(props) => props.gridSize});
`;

const JigsawPuzzle = ({ imageSrc, gridSize }) => {
  const [pieces, setPieces] = useState([]);
  const clickSound = new Audio(clickSoundFile);
  const containerRef = useRef();

  useEffect(() => {
    setPieces(createShuffledPieces(gridSize, imageSrc));
  }, [imageSrc, gridSize]);

  const onDragEnd = (dragIndex, event, info) => {
    const dropTargetIndex = calculateDropTargetIndex(info.point, containerRef.current, gridSize);

    if (dropTargetIndex !== null && dropTargetIndex !== dragIndex) {
      swapPieces(dragIndex, dropTargetIndex);
      clickSound.play().catch((error) => console.error('Failed to play sound:', error));
    } else {
      // Return the dragged piece to its original location
      setPieces((pieces) => {
        const newPieces = Array.from(pieces);
        newPieces[dragIndex].x = 0;
        newPieces[dragIndex].y = 0;
        return newPieces;
      });
    }
  };

  const swapPieces = (sourceIndex, destinationIndex) => {
    setPieces((pieces) => {
      const newPieces = Array.from(pieces);
      [newPieces[sourceIndex], newPieces[destinationIndex]] = [newPieces[destinationIndex], newPieces[sourceIndex]];
      return newPieces;
    });
  };

  return (
    <PuzzleContainer ref={containerRef} gridSize={gridSize}>
      {pieces.map((piece, index) => (
        <DraggablePiece
          key={piece.id}
          style={{
            ...piece.style,
            x: piece.x,
            y: piece.y,
          }}
          drag
          dragConstraints={containerRef}
          onDragEnd={(event, info) => onDragEnd(index, event, info)}
          whileDrag={{ zIndex: 2 }}
          gridSize={gridSize}
        />
      ))}
    </PuzzleContainer>
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
