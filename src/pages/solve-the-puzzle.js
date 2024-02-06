import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import Image from '../components/Image';
import { OrnateButton, OptionButton } from '../components/Button';
import JigsawPuzzle from '../components/react-mal-jigsaw/JigsawPuzzle';
import CalligraphyGame from '../components/react-mal-calligraphy';
import pottery1 from "../images/jigsaw/pottery-finished-1.jpg";
import puzzle from "../images/jigsaw/puzzle.png";
import success from "../images/tokens/puzzle.png";
import fail from "../images/tokens/failed_puzzle.png";

const SplashImage = styled(Image)`
    align-self: center;

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

    a {
        font-size: 1.125rem;

        @media (max-width: 576px) { // When the viewport is 576px or less
            font-size: 0.875rem; // Reduce the font size even more
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

  .body-section-wide {
    align-self: center;
    width: 140% !important;
   }
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const SolveThePuzzle = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');
    const [isPuzzleComplete, setIsPuzzleComplete] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const previousPage = useMemo(() => pages.find(page => page.url === currentPage.previousPage), [currentPage]);
    const headerControls = useAnimation();
    const bodyControls = useAnimation();
    const footerControls = useAnimation();

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

    const handleThirdStateButtonClick = () => {
        setContent('thirdState');
    };

    const handleOnCompletionStatusChange = (isSuccessful) => {
        setIsPuzzleComplete(isSuccessful);
        if (isSuccessful !== null && isSuccessful !== undefined) {
            updateUserSelection('potteryPuzzleResult', isSuccessful);
        }
    };

    return (
        <Layout>
            <HeaderSection
                animate={headerControls}
                className="header-section"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">{replaceElementNoun("You look closer and realize the broken pieces of porcelain can be restored.")}</h3>
                        <p className="mal-text-medium mal-margin-small-top">{replaceElementNoun("Looking at the scattered pieces, *alliance_noun* hints that they may tell a legendary tale untold. Do you want to restore the pieces?")}</p>
                    </div>
                ) : content === 'thirdState' ? null
                    : (
                        <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                            <h3 className="mal-margin-remove-top">{replaceElementNoun("*alliance_noun* urges you to restore the porcelain pieces before time runs out.")}</h3>
                            <p className="mal-text-medium mal-margin-small-top">{replaceElementNoun("Swap the tiles to restore.")}</p>
                        </div>
                    )}
            </HeaderSection>

            <BodySection animate={bodyControls} className="body-section">
                {content === 'initial' ? (
                    <div className="body-section-wide">
                        <SplashImage src={puzzle} alt="Puzzle" />
                    </div>
                ) : content === 'thirdState' ? (
                    getUserInfo().potteryPuzzleResult ? (
                        <div className="mal-text-center">
                            <h3 className="mal-h2 mal-margin-remove-vertical">Blah</h3>
                            <PuzzleTokenImage>
                                <Image src={success} alt={`You successfully restored the porcelain vase!`} />
                            </PuzzleTokenImage>
                            <h2 className="mal-h3 mal-margin-remove-vertical">{`initialRiddleRef.current.successTitle`}</h2>
                            <p className="mal-text-medium mal-text-italic">"{`initialRiddleRef.current.successMessage`}"</p>
                        </div>
                    ) : (
                        <div className="mal-text-center">
                            <PuzzleTokenImage className="mal-padding">
                                <Image src={fail} alt={`You did not restore the porcelain vase in time.`} />
                            </PuzzleTokenImage>
                            <h2 className="mal-h3 mal-margin-remove-vertical">{replaceElementNoun(`You do not succeed to solve the puzzle.`)}</h2>
                            <p className="mal-text-medium">{replaceElementNoun(`The porcelain remains fragmented, scattered across the ground. It seems time slipped away faster than your efforts to restore it. The *alliance_noun* urges you to learn from this experience and carry the lessons of impermanence and the value of time into the unfolding journey.`)}</p>
                            {/* <button
                                className="mal-button mal-button-small mal-button-primary mal-border-rounded"
                                onClick={handleReset}
                            >
                                Would you like to try again?
                            </button> */}
                        </div>
                    )
                ) : (
                    <div className="mal-padding-small mal-text-center">
                        <JigsawPuzzle
                            imageSrc={pottery1}
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
                    <ButtonContainer> {/* Wrap the buttons in a container */}
                        <OptionButton onClick={
                            async () => {
                                updateUserSelection('potteryPuzzleResult', false);
                                await animateExit();
                                navigate(nextPage.url);
                            }
                        }>
                            No, let's move on
                        </OptionButton>
                        <OptionButton onClick={handleButtonClick}>
                            Yes, restore the pieces
                        </OptionButton>
                    </ButtonContainer>
                ) : content === 'thirdState' ? (
                    <OrnateButton onClick={handleThirdStateButtonClick}>
                        Third State Button
                    </OrnateButton>
                ) : isPuzzleComplete !== null && isPuzzleComplete !== undefined ? (
                    <OptionButton
                        onClick={async () => {
                            await animateExit();
                            setContent('thirdState');
                            await animateEnter();
                        }}>
                        {isPuzzleComplete ? "You did it! Let's celebrate!" : "Oh, no, time's up!"}
                    </OptionButton>
                ) : null}
            </FooterSection>
        </Layout >
    );
};

export default SolveThePuzzle;