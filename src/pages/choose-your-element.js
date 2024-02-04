import React, { useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import { elementsList } from '../data';
import MalCarousel from '../components/MalCarousel';
import { OrnateButton } from '../components/Button';
import Image from '../components/Image';

const scaleAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(2);
  }
`;

const shadowAnimation = keyframes`
    0% {
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
    }
    100% {
        box-shadow: 0 0 48px rgba(0, 0, 0, 0.35);
    }
`;

const StyledMalCarousel = styled(MalCarousel)`
    .slide {
        background-color: transparent;

        &.slide img {
                max-height: 45vh;
                height: 100%;
                object-fit: cover;
                object-position: center;
                border-radius: 16px;
        }

        &.slide-current img {
                animation: ${scaleAnimation} 30s ease-in-out infinite alternate;
            }
        
        &.slide .card-image-container {
            box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
        }

        &.slide-current .card-image-container {
            animation: ${shadowAnimation} 0.3s ease-in-out forwards;
        }
    }
`;

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
        height: 100%;
        max-height: 25vh;
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
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');
    const [selectedCard, setSelectedCard] = useState(null);

    const location = useLocation();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const previousPage = useMemo(() => pages.find(page => page.url === currentPage.previousPage), [currentPage]);
    const headerControls = useAnimation();
    const bodyControls = useAnimation();
    const footerControls = useAnimation();

    const initialSlide = {
        index: 2,
        image: elementsList[2].image,
        title: elementsList[2].title,
        text: replaceElementNoun(elementsList[2].text),
        subheadline: replaceElementNoun(elementsList[2].subheadline),
        description: replaceElementNoun(elementsList[2].description)
    };

    const [currentSlide, setCurrentSlide] = useState(initialSlide);


    const animateExit = async () => {
        await footerControls.start({ y: 100, opacity: 0 });
        await new Promise(resolve => setTimeout(resolve, 5));
        await bodyControls.start({ y: 100, opacity: 0 });
        await new Promise(resolve => setTimeout(resolve, 5));
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
            setContent('');
            setTimeout(() => {
                animateEnter();
            }, 500);
        }
    };

    const handleCurrentSlideChange = (newCurrentSlideIndex) => {
        setCurrentSlide({
            index: newCurrentSlideIndex,
            image: elementsList[newCurrentSlideIndex].image,
            title: elementsList[newCurrentSlideIndex].title,
            text: replaceElementNoun(elementsList[newCurrentSlideIndex].text),
            subheadline: replaceElementNoun(elementsList[newCurrentSlideIndex].subheadline),
            description: replaceElementNoun(elementsList[newCurrentSlideIndex].description)
        });
    };

    const elementTokenImage = require(`../images/tokens/${selectedCard ? selectedCard.toLowerCase() : `element`}.png`);

    return (
        <Layout>
            <HeaderSection
                animate={headerControls}
                className="header-section mal-text-center"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">You find yourself in an ethereal realm, surrounded by a captivating aura of...</h3>
                    </div>
                ) : null}
            </HeaderSection>
            <BodySection
                animate={bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <div className="mal-padding mal-padding-remove-vertical">
                        <StyledMalCarousel
                            elementsList={elementsList}
                            initialSlide={initialSlide.index}
                            onCurrentSlideChange={handleCurrentSlideChange}
                            handleCardClick={handleButtonClick}
                        />
                    </div>
                ) : (
                    <div className="mal-padding-small mal-text-center">
                        <ElementTokenImage className="mal-padding">
                            <Image
                                src={elementTokenImage}
                                alt={`The Element of ${selectedCard}`}
                                loading="lazy" />
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