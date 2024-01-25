import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { AppContext } from '../../contexts/AppContext'; // Import AppContext
import Carousel from "nuka-carousel";

const Card = styled.div`
  margin: 0px;
  border-radius: 16px;
  background: transparent;
  overflow: hidden;
  &:hover {
    cursor: url("data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23a)'%3E%3Cpath d='m57.899 10.063 11.133-4.771 6.362 7.953h7.953l6.362 3.71 2.65 6.893h10.074l4.771 4.241v29.69l-4.771 38.702-10.073 19.616H48.356L25.028 91.179l-14.845-33.4 2.651-6.362 7.953-2.651L36.692 64.67h5.832V13.244l9.543-3.18h5.832Z' fill='%23fff' stroke='%23000'/%3E%3Cpath d='M110.774 30.28a10.995 10.995 0 0 0-10.361-11.038 10.992 10.992 0 0 0-5.403 1.071 11.274 11.274 0 0 0-16.47-9.33 11.628 11.628 0 0 0-22.691-2.687 11.416 11.416 0 0 0-5.867-1.626A11.558 11.558 0 0 0 38.459 18.3v44.746c-4.524-5.655-8.942-11.24-9.614-12.194a11.276 11.276 0 0 0-9.613-5.266 11.91 11.91 0 0 0-12.265 12.3c.318 6.362 12.618 28.841 20.889 41.07 12.512 18.521 24.458 21.207 24.988 21.207h37.183a3.25 3.25 0 0 0 1.944-.672 46.404 46.404 0 0 0 13.254-21.666c3.535-10.921 5.408-26.614 5.585-47.927l-.036-19.616ZM99.181 95.846A44.039 44.039 0 0 1 88.79 113.8H53.763c-1.66-.495-10.85-3.888-20.747-18.556-9.896-14.668-19.51-34.214-19.687-37.677a5.302 5.302 0 0 1 1.59-3.994 5.372 5.372 0 0 1 4.03-1.626 5.053 5.053 0 0 1 4.665 2.51c1.025 1.52 8.342 10.603 12.618 16.01l8.59-5.796V18.299a5.23 5.23 0 1 1 10.426 0v39.374h6.362V11.725a5.337 5.337 0 0 1 10.603 0v46.407h6.362V21.197a5.054 5.054 0 1 1 10.073 0v40.434h6.362V30.174a4.7 4.7 0 0 1 9.367 0v19.617c-.106 20.889-1.803 35.769-5.196 46.054Z' fill='%231C1C1C'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Cpath fill='%23fff' d='M0 0h120v120H0z'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E"), grab;
  }
  &:active {
    cursor: url('data:image/svg+xml;utf8,<svg width="40" height="40" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23a)"><path d="m49 9 12-4 11 4 13.5 1.5L94 20l17 2 1.5 39.5-8 34.5-14 20-41.5 2-19-17.5L12 72 8.5 53.5l10-24.5L31 20l2-11h16Z" fill="%23fff" stroke="%23000"/><path d="M101.388 14.925c-1.707.025-3.4.303-5.025.823-.823-5.37-6.713-9.442-14.163-9.442a17.325 17.325 0 0 0-6.626 1.083A14.596 14.596 0 0 0 62.017.026a14.942 14.942 0 0 0-12.43 5.717 15.809 15.809 0 0 0-8.187-2.21 13.21 13.21 0 0 0-14.033 12.042v3.941c-4.59 1.733-17.8 7.796-21.266 20.963-3.465 13.167 1.473 34.65 11.651 51.022a109.2 109.2 0 0 0 25.554 27.763 3.905 3.905 0 0 0 2.296.736h44.784a3.981 3.981 0 0 0 2.383-.823 56.87 56.87 0 0 0 16.242-26.55 111.744 111.744 0 0 0 6.756-41.926V26.879a13.34 13.34 0 0 0-14.379-11.954Zm6.583 35.776a103.937 103.937 0 0 1-6.367 39.63 53.969 53.969 0 0 1-12.734 21.873H46.728a102.874 102.874 0 0 1-22.523-24.775c-10.264-16.718-12.993-35.646-10.74-45a24.688 24.688 0 0 1 13.902-14.424V61.14a3.898 3.898 0 0 0 7.796 0V15.575c0-2.036 2.556-4.332 6.324-4.332s6.453 2.253 6.453 4.332v24.774h7.797V10.897c0-1.213 2.512-3.075 6.323-3.075 3.812 0 6.627 2.079 6.627 3.248v29.842h7.796v-24.86l.736-.52a9.096 9.096 0 0 1 5.111-1.387c4.028 0 6.497 1.906 6.497 2.946v28.152h7.84V24.15a8.273 8.273 0 0 1 4.851-1.429c3.724 0 6.583 2.209 6.583 4.071l-.13 23.909Z" fill="%231C1C1C"/></g><defs><clipPath id="a"><path fill="%23fff" d="M0 0h120v120H0z"/></clipPath></defs></svg>'), grabbing;
  }
  transition: transform 0.3s;
  will-change: transform;

  @media (min-width: 768px) {
    height: 45vh;
  }

  img {
    width: 100%;
    max-height: 30vh;
    overflow: hidden;
    object-fit: contain;
    object-position: center;
  }
  `;

