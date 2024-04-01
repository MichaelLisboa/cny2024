import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { usePageAnimations } from '../contexts/AnimationContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import MalCarousel from '../components/MalCarousel';
import { OrnateButton } from '../components/Button';
import { allianceList } from '../data';

const StyledMalCarousel = styled(MalCarousel)`
  .slide {
    margin: 0 !important;
    padding: 0 !important;
    max-height: 40vh;
    overflow: visible !important;

    &.slide img {
        max-height: 40vh;
    }
  }
`;

const Container = styled.div`
  position: relative;
  height: 7em;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  overflow: hidden;
  auto-fit: contain;
`;

const StyledParagraph = styled(motion.p).attrs(() => ({
    variants: paragraphVariants,
    initial: 'hidden',
    animate: 'show',
    exit: 'exit',
}))`
  position: absolute;
  top: 0;
  width: auto;
  max-width: 66%;
  line-height: 1.2em;
  overflow: hidden;
  font-size: 0.95rem;
  font-family: Lato, sans-serif;
  font-weight: 700;
  font-style: italic;
  text-align: center;
  margin: 0;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 48px;
  border: 1px solid rgba(0, 0, 0, 0.025);
  padding: 8px 16px;

    @media (min-width: 768px) {
        font-size: 1.125rem;
        max-width: 50%;
        min-height: 3em;
        padding: 16px 32px;
    }
`;

const paragraphVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.5,
        },
    },
};

const StyledImage = styled(motion.div)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -30px;
  width: 135%;
  overflow: visible !important;
  min-width: 120vw;

  @media (min-width: 768px) {
    position: relative;
    max-height: 65vh;
    width: auto;
    min-width: auto;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }`;

const HeaderSection = styled(motion.div)`
  // Add your header-section styles here.
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const ChooseYourAlliance = () => {
    const { updateUserSelection, getUserInfo } = useContext(AppContext);
    const replaceElementNoun = useDynamicTextReplacer();
    const [content, setContent] = useState('initial');

    const userInfo = getUserInfo();
    const userElement = userInfo.chosenElement;

    const location = useLocation();
    const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
    const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
    const previousPage = useMemo(() => pages.find(page => page.url === currentPage.previousPage), [currentPage]);
    const { animateEnter, animateExit, controls } = usePageAnimations();
    const paragraphControls = useAnimation();

    const initialSlide = {
        index: 0,
        title: allianceList[0].title,
        image: allianceList[0].image,
        text: allianceList[0].text,
        reaction: allianceList[0].reaction,
        description: replaceElementNoun(allianceList[0].description),
        alliance_endResult: allianceList[0].alliance_endResult
    };

    const [currentSlide, setCurrentSlide] = useState(initialSlide);

    useEffect(() => {
        animateParagraph();
    }, [currentSlide]); // This will trigger the animation whenever currentSlide changes

    const handleButtonClick = async () => {
        const chosenAlliance = currentSlide.title;
        updateUserSelection('chosenAlliance', { choice: chosenAlliance, alliance_endResult: currentSlide.alliance_endResult });

        if (chosenAlliance) {
            await animateExit();
            setContent('');
            setTimeout(() => {
                animateEnter();
            }, 500);
        }
    };

    const handleCurrentSlideChange = (newCurrentSlideIndex) => {
        setCurrentSlide({
            index: newCurrentSlideIndex,
            image: allianceList[newCurrentSlideIndex].image,
            title: allianceList[newCurrentSlideIndex].title,
            text: allianceList[newCurrentSlideIndex].text,
            reaction: allianceList[newCurrentSlideIndex].reaction,
            description: replaceElementNoun(allianceList[newCurrentSlideIndex].description),
            alliance_endResult: allianceList[newCurrentSlideIndex].alliance_endResult
        });
    };

    const animateParagraph = async () => {
        await paragraphControls.start({
            opacity: 1,
            translateY: 0,
            transition: { duration: 0.5 }
        });
    };

    return (
        <Layout>
            <HeaderSection
                animate={controls.headerControls}
                className="header-section"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">Shortly after, you come across other spirits.</h3>
                    </div>
                ) : ``}
            </HeaderSection>
            <BodySection
                animate={controls.bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <div>
                        <Container>
                            <AnimatePresence>
                                <StyledParagraph
                                    key={currentSlide.index}
                                    lines={3}>
                                    "{replaceElementNoun(currentSlide.description)}"
                                </StyledParagraph>
                            </AnimatePresence>
                        </Container>
                        <StyledMalCarousel
                            elementsList={allianceList}
                            initialSlide={initialSlide.index}
                            onCurrentSlideChange={handleCurrentSlideChange}
                            handleCardClick={handleButtonClick}
                        />
                    </div>
                ) : (
                    <div className="mal-flex mal-flex-column mal-flex-between">
                        <div className="mal-position-top mal-text-center mal-margin-auto mal-width-auto">
                            <h3>{currentSlide.reaction}</h3>
                            <p className="mal-text-medium mal-text-italic">"{currentSlide.text}"</p>
                        </div>
                        <StyledImage>
                            <img src={currentSlide.image} alt={currentSlide.title} />
                        </StyledImage>
                        <div className="footer-section mal-position-bottom mal-position-large">
                            <OrnateButton url={nextPage.url}>
                                {nextPage.title}
                            </OrnateButton>
                        </div>
                    </div>
                )}
            </BodySection>
            <FooterSection
                animate={controls.footerControls}
                className="footer-section"
            >
                {content === 'initial' ? (
                    <OrnateButton onClick={handleButtonClick}>
                        {currentSlide.title}
                    </OrnateButton>
                ) : null}
            </FooterSection>
        </Layout >
    );
};

export default ChooseYourAlliance;
