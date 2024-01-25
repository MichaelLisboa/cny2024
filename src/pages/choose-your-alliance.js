import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import { AppContext } from '../contexts/AppContext';
import MalCarousel from '../components/MalCarousel';
import { OrnateButton } from '../components/Button';

import rat from "../images/zodiac_actual/animals/rat.png";
import ox from "../images/zodiac_actual/animals/ox.png";
import tiger from "../images/zodiac_actual/animals/tiger.png";
import rabbit from "../images/zodiac_actual/animals/rabbit.png";
import dragon from "../images/zodiac_actual/animals/dragon.png";
import snake from "../images/zodiac_actual/animals/snake.png";
import horse from "../images/zodiac_actual/animals/horse.png";
import goat from "../images/zodiac_actual/animals/goat.png";
import monkey from "../images/zodiac_actual/animals/monkey.png";
import rooster from "../images/zodiac_actual/animals/rooster.png";
import dog from "../images/zodiac_actual/animals/dog.png";
import pig from "../images/zodiac_actual/animals/pig.png";

const allianceList = [
    {
        title: "Clever Rat",
        image: rat,
        description: "I'm known for my wit. Would you join forces with me to navigate these challenges?",
        subheadline: "Drink from the cup of Bravery",
        text: "Team up with the Clever Rat"
    },
    {
        title: "Strong Ox",
        image: ox,
        description: "My strength is unmatched. Will you join forces to overcome these challenges?",
        subheadline: "Drink from the cup of Cleverness",
        text: ""
    },
    {
        title: "Fierce Tiger",
        image: tiger,
        description: "To win this race, you'll need courage and strength. Will you join me to learn the ways of the *element_noun*?",
        subheadline: "Drink from the cup of Energy",
        text: ""
    },
    {
        title: "Smart Rabbit",
        image: rabbit,
        description: "I'm known for my quick thinking. Would you like to team up and outpace the competition?",
        subheadline: "Drink from the cup of Craftiness",
        text: ""
    },
    {
        title: "Wise Dragon",
        image: dragon,
        description: "I dare you to navigate this treacherous obstacle course. Let's see if you can succeed.",
        subheadline: "Drink from the cup of Strength",
        text: ""
    },
    {
        title: "Patient Snake",
        image: snake,
        description: "I sense intricate challenges on our path. With patience, we can overcome them together. Would you join me?",
        subheadline: "Drink from the cup of Resilience",
        text: ""
    },
    {
        title: "Mighty Horse",
        image: horse,
        description: "I've been watching your progress. It's time for a test of strength. Are you up for the challenge?",
        subheadline: "Drink from the cup of Perseverence",
        text: ""
    },
    {
        title: "Polite Goat",
        image: goat,
        description: "I see you've come a long way in this race. With cooperation, we can navigate them gracefully.",
        subheadline: "Drink from the cup of Gracefulness",
        text: ""
    },
    {
        title: "Curious Monkey",
        image: monkey,
        description: "I've heard tales of mysterious artifacts hidden in the heart of the *element_noun*. What do you say?",
        subheadline: "Drink from the cup of Resourcefulness",
        text: ""
    },
    {
        title: "Determined Rooster",
        image: rooster,
        description: "Your determination is admirable. Join me, and we'll overcome these challenges together!",
        subheadline: "Drink from the cup of Curiosity",
        text: ""
    },
    {
        title: "Amiable Dog",
        image: dog,
        description: "With amiability and camaraderie, we can make the journey enjoyable. Would you be my companion?",
        subheadline: "Drink from the cup of Curiosity",
        text: ""
    },
    {
        title: "Energetic Pig",
        image: pig,
        description: "I challenge you to a race through the forest. Are you energetic enough to keep up?",
        subheadline: "Drink from the cup of Curiosity",
        text: ""
    },
];

const StyledMalCarousel = styled(MalCarousel)`
  .slide {
    margin: 0 !important;
    padding: 0 !important;
    max-height: 40vh;
    overflow: visible !important;

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

const Container = styled.div`
  position: relative;
  height: 5em;
  width: 90%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
  auto-fit: contain;
`;

const StyledParagraph = styled(motion.p).attrs(() => ({
    variants: paragraphVariants,
    initial: '',
    animate: 'show',
    exit: 'exit',
}))`
  position: absolute;
  top: 0;
  width: 90%;
  line-height: 1.2em;
  overflow: hidden;
  font-size: 1rem;
  font-family: Lato, sans-serif;
  font-weight: 700;
  font-style: italic;
  text-align: center;
  margin: 0;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  padding: 8px 8px;
`;

const paragraphVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const HeaderSection = styled(motion.div)`
  // Add your header-section styles here.
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const ChooseYourAlliance = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const [content, setContent] = useState('initial');

    const userInfo = getUserInfo();
    const userElement = userInfo.chosenElement;

    const location = useLocation();
    const currentPage = pages.find(page => page.url === location.pathname);
    const nextPage = pages.find(page => page.url === currentPage.nextPage);
    const previousPage = pages.find(page => page.url === currentPage.previousPage);
    const headerControls = useAnimation();
    const bodyControls = useAnimation();
    const footerControls = useAnimation();
    const paragraphControls = useAnimation();

    const initialSlide = {
        index: 0,
        title: allianceList[0].title,
        image: allianceList[0].image,
        text: allianceList[0].text,
        subheadline: allianceList[0].subheadline,
        description: allianceList[0].description.replace(/\*element_noun\*/g, userElement)
    };

    const [currentSlide, setCurrentSlide] = useState(initialSlide);

    useEffect(() => {
        animateParagraph();
    }, [currentSlide]); // This will trigger the animation whenever currentSlide changes

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
        const chosenAlliance = currentSlide.title;
        updateUserSelection('chosenAlliance', chosenAlliance);

        if (chosenAlliance) {
            await animateExit();
            setContent('monkey');
            setTimeout(() => {
                animateEnter();
            }, 500);
        }
    };

    const handleCurrentSlideChange = (newCurrentSlideIndex) => {
        setCurrentSlide({
            index: newCurrentSlideIndex,
            title: allianceList[newCurrentSlideIndex].title,
            text: allianceList[newCurrentSlideIndex].text,
            subheadline: allianceList[newCurrentSlideIndex].subheadline,
            description: allianceList[newCurrentSlideIndex].description.replace(/\*element_noun\*/g, userElement)
        });
    };

    const animateParagraph = async () => {
        await paragraphControls.start({
            opacity: 1,
            translateY: 0,
            transition: { duration: 0.5 }
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
                        <h3 className="mal-margin-remove-top">Shortly after, you come across other spirits.</h3>
                    </div>
                ) : ``}
            </HeaderSection>
            <BodySection
                animate={bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <div>
                        <Container>
                            <AnimatePresence>
                                <StyledParagraph
                                    key={currentSlide.index}
                                    lines={3}>
                                    "{currentSlide.description.replace(/\*element_noun\*/g, userElement)}"
                                </StyledParagraph>
                            </AnimatePresence>
                        </Container>
                        <StyledMalCarousel
                            elementsList={allianceList}
                            initialSlide={initialSlide.index}
                            onCurrentSlideChange={handleCurrentSlideChange}
                            handleCardClick={handleButtonClick}
                        />
                    </div>
                ) : (
                    <div>
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

export default ChooseYourAlliance;
