import React, { useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { usePageAnimations } from '../contexts/AnimationContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import { AnimatedBodySection } from '../components/AnimatedSections';
import MalCarousel from '../components/MalCarousel';
import TraitToken from '../components/TraitToken';
import { TextPerCharAnimation } from '../components/TextPerCharAnimation';
import { OrnateButton } from '../components/Button';
import { traitsList } from '../data';
import trait from "../images/tokens/trait.png";

const StyledMalCarousel = styled(MalCarousel)`
  .slide {
    margin: 0 !important;
    padding: 0 !important;

    &.slide img {
        max-height: 40vh;
    }
  }
`;

const DescriptionText = styled(motion.p)`
    display: block;
    font-size: 1.25rem;
    font-family: Lato, sans-serif;
    font-weight: 400;
    font-style: italic;
    color: #322F20;
    text-align: center;
    margin: 0;
    padding: 0;
`;

const BodySection = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10%;

    @media (min-width: 768px) {
        margin-top: 0;
    }
`;

const ChooseYourTrait = () => {
    const { updateUserSelection } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');
    const [selectedCard, setSelectedCard] = useState(null);
    const location = useLocation();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const { animations, animateEnter, animateExit } = usePageAnimations();

    // Function to get random index
    const getRandomIndex = (length) => Math.floor(Math.random() * length);

    // Function to get unique random indices
    const getRandomIndices = (length, count) => {
        const indices = new Set();
        while (indices.size < count) {
            indices.add(getRandomIndex(length));
        }
        return [...indices];
    }

    // Get 5 random items from traitsList
    const randomItems = useMemo(() => {
        // Get 5 unique random indices
        const randomIndices = getRandomIndices(traitsList.length, 5);

        // Get 5 random items from traitsList
        return randomIndices.map(index => traitsList[index]);
    }, [traitsList]);

    const [currentSlide, setCurrentSlide] = useState(
        {
            index: 0,
            title: randomItems[0].title,
            image: randomItems[0].image,
            text: replaceElementNoun(randomItems[0].text),
            subheadline: replaceElementNoun(randomItems[0].subheadline),
            description: replaceElementNoun(randomItems[0].description)
        }
    );

    const handleButtonClick = async () => {
        const chosenTrait = currentSlide.title;
        setSelectedCard(chosenTrait);
        updateUserSelection('chosenTrait', chosenTrait);

        if (chosenTrait) {
            await animateExit();
            setContent(true);
            setTimeout(() => {
                animateEnter();
            }, 500);
        }
    };

    const handleCurrentSlideChange = (newCurrentSlideIndex) => {
        setCurrentSlide({
            index: newCurrentSlideIndex,
            image: traitsList[newCurrentSlideIndex].image,
            title: replaceElementNoun(traitsList[newCurrentSlideIndex].title),
            text: replaceElementNoun(traitsList[newCurrentSlideIndex].text),
            subheadline: replaceElementNoun(traitsList[newCurrentSlideIndex].subheadline),
            description: replaceElementNoun(traitsList[newCurrentSlideIndex].description)
        });
    };

    return (
        <Layout>
            {content === 'initial' ? (
                <AnimatedBodySection keyName="header" className="header-section" animationVariant={animations.slideUpFadeIn}>
                    <div className="mal-margin-large-bottom mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">
                            <TextPerCharAnimation
                                text={replaceElementNoun(`As you explore the realm of *element_noun* you discover five shimmering cups, each radiating a unique essence.`)}
                                animationVariant={animations.textFadeInByChar}
                            />
                        </h3>
                        <DescriptionText
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.75 }}>
                            Choose your cup wisely.
                        </DescriptionText>
                    </div>
                </AnimatedBodySection>
            ) : 
            (
                <AnimatedBodySection keyName="header2" className="header-section" animationVariant={animations.slideUpFadeIn}>
                    &nbsp;
                </AnimatedBodySection>
            )
            }

            {content === 'initial' ? (
                <AnimatedBodySection keyName="carousel" className="body-section" animationVariant={animations.slideUpFadeIn}>
                    <BodySection className="mal-padding mal-padding-remove-vertical">
                    <StyledMalCarousel
                            elementsList={randomItems}
                            initialSlide={0}
                            onCurrentSlideChange={handleCurrentSlideChange}
                            handleCardClick={handleButtonClick}
                        />
                    </BodySection>
                </AnimatedBodySection>
            ) : (
                <AnimatedBodySection keyName="traitToken" animationVariant={animations.slideUpFadeIn}>
                    
                    <TraitToken
                        trait={trait}
                        selected={selectedCard}
                        subheadline={currentSlide.subheadline}
                        title={currentSlide.title}
                        description={currentSlide.description}
                    />
                </AnimatedBodySection>
            )}

            {content === 'initial' ? (
                <AnimatedBodySection keyName="choice" className="footer-section" animationVariant={animations.slideUpFadeIn}>
                    <OrnateButton onClick={handleButtonClick}>
                        {currentSlide.title}
                    </OrnateButton>
                </AnimatedBodySection>
            ) : (
                <AnimatedBodySection keyName="result" className="footer-section" animationVariant={animations.slideUpFadeIn}>
                    <OrnateButton url={nextPage.url}>
                        {nextPage.title}
                    </OrnateButton>
                </AnimatedBodySection>
            )}
        </Layout >
    );
};

export default ChooseYourTrait;
