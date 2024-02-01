import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import { AppContext } from '../contexts/AppContext';
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
  height: 5em;
  width: 90%;
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
  max-width: 90%;
  line-height: 1.2em;
  overflow: hidden;
  font-size: 1.25rem;
  font-family: Lato, sans-serif;
  font-weight: 700;
  font-style: italic;
  text-align: center;
  margin: 0;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  padding: 8px 8px;
  width: 75%;
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
    const [content, setContent] = useState('initial');

    const userInfo = getUserInfo();
    const userElement = userInfo.chosenElement;

    const location = useLocation();
    const currentPage = pages.find(page => page.url === location.pathname);
    const nextPage = pages.find(page => page.url === currentPage.nextPage);
    const previousPage = pages.find(page => page.url === currentPage.previousPage);
    const headerControls = useAnimation();
    const bodyControls = useAnimation();
    const footerControls = useAnimation();
    const paragraphControls = useAnimation();

    const initialSlide = {
        index: 0,
        title: allianceList[0].title,
        image: allianceList[0].image,
        text: allianceList[0].text,
        reaction: allianceList[0].reaction,
        description: allianceList[0].description.replace(/\*element_noun\*/g, userElement)
    };

    const [currentSlide, setCurrentSlide] = useState(initialSlide);

    useEffect(() => {
        animateParagraph();
    }, [currentSlide]); // This will trigger the animation whenever currentSlide changes

    const animateExit = async () => {
        await footerControls.start({ y: 100, opacity: 0 });
        await bodyControls.start({ y: 100, opacity: 0 });
        await headerControls.start({ y: 100, opacity: 0 });
    };

    const animateEnter = async () => {
        await bodyControls.start({ y: 0, opacity: 1, transition: { delay: 0.025 } });
        await footerControls.start({ y: 0, opacity: 1, transition: { delay: 0.05 } });
    };

    const handleButtonClick = async () => {
        const chosenAlliance = currentSlide.title;
        updateUserSelection('chosenAlliance', chosenAlliance);

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
            description: allianceList[newCurrentSlideIndex].description.replace(/\*element_noun\*/g, userElement)
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
                animate={headerControls}
                className="header-section"
            >
                {content === 'initial' ? (
                    <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
                        <h3 className="mal-margin-remove-top">Shortly after, you come across other spirits.</h3>
                    </div>
                ) : ``}
            </HeaderSection>
            <BodySection
                animate={bodyControls}
                className="body-section"
            >
                {content === 'initial' ? (
                    <div>
                        <Container>
                            <AnimatePresence>
                                <StyledParagraph
                                    key={currentSlide.index}
                                    lines={3}>
                                    "{currentSlide.description.replace(/\*element_noun\*/g, userElement)}"
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
                animate={footerControls}
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
