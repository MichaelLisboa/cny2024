import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Styled canvas component
const StyledCanvas = styled.canvas`
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 24px;
`;

// CalligraphyCanvas functional component
const CalligraphyCanvas = React.memo(({ characterImage }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext('2d');

    // Load and draw the character image
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = characterImage;

    // Function to start drawing
    const startDrawing = (e) => {
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      canvas.addEventListener('mousemove', draw);
    };

    // Function to draw
    const draw = (e) => {
      if (e.buttons !== 1) return; // draw only if the mouse button is pressed
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
    };

    // Function to stop drawing
    const stopDrawing = () => {
      canvas.removeEventListener('mousemove', draw);
      ctx.closePath();
    };

    // Add event listeners for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Add touch event listeners for mobile devices
    canvas.addEventListener('touchstart', (e) => startDrawing(e.touches[0]), { passive: true });
    canvas.addEventListener('touchmove', (e) => draw(e.touches[0]), { passive: true });
    canvas.addEventListener('touchend', stopDrawing);

    // Set up the canvas drawing styles
    ctx.lineWidth = 2; // Set the line width
    ctx.lineCap = 'round'; // Set the line cap
    ctx.strokeStyle = 'black'; // Set the stroke style

    // Cleanup function to remove event listeners
    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
      canvas.removeEventListener('touchstart', startDrawing);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', stopDrawing);
    };
  }, [characterImage]); // Only re-run the effect if the image changes

  return <StyledCanvas ref={canvasRef} />;
});

export default CalligraphyCanvas;