import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import Image from '../components/Image';
import { OrnateButton, OptionButton } from '../components/Button';
import { calligraphyData } from '../data';
// import CalligraphyGame from '../components/react-mal-calligraphy';
// import CalligraphyGame from '../games/CalligraphyGame';
import CalligraphyFlashGame from '../games/CalligraphyFlashGame';
import scroll from "../images/calligraphy/scroll.png";
import success from "../images/tokens/calligraphy.png";
import fail from "../images/tokens/failed_calligraphy.png";

const SplashImage = styled(Image)`
    img {
        width: 100%;
        object-fit: contain;
    }
`;

const ButtonContainer = styled.div`
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

const HeaderSection = styled(motion.div)`
  // Add your header-section styles here.
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
//   justify-content: center;
  text-align: center !important;
  padding-top: 0;

  .body-section-wide {
    align-self: center;
    width: 130% !important;
   }
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const TestYourCalligraphySkills = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');
    const [isGameComplete, setIsGameComplete] = useState(null);
    const [refreshEnabled, setRefreshEnabled] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const previousPage = useMemo(() => pages.find(page => page.url === currentPage.previousPage), [currentPage]);
    const headerControls = useAnimation();
    const bodyControls = useAnimation();
    const footerControls = useAnimation();

    const characters = calligraphyData[0].characterList;
    const [randomCharacter, setRandomCharacter] = useState(characters[Math.floor(Math.random() * characters.length)]);

    useEffect(() => {
        setRefreshEnabled(false);
        return () => setRefreshEnabled(true);
    }, [setRefreshEnabled]);

    const animateExit = async () => {
        await footerControls.start({ y: 100, opacity: 0 });
        await bodyControls.start({ y: 100, opacity: 0 });
        await headerControls.start({ y: 100, opacity: 0 });
    };

    const animateEnter = async () => {
        await headerControls.start({ y: 0, opacity: 1, transition: { delay: 0.01 } });
        await bodyControls.start({ y: 0, opacity: 1, transition: { delay: 0.025 } });
        await footerControls.start({ y: 0, opacity: 1, transition: { delay: 0.05 } });
    };

    const handleButtonClick = async () => {
        await animateExit();
        setContent('game');
        await animateEnter();
    };

    const handleOnCompletionStatusChange = useCallback((correctCount, incorrectCount) => {
        console.log('Correct:', correctCount, 'Incorrect:', incorrectCount);
        setIsGameComplete(true);
        if (correctCount !== null && correctCount !== undefined && incorrectCount !== null && incorrectCount !== undefined) {
          updateUserSelection('calligraphyChallengeResult', { correct: correctCount, incorrect: incorrectCount });
        }
      }, [setIsGameComplete, updateUserSelection]);

    return (
        <Layout refreshEnabled={refreshEnabled}>
            <HeaderSection
                animate={headerControls}
                className="header-section"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-small mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-vertical">{replaceElementNoun(calligraphyData[0].headline)}</h3>
                        <p className="mal-text-medium mal-margin-small-top">{replaceElementNoun(calligraphyData[0].subheadline)}</p>
                    </div>
                ) : content === 'game' ?
                    (
                        <div className="mal-padding-remove-horizontal">
                            <h3 className="mal-margin-remove-vertical">{replaceElementNoun(calligraphyData[0].challengeHeadline)}</h3>
                            <p className="mal-text-medium mal-margin-small-top mal-margin-small-bottom">{replaceElementNoun(calligraphyData[0].challengeMessage)}</p>
                        </div>
                    ) : null}
            </HeaderSection>
            <BodySection
                animate={bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <div className="body-section-wide">
                        <SplashImage src={scroll} alt="Calligraphy scroll" />
                    </div>
                ) : content === 'game' ? (
                    // Display game related content here
                    <CalligraphyFlashGame
                        timeLimit={30}
                        onCompletionStatusChange={handleOnCompletionStatusChange} />
                ) : content === 'complete' ? (
                    'Stuff'
                ) : null}

            </BodySection>
            <FooterSection
                animate={footerControls}
                className="footer-section">
                {content === 'initial' ? (
                    <ButtonContainer>
                        <OptionButton onClick={
                            async () => {
                                updateUserSelection('calligraphyChallengeResult', false);
                                await animateExit();
                                navigate(nextPage?.url);
                            }
                        }>
                            No, let's move on
                        </OptionButton>
                        <OptionButton onClick={handleButtonClick}>
                            Yes, let's do it
                        </OptionButton>
                    </ButtonContainer>
                ) : content === 'game' ? (
                    // Display game related content here
                    'placeholder'
                ) : content === 'complete' ? (
                    <OptionButton to={`${nextPage.url}`}>Go to {nextPage.title}</OptionButton>
                ) : null}
            </FooterSection>
        </Layout>
    );
};

export default TestYourCalligraphySkills;