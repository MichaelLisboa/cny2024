import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../contexts/AppContext'; // Import AppContext
import SimpleLayout from '../templates/simple-layout';
import { motion } from 'framer-motion';
import ZodiacInfo from '../components/ZodiacInfo';
import styled from 'styled-components';
import Image from '../components/Image';
import { zodiac } from '../data/fortune';
import BirthdatePicker from '../components/BirthdatePicker';
import rat from '../images/icons/animals/rat.svg';
import ox from '../images/icons/animals/ox.svg';
import tiger from '../images/icons/animals/tiger.svg';
import rabbit from '../images/icons/animals/rabbit.svg';
import dragon from '../images/icons/animals/dragon.svg';
import snake from '../images/icons/animals/snake.svg';
import horse from '../images/icons/animals/horse.svg';
import goat from '../images/icons/animals/goat.svg';
import monkey from '../images/icons/animals/monkey.svg';
import rooster from '../images/icons/animals/rooster.svg';
import dog from '../images/icons/animals/dog.svg';
import pig from '../images/icons/animals/pig.svg';

// Define the zodiac data
const zodiacAnimals = {
    rat,
    ox,
    tiger,
    rabbit,
    dragon,
    snake,
    horse,
    goat,
    monkey,
    rooster,
    dog,
    pig
};

const Headline = styled.h1`
    margin-top: -56px;
    margin-bottom: 0px;
    line-height: 1;
    text-align: center;
    color: rgba(51, 124, 118, 1);
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
    margin: 24px 0;

    img {
        width: 64px;
        height: 64px;
    }
`;

const Description = styled.div`
    text-align: center;
    margin: 24px 0;
    color: rgba(102, 71, 56, 1);

    h3, h4 {
        margin: 0;
    }

    p {
        margin: 8px 0 32px;
    }
}`;

function GetYourFortune() {
    const { getUserInfo, updateUserInfo } = useContext(AppContext);
    const [zodiacAnimal, setZodiacAnimal] = useState('');
    const AnimatedZodiacInfo = motion(ZodiacInfo);
    const userInfo = getUserInfo();
    const [refreshEnabled] = useState(true);

    useEffect(() => {
        if (userInfo.zodiacAnimal) {
            setZodiacAnimal(userInfo.zodiacAnimal);
        }
    }, [userInfo.zodiacAnimal]);

    // find the matching data in the zodica object based on the user's animal
    const zodiacData = zodiac.find(z => z.name.toLowerCase() === userInfo.zodiacAnimal.toLowerCase());

    return (
        <SimpleLayout refreshEnabled={refreshEnabled}>
            {!userInfo.birthdate ?
                <div style={{marginTop: "-50%"}} className="body-section mal-text-center mal-flex mal-flex-column mal-flex-center">
                    <div className="mal-margin-bottom-large mal-padding">
                        <p className="mal-h4 mal-margin-remove-vertical">What does the</p>
                        <p className="mal-h2 mal-margin-remove-vertical mal-text-nowrap">Year of the Dragon</p>
                        <p className="mal-h4 mal-margin-remove-vertical">hold for you?</p>
                    </div>
                    <BirthdatePicker
                        updateUserInfo={updateUserInfo} />
                </div>
                :
                (
                    zodiacAnimal && (
                        <>
                            <div className="header-section mal-text-center" />
                            <div className="body-section">
                                <div id="section-1" className="mal-flex mal-flex-column mal-flex-middle">
                                    <Headline>{userInfo.zodiacElement} {zodiacAnimal}</Headline>
                                    <TraitsList>
                                        {zodiacData.positive_traits.slice(0, 3).map((trait, index) => (
                                            <li key={index}>{trait}</li>
                                        ))}
                                    </TraitsList>
                                </div>
                                <div id="section-2" className="mal-flex mal-flex-column mal-flex-middle">
                                    <AnimatedZodiacInfo
                                        animal={zodiacAnimal}
                                        element={userInfo.zodiacElement}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 3, duration: 2, ease: 'easeOut' }}
                                    />
                                </div>
                                <div id="section-3" className="mal-clearfix mal-margin-large-bottom" />
                                <div id="section-4">
                                    <Description>
                                        <h3>What the Year of the Dragon<br />brings for {zodiacAnimal}</h3>
                                        <p className="mal-text-medium">{zodiacData.fortune.greetings}</p>
                                        <h4>How's the Career going?</h4>
                                        <p className="mal-text-medium">{zodiacData.fortune.career}</p>
                                        <h4>What about the Health outlook?</h4>
                                        <p className="mal-text-medium">{zodiacData.fortune.health}</p>
                                        <h4>Let's talk about Love</h4>
                                        <p className="mal-text-medium">{zodiacData.fortune.relationship}</p>
                                        <h4>Any advice?</h4>
                                        <p className="mal-text-medium">{zodiacData.fortune.advice}</p>
                                    </Description>
                                </div>
                                <div id="section-5">
                                    <Description>
                                        <h4>Most compatible with</h4>
                                        <IconRow>
                                            {zodiacData.friends.map((zodiac, index) => (
                                                <div key={index}>
                                                    <StyledIcon src={zodiacAnimals[zodiac.toLowerCase()]} alt={zodiac} />
                                                    <p>{zodiac}</p>
                                                </div>
                                            ))}
                                        </IconRow>
                                        <h4>Least compatible with</h4>
                                        <IconRow>
                                            {zodiacData.enemies.map((zodiac, index) => (
                                                <div key={index}>
                                                    <StyledIcon src={zodiacAnimals[zodiac.toLowerCase()]} alt={zodiac} />
                                                    <p>{zodiac}</p>
                                                </div>
                                            ))}
                                        </IconRow>
                                    </Description>
                                </div>
                            </div>
                        </>
                    ))
            }
        </SimpleLayout >
    );
}

export default GetYourFortune;

