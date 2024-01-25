import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { determineZodiacAnimalAndElement } from '../utils/GetZodiacAnimal.js';
import debounce from 'lodash/debounce';

export const AppContext = createContext();

const initialState = {
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
        spotTheDifferenceChallengeResult: '',
        mysteryAnimalResult: ''
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_BROWSER_SIZE':
            return { ...state, browserSize: action.payload };
        case 'UPDATE_USER_INFO':
            return { ...state, userInfo: { ...state.userInfo, ...action.payload } };
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

    const initializeUserState = () => {
        // Check if birthdate is stored in localStorage
        const storedUserState = localStorage.getItem('userState');
        if (storedUserState) {
            const parsedUserState = JSON.parse(storedUserState);
            if (parsedUserState.userInfo.birthdate) {
                dispatch({ type: 'UPDATE_USER_INFO', payload: parsedUserState.userInfo });
            }
        } else if (
            window.location.pathname !== '/' && // Check if not on the home page
            !state.userInfo.birthdate // Check if birthdate is empty
        ) {
            // If birthdate is not stored, userInfo.birthdate is empty, and not on the home page, navigate to the home page ("/")
            window.location.href = '/';
        }
    };

    useEffect(() => {
        initializeUserState();
    }, []);

    const updateUserInfo = (birthdate) => {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(birthdate)) {
            throw new Error('Invalid birthdate format. Expected format is yyyy-mm-dd');
        }

        const { animal, element } = determineZodiacAnimalAndElement(birthdate);
        if (process.env.NODE_ENV !== 'production') {
            console.log("Zodiac animal:", animal, "Zodiac element:", element);
        }
        dispatch({ type: 'UPDATE_USER_INFO', payload: { birthdate, zodiacAnimal: animal, zodiacElement: element } });
    };

    const updateUserSelection = (selectionType, value) => {
        dispatch({ type: 'UPDATE_USER_INFO', payload: { [selectionType]: value } });
    };

    useEffect(() => {
        localStorage.setItem('userState', JSON.stringify(state));
    }, [state]);

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
            state
        }}>
            {children}
        </AppContext.Provider>
    );
}
