import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { motion, useAnimation } from 'framer-motion'; // Import useAnimation here
import pages from '../utils/pages';
import Layout from '../templates/layout';
import { AppContext } from '../contexts/AppContext';
import water from '../images/elements/water.png';
import wood from '../images/elements/wood.png';
import fire from '../images/elements/fire.png';
import earth from '../images/elements/earth.png';
import metal from '../images/elements/metal.png';
import MalCarousel from '../components/MalCarousel';
import { OrnateButton } from '../components/Button';

const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(2);
  }
`;

const StyledMalCarousel = styled(MalCarousel)`
  .slide {
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);

    &:not(.slide-current) {
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
    }

    &.slide-current {
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.35);
    }

    &.slide-current img {
        object-fit: cover;
        animation: ${scaleAnimation} 30s ease-in-out infinite alternate;
      }
  }
`;

const elementsList = [
    {
        image: water,
        title: "Water",
        text: "Misty lakeside with soothing ripples",
        subheadline: "You've risen from",
        description: "As you embrace the Water element, a serene energy envelops you. Ripples of adaptability and resilience flow through your essence. Now, let the currents guide your journey."
    },
    {
        image: wood,
        title: "Wood",
        text: "Towering trees in an enchanted forest",
        subheadline: "You've risen from",
        description: "You feel the essence of growth and creativity. Your spirit aligns with the flourishing trees, ready to weave a tale of blossoming possibilities. Let the branches of creativity guide your course."
    },
    {
        image: fire,
        title: "Fire",
        text: "Blaze-lit cavern glowing with warmth",
        subheadline: "You've risen from",
        description: "It blazes within you, igniting passion and determination. Flames of courage flicker, ready to illuminate the path ahead. Embrace the warmth and stride with determination."
    },
    {
        image: earth,
        title: "Earth",
        text: "Cliffside overlooking the horizon",
        subheadline: "You've risen from",
        description: "The sturdy foundation beneath your feet, anchors your spirit. With stability and responsibility, you embark on a journey grounded in purpose. Feel the solidity of the earth as you step into the unknown."
    },
    {
        image: metal,
        title: "Metal",
        text: "Shimmering scape under moonlight",
        subheadline: "You've risen from",
        description: "It shapes your being with discipline and precision. Your spirit, akin to a well-forged blade, is ready to cut through challenges. Embrace the strength of metal as you carve your destiny."
    },
];

const DescriptionText = styled.p`
    display: block;
    font-size: 0.75rem;
    font-family: Lato, sans-serif;
    font-weight: 400;
    font-style: italic;
    color: #322F20;
    text-align: center;
    margin: 0;
    padding: 0;
`;

const ElementTokenImage = styled.div`
    width: auto;
    padding: 32px;

    img {
        max-height: 30vh;
        object-fit: contain;
    }
`;

const HeaderSection = styled(motion.div)`
  // Add your header-section styles here.
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const WhatIsYourElement = () => {
    const { updateUserSelection } = useContext(AppContext);
    const [content, setContent] = useState('initial');
    const [selectedCard, setSelectedCard] = useState(null);

    const location = useLocation();
    const currentPage = pages.find(page => page.url === location.pathname);
    const nextPage = pages.find(page => page.url === currentPage.nextPage);
    const previousPage = pages.find(page => page.url === currentPage.previousPage);
    const headerControls = useAnimation();
    const bodyControls = useAnimation();
    const footerControls = useAnimation();

    const initialSlide = {
        index: 2,
        title: elementsList[2].title,
        text: elementsList[2].text,
        subheadline: elementsList[2].subheadline,
        description: elementsList[2].description
    };

    const [currentSlide, setCurrentSlide] = useState(initialSlide);


    const animateExit = async () => {
        await footerControls.start({ y: 100, opacity: 0 });
        await bodyControls.start({ y: 100, opacity: 0 });
        await headerControls.start({ y: 100, opacity: 0 });
    };

    const animateEnter = async () => {
        await bodyControls.start({ y: 0, opacity: 1, transition: { delay: 0.025 } });
        await footerControls.start({ y: 0, opacity: 1, transition: { delay: 0.05 } });
    };

    const handleButtonClick = async () => {
        const chosenElement = currentSlide.title;
        setSelectedCard(chosenElement);
        updateUserSelection('chosenElement', chosenElement);

        if (chosenElement) {
            await animateExit();
            setContent('monkey'); // Change the content
            await animateEnter();
        }
    };

    const handleCurrentSlideChange = (newCurrentSlideIndex) => {
        setCurrentSlide({
            index: newCurrentSlideIndex,
            title: elementsList[newCurrentSlideIndex].title,
            text: elementsList[newCurrentSlideIndex].text,
            subheadline: elementsList[newCurrentSlideIndex].subheadline,
            description: elementsList[newCurrentSlideIndex].description
        });
    };

    // const elementTokenImage = require(`../images/tokens/${selectedCard ? selectedCard.toLowerCase() : `element`}.png`);
    const elementTokenImage = require(`../images/tokens/${`element`}.png`);
    return (
        <Layout>
            <HeaderSection
                animate={headerControls}
                className="header-section mal-text-center"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-large mal-padding">
                        <h3 className="mal-margin-remove-top">You find yourself in an ethereal realm, surrounded by a captivating aura of...</h3>
                    </div>
                ) : null}
            </HeaderSection>
            <BodySection
                animate={bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <div className="mal-padding">
                        <StyledMalCarousel
                            elementsList={elementsList}
                            onCurrentSlideChange={handleCurrentSlideChange}
                        />
                    </div>
                ) : (
                    <div className="mal-padding-small mal-text-center">
                        <ElementTokenImage className="mal-padding">
                            <img
                                src={elementTokenImage}
                                alt={`The Element of ${selectedCard}`} />
                        </ElementTokenImage>
                        <h4 className="mal-margin-remove">{currentSlide.subheadline}</h4>
                        <h2 className="mal-margin-remove">{currentSlide.title}</h2>
                        <p>{currentSlide.description}</p>
                    </div>
                )}
            </BodySection>
            <FooterSection
                animate={footerControls}
                className="footer-section"
            >
                {content === 'initial' ? (
                    <OrnateButton onClick={handleButtonClick}>
                        {currentSlide.title}
                        <DescriptionText className="mal-text-small">{currentSlide.text}</DescriptionText>
                    </OrnateButton>
                ) : (
                    <OrnateButton url={nextPage.url}>
                        {nextPage.title}
                    </OrnateButton>
                )}
            </FooterSection>
        </Layout >
    );
};

export default WhatIsYourElement;
