import React, { useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { usePageAnimations } from '../contexts/AnimationContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import Image from '../components/Image';
import useRedirectOnFail from '../hooks/useRedirectOnFail';
import TraitToken from '../components/TraitToken';
import { OrnateButton, OptionButton } from '../components/Button';
import { calligraphyData } from '../data';
import CalligraphyFlashGame from '../components/react-mal-calligraphy/CalligraphyFlashGame';
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

const HeaderSection = styled(motion.div)`
  // Add your header-section styles here.
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
  justify-content: flex-start !important;
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
    const {
        updateUserSelection,
        getUserInfo,
        actionsSkippedOrFailed,
        incrementSkipFailCount,
        decrementSkipFailCount } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');
    const [isGameComplete, setIsGameComplete] = useState(null);
    const [refreshEnabled, setRefreshEnabled] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const [score, setScore] = useState(null);
    const { shouldRedirect } = useRedirectOnFail();
    const { animateEnter, animateExit, controls } = usePageAnimations();

    useEffect(() => {
        if (content === 'initial' || content === 'complete') {
            setRefreshEnabled(true);
        } else {
            setRefreshEnabled(false);
        }
    }, [content]);

    const handleButtonClick = async () => {
        await animateExit();
        setContent('game');
        await animateEnter();
    };

    useEffect(() => {
        if (isGameComplete) {
            animateExit().then(() => setContent('complete')).then(() => animateEnter());
        }
    }, [isGameComplete]);

    const handleOnCompletionStatusChange = useCallback((correctCount, incorrectCount) => {
        setIsGameComplete(true);
        if (correctCount !== null && correctCount !== undefined && incorrectCount !== null && incorrectCount !== undefined) {
            const totalAttempts = correctCount + incorrectCount;
            const successPercentage = (correctCount / totalAttempts) * 100;
            if (successPercentage > 70) {
                setScore(true);
            } else {
                setScore(false);
            }
            updateUserSelection('calligraphyChallengeResult', {
                correct: correctCount,
                incorrect: incorrectCount,
                success: score,
                calligraphy_endResult: score ? calligraphyData[0].calligraphy_endResult[0].true : calligraphyData[0].calligraphy_endResult[0].false
            });
        }
    }, [setIsGameComplete, updateUserSelection]);

    return (
        <Layout refreshEnabled={refreshEnabled}>
            <HeaderSection
                animate={controls.headerControls}
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
                animate={controls.bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <div className="body-section-wide">
                        <SplashImage src={scroll} alt="Calligraphy scroll" />
                    </div>
                ) : content === 'game' ? (
                    <CalligraphyFlashGame
                        timeLimit={30}
                        onCompletionStatusChange={handleOnCompletionStatusChange} />
                ) : content === 'complete' ? (
                    score ? (
                        <TraitToken
                            trait={success}
                            selected={null}
                            subheadline={null}
                            title={replaceElementNoun(calligraphyData[0].successTitle)}
                            description={replaceElementNoun(calligraphyData[0].successMessage)}
                        />
                    ) : (
                        <TraitToken
                            trait={fail}
                            selected={null}
                            subheadline={null}
                            title={replaceElementNoun(calligraphyData[0].failTitle)}
                            description={replaceElementNoun(calligraphyData[0].failMessage)}
                        />
                    )
                ) : null}

            </BodySection>
            <FooterSection
                animate={controls.footerControls}
                className="footer-section">
                {content === 'initial' ? (
                    <ButtonContainer>
                        <OptionButton onClick={
                            async () => {
                                updateUserSelection('calligraphyChallengeResult', false);
                                incrementSkipFailCount();
                                await animateExit();
                                navigate(shouldRedirect ? '/not-the-good-place' : nextPage?.url);
                            }
                        }>
                            No, let's move on
                        </OptionButton>
                        <OptionButton onClick={handleButtonClick}>
                            Yes, let's do it
                        </OptionButton>
                    </ButtonContainer>
                ) : content === 'complete' ? (
                    <OrnateButton url={`${nextPage?.url}`}>{nextPage.title}</OrnateButton>
                ) : null}
            </FooterSection>
        </Layout>
    );
};

export default TestYourCalligraphySkills;