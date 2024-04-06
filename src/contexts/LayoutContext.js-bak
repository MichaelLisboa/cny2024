// contexts/LayoutContext.js
import React, { createContext, useContext } from 'react';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';

export const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const { replaceText } = useDynamicTextReplacer(); // Destructure the returned object

    return (
        <LayoutContext.Provider value={{ replaceElementNoun: replaceText }}>
            {children}
        </LayoutContext.Provider>
    );
};
