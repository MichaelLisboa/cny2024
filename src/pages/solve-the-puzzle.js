import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

const SplashImage = styled(Image)`
    align-self: center;

    img {
        width: 100%;
        object-fit: contain;
    }
`;

const ButtonContainer = styled.div`
  display: flex; // Add this line to make the buttons display side by side
  justify-content: space-between; // Optional: Adjust as needed for spacing
`;

const HeaderSection = styled(motion.div)`
  // Add your header-section styles here.
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
  justify-content: flex-start !important;
  margin-left: -15% !important;
  width: 130% !important;
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
                ) : content === 'thirdState' ? (
                    // Replace this with the actual content for the third state
                    <div></div>
                ) : (
                    <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">{replaceElementNoun("*alliance_noun* urges you to restore the porcelain pieces before time runs out.")}</h3>
                        <p className="mal-text-medium mal-margin-small-top">{replaceElementNoun("Swap the tiles to restore.")}</p>
                    </div>
                )}
            </HeaderSection>

            <BodySection
                animate={bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <SplashImage src={puzzle} alt="Puzzle" />
                ) : content === 'thirdState' ? (
                    // Replace this with the actual content for the third state
                    <div></div>
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
          () => {
            updateUserSelection('potteryPuzzleResult', false);
            animateExit();
            // go to {nextPage.title}
          }
        }>
          No, move on
        </OptionButton>
        <OptionButton onClick={handleButtonClick}>
          Yes, restore the pieces
        </OptionButton>
      </ButtonContainer>
    ) : content === 'thirdState' ? (
      // Replace this with the actual button for the third state
      <OrnateButton onClick={handleThirdStateButtonClick}>
        Third State Button
      </OrnateButton>
    ) : isPuzzleComplete !== null && isPuzzleComplete !== undefined ? (
      <OrnateButton
        url={nextPage.url}>
        {nextPage.title}
      </OrnateButton>
    ) : null}
</FooterSection>
        </Layout >
    );
};

export default SolveThePuzzle;