const CarouselContainer = styled(Carousel)`
  .slide {
    border-radius: 16px;
    background: transparent;
  }
  .slide:not(.slide-current) {
    opacity: 0.8 !important;
    transform: scale(0.8) !important;
    transition: transform 0.3s, opacity 0.3s;
  }

  .slide-current {
    transform: scale(1);
    transition: transform 0.3s, opacity 0.3s;
  }
`;

const PreviousButton = styled.button`
  position: fixed;
  left: 16px !important;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  left: 0;

  svg {
    height: 24px;
    width: 24px;
  }

  @media (min-width: 768px) {
    position:relative;
    left: -48px !important;
    background: rgba(0,0,0, 0.75);

    svg {
        height: 48px;
        width: 48px;
      }

    svg path {
        fill: #fff;
    }
  }
`;

const NextButton = styled.button`
  position: fixed;
  right: 16px !important;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  right: 0;

  svg {
    height: 24px;
    width: 24px;
  }

  @media (min-width: 768px) {
    position:relative;
    right: -48px !important;
    background: rgba(0,0,0, 0.75);

    svg {
        height: 48px;
        width: 48px;
      }

    svg path {
        fill: #fff;
    }
  }
`;

const MalCarousel = ({ elementsList, onCurrentSlideChange, handleCardClick, className }) => {
  const { getBrowserSize } = useContext(AppContext);
  const browserSize = getBrowserSize();
  const { height, width } = browserSize; 

  const carouselRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(2);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.focus({ preventScroll: true });
    }
  }, []);

  return (

    <CarouselContainer
      ref={carouselRef}
      className={`carousel ${className}`}
      wrapAround={true}
      slideIndex={2}
      renderBottomCenterControls={null}
      renderCenterLeftControls={({ previousSlide }) => (
        <PreviousButton onClick={previousSlide}>
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M6.66699 16L14.667 28H24.0003L16.0003 16L24.0003 4H14.667L6.66699 16Z" fill="#9C1313" />
            <path d="M6.66699 16L14.667 28H24.0003L16.0003 16L24.0003 4H14.667L6.66699 16ZM9.87233 16L16.095 6.66667H19.019L12.7963 16L19.019 25.3333H16.0937L9.87233 16Z" fill="#9C1313" />
          </svg>
        </PreviousButton>
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <NextButton onClick={nextSlide}>
          <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.3" d="M24 16L16 28H6.66667L14.6667 16L6.66667 4H16L24 16Z" fill="#9C1313" />
            <path d="M24 16L16 28H6.66667L14.6667 16L6.66667 4H16L24 16ZM20.7947 16L14.572 6.66667H11.648L17.8707 16L11.648 25.3333H14.5733L20.7947 16Z" fill="#9C1313" />
          </svg>
        </NextButton>
      )}
      scrollMode="page"
      dragging={true}
      beforeSlide={(currentSlide, endSlide) => {
        if (currentSlide < endSlide) {
          return false;
        }
      }}
      enableKeyboardControls={true}
      getSlideProps={(slideIndex) => ({
        'aria-label': `Element ${elementsList[slideIndex].title}`,
      })}
      afterSlide={(slideIndex) => {
        setCurrentSlide(slideIndex);
        if (onCurrentSlideChange) {
          onCurrentSlideChange(slideIndex);
        }
      }}>
      {elementsList.map((element, index) => (
        <Card
          key={index}
          selected={index === currentSlide}
          onClick={() => {
            if (width <= 768) {
                handleCardClick();
            }
        }}
        >
          <img
            src={element.image}
            alt={element.title} />
        </Card>
      ))}
    </CarouselContainer>
  );
};

export default MalCarousel;