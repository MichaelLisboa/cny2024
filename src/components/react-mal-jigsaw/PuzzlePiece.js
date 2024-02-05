// src/components/PuzzlePiece.js
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const DraggablePiece = styled(motion.div)`
  background-size: cover;
  cursor: grab;
  user-select: none;
`;

const PuzzlePiece = ({ id, style, gridSize, onDragEnd }) => {
  // Adjust the drag constraints and logic based on your puzzle's layout and requirements
  return (
    <DraggablePiece
      style={style}
      layoutId={`piece-${id}`} // Framer Motion prop for layout animations
      drag // Enable dragging
      // Optionally constrain by parent or specific values
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      // Execute the onDragEnd function upon drag end or when correctly placed
      onDragEnd={() => onDragEnd(id)}
      // You can add drag transition options to make the drag feel more natural
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      whileDrag={{ zIndex: 2 }} // Bring the piece to the top layer when dragging
      // Set the size of the piece relative to the gridSize
      initial={{ width: `calc(100% / ${gridSize})`, height: `calc(100% / ${gridSize})` }}
      animate={{ width: `calc(100% / ${gridSize})`, height: `calc(100% / ${gridSize})` }}
    />
  );
};

export default PuzzlePiece;
