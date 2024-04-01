import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, easeInOut } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { usePageAnimations } from '../contexts/AnimationContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import SimpleLayout from '../templates/simple-layout';
import Image from '../components/Image';
import { zodiacData } from '../data';
import getBestMatch from '../data/calculateBestMatch'

import cat from '../images/icons/animals/cat.svg';
import crab from '../images/icons/animals/crab.svg';
import crane from '../images/icons/animals/crane.svg';
import dragonfly from '../images/icons/animals/dragonfly.svg';
import duck from '../images/icons/animals/duck.svg';
import goldfish from '../images/icons/animals/goldfish.svg';
import koifish from '../images/icons/animals/koi-fish.svg';
import panda from '../images/icons/animals/panda.svg';
import pangolin from '../images/icons/animals/pangolin.svg';
import phoenix from '../images/icons/animals/phoenix.svg';
import redpanda from '../images/icons/animals/red-panda.svg';
import miludeer from '../images/icons/animals/milu-deer.svg';

const zodiacAnimals = {
    cat,
    crab,
    crane,
    dragonfly,
    duck,
    goldfish,
    koifish,
    panda,
    pangolin,
    phoenix,
    redpanda,
    miludeer
};


const Section = styled(SimpleLayout)`
    padding: 72px 24px 128px 24px;  
    overflow-y: auto !important;
    scroll-behavior: smooth;
`;

const Headline = styled.h1`
    margin-top: -56px;
    margin-bottom: 0px;
    line-height: 1;
    text-align: center;
    color: rgba(51, 124, 118, 1);
`;

const StyledAnimalImage = styled(Image)`
    max-width: none !important;
    min-width: none !important;
    height: 55vh;
    width: auto !important;
    img {
        object-fit: cover;
    }

    @media (max-height: 668px) {
        max-height: 45vh;
    }

    @media (min-width: 768px) {
        max-height: 60vh;
    }
`;

const TraitsList = styled.ul`
    list-style-type: none;
    margin: 24px 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    li {
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        cursor: default;
        font-size: 0.875rem;
        color: rgba(102, 71, 56, 1);
        background-color: rgba(253, 247, 230, 0.25);
        font-family: Inknut Antiqua, Georgia, serif;
        font-weight: 400;
        padding: 4px 8px;
        border-radius: 30px;
        border: 1px solid rgba(178, 85, 72, 1);
        text-transform: capitalize;
        white-space: nowrap;
        z-index: 1;
    }
`;

const StyledIcon = styled(Image)`
    width: 100%;
    height: auto;
`;

const IconRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: space-evenly;
    gap: 16px;
    flex-wrap: nowrap;
    margin: 16px 0 0 0;

    img {
        width: 64px;
        height: 64px;
    }
`;

const Description = styled.div`
    text-align: center;
    margin: 16px 0;
    color: rgba(102, 71, 56, 1);

    h3, h4 {
        margin: 0;
    }

    p {
        margin: 8px 0 32px;
    }
}`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
`;

const MeetYourInnerSelf = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [refreshEnabled, setRefreshEnabled] = useState(false);
    const [content, setContent] = useState('section-1');
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const previousPage = useMemo(() => pages.find(page => page.url === currentPage.previousPage), [currentPage]);
    const { controls, animateExit, animateEnter } = usePageAnimations();

    const userInfo = getUserInfo();

    const userChoices = {
        element: userInfo.chosenElement.choice.toLowerCase(),
        trait: userInfo.chosenTrait.toLowerCase(),
        alliance: userInfo.chosenAlliance.choice.toLowerCase(),
        riddle: userInfo.riddleResult.choice,
        puzzle: userInfo.potteryPuzzleResult,
        calligraphy: userInfo.calligraphyChallengeResult,
        wishes: userInfo.chosenWish.toLowerCase(),
        path: userInfo.chosenPath.choice.toLowerCase()
    };

    const userAnimal = useMemo(() => {
        const matchedAnimal = getBestMatch(userChoices).animal;
        const matchedAnimalData = zodiacData.find(animal => animal.slug === matchedAnimal);
        return matchedAnimalData;
    }, []);

    useEffect(() => {
        setRefreshEnabled(false);
    }, []);

    useEffect(() => {
        if (!userInfo.userAnimal) {
            updateUserSelection('userAnimal', userAnimal);
        }
    }, [userAnimal, updateUserSelection, userInfo.userAnimal]);

    const handleButtonClick = async () => {
        await animateExit();
        setContent('complete');
        await animateEnter();
    }

    return (
        <Section refreshEnabled={refreshEnabled}>
            <BodySection
                animate={controls.bodyControls}
                className="body-section"
            >
                <Headline>{userAnimal.title}-Hearted {userInfo.zodiacAnimal}</Headline>
                <motion.div animate={controls.footerControls} id="section-1" className="mal-flex mal-flex-column mal-flex-middle">
                    <TraitsList>
                        {userAnimal.traits.map((trait, index) => (
                            <motion.li animate={controls.elementControls} key={index}>{trait}</motion.li>
                        ))}
                    </TraitsList>
                    <StyledAnimalImage src={userAnimal.image} alt={userAnimal.name} />
                </motion.div>
                <div id="section-2">
                    <Description>
                        <h3>There's something intriguing about you, a hidden aspect waiting to be discovered.</h3>
                        <p>{replaceElementNoun(userAnimal.story)}</p>
                    </Description>
                </div>
                <div id="section-3">
                    <Description>
                        <h3>What the Year of the Dragon brings for {userAnimal.title}</h3>
                        <p>{replaceElementNoun(userAnimal.fortune)}</p>
                    </Description>
                </div>
                <div id="section-4">
                    <Description>
                        <h4>Most compatible with</h4>
                        <IconRow>                          
                            {userAnimal.resultzodiacCompatible.map((zodiac, index) => (
                                <div key={index}>
                                    <StyledIcon src={zodiacAnimals[zodiac]} alt={zodiac} />
                                    <p className='mal-text-small mal-text-capitalize'>{zodiac}</p>
                                </div>
                            ))}
                        </IconRow>
                        <h4>Least compatible with</h4>
                        <IconRow>
                            {userAnimal.resultzodiacIncompatible.map((zodiac, index) => (
                                <div key={index}>
                                    <StyledIcon src={zodiacAnimals[zodiac]} alt={zodiac} />
                                    <p className='mal-text-small mal-text-capitalize'>{zodiac}</p>
                                </div>
                            ))}
                        </IconRow>
                    </Description>
                </div>
                <div id="section-5">
                    <Description>
                        <h4>Good traits</h4>
                        <p>{replaceElementNoun(userAnimal.positiveDescription)}</p>
                        <h4>Bad traits</h4>
                        <p>{replaceElementNoun(userAnimal.negativeDescription)}</p>
                    </Description>
                </div>
            </BodySection>
        </Section>
    );
};

export default MeetYourInnerSelf;
