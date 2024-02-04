// contexts/LayoutContext.js
import React, { createContext } from 'react';
import { useDynamicTextReplacer } from '../hooks/useDynamicTextReplacer';

export const LayoutContext = createContext({
    replaceText: () => {}, // Provide a default implementation
  });

export const LayoutProvider = ({ children }) => {
    const replaceText = useDynamicTextReplacer();

    return (
        <LayoutContext.Provider value={{ replaceText }}>
            {children}
        </LayoutContext.Provider>
    );
};
