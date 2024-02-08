import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { determineZodiacAnimalAndElement } from '../utils/GetZodiacAnimal.js';
import debounce from 'lodash/debounce';

export const AppContext = createContext();

// Function to get the initial state from localStorage if available
const getInitialState = () => {
  const storedUserState = localStorage.getItem('userState');
  return storedUserState ? JSON.parse(storedUserState) : {
    browserSize: {
      height: window.innerHeight,
      width: window.innerWidth,
    },
    userInfo: {
      birthdate: '',
      zodiacAnimal: '',
      zodiacElement: '',
      chosenElement: '',
      chosenTrait: '',
      chosenAlliance: '',
      riddleResult: '',
      chosenPath: '',
      potteryPuzzleResult: '',
      calligraphyChallengeResult: '',
      chosenWish: '',
      mysteryAnimalResult: '',
    },
  };
};

const initialState = getInitialState();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_BROWSER_SIZE':
      return { ...state, browserSize: action.payload };
    case 'UPDATE_USER_INFO':
      const updatedUserInfo = { ...state.userInfo, ...action.payload };
      const newState = { ...state, userInfo: updatedUserInfo };
      localStorage.setItem('userState', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateBrowserSize = useCallback(debounce(() => {
    dispatch({ type: 'SET_BROWSER_SIZE', payload: { height: window.innerHeight, width: window.innerWidth } });
  }, 250), []);

  useEffect(() => {
    window.addEventListener('resize', updateBrowserSize);
    return () => {
      window.removeEventListener('resize', updateBrowserSize);
      updateBrowserSize.cancel();
    };
  }, [updateBrowserSize]);

  const updateUserInfo = (birthdate) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthdate)) {
      throw new Error('Invalid birthdate format. Expected format is yyyy-mm-dd');
    }

    const { animal, element } = determineZodiacAnimalAndElement(birthdate);
    dispatch({ type: 'UPDATE_USER_INFO', payload: { birthdate, zodiacAnimal: animal, zodiacElement: element } });
  };

  const updateUserSelection = (selectionType, value) => {
    dispatch({ type: 'UPDATE_USER_INFO', payload: { [selectionType]: value } });
  };

  // Selector function for browser size
  const getBrowserSize = () => state.browserSize;

  // Selector function for user info
  const getUserInfo = () => state.userInfo;

  return (
    <AppContext.Provider value={{ 
        getBrowserSize,
        getUserInfo,
        updateUserInfo, 
        updateUserSelection,
        state // Exposing the entire state is optional depending on your needs
    }}>
      {children}
    </AppContext.Provider>
  );
}
