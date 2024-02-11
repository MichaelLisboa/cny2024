import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext'; // Import AppContext
import pages from '../utils/pages';
import SimpleLayout from '../templates/simple-layout';
import { motion } from 'framer-motion';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import ZodiacInfo from '../components/ZodiacInfo';
import styled from 'styled-components';
import Image from '../components/Image';
import { zodiac } from '../data/fortune';
import { DayPicker } from 'react-day-picker'; // Import DayPicker component
import 'react-day-picker/dist/style.css';
import '../styles/DatePickerStyles.css';
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

const DatePickerContainer = styled.div`
  position: relative;
`;

const DateInput = styled.input`
    font-size: 2.75rem;
    font-style: italic;
    width: 80%;
    max-width: 480px;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: rgba(255, 255, 255, 0.5);
    outline: none;
    text-align: center;
    color: #888;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    &:hover {
        background-color: rgba(255, 255, 255, 0.75);
    }
    &:focus {
        background-color: rgba(255, 255, 255, 0.75);
    }
`;

const DatePicker = styled(DayPicker)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-55%, -80%);
  background: white;
  box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 16px;
`;

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
    const { getUserInfo, updateUserInfo } = useContext(AppContext); // Use the context
    const location = useLocation();
    const currentPage = pages.find(page => page.url === location.pathname);
    const replaceElementNoun = useDynamicTextReplacer();
    const [zodiacAnimal, setZodiacAnimal] = useState(''); // Add a new state variable

    const [birthdate, setBirthdate] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const AnimatedZodiacInfo = motion(ZodiacInfo);
    const userInfo = getUserInfo();

    useEffect(() => {
        if (userInfo.zodiacAnimal) {
            setZodiacAnimal(userInfo.zodiacAnimal);
        }
    }, [userInfo.zodiacAnimal]);

    // find the matching data in the zodica object based on the user's animal
    const zodiacData = zodiac.find(z => z.name.toLowerCase() === userInfo.zodiacAnimal.toLowerCase());


    const onSubmit = (date) => {
        // Check if the date matches the expected format
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(date)) {
            console.error("Invalid birthdate format. Expected format is yyyy-mm-dd.");
            setShowModal(true); // Show the modal
            return; // Stop the function
        }

        // Check if the year is within the valid range
        let year = date.split('-')[0];
        if (year < 1924 || year > 2024) {
            console.error("Year is invalid. It should be between 1924 and 2024.");
            setShowModal(true); // Show the modal
            return; // Stop the function
        }
        updateUserInfo(date);
    };

    const handleDateChange = (date) => {
        try {
            const formattedDate = date.toISOString().substring(0, 10);

            // Check if the date matches the expected format and the year is within the valid range before updating the state
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            let year = formattedDate.split('-')[0];
            if (datePattern.test(formattedDate) && (year >= 1924 && year <= 2024)) {
                setBirthdate(formattedDate);
                setShowDatePicker(false); // Hide the date picker after a date is selected
                onSubmit(formattedDate);
            } else {
                console.error("Invalid birthdate format or year out of range.");
                setShowModal(true); // Show the modal
            }
        } catch (error) {
            console.error("Error formatting date:", error);
            setShowModal(true); // Show the modal
        }
    };

    const handleInputChange = (event) => {
        let inputDate = event.target.value;
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(inputDate)) {
            console.error("Invalid birthdate format. Expected format is yyyy-mm-dd.");
            setShowModal(true); // Show the modal
            return; // Stop the function
        }

        let year = inputDate.split('-')[0];

        try {
            if (year < 1924 || year > 2024) {
                setShowModal(true); // Show the modal
            } else {
                setShowModal(false); // Hide the modal
            }

            if (year.length > 4) {
                year = year.slice(0, 4); // Limit year to 4 digits
                const restOfDate = inputDate.split('-').slice(1).join('-');
                inputDate = `${year}-${restOfDate}`;
            }

            setBirthdate(inputDate);
        } catch (error) {
            console.error("Error handling input change:", error);
            setShowModal(true);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            setShowDatePicker(false); // Hide the date picker
            onSubmit(birthdate); // Submit the date
        }
    };

    const today = new Date();
    const modifiers = {
        disabled: { after: today },
    };

    return (
        <SimpleLayout>
            {!userInfo.birthdate ?
                <>
                    <div className="header-section mal-text-center" />
                    <div className="body-section mal-text-center">
                        <div className="mal-container mal-width-1-1">
                            <div className="mal-margin-bottom-large mal-padding">
                                <h1 className="mal-margin-remove-top">When were you born?</h1>
                                <p className="mal-text-medium">Every decision shapes your destiny. Find out which extraordinary creature you're destined to become.</p>
                            </div>
                            <DatePickerContainer>
                                <DateInput
                                    className="dateInput"
                                    type="text"
                                    value={birthdate || 'YYYY-MM-DD'}
                                    disabled={showDatePicker}
                                    onChange={handleInputChange}
                                    onClick={(e) => {
                                        e.target.value = ''; // Clear the date input field
                                        setShowDatePicker(true); // Show the date picker
                                    }}
                                    onKeyDown={handleKeyPress}
                                />
                                {showDatePicker && (
                                    <div className="datePickerPopup">
                                        <DatePicker
                                            selected={birthdate ? new Date(birthdate) : undefined}
                                            onDayClick={handleDateChange}
                                            mode="single"
                                            captionLayout="dropdown"
                                            fromYear={1924}
                                            toYear={today.getFullYear()}
                                            modifiers={modifiers}
                                        />
                                    </div>
                                )}
                            </DatePickerContainer>
                        </div>
                    </div>
                    <div className="footer-section" />
                </>
                :
                (
                    zodiacAnimal && (
                        <>
                            <div className="header-section mal-text-center" />
                            <div className="body-section">
                                <div id="section-1" className="mal-flex mal-flex-column mal-flex-middle">
                                    <Headline>{userInfo.zodiacElement} {zodiacAnimal}</Headline>
                                    <TraitsList>
                                        {zodiacData.positive_traits.slice(0,3).map((trait, index) => (
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
                                <div id="section-5" className="mal-flex mal-flex-column mal-flex-middle">
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
