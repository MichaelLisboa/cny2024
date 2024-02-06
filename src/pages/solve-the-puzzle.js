import React, { useContext, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import Image from '../components/Image';
import { OrnateButton } from '../components/Button';
import JigsawPuzzle from '../components/react-mal-jigsaw/JigsawPuzzle';
import CalligraphyGame from '../components/react-mal-calligraphy';
import pottery1 from "../images/jigsaw/pottery-finished-1.jpg";
import puzzle from "../images/jigsaw/puzzle.png";

const SplashImage = styled(Image)`
    align-self: center;

    img {
        width: 110vw;
        object-fit: cover;
    }

    @media (min-width: 768px) {
        max-height: 40vh;
        align-self: center;
        img {
            width: auto !important;
            object-fit: contain;
        }
      }
`;

const HeaderSection = styled(motion.div)`
  // Add your header-section styles here.
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
  margin-left: -35px;
  width: 110vw;

  @media (min-width: 768px) {
    margin-left: auto;
    width: 100% !important;
  }
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const SolveThePuzzle = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');
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
        // Start the exit animation
        await animateExit();

        // Update the content
        setContent('newContent'); // replace 'newContent' with the actual new content

        // Start the enter animation
        await animateEnter();
    };

    return (
        <Layout>
            <HeaderSection
                animate={headerControls}
                className="header-section"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">{replaceElementNoun("Observing closer, it turns out to be a porcelain piece of a broken vase.")}</h3>
                        <p className="mal-text-medium mal-margin-small-top">{replaceElementNoun("The pieces lie in disarray, *alliance_noun* said it may be hinting at a tale untold.")}</p>
                        <p className="mal-text-medium">Restore the once-beautiful porcelain.</p>
                    </div>
                ) :
                    (<div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">{replaceElementNoun("Restore the porcelain before time runs out.")}</h3>
                        <p className="mal-text-medium mal-margin-small-top">{replaceElementNoun("Swap the tiles to restore.")}</p>
                    </div>)
                }
            </HeaderSection>
            <BodySection
                animate={bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <SplashImage src={puzzle} alt="Puzzle" />
                ) : (
                    <div className="mal-padding-small mal-text-center">
                        <JigsawPuzzle
                            imageSrc={pottery1}
                            gridSize={3} 
                            timeLimit={30}
                            onCompletionStatusChange={(isSuccessful) => {
                                if (isSuccessful) {
                                    console.log('The puzzle was completed successfully.');
                                } else {
                                    console.log('The puzzle was not completed in time.');
                                }
                            }} />
                    </div>
                )}
            </BodySection>
            <FooterSection
                animate={footerControls}
                className="footer-section"
            >
                {content === 'initial' ? (
                    <OrnateButton onClick={handleButtonClick}>
                        Restore the porcelain
                    </OrnateButton>
                ) : null}
            </FooterSection>
        </Layout >
    );
};

export default SolveThePuzzle;