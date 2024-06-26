import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AppContext } from '../contexts/AppContext';
import { usePageAnimations } from '../contexts/AnimationContext';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';
import pages from '../utils/pages';
import Layout from '../templates/layout';
import MalCarousel from '../components/MalCarousel/MalCarousel2';
import useRedirectOnFail from '../hooks/useRedirectOnFail';
import TraitToken from '../components/TraitToken';
import { riddlesList } from '../data';
import { OrnateButton, OptionButton } from '../components/Button';
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
  text-align: center !important;
`;

const BodySection = styled(motion.div)`
  // Add your body-section styles here.
`;

const FooterSection = styled(motion.div)`
  // Add your footer-section styles here.
`;

const SolveTheRiddle = () => {
  const { 
    updateUserSelection,
    getUserInfo,
    actionsSkippedOrFailed,
    incrementSkipFailCount,
    decrementSkipFailCount } = useContext(AppContext);
  const replaceElementNoun = useDynamicTextReplacer();
  const [content, setContent] = useState('initial');
  const location = useLocation();
  const currentPage = useMemo(() => pages.find(page => page.url === location.pathname), [location.pathname]);
  const nextPage = useMemo(() => pages.find(page => page.url === currentPage.nextPage), [currentPage]);
  const { animateEnter, animateExit, controls } = usePageAnimations();
  const {shouldRedirect} = useRedirectOnFail();

  //  check if the user has skipped or failed 3 times in a useffect
  useEffect(() => {
    if (actionsSkippedOrFailed >= 3) {
      console.log('User has failed or skipped 3 times');
    }
  }, [actionsSkippedOrFailed]);


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
      riddle_endResult: content.riddle_endResult,
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
    riddle_endResult: randomItems[0].riddle_endResult,
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

  const handleCurrentSlideChange = (newCurrentSlideIndex) => {
    currentChoice.current = currentSlide.choices[newCurrentSlideIndex];
    setCurrentSlideState(currentSlide);
  };

  const handleReset = async () => {
    // updateUserSelection('riddleResult', null);
    const newRiddle = getRandomRiddle();
    decrementSkipFailCount();
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
      riddle_endResult: newRiddle?.riddle_endResult,
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
    if(!isCorrect) {
      incrementSkipFailCount();
    }
    updateUserSelection('riddleResult', {
      choice: isCorrect,
      riddle_endResult: isCorrect ? currentSlide.riddle_endResult[0].true : currentSlide.riddle_endResult[0].false
    });

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
        animate={controls.headerControls}
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
        animate={controls.bodyControls}
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
          getUserInfo().riddleResult.choice ? (
            <TraitToken
              trait={success}
              selected={currentChoice.current.answer}
              subheadline={initialRiddleRef.current.successTitle}
              description={initialRiddleRef.current.successMessage}
              title={initialRiddleRef.current.result}
            />
          ) :
            <TraitToken
              trait={fail}
              selected={currentChoice.current.answer}
              description={`"${initialRiddleRef.current.failMessage}"`}
              title={initialRiddleRef.current.failTitle}
            />
        }
      </BodySection>
      <FooterSection
        animate={controls.footerControls}
        className="footer-section"
      >
        {content === 'initial' ? (
          <OrnateButton
            onClick={() => { handleButtonClick(currentChoice.current.answer === initialRiddleRef.current.correctAnswer) }}>
            {currentChoice.current.answer}
          </OrnateButton>
        ) :
          getUserInfo().riddleResult.choice ? (
            <OrnateButton url={nextPage.url}>
              {nextPage.title}
            </OrnateButton>
          ) : (
            <ButtonContainer>
              <OptionButton onClick={handleReset}>
                Try again?
              </OptionButton>
              <OptionButton url={shouldRedirect ? '/not-the-good-place' : nextPage?.url}>
                Continue your journey
              </OptionButton>
            </ButtonContainer>
          )}
      </FooterSection>
    </Layout >
  );
};

export default SolveTheRiddle;