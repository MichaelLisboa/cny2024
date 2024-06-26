import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { AnimatePresence } from 'framer-motion';
import useIsIOS from "./hooks/useIsIOS"
import { InstallPWA } from "./components/InstallPWA"
import Header from './components/Header';
import pages from './utils/pages';
import GetYourFortune from './pages/get-your-fortune';
import NotTheGoodPlace from './pages/not-the-good-place';
import WelcomeToCny2024 from './pages/welcome-to-cny-2024';
import WelcomeNobleBeings from './pages/welcome-noble-beings';
import WhatIsYourElement from './pages/choose-your-element';
import ChooseYourCup from './pages/choose-your-cup';
import ChooseYourAlliance from './pages/choose-your-alliance';
import SolveTheRiddle from './pages/solve-the-riddle';
import ChooseYourPath from './pages/choose-your-path';
import SolveThePuzzle from './pages/solve-the-puzzle';
import TestYourCalligraphySkills from './pages/test-your-calligraphy-skills';
import WhatIsYourWish from './pages/what-is-your-wish';
import PursueYourDreams from './pages/pursue-your-dreams';
import MeetYourInnerSelf from './pages/meet-your-inner-self';

import ReactGA from 'react-ga';
ReactGA.initialize('G-4SZM7TT0QN');

function getElementForPage(page) {
  switch (page.url) {
    case "/":
      return <WelcomeToCny2024 />;
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
    case "/choose-your-path":
      return <ChooseYourPath />;
    case "/solve-the-puzzle":
      return <SolveThePuzzle />;
    case "/test-your-calligraphy-skills":
      return <TestYourCalligraphySkills />;
    case "/what-is-your-wish":
      return <WhatIsYourWish />;
    case "/pursue-your-dreams":
      return <PursueYourDreams />;
    case "/meet-your-inner-self":
      return <MeetYourInnerSelf />;
    case "/get-your-fortune":
      return <GetYourFortune />;
    case "/not-the-good-place":
      return <NotTheGoodPlace />;
    default:
      return <WelcomeToCny2024 />;
  }
}

function App() {
  const location = useLocation();
  const { isIOS, prompt } = useIsIOS();
  const [isMobile, setIsMobile] = useState(false)
  const [installPromptEvent, setInstallPromptEvent] = useState(null);

  useEffect(() => {
    const captureInstallPrompt = (e) => {
      // Prevent the default prompt display
      e.preventDefault();
      // Save the event for later use
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', captureInstallPrompt);

    // Cleanup on component unmount
    return () => window.removeEventListener('beforeinstallprompt', captureInstallPrompt);
  }, []);

  return (
    <>
      <AppProvider> {/* Wrap your application with AppProvider */}
        <Header />
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.key}>
            {pages.map((page, index) => (
              <Route
                key={index}
                path={page.url}
                element={getElementForPage(page)}
              />
            ))}
          </Routes>
        </AnimatePresence>
      </AppProvider>
      {prompt && <InstallPWA />}
    </>
  );
}

export default App;
