import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
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
    actionsSkippedOrFailed: 0,
    currentLocation: '',
    previousLocation: '',
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
      userAnimal: '',
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
    case 'INCREMENT_SKIP_FAIL_COUNT':
      if (typeof state.actionsSkippedOrFailed === 'number') {
        const updatedCount = state.actionsSkippedOrFailed + 1;
        // Check if the threshold is reached
        if (updatedCount >= 2) {
          // Transition to boolean true since the threshold is reached
          return { ...state, actionsSkippedOrFailed: true };
        } else {
          return { ...state, actionsSkippedOrFailed: updatedCount };
        }
      }
      // If already a boolean (true), it remains true
      return state;

    case 'DECREMENT_SKIP_FAIL_COUNT':
      if (typeof state.actionsSkippedOrFailed === 'boolean') {
        // If already transitioned to boolean and is true, toggle to false
        return { ...state, actionsSkippedOrFailed: false };
      }
      // If still a number, decrement unless it's already at 0
      if (state.actionsSkippedOrFailed > 0) {
        const updatedCount = state.actionsSkippedOrFailed - 1;
        return { ...state, actionsSkippedOrFailed: updatedCount };
      }
      return state;

    case 'SET_CURRENT_LOCATION':
      return { ...state, currentLocation: action.payload };
    case 'SET_PREVIOUS_LOCATION':
      return { ...state, previousLocation: action.payload };

    default:
      return state;
  }
};

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const location = useLocation(); // Use the useLocation hook here

  const updateBrowserSize = useCallback(
    debounce(() => {
      dispatch({
        type: 'SET_BROWSER_SIZE',
        payload: { height: window.innerHeight, width: window.innerWidth },
      });
    }, 250),
    [] // Empty dependency array
  );

  const incrementSkipFailCount = () => {
    dispatch({ type: 'INCREMENT_SKIP_FAIL_COUNT' });
  };

  const decrementSkipFailCount = () => {
    dispatch({ type: 'DECREMENT_SKIP_FAIL_COUNT' });
  };

  useEffect(() => {
    // Dispatch action to update the current location
    dispatch({ type: 'SET_CURRENT_LOCATION', payload: location.pathname });
  }, [location]);

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
  const currentLocation = () => state.currentLocation;

  // Selector function for user info
  const getUserInfo = () => state.userInfo;

  return (
    <AppContext.Provider value={{
      getBrowserSize,
      currentLocation,
      actionsSkippedOrFailed: state.actionsSkippedOrFailed,
      incrementSkipFailCount,
      decrementSkipFailCount,
      getUserInfo,
      updateUserInfo,
      updateUserSelection,
      state // Exposing the entire state is optional depending on your needs
    }}>
      {children}
    </AppContext.Provider>
  );
}
