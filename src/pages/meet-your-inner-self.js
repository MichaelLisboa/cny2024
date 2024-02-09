import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import SimpleLayout from '../templates/simple-layout';
import Image from '../components/Image';
import { OrnateButton, OptionButton } from '../components/Button';
import { zodiacData } from '../data';
import getBestMatch from '../data/calculateBestMatch';

const Section = styled(motion(SimpleLayout))`
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
    max-width: none !important;
    width: auto !important;
    max-height: 60vh !important;
    overflow: hidden !important;

    img {
        object-fit: cover;
    }

    @media (min-width: 768px) {
        max-height: 55vh;
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

const ButtonContainer = styled.div`
    height: 72px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-left: 16px !important;
    padding-right: 16px !important;

    * {
        font-size: 1rem;

        @media (max-width: 576px) {
            font-size: 0.875rem !important;
        }
    }
`;

const Description = styled.div`
    text-align: center;
    margin: 24px 0;
    color: rgba(102, 71, 56, 1);
}`;

const BodySection = styled(motion.div)`
  // Your body-section styles here.
`;

const FooterSection = styled(motion.div)`
  // Your footer-section styles here.
`;

// Define your animation variants
const directionalVariants = {
    // Keep 'hidden' as is if needed, or adjust similarly to 'visible' for consistency
    visible: (direction = 'up') => ({
        opacity: 1,
        y: direction === 'up' ? 100 : -100, // Adjust values as needed to match the desired effect
        transition: { type: 'tween', ease: 'easeInOut', duration: 0.5 },
    }),
    exit: (direction = 'up') => ({
        opacity: 0,
        y: direction === 'up' ? -100 : 100,
        transition: { type: 'tween', ease: 'easeInOut', duration: 0.5 },
    }),
};



const MeetYourInnerSelf = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [refreshEnabled, setRefreshEnabled] = useState(false);
    const [content, setContent] = useState('section1');
    const contentOrder = ['section1', 'section2', 'section3'];
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const previousPage = useMemo(() => pages.find(page => page.url === currentPage.previousPage), [currentPage]);
    const bodyControls = useAnimation();
    const footerControls = useAnimation();

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

    const animateExit = async (direction) => {
        await bodyControls.start(directionalVariants.exit(direction));
        await footerControls.start(directionalVariants.exit(direction));
    };
    
    const animateEnter = async (direction) => {
        // Use 'visible' variant with direction for entering animation
        await bodyControls.start(directionalVariants.visible(direction));
        await footerControls.start(directionalVariants.visible(direction)); // If footer needs direction-based animation
    };
    

    const handleDragEnd = (event, info) => {
        const offsetY = info.offset.y;
        const swipeThreshold = 50;
        if (offsetY < -swipeThreshold) {
            handleSwipe('up');
        } else if (offsetY > swipeThreshold) {
            handleSwipe('down');
        }
    };

    const handleSwipe = async (direction) => {
        let nextContentIndex = contentOrder.indexOf(content);
        if (direction === 'up' && nextContentIndex < contentOrder.length - 1) {
            nextContentIndex++;
        } else if (direction === 'down' && nextContentIndex > 0) {
            nextContentIndex--;
        }
    
        const nextContent = contentOrder[nextContentIndex];
    
        // Exit animation with current direction
        await animateExit(direction);
    
        // Prepare the content to enter from the correct direction
        // This directly manipulates the 'y' value to simulate content coming from the swipe direction
        bodyControls.set({
            y: direction === 'up' ? 100 : -100, // Adjust these values as necessary
            opacity: 0
        });
    
        setContent(nextContent);
    
        // Now animate to visible, which should smoothly transition from the set position
        await animateEnter(); // animateEnter might not need direction anymore if set() is used
    };
    

    const handleButtonClick = async (targetSection) => {
        const currentIdx = contentOrder.indexOf(content);
        const targetIdx = contentOrder.indexOf(targetSection);
        const direction = targetIdx > currentIdx ? 'up' : 'down';

        await animateExit(direction);
        setContent(targetSection); // Update the content state to the target section
        await animateEnter();
    };



    return (
        <Section refreshEnabled={refreshEnabled}>
            <BodySection
                drag="y"
                onDragEnd={handleDragEnd}
                dragConstraints={{ top: 0, bottom: 0 }}
                variants={directionalVariants}
                dragElastic={0}
                initial="visible"
                animate={bodyControls}
                custom={content} // Pass current content as custom prop for dynamic variants
            >
                {/* Conditional rendering based on content state */}
                {content === 'section1' && (
                    <>
                        <Headline>{userAnimal.title}-Hearted {userInfo.zodiacAnimal}</Headline>
                        <TraitsList>
                            {userAnimal.traits.map((trait, index) => (
                                <li key={index}>{trait}</li>
                            ))}
                        </TraitsList>
                        <StyledAnimalImage src={userAnimal.image} alt={userAnimal.name} />
                    </>
                )}
                {content === 'section2' && (
                    <div id="section-2">
                        <Description>
                            <h3>There's something intriguing about you, a hidden aspect waiting to be discovered.</h3>
                            <p>{replaceElementNoun(userAnimal.story)}</p>
                        </Description>
                    </div>
                )}
                {content === 'section3' && (
                    <div id="section-3">
                        <Description>
                            <h3>There's something intriguing about you, a hidden aspect waiting to be discovered.</h3>
                            <p>{replaceElementNoun(userAnimal.story)}</p>
                        </Description>
                    </div>
                )}
            </BodySection>

            <FooterSection
                animate={footerControls}
                className="footer-section">
                {content === 'section1' && (
                    <ButtonContainer>
                        <OptionButton onClick={() => handleButtonClick('section2')}>
                            Go to Section 2
                        </OptionButton>
                    </ButtonContainer>
                )}
                {content === 'section2' && (
                    <ButtonContainer>
                        <OptionButton onClick={() => handleButtonClick('section3')}>
                            Go to Section 3
                        </OptionButton>
                    </ButtonContainer>
                )}
                {content === 'section3' && (
                    <ButtonContainer>
                        <OptionButton onClick={() => handleButtonClick('section1')}>
                            Back to Section 1
                        </OptionButton>
                    </ButtonContainer>
                )}
            </FooterSection>


        </Section>
    );
};

export default MeetYourInnerSelf;
