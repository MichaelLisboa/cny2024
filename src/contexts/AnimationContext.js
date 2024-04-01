import React, { createContext, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

const PageAnimationContext = createContext();

const fadeInVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 2, duration: 0.5 } },
};

const elementControls = {
    hidden: { x: '-100vw' },
    visible: { x: 0, transition: { delay: 2, duration: 0.5, type: 'spring', stiffness: 120 } },
};

const enterAnimation = { y: 0, opacity: 1, transition: { duration: 0.25, delay: 0.25 } };
const exitAnimation = { y: 100, opacity: 0, transition: { duration: 0.125, delay: 0.02 } };

export const AnimationProvider = ({ children }) => {
    const headerControls = useAnimation();
    const bodyControls = useAnimation();
    const footerControls = useAnimation();

    const animateEnter = async () => {
        await headerControls.start(enterAnimation);
        await bodyControls.start({ ...enterAnimation, transition: { duration: 0.5 } });
        await footerControls.start({ ...enterAnimation, transition: { duration: 0.5, delay: 0.275 } });
    };
    
    const animateExit = async () => {
        await footerControls.start(exitAnimation);
        await bodyControls.start(exitAnimation);
        await headerControls.start(exitAnimation);
    };

    const contextValue = useMemo(() => ({
        animateEnter,
        animateExit,
        elementControls,
        controls: { headerControls, bodyControls, footerControls },
    }), [headerControls, bodyControls, footerControls]);

    return (
        <PageAnimationContext.Provider value={contextValue}>
            {children}
        </PageAnimationContext.Provider>
    );
};

export const usePageAnimations = () => useContext(PageAnimationContext);