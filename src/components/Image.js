import React from 'react';
import useProgressiveImg from '../hooks/useProgressiveImg';
import styled from 'styled-components';

const ImageContainer = styled.div`
  overflow: hidden; // Clips the image to its bounds
  padding: 5px; // Adjust as needed to accommodate the blur
`;

const StyledImage = styled.img`
  width: 100%; // Ensures image stretches to container width
  height: auto; // Maintains image aspect ratio
  transition: filter 0.3s ease-out;
`;

const Image = ({ highResSrc, alt, ...props }) => {
  const [src, loading] = useProgressiveImg(highResSrc);
  const blur = loading ? 'blur(20px)' : 'none';

  return (
    <ImageContainer>
      <StyledImage src={src} alt={alt} style={{ filter: blur }} {...props} />
    </ImageContainer>
  );
};

export default Image;
