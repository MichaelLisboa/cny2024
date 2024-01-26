// Usage with a Static Image:
// <Image src={"path/to/high-res-image.jpg"} alt={"High-Resolution Image"} />

// Usage with a Dynamically Required Image:
// const dynamicImage = require(`path/to/images/${imageName}.jpg`);
// <Image src={dynamicImage} alt={"Dynamic Image"} />

// Usage with an Imported Image:
// import highResImage from 'path/to/high-res-image.jpg';
// <Image src={highResImage} alt={"Imported Image"} />

import React from 'react';
import useProgressiveImg from '../hooks/useProgressiveImg';
import styled from 'styled-components';

const ImageContainer = styled.div`
  overflow: loading && hidden;
`;

const StyledImage = styled.img`
  width: loading && 100%;
  height: loading && auto;
  transition: filter 0.3s ease-out;
`;

const Image = ({ src, alt, ...props }) => {
  const [source, loading] = useProgressiveImg(src);
  const blur = loading ? 'blur(20px)' : 'none';

  return (
    <ImageContainer>
      <StyledImage src={source} alt={alt} style={{ filter: blur }} {...props} />
    </ImageContainer>
  );
};

export default Image;
