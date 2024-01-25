import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import buttonDefaultImage from '../images/button_default.png';
import buttonHoverImage from '../images/button_hover.png';
import buttonActiveImage from '../images/button_active.png';


const StyledLink = styled(Link)`
  position: relative;
  z-index: 2;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  height: 96px;
  min-width: 276px;
  border: solid 0px transparent;
  border-width: 48px 40px;
  border-image: url(${buttonDefaultImage}) 48 40 repeat;
  font-family: "Inknut Antiqua", Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: 800;
  font-size: 18px;
  color: #322F20;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  background-color: transparent;
  white-space: nowrap;
  transition: border-image 0.35s ease-in-out;

  border-image: ${props => props.isactive ? `url(${buttonActiveImage}) 48 40 repeat !important` : `url(${buttonDefaultImage}) 48 40 repeat !important`};

  &:hover {
    text-decoration: none;
    color: initial;
    border-image: url(${buttonHoverImage}) 48 40 repeat;
  }
`;

const NextButton = motion(StyledLink);

export const OrnateButton = ({ children, url, onClick }) => {
  const [isactive, setisactive] = useState(false);

  const handleMouseDown = () => {
    setisactive(true);
  };

  const handleMouseUp = () => {
    setTimeout(() => {
      setisactive(false);
    }, 500); // Reset after 0.5s
  };

  const handleMouseLeave = () => {
    setisactive(false); // Reset immediately if mouse leaves the button
  };

  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <NextButton
      to={url || '#'}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      isactive={isactive}>{children}</NextButton>
  );
};

