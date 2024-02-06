import React, { useContext, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import MalCarousel from '../components/MalCarousel/MalCarousel2';
import Image from '../components/Image';
import { riddlesList } from '../data';
import { OrnateButton } from '../components/Button';
import success from "../images/tokens/riddle.png";
import fail from "../images/tokens/failed_riddle.png";

const StyledMalCarousel = styled(MalCarousel)`
  .slide {
    margin: 0 !important;
    padding: 0 !important;

    &.slide img {
        max-height: 35vh;
    }
  }
`;

const DescriptionText = styled.p`
    display: block;
    font-size: 1.25rem;
    font-family: Lato, sans-serif;
    font-weight: 400;
    font-style: italic;
    color: #322F20;
    text-align: center;
    margin: 0 auto;
    padding: 0;
    width: 75%;
`;

const RiddleTokenImage = styled.div`
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
  text-align: center !important;
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const SolveTheRiddle = () => {
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
  const paragraphControls = useAnimation();

  const setCurrentSlideState = (content) => {
    setCurrentSlide({
      index: 0,
      title: replaceElementNoun(content.title),
      question: replaceElementNoun(content.question),
      correctAnswer: replaceElementNoun(content.correctAnswer),
      choices: content.choices.map(choice => ({
        ...choice,
        answer: replaceElementNoun(choice.answer),
      })),
      result: replaceElementNoun(content.result),
      successTitle: replaceElementNoun(content.successTitle),
      successMessage: replaceElementNoun(content.successMessage),
      failTitle: replaceElementNoun(content.failTitle),
      failMessage: replaceElementNoun(content.failMessage),
    });
  };

  const getRandomIndex = (length) => Math.floor(Math.random() * length);

  const getRandomIndices = (length, count) => {
    const indices = new Set();
    while (indices.size < count) {
      indices.add(getRandomIndex(length));
    }
    return [...indices];
  }

  const randomItems = useMemo(() => {
    const randomIndices = getRandomIndices(riddlesList.length, 1);
    return randomIndices.map(index => riddlesList[index]);
  }, [riddlesList]);

  const initialRiddleRef = useRef({
    index: 0,
    title: replaceElementNoun(randomItems[0].title),
    question: replaceElementNoun(randomItems[0].question),
    correctAnswer: replaceElementNoun(randomItems[0].correctAnswer),
    choices: randomItems[0].choices.map(choice => ({
      ...choice,
      answer: replaceElementNoun(choice.answer),
    })),
    result: replaceElementNoun(randomItems[0].result),
    successTitle: replaceElementNoun(randomItems[0].successTitle),
    successMessage: replaceElementNoun(randomItems[0].successMessage),
    failTitle: replaceElementNoun(randomItems[0].failTitle),
    failMessage: replaceElementNoun(randomItems[0].failMessage),
  })

  function getRandomRiddle() {
    let newRiddle;
    do {
      const randomIndex = getRandomIndices(riddlesList.length, 1);
      newRiddle = riddlesList[randomIndex[0]];
    } while (newRiddle === initialRiddleRef.current);

    return newRiddle;
  }

  const [currentSlide, setCurrentSlide] = useState(initialRiddleRef.current);
  const currentChoice = useRef(currentSlide.choices[currentSlide.index]);

  const animateExit = async () => {
    await footerControls.start({ y: 100, opacity: 0 });
    await bodyControls.start({ y: 100, opacity: 0 });
    await headerControls.start({ y: 100, opacity: 0 });
  };

  const animateEnter = async () => {
    await headerControls.start({ y: 0, opacity: 1, transition: { delay: 0.025 } });
    await bodyControls.start({ y: 0, opacity: 1, transition: { delay: 0.025 } });
    await footerControls.start({ y: 0, opacity: 1, transition: { delay: 0.05 } });
  };

  const handleCurrentSlideChange = (newCurrentSlideIndex) => {
    currentChoice.current = currentSlide.choices[newCurrentSlideIndex];
    setCurrentSlideState(currentSlide);
  };

  const handleReset = async () => {
    updateUserSelection('riddleResult', null);
    const newRiddle = getRandomRiddle();
    initialRiddleRef.current = {
      ...newRiddle,
      title: replaceElementNoun(newRiddle.title),
      question: replaceElementNoun(newRiddle.question),
      correctAnswer: replaceElementNoun(newRiddle.correctAnswer),
      choices: newRiddle.choices.map(choice => ({
        ...choice,
        answer: replaceElementNoun(choice.answer),
      })),
      result: replaceElementNoun(newRiddle.result),
      successTitle: replaceElementNoun(newRiddle.successTitle),
      successMessage: replaceElementNoun(newRiddle.successMessage),
      failTitle: replaceElementNoun(newRiddle.failTitle),
      failMessage: replaceElementNoun(newRiddle.failMessage),
    };
    setCurrentSlide(initialRiddleRef.current);
    await animateExit();
    setContent("initial");
    setTimeout(() => {
      animateEnter();
    }, 500);
  }

  const handleButtonClick = async (isCorrect) => {
    const chosenAnswer = currentChoice.current.answer;
    updateUserSelection('riddleResult', isCorrect);

    if (chosenAnswer) {
      await animateExit();
      setContent(true);
      setTimeout(() => {
        animateEnter();
      }, 500);
    }
  };

  return (
    <Layout>
      <HeaderSection
        animate={headerControls}
        className="header-section"
      >
        {content === 'initial' ?
          <div className="mal-margin-bottom-large mal-padding-remove-horizontal">
            <h3 className="mal-margin-remove-top">{initialRiddleRef.current.title}</h3>
            <DescriptionText className="mal-text-medium mal-margin-small-top">{initialRiddleRef.current.question}</DescriptionText>
          </div>
          : null}
      </HeaderSection>
      <BodySection
        animate={bodyControls}
        className="body-section"
      >
        {content === 'initial' ? (
          <div>
            <StyledMalCarousel
              elementsList={initialRiddleRef.current.choices}
              initialSlide={0}
              correctAnswer={initialRiddleRef.current.correctAnswer}
              onCurrentSlideChange={handleCurrentSlideChange}
              handleCardClick={handleButtonClick}
            />
          </div>
        ) :
          getUserInfo().riddleResult ? (
            <div className="mal-text-center">
              <h3 className="mal-h2 mal-margin-remove-vertical">{initialRiddleRef.current.result}</h3>
              <RiddleTokenImage>
                <Image
                  src={success}
                  alt={initialRiddleRef.current.result} />
              </RiddleTokenImage>
              <h2 className="mal-h3 mal-margin-remove-vertical">{initialRiddleRef.current.successTitle}</h2>
              <p className="mal-text-medium mal-text-italic">"{initialRiddleRef.current.successMessage}"</p>
            </div>
          ) :
            <div className="mal-text-center">
              <RiddleTokenImage className="mal-padding">
                <Image
                  src={fail}
                  alt={initialRiddleRef.current.failMessage} />
              </RiddleTokenImage>
              <h2 className="mal-h3 mal-margin-remove-vertical">{initialRiddleRef.current.failTitle}</h2>
              <p className="mal-text-medium mal-text-italic">"{initialRiddleRef.current.failMessage}"</p>
              <button
                className="mal-button mal-button-small mal-button-primary mal-border-rounded"
                onClick={handleReset}> Would you like to try again?</button>
            </div>
        }
      </BodySection>
      <FooterSection
        animate={footerControls}
        className="footer-section"
      >
        {content === 'initial' ? (
          <OrnateButton
            onClick={() => { handleButtonClick(currentChoice.current.answer === initialRiddleRef.current.correctAnswer) }}>
            {currentChoice.current.answer}
          </OrnateButton>
        ) :
          getUserInfo().riddleResult ? (
            <OrnateButton url={nextPage.url}>
              {nextPage.title}
            </OrnateButton>
          ) : (
            <OrnateButton url={nextPage.url}>
              {nextPage.title}
            </OrnateButton>
          )}
      </FooterSection>
    </Layout >
  );
};

export default SolveTheRiddle;