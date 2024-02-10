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
import { OrnateButton } from '../components/Button';
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



const zodiac = [{
    "chapter": 1,
    "name": "Rat",
    "years": [1912, 1924, 1936, 1948, 1960, 1972, 1984, 1996, 2008, 2020, 2032],
    "friends": ["Ox", "Dragon", "Monkey"],
    "enemies": ["Horse", "Rooster"],
    "positive_traits": ["quick-witted", "resourceful", "versatile", "kind"],
    "negative_traits": ["greedy", "manipulative", "exploitative"],
    "image": "../images/Rat.png",
    "fortune": {
        "greetings": ["Ah, my friend born in the Years of the Rat, brace yourself for a roller coaster ride with mixed opportunities and challenges."],
        "career": ["Career's groovin' - new paths, success knocking. But no wild stunts; keep those whiskers sharp! Relationships might sway, so toss in some patience, keep it cool."],
        "health": ["Health's a treasure; balance is your vibe. No binge-nibbling on cosmic cheese; keep it steady."],
        "relationship": ["Relationships might dance a bit, so patience and a sprinkle of understanding will be your seasoning."],
        "advice": ["Navigate through the year with the charm of a Rat, staying adaptable and making decisions as if you're nibbling on them challenges."]
    }
}, {
    "chapter": 2,
    "name": "Ox",
    "years": [1913, 1925, 1937, 1949, 1961, 1973, 1985, 1997, 2009, 2021, 2033],
    "friends": ["Rat", "Snake", "Rooster"],
    "enemies": ["Tiger", "Dragon", "Horse", "Goat"],
    "positive_traits": ["diligent", "dependable", "strong", "determined"],
    "negative_traits": ["stubborn", "resistant to change", "adhere to old methods"],
    "image": "../images/Ox.png",
    "fortune": {
        "greetings": ["Greetings to my steadfast Ox friends, born in the Years of the Ox! In 2024, anticipate a year of steady progress and positive developments."],
        "career": ["Career's on a happy trail - growth, high-fives, and recognition on the horizon. Roll up those sleeves; hard graft equals cosmic goodies."],
        "health": ["Health's your wealth; make it rain with stress-busting techniques."],
        "relationship": ["Love's in the air - harmony, understanding, good vibes. Balance is the name of the game; juggle work and play like a cosmic maestro."],
        "advice": ["Patience, a dash of perseverance, and a balanced groove - success and fulfillment will be your 2024 anthem."]
    }
}, {
    "chapter": 3,
    "name": "Tiger",
    "years": [1902, 1914, 1926, 1938, 1950, 1962, 1974, 1986, 1998, 2010, 2022, 2034],
    "friends": ["Dragon", "Horse", "Pig"],
    "enemies": ["Ox", "Tiger", "Snake", "Monkey"],
    "positive_traits": ["brave", "confident", "competitive"],
    "negative_traits": ["reckless", "impulsive", "indecisive"],
    "image": "../images/Tiger.png",
    "fortune": {
        "greetings": ["Well, well, well, you Tigers, let's dive into the cosmic tango of 2024, shall we?"],
        "career": ["Career's your cosmic jungle - seize those opportunities, wild and bold. Hunt 'em down with confidence, but a dash of caution is your cosmic compass."],
        "health": ["Health's your treasure chest; balance and stress manage your vitamins."],
        "relationship": ["Love's got its puzzles; solve 'em with open communication and a dash of understanding."],
        "advice": ["Adapt like a pro, be resilient - that's your tiger spirit."]
    }
}, {
    "chapter": 4,
    "name": "Rabbit",
    "years": [1915, 1927, 1939, 1951, 1963, 1975, 1987, 1999, 2011, 2023, 2035],
    "friends": ["Goat", "Monkey", "Dog", "Pig"],
    "enemies": ["Snake", "Rooster"],
    "positive_traits": ["quiet", "elegant", "kind", "responsible"],
    "negative_traits": ["hesitant", "conservative", "timid"],
    "image": "../images/Rabbit.png",
    "fortune": {
        "greetings": ["Hello, my hoppy friends born in the Years of the Rabbit! The cosmic forecast for 2024 promises steady progress and positive transformations."],
        "career": ["Career prospects bloom with opportunities, but remember, balance is key – no cosmic leaps without caution."],
        "health": ["Health, your cosmic treasure, deserves priority; embrace patience, flexibility, and calculated risks."],
        "relationship": ["Relationships blossom with improved communication and deeper connections."],
        "advice": ["Navigate the cosmic journey with the grace of a Rabbit, making strides in both personal and professional realms."]
    }
}, {
    "chapter": 5,
    "name": "Dragon",
    "years": [1916, 1928, 1940, 1952, 1964, 1976, 1988, 2000, 2012, 2024, 2036],
    "friends": ["Rooster", "Rat", "Monkey"],
    "enemies": ["Ox", "Goat", "Dog"],
    "positive_traits": ["confident", "intelligent", "enthusiastic"],
    "negative_traits": ["cutting", "arrogant", "impatient"],
    "image": "../images/Dragon.png",
    "fortune": {
        "greetings": ["Dragons, my cosmic companions, in 2024, expect a year of both challenges and opportunities."],
        "career": ["Your career might lead you to new ventures, but stay grounded – overconfidence is a cosmic pitfall."],
        "health": ["Prioritize health, adopt stress management, and embrace flexibility."],
        "relationship": ["Relationships might swirl in turbulence; patience and compromise are your cosmic allies."],
        "advice": ["Navigate the cosmic waves with resilience and focus on personal growth; success awaits you in the Year Of The Wood Dragon 2024."]
    }
}, {
    "chapter": 6,
    "name": "Snake",
    "years": [1917, 1929, 1941, 1953, 1965, 1977, 1989, 2001, 2013, 2025, 2037],
    "friends": ["Dragon", "Rooster"],
    "enemies": ["Tiger", "Rabbit", "Snake", "Goat", "Pig"],
    "positive_traits": ["enigmatic", "intelligent", "wise"],
    "negative_traits": ["vengeful", "hold onto grudges"],
    "image": "../images/Snake.png",
    "fortune": {
        "greetings": ["Greetings, wise Snakes, born in the Years of the Snake! In 2024, embrace transformation and growth."],
        "career": ["Career prospects bring new opportunities and recognition, but tread cautiously with a strategic approach."],
        "health": ["Prioritize health with self-care and stress management."],
        "relationship": ["Relationships might swirl in turbulence; patience and compromise are your cosmic allies."],
        "advice": ["Navigate through challenges, utilizing your intuitive nature. Embrace change, and the Year Of The Wood Dragon 2024 will see you make significant progress toward your goals."]
    }
}, {
    "chapter": 7,
    "name": "Horse",
    "years": [1918, 1930, 1942, 1954, 1966, 1978, 1990, 2002, 2014, 2026, 2038],
    "friends": ["Tiger", "Goat", "Rabbit"],
    "enemies": ["Rat", "Ox", "Rooster", "Horse"],
    "positive_traits": ["animated", "active", "energetic"],
    "negative_traits": ["gossipy", "direct", "oblivious"],
    "image": "../images/Horse.png",
    "fortune": {
        "greetings": ["To my spirited Horse friends, born in the Years of the Horse, 2024 is a year of dynamic energy and progress."],
        "career": ["Your career prospects offer opportunities for growth and advancement. Stay focused, avoid distractions, and maintain a strong work ethic."],
        "health": ["Prioritize health by balancing and managing stress."],
        "relationship": ["Relationships flourish with understanding and harmony."],
        "advice": ["Embrace enthusiasm and adaptability; navigate through the year with resilience, making significant strides toward personal and professional fulfillment."]
    }
}, {
    "chapter": 8,
    "name": "Goat",
    "years": [1919, 1931, 1943, 1955, 1967, 1979, 1991, 2003, 2015, 2027, 2039],
    "friends": ["Rabbit", "Horse", "Pig"],
    "enemies": ["Ox", "Tiger", "Dog"],
    "positive_traits": ["calm", "gentle", "sympathetic"],
    "negative_traits": ["moody", "economical", "vain"],
    "image": "../images/Goat.png",
    "fortune": {
        "greetings": ["Hello, dear Goat, born in the Years of the Sheep! In 2024, expect a year of stability and personal growth."],
        "career": ["Your career promises steady progress and success; remain diligent and focused."],
        "health": ["Prioritize health with self-care practices and stress management. Embrace patience and perseverance; challenges may arise, but a balanced approach will guide you."],
        "relationship": ["Relationships thrive with increased harmony and emotional connection."],
        "advice": ["Nurturing your creative and compassionate nature, experience a fulfilling and rewarding year."]
    }
}, {
    "chapter": 9,
    "name": "Monkey",
    "years": [1920, 1932, 1944, 1956, 1968, 1980, 1992, 2004, 2016, 2028, 2040],
    "friends": ["Ox", "Rabbit"],
    "enemies": ["Tiger", "Pig"],
    "positive_traits": ["sharp", "smart", "curiosity"],
    "negative_traits": ["insouciant", "impatient", "inquisitive"],
    "image": "../images/Monkey.png",
    "fortune": {
        "greetings": ["Greetings, mischievous Monkey, my lively friends, in 2024, anticipate dynamic opportunities and challenges."],
        "career": ["Career prospects bring exciting ventures; stay focused, avoid distractions."],
        "health": ["Prioritize health with a balanced lifestyle."],
        "relationship": ["Relationships require patience and open communication for cosmic harmony."],
        "advice": ["Embrace flexibility and adaptability; utilize your resourcefulness and wit to navigate through the year with resilience. Concentration is your ally. Avoid the circus of distractions. Your journey demands unwavering focus."]
    }
}, {
    "chapter": 10,
    "name": "Rooster",
    "years": [1921, 1933, 1945, 1957, 1969, 1981, 1993, 2005, 2017, 2029, 2041],
    "friends": ["Ox", "Snake"],
    "enemies": ["Rat", "Rabbit", "Horse", "Rooster", "Dog"],
    "positive_traits": ["observant", "hardworking", "courageous"],
    "negative_traits": ["cocky", "critical", "egomaniacal"],
    "image": "../images/Rooster.png",
    "fortune": {
        "greetings": ["Hello, Rooster! Let's unravel the threads of 2024 tailored just for you!"],
        "career": ["Gardens of success bloom for your career! New avenues open, bringing recognition. Maintain balance; don't be overly critical."],
        "health": ["Well-being is your wealth. Prioritize self-care and manage stress for a thriving 2024."],
        "relationship": ["Improved communication elevates your relationships. Understanding is the key."],
        "advice": ["Avoid becoming too critical. Teamwork overcomes challenges. Organization skills are your guiding stars. Onward, Rooster! May your feathers catch the winds of success in 2024!"]
    }
}, {
    "chapter": 11,
    "name": "Dog",
    "years": [1922, 1934, 1946, 1958, 1970, 1982, 1994, 2006, 2018, 2030, 2042],
    "friends": ["Rabbit"],
    "enemies": ["Dragon", "Goat", "Rooster"],
    "positive_traits": ["lovely", "honest", "prudent"],
    "negative_traits": ["temperamental", "avoid communicating"],
    "image": "../images/Dog.png",
    "fortune": {
        "greetings": ["Greetings, honest Dog! Let's sniff out the trails of 2024 designed just for you!"],
        "career": ["Stability and growth mark your career journey. Opportunities pave the way to advancement. Dedication is your compass."],
        "health": ["Well-being is your currency. Balance is key; manage stress with teamwork."],
        "relationship": ["Loyalty and trust shine in your relationship bonds. A balance in life and work ensures thriving relationships."],
        "advice": ["Concentration propels you. Maintain balance to navigate challenges. Honesty and integrity are your allies. May your path be filled with stability and success in 2024!"]
    }
}, {
    "chapter": 12,
    "name": "Pig",
    "years": [1923, 1935, 1947, 1959, 1971, 1983, 1995, 2007, 2019, 2031, 2043],
    "friends": ["Tiger", "Rabbit", "Goat"],
    "enemies": ["Snake", "Monkey"],
    "positive_traits": ["compassionate", "generous", "diligent"],
    "negative_traits": ["naive", "snobbish", "clumsy"],
    "image": "../images/Pig.png",
    "fortune": {
        "greetings": ["Hello, generous Pig! Let's unveil the tapestry of 2024 painted just for you!"],
        "career": ["Transformations lead to abundant career opportunities. Ventures and advancements bring success within reach."],
        "health": ["Vitality is your treasure. Embrace creativity and adaptability to navigate challenges."],
        "relationship": ["Deeper connections and harmony grace your relationships. Prioritize self-care for a balanced and fulfilling journey."],
        "advice": ["Your kindness and generosity lead the way. May your journey in 2024 be rich and fulfilling!"]
    }
}]



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
        text-transform: capitalize;
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

const ButtonContainer = styled.div`
    height: 72px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 16px !important;
    padding-right: 16px !important;

    * {
        font-size: 1rem;

        @media (max-width: 576px) { // When the viewport is 576px or less
            font-size: 0.875rem !important; // Reduce the font size even more
        }
    }
`;

const Description = styled.div`
    text-align: center;
    margin: 24px 0;
    color: rgba(102, 71, 56, 1);
}`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

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

    console.log('zodiacData', zodiacData);

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
                                        {zodiacData.positive_traits.map((trait, index) => (
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
                                        <h3>What the Year of the Dragon brings for {zodiacAnimal}</h3>
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
