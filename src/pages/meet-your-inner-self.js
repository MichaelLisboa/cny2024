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

const Section = styled(motion.section)`
    margin-top: 72px;
`;

const Headline = styled.h1`
    text-align: center;
    color: rgba(51, 124, 118, 1);
`;

const StyledAnimalImage = styled(Image)`
    width: 120vw !important;

    img {
        width: 120vw !important;
        object-fit: cover;
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
        font-size: 1rem;
        color: rgba(102, 71, 56, 1);
        font-family: Inknut Antiqua, Georgia, serif;
        font-weight: 400;
        padding: 4px 8px;
        border-radius: 30px;
        border: 1px solid rgba(102, 71, 56, 1);
    }
`;

const MeetYourInnerSelf = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');
    const [refreshEnabled, setRefreshEnabled] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const previousPage = useMemo(() => pages.find(page => page.url === currentPage.previousPage), [currentPage]);

    const userInfo = getUserInfo();
    
    const userAnimal = useMemo(() => {
        // if (userInfo.userAnimal) return userInfo.userAnimal;
        const randomIndex = Math.floor(Math.random() * zodiacData.length);
        return zodiacData[randomIndex];
    }, []);

    useEffect(() => {
        updateUserSelection('userAnimal', userAnimal);
    }, [userAnimal, updateUserSelection]);


    return (
        <Section>
            <Headline>{userAnimal.title}-Hearted {userInfo.zodiacAnimal}</Headline>
            <TraitsList>
                {userAnimal.traits.slice(0,3).map((trait, index) => (
                    <li key={userAnimal.slug}>{trait}</li>
                ))}

            </TraitsList>
            <StyledAnimalImage src={userAnimal.image} alt={userAnimal.title} />
        </Section>
    );
};

export default MeetYourInnerSelf;
