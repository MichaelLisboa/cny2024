// src/contexts/AnimationContext.js
import React, { createContext, useContext, useMemo } from 'react';
import { useAnimation } from 'framer-motion';
import { animations } from '../components/Animations';

const PageAnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
    const controls = {
        headerControls: useAnimation(),
        bodyControls: useAnimation(),
        footerControls: useAnimation(),
    };

    const animateSection = async (section, animation) => {
        if (controls[section]) {
            await controls[section].start(animation);
        }
    };

    const animateEnter = async () => {
        await animateSection('headerControls', { ...animations.slideUpFadeIn.visible });
        await animateSection('bodyControls', { ...animations.slideUpFadeIn.visible });
        await animateSection('footerControls', { ...animations.slideUpFadeIn.visible });
    };

    const animateExit = async () => {
        await animateSection('footerControls', { ...animations.slideUpFadeIn.exit });
        await animateSection('bodyControls', { ...animations.slideUpFadeIn.exit });
        await animateSection('headerControls', { ...animations.slideUpFadeIn.exit });
    };

    const contextValue = useMemo(() => ({
        animations, // Making the whole animations object available
        animateEnter,
        animateExit,
        controls,
    }), [controls.headerControls, controls.bodyControls, controls.footerControls]);

    return (
        <PageAnimationContext.Provider value={contextValue}>
            {children}
        </PageAnimationContext.Provider>
    );
};

export const usePageAnimations = () => useContext(PageAnimationContext);
