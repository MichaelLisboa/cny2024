import React, { useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { usePageAnimations } from '../contexts/AnimationContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import TraitToken from '../components/TraitToken';
import { elementsList } from '../data';
import MalCarousel from '../components/MalCarousel';
import { OrnateButton } from '../components/Button';
import { TextPerCharAnimation } from '../components/TextPerCharAnimation';

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

        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 16px;
        }

        // media query for larger screens
        @media (min-width: 768px) {
            img {
                max-height: 45vh;
            }
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

    const initialSlide = {
        index: 2,
        image: elementsList[2].image,
        title: elementsList[2].title,
        text: replaceElementNoun(elementsList[2].text),
        subheadline: replaceElementNoun(elementsList[2].subheadline),
        description: replaceElementNoun(elementsList[2].description),
        element_endResult: elementsList[2].element_endResult
    };

    const [currentSlide, setCurrentSlide] = useState(initialSlide);
    const { animations, animateEnter, animateExit, controls } = usePageAnimations();

    const handleButtonClick = async () => {
        const chosenElement = currentSlide.title;
        setSelectedCard(chosenElement);
        updateUserSelection('chosenElement', { choice: chosenElement, element_endResult: currentSlide.element_endResult });

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
            description: replaceElementNoun(elementsList[newCurrentSlideIndex].description),
            element_endResult: elementsList[newCurrentSlideIndex].element_endResult
        });
    };

    const elementTokenImage = require(`../images/tokens/${selectedCard ? selectedCard.toLowerCase() : `element`}.png`);

    return (
        <Layout>
            <HeaderSection
                className="header-section mal-text-center"
            >
                <AnimatePresence mode='wait'>
                    {content === 'initial' ? (
                        <motion.div
                            key="header"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={animations.slideUpFadeIn} // Adjust according to the desired animation
                        >
                            <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                                <h3 className="mal-margin-remove-top">
                                    <TextPerCharAnimation
                                        text="You find yourself in an ethereal realm, surrounded by a captivating aura of..."
                                        animationVariant={animations.textFadeInByChar}
                                    />
                                </h3>
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>
            </HeaderSection>

            <BodySection className="body-section">
                <AnimatePresence mode='wait'>
                    {content === 'initial' ? (
                        <motion.div
                            key="carousel"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={animations.slideUpFadeIn} // Adjust according to the desired animation
                        >
                            <div className="mal-padding mal-padding-remove-vertical">
                                <StyledMalCarousel
                                    elementsList={elementsList}
                                    initialSlide={initialSlide.index}
                                    onCurrentSlideChange={handleCurrentSlideChange}
                                    handleCardClick={handleButtonClick}
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="traitToken"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={{ ...animations.slideUpFadeIn }} // Adjust according to the desired animation
                        >
                            <TraitToken
                                trait={elementTokenImage}
                                selected={selectedCard}
                                subheadline={currentSlide.subheadline}
                                title={currentSlide.title}
                                description={currentSlide.description}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </BodySection>

            <FooterSection
                animate={controls.footerControls}
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