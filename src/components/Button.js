import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import buttonDefaultImage from '../images/button_default@2x.png';
import buttonHoverImage from '../images/button_hover.png';
import optionButtonDefaultImage from '../images/option_button_default.png';

const StyledLink = styled(Link)`
  position: relative;
  z-index: 2;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0;
  height: 72px;
  min-width: 248px;
  border: solid 0px transparent;
  border-width: 20px 28px;
  -moz-border-image: url(${buttonDefaultImage}) 44 64 fill stretch stretch;
  -webkit-border-image: url(${buttonDefaultImage}) 44 64 fill stretch stretch;
  -o-border-image: url(${buttonDefaultImage}) 44 64 fill stretch stretch;
  border-image: url(${buttonDefaultImage}) 44 64 fill stretch stretch;
  font-family: "Inknut Antiqua", Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: 800;
  font-size: 1rem;
  color: #322F20;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  background-color: transparent;
  white-space: nowrap;
  transform: translate3d(0, 0, 0); /* Force hardware acceleration */
  transition: transform 0.35s ease-in-out, min-width 0.35s ease-in-out, font-size 0.35s ease-in-out;
  will-change: transform, min-width, font-size;

  &:hover {
    text-decoration: none;
    color: initial;
    // font-size: 1.25rem;
    // border-image: url(${buttonHoverImage}) 44 64 fill stretch stretch;
    // -moz-border-image: url(${buttonHoverImage}) 44 64 fill stretch stretch;
    // -webkit-border-image: url(${buttonHoverImage}) 44 64 fill stretch stretch;
    // -o-border-image: url(${buttonHoverImage}) 44 64 fill stretch stretch;
    // transform: translate3d(0, -4px, 0);
    // will-change: border-image, min-width, font-size;
  }
`;

const OptionButtonLink = styled(Link)`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 0 !important;
  margin: 0 !important;
  height: 72px;
  border: solid 0px transparent;
  border-width: 20px 20px;
  -moz-border-image: url(${optionButtonDefaultImage}) 44 56 fill stretch stretch;
  -webkit-border-image: url(${optionButtonDefaultImage}) 44 56 fill stretch stretch;
  -o-border-image: url(${optionButtonDefaultImage}) 44 56 fill stretch stretch;
  border-image: url(${optionButtonDefaultImage}) 44 56 fill stretch stretch;
  font-family: "Inknut Antiqua", Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  font-weight: 800;
  font-size: 1rem;
  color: rgba(156, 19, 19, 1);
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  background-color: transparent;
  white-space: nowrap;
  transform: translate3d(0, 0, 0); /* Force hardware acceleration */
  transition: transform 0.35s ease-in-out, min-width 0.35s ease-in-out, font-size 0.35s ease-in-out;
  will-change: transform, min-width, font-size;

  &:hover {
    text-decoration: none;
    color: rgba(156, 19, 19, 1);
    font-size: 1rem;
    border-image: url(${optionButtonDefaultImage}) 44 56 fill stretch stretch;
    -moz-border-image: url(${optionButtonDefaultImage}) 44 56 fill stretch stretch;
    -webkit-border-image: url(${optionButtonDefaultImage}) 44 56 fill stretch stretch;
    -o-border-image: url(${optionButtonDefaultImage}) 44 56 fill stretch stretch;
    transform: translate3d(0, -4px, 0);
    will-change: border-image, min-width, font-size;
  }

  * {
    font-size: 1rem;
  }
`;  


const NextButton = motion(StyledLink);
const UserOptionButton = motion(OptionButtonLink);

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
      transition={{ delay: .75 }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      isactive={isactive}>{children}</NextButton>
  );
};

export const OptionButton = ({ children, url, onClick }) => {
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
    <UserOptionButton
      to={url || '#'}
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      isactive={isactive}>{children}</UserOptionButton>
  );
};

