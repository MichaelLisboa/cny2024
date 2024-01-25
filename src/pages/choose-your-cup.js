import React, { useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion'; // Import useAnimation here
import pages from '../utils/pages';
import Layout from '../templates/layout';
import { AppContext } from '../contexts/AppContext';
import MalCarousel from '../components/MalCarousel';
import { OrnateButton } from '../components/Button';

import bravery from "../images/traits/bravery.png";
import cleverness from "../images/traits/cleverness.png";
import energy from "../images/traits/energy.png";
import crafty from "../images/traits/crafty.png";
import strength from "../images/traits/strength.png";
import resilient from "../images/traits/resilient.png";
import persevering from "../images/traits/persevering.png";
import graceful from "../images/traits/graceful.png";
import resourceful from "../images/traits/resourceful.png";
import curiosity from "../images/traits/curiosity.png";
import trait from "../images/tokens/trait.png";

const traitsList = [
    {
        title: "Brave Character",
        image: bravery,
        description: "As you sip from the cup, a surge of courage courses through your ethereal form. The *element_noun* shadows seem less intimidating, and you find yourself eagerly engaging with other spirits. Your newfound bravery propels you forward, unafraid of the challenges that lie ahead.",
        subheadline: "Drink from the cup of Bravery",
        text: ""
    },
    {
        title: "Clever Minded",
        image: cleverness,
        description: "The elixir of cleverness enhances your wit and intelligence. You navigate the *element_noun* with strategic acumen, outsmarting spirits and solving challenges with ease. Your sharp mind becomes your greatest asset, and other spirits admire your clever approach.",
        subheadline: "Drink from the cup of Cleverness",
        text: ""
    },
    {
        title: "Energetic Spirit",
        image: energy,
        description: "The vibrant energy from the cup infuses your spirit with agility and speed. You dart through the *element_noun*, embracing the thrill of the race. Your energetic spirit sets a lively pace, making you a formidable contender among the spirits.",
        subheadline: "Drink from the cup of Energy",
        text: ""
    },
    {
        title: "Crafty Nature",
        image: crafty,
        description: "The elixir of craftiness imbues you with ingenuity and sly tactics. Navigating through the *element_noun*, you employ clever tricks and strategies, gaining an edge over challenges. Your crafty nature becomes a hallmark of your journey.",
        subheadline: "Drink from the cup of Craftiness",
        text: ""
    },
    {
        title: "Strong Contender",
        image: strength,
        description: "The cup of strength fills you with power and determination. As you move through the *element_noun*, your strong presence intimidates other spirits. Challenges become opportunities to showcase your might, solidifying your position as a formidable contender.",
        subheadline: "Drink from the cup of Strength",
        text: ""
    },
    {
        title: "Resilient Character",
        image: resilient,
        description: "Sipping from the cup of resilience, you feel an unwavering resolve. As you navigate the *element_noun*, challenges may arise, but you face them with adaptability and determination. Your resilience becomes a beacon, inspiring other spirits on their journey.",
        subheadline: "Drink from the cup of Resilience",
        text: ""
    },
    {
        title: "Persevering Spirit",
        image: persevering,
        description: "The elixir of perseverance fortifies your spirit with unwavering determination. Among the ancient *element_noun*, obstacles may attempt to hinder your path, but you press on, fueled by an inner strength that resonates with the very heartbeat of the *element_noun*.",
        subheadline: "Drink from the cup of Perseverence",
        text: ""
    },
    {
        title: "Walks with Grace",
        image: graceful,
        description: "The cup of grace bestows upon you an aura of elegance and finesse. Moving through the enchanted *element_noun*, your every step is marked by graceful precision. Challenges in the way seem to bow before your graceful spirit.",
        subheadline: "Drink from the cup of Gracefulness",
        text: ""
    },
    {
        title: "Resourceful Nature",
        image: resourceful,
        description: "Sipping from the cup of resourcefulness, you discover ingenious ways to overcome challenges. The *element_noun* becomes a canvas for your creative problem-solving, and your resourceful nature shines through.",
        subheadline: "Drink from the cup of Resourcefulness",
        text: ""
    },
    {
        title: "Curious Soul",
        image: curiosity,
        description: "The elixir of curiosity sparks a deep desire to explore. Every challenge, every encounter becomes an opportunity to learn. Your curious spirit leads you down uncharted paths, uncovering hidden wonders in the *element_noun*.",
        subheadline: "Drink from the cup of Curiosity",
        text: ""
    },
];

const StyledMalCarousel = styled(MalCarousel)`
  .slide {
    margin: 0 !important;
    padding: 0 !important;
    max-height: 36vh;
    overflow: visible !important;

    &.slide img {
        max-height: 36vh;
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

    const initialSlide = {
        index: 0,
        title: randomItems[0].title,
        image: randomItems[0].image,
        text: randomItems[0].text,
        subheadline: randomItems[0].subheadline,
        description: randomItems[0].description.replace(/\*element_noun\*/g, userElement)
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
        const chosenTrait = currentSlide.title;
        setSelectedCard(chosenTrait);
        updateUserSelection('chosenTrait', chosenTrait);

        if (chosenTrait) {
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
                className="header-section mal-text-center"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">Emperor Jade presents you with five shimmering cups, each radiating a unique essence of a distinct personality trait. </h3>
                        <p className="mal-text-medium mal-margin-small-top">Choose your cup wisely.</p>
                    </div>
                ) : null}
            </HeaderSection>
            <BodySection
                animate={bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <div>
                        <StyledMalCarousel
                            elementsList={randomItems}
                            initialSlide={initialSlide.index}
                            onCurrentSlideChange={handleCurrentSlideChange}
                            handleCardClick={handleButtonClick}
                        />
                    </div>
                ) : (
                    <div className="mal-padding-small mal-text-center">
                        <TraitTokenImage className="mal-padding">
                            <img
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
