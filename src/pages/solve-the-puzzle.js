import React, { useContext, useCallback, useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import Image from '../components/Image';
import { OrnateButton, OptionButton } from '../components/Button';
import useRedirectOnFail from '../hooks/useRedirectOnFail';
import JigsawPuzzle from '../components/react-mal-jigsaw';
import { puzzleData } from '../data';
import puzzle from "../images/jigsaw/puzzle.png";
import success from "../images/tokens/puzzle.png";
import fail from "../images/tokens/failed_puzzle.png";

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

const PuzzleTokenImage = styled.div`
    width: auto;
    padding: 32px;

    img {
        height: 100%;
        max-height: 25vh;
        object-fit: contain;
    }
`;

const HeaderSection = styled(motion.div)`
  // Add your header-section styles here.
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
  justify-content: flex-start;
  text-align: center !important;
  padding-top: 0;

  .body-section-wide {
    align-self: center;
    width: 140% !important;
   }
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const SolveThePuzzle = () => {
    const { 
        updateUserSelection,
        getUserInfo,
        actionsSkippedOrFailed,
        incrementSkipFailCount,
        decrementSkipFailCount } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');
    const [isPuzzleComplete, setIsPuzzleComplete] = useState(null);
    const [refreshEnabled, setRefreshEnabled] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const headerControls = useAnimation();
    const bodyControls = useAnimation();
    const footerControls = useAnimation();
    const {shouldRedirect} = useRedirectOnFail();

    const puzzles = puzzleData[0].puzzlesList;
    const [randomPuzzle, setRandomPuzzle] = useState(puzzles[Math.floor(Math.random() * puzzles.length)]);

    useEffect(() => {
        if (actionsSkippedOrFailed >= 3) {
          console.log('User has failed or skipped 3 times');
        }
      }, [actionsSkippedOrFailed]);

      useEffect(() => {
        if (isPuzzleComplete === false) {
            incrementSkipFailCount();
        }
    }, [isPuzzleComplete]);

    useEffect(() => {
        if (content === 'initial' || content === 'complete') {
            setRefreshEnabled(true);
        } else {
            setRefreshEnabled(false);
        }
    }, [content]);

    const handleReset = async () => {
        decrementSkipFailCount();
        let newRandomPuzzle;
        do {
            newRandomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
        } while (newRandomPuzzle === randomPuzzle);

        setIsPuzzleComplete(null);
        setRandomPuzzle(newRandomPuzzle);

        await animateExit();
        setContent('newContent');
        setTimeout(() => {
            setRefreshEnabled(false);
            animateEnter();
        }, 500);
    };

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
        setContent('newContent');
        await animateEnter();
    };

    const handleOnCompletionStatusChange = useCallback((isSuccessful) => {
        setIsPuzzleComplete(isSuccessful);
        if (isSuccessful !== null && isSuccessful !== undefined) {
            updateUserSelection('potteryPuzzleResult', {
                choice: isSuccessful,
                puzzle_endResult: isSuccessful ? puzzleData[0].puzzle_endResult[0].true : puzzleData[0].puzzle_endResult[0].false
              });
        }
    }, [setIsPuzzleComplete, updateUserSelection]);

    return (
        <Layout refreshEnabled={refreshEnabled}>
            <HeaderSection
                animate={headerControls}
                className="header-section"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-small mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-vertical">{replaceElementNoun(puzzleData[0].headline)}</h3>
                        <p className="mal-text-medium mal-margin-small-top">{replaceElementNoun(puzzleData[0].subheadline)}</p>
                    </div>
                ) : content === 'complete' ? null
                    : (
                        <div className="mal-padding-remove-horizontal">
                            <h3 className="mal-margin-remove-vertical">{replaceElementNoun(randomPuzzle.title)}</h3>
                            <p className="mal-text-medium mal-margin-small-top mal-margin-small-bottom">{replaceElementNoun(randomPuzzle.description)}</p>
                            <p className="mal-text-small mal-margin-remove-vertical padding-remove-vertical">Swap the tiles to restore the {replaceElementNoun(randomPuzzle.title.replace(/\s*Puzzle\s*/g, ""))}.</p>
                        </div>
                    )}
            </HeaderSection>

            <BodySection animate={bodyControls} className="body-section">
                {content === 'initial' ? (
                    <div className="body-section-wide">
                        <SplashImage src={puzzle} alt="Puzzle" />
                    </div>
                ) : content === 'complete' ? (
                    getUserInfo().potteryPuzzleResult.choice ? (
                        <div className="mal-text-center">
                            <h2 className="mal-h2 mal-margin-remove-vertical">{replaceElementNoun(puzzleData[0].successTitle)}</h2>
                            <PuzzleTokenImage>
                                <Image src={success} alt={`You successfully restored the porcelain vase!`} />
                            </PuzzleTokenImage>
                            <p className="mal-text-medium">{replaceElementNoun(puzzleData[0].successMessage)}</p>
                        </div>
                    ) : (
                        <div className="mal-text-center">
                            <PuzzleTokenImage className="mal-padding">
                                <Image src={fail} alt={`You did not restore the porcelain vase in time.`} />
                            </PuzzleTokenImage>
                            <h2 className="mal-h3 mal-margin-remove-vertical">{replaceElementNoun(puzzleData[0].failTitle)}</h2>
                            <p className="mal-text-medium">{replaceElementNoun(puzzleData[0].failMessage)}</p>
                        </div>
                    )
                ) : (
                    <div className="mal-padding-small mal-text-center">
                        <JigsawPuzzle
                            imageSrc={randomPuzzle.image}
                            gridSize={3}
                            timeLimit={30}
                            onCompletionStatusChange={handleOnCompletionStatusChange}
                        />
                    </div>
                )}
            </BodySection>

            <FooterSection
                animate={footerControls}
                className="footer-section"
            >
                {content === 'initial' ? (
                    <ButtonContainer>
                        <OptionButton onClick={
                            async () => {
                                updateUserSelection('potteryPuzzleResult', false);
                                incrementSkipFailCount();
                                await animateExit();
                                navigate(shouldRedirect ? '/not-the-good-place' : nextPage?.url);
                            }
                        }>
                            No, let's move on
                        </OptionButton>
                        <OptionButton onClick={handleButtonClick}>
                            Yes, restore the pieces
                        </OptionButton>
                    </ButtonContainer>
                ) : content === 'complete' ? (
                    isPuzzleComplete ? (
                        <OrnateButton url={nextPage.url}>
                            {nextPage.title}
                        </OrnateButton>
                    ) : (
                        
                        <ButtonContainer>
                            <OptionButton onClick={handleReset}>
                                Try it again?
                            </OptionButton>
                            <OptionButton url={shouldRedirect ? '/not-the-good-place' : nextPage?.url}>
                                Continue your journey
                            </OptionButton>
                        </ButtonContainer>
                    )
                ) : isPuzzleComplete !== null && isPuzzleComplete !== undefined ? (
                    <ButtonContainer>
                        <OptionButton
                            onClick={async () => {
                                await animateExit();
                                setContent('complete');
                                await animateEnter();
                            }}>
                            {isPuzzleComplete ? "You did it! Continue." : "Continue."}
                        </OptionButton>
                    </ButtonContainer>
                ) : null}
            </FooterSection>
        </Layout >
    );
};

export default SolveThePuzzle;