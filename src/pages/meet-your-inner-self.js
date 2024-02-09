import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation, easeInOut } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import Image from '../components/Image';
import { OrnateButton } from '../components/Button';
import { zodiacData } from '../data';
import getBestMatch from '../data/calculateBestMatch'

const Section = styled(Layout)`
    margin-top: 72px;
    padding: 24px;  
    height: 100vh !important;
    overflow: scroll !important;
`;

const Headline = styled.h1`
    margin-top: -56px;
    margin-bottom: 0px;
    line-height: 1;
    text-align: center;
    color: rgba(51, 124, 118, 1);
`;

const StyledAnimalImage = styled(Image)`

    img {
        object-fit: cover;
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
        background-color: rgba(253, 247, 230, 1);
        font-family: Inknut Antiqua, Georgia, serif;
        font-weight: 400;
        padding: 4px 8px;
        border-radius: 30px;
        border: 1px solid rgba(178, 85, 72, 1);
    }
`;

const Description = styled.div`
    text-align: center;
    margin: 24px 0;
    color: rgba(102, 71, 56, 1);
}`;

const MeetYourInnerSelf = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [refreshEnabled, setRefreshEnabled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const previousPage = useMemo(() => pages.find(page => page.url === currentPage.previousPage), [currentPage]);

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

    return (
        <Section refreshEnabled={refreshEnabled}>
                <Headline>{userAnimal.title}-Hearted {userInfo.zodiacAnimal}</Headline>
                <div id="section-1" className="mal-flex mal-flex-column mal-flex-middle">
                    <TraitsList>
                        {userAnimal.traits.map((trait, index) => (
                            <li key={index}>{trait}</li>
                        ))}
                    </TraitsList>
                    <StyledAnimalImage src={userAnimal.image} alt={userAnimal.name} />
                </div>
                <div id="section-2" className="mal-flex mal-flex-column mal-flex-middle">
                    <Description>
                        <h3>There's something intriguing about you, a hidden aspect waiting to be discovered.</h3>
                        <p>{replaceElementNoun(userAnimal.story)}</p>
                    </Description>
                </div>
                <div id="section-3" className="mal-flex mal-flex-column mal-flex-middle">
                    <OrnateButton
                        onClick={() => navigate(previousPage.url)}
                    >
                        Continue
                    </OrnateButton>
                </div>
                <div id="section-4" className="mal-flex mal-flex-column mal-flex-middle">
                    <OrnateButton
                        onClick={() => navigate(previousPage.url)}
                    >
                        Continue
                    </OrnateButton>
                </div>
        </Section>
    );
};

export default MeetYourInnerSelf;
