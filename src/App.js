import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import pages from './utils/pages';
import WelcomeToCny2024 from './pages/welcome-to-cny-2024';
import WhenWereYouBorn from './pages/when-were-you-born';
import WelcomeNobleBeings from './pages/welcome-noble-beings';
import WhatIsYourElement from './pages/choose-your-element';
import ChooseYourCup from './pages/choose-your-cup';
import ChooseYourAlliance from './pages/choose-your-alliance';
import SolveTheRiddle from './pages/solve-the-riddle';
import YourCrossroads from './pages/your-crossroads';
import SolveThePuzzle from './pages/solve-the-puzzle';
import TestYourCalligraphySkills from './pages/test-your-calligraphy-skills';
import EmbraceWhatInFrontOfYou from './pages/embrace-whats-in-front-of-you';
import PursueYourDreams from './pages/pursue-your-dreams';
import MeetYourInnerSelf from './pages/meet-your-inner-self';


function getElementForPage(page) {
  switch (page.url) {
    case "/":
      return <WelcomeToCny2024 />;
    case "/when-were-you-born":
      return <WhenWereYouBorn />;
    case "/welcome-noble-beings":
      return <WelcomeNobleBeings />;
    case "/choose-your-element":
      return <WhatIsYourElement />;
    case "/choose-your-cup":
      return <ChooseYourCup />;
    case "/choose-your-alliance":
      return <ChooseYourAlliance />;
    case "/solve-the-riddle":
      return <SolveTheRiddle />;
    case "/your-crossroads":
      return <YourCrossroads />;
    case "/solve-the-puzzle":
      return <SolveThePuzzle />;
    case "/test-your-calligraphy-skills":
      return <TestYourCalligraphySkills />;
    case "/embrace-whats-in-front-of-you":
      return <EmbraceWhatInFrontOfYou />;
    case "/pursue-your-dreams":
      return <PursueYourDreams />;
    case "/meet-your-inner-self":
      return <MeetYourInnerSelf />;
    default:
      return null;
  }
}

function App() {
  return (
    <AppProvider> {/* Wrap your application with AppProvider */}
      <Header />
      <Router>
        <AnimatePresence mode='wait'>
          <Routes>
            {pages.map((page, index) => (
              <Route
                key={index}
                path={page.url}
                element={getElementForPage(page)}
              />
            ))}
          </Routes>
        </AnimatePresence>
      </Router>
    </AppProvider>
  );
}

export default App;
