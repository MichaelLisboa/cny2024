import React, { useEffect, useState, useCallback, useRef, useContext, useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Image from '../Image';
import { AppContext } from '../../contexts/AppContext';

const CarouselWrapper = styled.div`
  display: flex;
  overflow: visible;
  position: relative;
  width: 100%;
  justify-content: center; /* Ensure slides are centered */
`;

const CarouselContainer = styled.div`
  display: flex;
  overflow: visible;
  transition: transform 0.5s ease;
  will-change: transform;
`;

const Slide = styled(motion.div)`
  display: flex;
  flex: 0 0 auto; /* Do not grow or shrink */
  width: calc(100% - 100px); /* Subtracting 100px as an example, adjust as needed */
  margin-right: 50px; /* Half of the subtracted width to space slides */
  margin-left: 50px; /* Half of the subtracted width to space slides */
  overflow: visible !important;
  position: relative;
  align-items: center;
  justify-content: center;

  &:first-child {
    margin-left: 50px; /* Set to half of the margin-right to center the first slide */
  }

  &:last-child {
    margin-right: 50px; /* Set to half of the margin-left to center the last slide */
  }

  img {
    width: auto;
    height: 100%;
    max-height: 45vh;
    border-radius: 16px;
    // box-shadow: 0 0 24px rgba(0, 0, 0, 0.25);
  }

  .current-slide img {
    // box-shadow: 0 0 40px rgba(0, 0, 0, 0.75) !important;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  @media (min-width: 768px) {
    background: rgba(0,0,0, 0.75);
  }
`;

const PreviousButton = styled(Button)`
  left: 16px;
`;

const NextButton = styled(Button)`
  right: 16px;
`;

const MalCarousel = ({
  elementsList,
  handleCardClick,
  className
}) => {
  const carouselRef = useRef();

  const [initialSlide, setInitialSlide] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(initialSlide + 1); // Start at the first "real" slide

  // Define onCurrentSlideChange as a function
  const onCurrentSlideChange = useCallback((newSlideIndex) => {
    // Update the state to reflect the new slide index
    setInitialSlide(newSlideIndex);
    // Add any additional logic you need when the current slide changes
  }, []);

  // Add "clone" slides at the beginning and end
  // const slides = useMemo(() => 
  //   [elementsList[elementsList.length - 1], ...elementsList, elementsList[0]], [elementsList]
  //   );

    const slides = useMemo(() => {
      // Assuming you want 1 duplicate at each end for seamless transition
      const firstSlide = elementsList[0];
      const lastSlide = elementsList[elementsList.length - 1];
      return [lastSlide, ...elementsList, firstSlide];
    }, [elementsList]);
    

  const handleSlideChange = useCallback((newSlideIndex, shouldAnimate = true) => {
    console.log('newCurrentSlideIndex:', newSlideIndex);
    if (carouselRef.current) {
      carouselRef.current.style.transition = shouldAnimate ? 'transform 0.5s ease' : 'none';
    }

    setCurrentSlide(newSlideIndex);

    // If the new slide is the last real slide, set it to the first cloned slide
    if (newSlideIndex === slides.length - 2) {
      const transitionEndHandler = () => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setCurrentSlide(1);
          carouselRef.current.removeEventListener('transitionend', transitionEndHandler);
        }
      };
      carouselRef.current.addEventListener('transitionend', transitionEndHandler);
    }
    // If the new slide is the first cloned slide, set it to the last real slide
    else if (newSlideIndex === 0) {
      const transitionEndHandler = () => {
        if (carouselRef.current) {
          carouselRef.current.style.transition = 'none';
          setCurrentSlide(slides.length - 2);
          carouselRef.current.removeEventListener('transitionend', transitionEndHandler);
        }
      };
      carouselRef.current.addEventListener('transitionend', transitionEndHandler);
    }

    // Adjust the index for the callback
    let callbackIndex = newSlideIndex - 1;
    if (callbackIndex < 0) {
      callbackIndex = slides.length - 1;
    } else if (callbackIndex >= slides.length) {
      callbackIndex = 0;
    }

    // Check if slides[callbackIndex] is defined before accessing its properties
    if (slides[callbackIndex]) {
      onCurrentSlideChange?.(slides[callbackIndex], callbackIndex);
    }
  }, [onCurrentSlideChange, slides]);

  const goToPreviousSlide = () => {
    let newSlideIndex = currentSlide - 1;
    if (newSlideIndex < 0) {
      handleSlideChange(slides.length - 2, false); // Jump to the last "real" slide
      return;
    }
    handleSlideChange(newSlideIndex);
  };

  const goToNextSlide = () => {
    let newSlideIndex = currentSlide + 1;
    if (newSlideIndex >= slides.length) {
      handleSlideChange(1, false); // Jump to the first "real" slide
      return;
    }
    handleSlideChange(newSlideIndex);
  };

  const offset = -(currentSlide * 100);

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  return (
    <CarouselWrapper className={`carousel-wrapper ${className}`}>
      <PreviousButton onClick={goToPreviousSlide}>
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.3" d="M6.66699 16L14.667 28H24.0003L16.0003 16L24.0003 4H14.667L6.66699 16Z" fill="#9C1313" />
          <path d="M6.66699 16L14.667 28H24.0003L16.0003 16L24.0003 4H14.667L6.66699 16ZM9.87233 16L16.095 6.66667H19.019L12.7963 16L19.019 25.3333H16.0937L9.87233 16Z" fill="#9C1313" />
        </svg>
      </PreviousButton>
      <CarouselContainer
        ref={carouselRef}
        style={{ transform: `translateX(${offset}%)` }}
      >
        {slides.map((element, index) => (
          <Slide
            className={`slide ${index === currentSlide ? 'current-slide' : ''}`}
            key={index}
            initial={false}
            animate={{ scale: index === currentSlide ? 1.2 : 0.7 }}
            transition={{ type: 'tween' }}
            onClick={() => handleCardClick(element, index)}

        drag="x" // Enable drag
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDragEnd={(e, info) => {
          const offsetX = info.offset.x;
          if (offsetX > 100) { // if drag distance is more than 100px to the right
            goToPreviousSlide();
          } else if (offsetX < -100) { // if drag distance is more than 100px to the left
            goToNextSlide();
          }
        }}
          >
            <Image onDragStart={handleDragStart} src={element.image} alt={element.title} />
          </Slide>
        ))}
      </CarouselContainer>
      <NextButton onClick={goToNextSlide}>
        <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path opacity="0.3" d="M24 16L16 28H6.66667L14.6667 16L6.66667 4H16L24 16Z" fill="#9C1313" />
          <path d="M24 16L16 28H6.66667L14.6667 16L6.66667 4H16L24 16ZM20.7947 16L14.572 6.66667H11.648L17.8707 16L11.648 25.3333H14.5733L20.7947 16Z" fill="#9C1313" />
        </svg>
      </NextButton>
    </CarouselWrapper>
  );
};

export default MalCarousel;