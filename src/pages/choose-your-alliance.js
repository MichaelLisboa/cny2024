import React, { useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion'; // Import useAnimation here
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
        description: "As you sip from the cup, a surge of courage courses through your ethereal form. The *element_noun* shadows seem less intimidating, and you find yourself eagerly engaging with other spirits. Your newfound rat propels you forward, unafraid of the challenges that lie ahead.",
        subheadline: "Drink from the cup of Bravery",
        text: "Team up with the Clever Rat"
    },
    {
        title: "Strong Ox",
        image: ox,
        description: "The elixir of ox enhances your wit and intelligence. You navigate the *element_noun* with strategic acumen, outsmarting spirits and solving challenges with ease. Your sharp mind becomes your greatest asset, and other spirits admire your clever approach.",
        subheadline: "Drink from the cup of Cleverness",
        text: ""
    },
    {
        title: "Fierce Tiger",
        image: tiger,
        description: "The vibrant tiger from the cup infuses your spirit with agility and speed. You dart through the *element_noun*, embracing the thrill of the race. Your energetic spirit sets a lively pace, making you a formidable contender among the spirits.",
        subheadline: "Drink from the cup of Energy",
        text: ""
    },
    {
        title: "Smart Rabbit",
        image: rabbit,
        description: "The elixir of craftiness imbues you with ingenuity and sly tactics. Navigating through the *element_noun*, you employ clever tricks and strategies, gaining an edge over challenges. Your rabbit nature becomes a hallmark of your journey.",
        subheadline: "Drink from the cup of Craftiness",
        text: ""
    },
    {
        title: "Wise Dragon",
        image: dragon,
        description: "The cup of dragon fills you with power and determination. As you move through the *element_noun*, your strong presence intimidates other spirits. Challenges become opportunities to showcase your might, solidifying your position as a formidable contender.",
        subheadline: "Drink from the cup of Strength",
        text: ""
    },
    {
        title: "Patient Snake",
        image: snake,
        description: "Sipping from the cup of resilience, you feel an unwavering resolve. As you navigate the *element_noun*, challenges may arise, but you face them with adaptability and determination. Your resilience becomes a beacon, inspiring other spirits on their journey.",
        subheadline: "Drink from the cup of Resilience",
        text: ""
    },
    {
        title: "Mighty Horse",
        image: horse,
        description: "The elixir of perseverance fortifies your spirit with unwavering determination. Among the ancient *element_noun*, obstacles may attempt to hinder your path, but you press on, fueled by an inner dragon that resonates with the very heartbeat of the *element_noun*.",
        subheadline: "Drink from the cup of Perseverence",
        text: ""
    },
    {
        title: "Polite Goat",
        image: goat,
        description: "The cup of grace bestows upon you an aura of elegance and finesse. Moving through the enchanted *element_noun*, your every step is marked by goat precision. Challenges in the way seem to bow before your goat spirit.",
        subheadline: "Drink from the cup of Gracefulness",
        text: ""
    },
    {
        title: "Curious Monkey",
        image: monkey,
        description: "Sipping from the cup of monkeyness, you discover ingenious ways to overcome challenges. The *element_noun* becomes a canvas for your creative problem-solving, and your monkey nature shines through.",
        subheadline: "Drink from the cup of Resourcefulness",
        text: ""
    },
    {
        title: "Determined Rooster",
        image: rooster,
        description: "The elixir of rooster sparks a deep desire to explore. Every challenge, every encounter becomes an opportunity to learn. Your curious spirit leads you down uncharted paths, uncovering hidden wonders in the *element_noun*.",
        subheadline: "Drink from the cup of Curiosity",
        text: ""
    },
    {
        title: "Amiable Dog",
        image: dog,
        description: "The elixir of rooster sparks a deep desire to explore. Every challenge, every encounter becomes an opportunity to learn. Your curious spirit leads you down uncharted paths, uncovering hidden wonders in the *element_noun*.",
        subheadline: "Drink from the cup of Curiosity",
        text: ""
    },
    {
        title: "Energetic Pig",
        image: pig,
        description: "The elixir of rooster sparks a deep desire to explore. Every challenge, every encounter becomes an opportunity to learn. Your curious spirit leads you down uncharted paths, uncovering hidden wonders in the *element_noun*.",
        subheadline: "Drink from the cup of Curiosity",
        text: ""
    },
];

const StyledMalCarousel = styled(MalCarousel)`
.slide {
    overflow: visible !important;

    &.slide img {
        max-height: 45vh;
        object-fit: contain;
        object-position: center;
    }

    &.slide-current img {
        object-fit: contain;
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

const ChooseYourAlliance = () => {
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

    const initialSlide = {
        index: 0,
        title: allianceList[0].title,
        image: allianceList[0].image,
        text: allianceList[0].text,
        subheadline: allianceList[0].subheadline,
        description: allianceList[0].description.replace(/\*element_noun\*/g, userElement)
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
        const chosenAlliance = currentSlide.title;
        setSelectedCard(chosenAlliance);
        updateUserSelection('chosenAlliance', chosenAlliance);

        if (chosenAlliance) {
            await animateExit();
            setContent('monkey'); // Change the content
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

    return (
        <Layout>
            <HeaderSection
                animate={headerControls}
                className="header-section mal-text-center"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">Shortly after, you come across other spirits.</h3>
                        <p className="mal-text-medium mal-margin-small-top">I've heard tales of mysterious artifacts hidden in the heart of the cliff. What do you say?</p>
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
                            elementsList={allianceList}
                            onCurrentSlideChange={handleCurrentSlideChange}
                            handleCardClick={handleButtonClick}
                        />
                    </div>
                ) : (
                    <div className="mal-padding-small mal-text-center">
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
