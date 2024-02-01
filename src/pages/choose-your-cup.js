import React, { useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import { AppContext } from '../contexts/AppContext';
import Image from '../components/Image';
import MalCarousel from '../components/MalCarousel';
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

const TraitTokenImage = styled.div`
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

const ChooseYourTrait = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const [content, setContent] = useState('initial');
    const [selectedCard, setSelectedCard] = useState(null);

    const userInfo = getUserInfo();
    const userElement = userInfo.chosenElement;

    const location = useLocation();
    const currentPage = pages.find(page => page.url === location.pathname);
    const nextPage = pages.find(page => page.url === currentPage.nextPage);
    const previousPage = pages.find(page => page.url === currentPage.previousPage);
    const headerControls = useAnimation();
    const bodyControls = useAnimation();
    const footerControls = useAnimation();

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
            text: randomItems[0].text,
            subheadline: randomItems[0].subheadline,
            description: randomItems[0].description.replace(/\*element_noun\*/g, userElement)
        }
    );


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
        const chosenTrait = currentSlide.title;
        setSelectedCard(chosenTrait);
        updateUserSelection('chosenTrait', chosenTrait);

        if (chosenTrait) {
            await animateExit();
            setContent(true); // Change the content
            setTimeout(() => {
                animateEnter();
            }, 500);
        }
    };

    const handleCurrentSlideChange = (newCurrentSlideIndex) => {
        setCurrentSlide({
            index: newCurrentSlideIndex,
            image: traitsList[newCurrentSlideIndex].image,
            title: traitsList[newCurrentSlideIndex].title,
            text: traitsList[newCurrentSlideIndex].text,
            subheadline: traitsList[newCurrentSlideIndex].subheadline,
            description: traitsList[newCurrentSlideIndex].description.replace(/\*element_noun\*/g, userElement)
        });
    };

    return (
        <Layout>
            <HeaderSection
                animate={headerControls}
                className="header-section"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">Emperor Jade presents you with five shimmering cups, each radiating a unique essence of a distinct personality trait. </h3>
                        <p className="mal-text-medium mal-margin-small-top">Choose your cup wisely.</p>
                    </div>
                ) : ``}
            </HeaderSection>
            <BodySection
                animate={bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <div>
                        <StyledMalCarousel
                            elementsList={randomItems}
                            initialSlide={0}
                            onCurrentSlideChange={handleCurrentSlideChange}
                            handleCardClick={handleButtonClick}
                        />
                    </div>
                ) : (
                    <div className="mal-padding-small mal-text-center">
                        <TraitTokenImage className="mal-padding">
                            <Image
                                src={trait}
                                alt={`The Trait of ${selectedCard}`} />
                        </TraitTokenImage>
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

export default ChooseYourTrait;
