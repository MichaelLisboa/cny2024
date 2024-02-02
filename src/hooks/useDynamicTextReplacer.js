// useDynamicTextReplacer.js

import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export const useDynamicTextReplacer = () => {
  const { getUserInfo } = useContext(AppContext);
  const userInfo = getUserInfo();

  // Function to get data from localStorage as a fallback
  const getDataFromLocalStorage = (key) => {
    const storedUserState = localStorage.getItem('userState');
    if (storedUserState) {
      const parsedUserState = JSON.parse(storedUserState);
      return parsedUserState.userInfo[key];
    }
    return null;
  };

  const replaceText = (text) => {
    let replacedText = text;
  
    const replacements = {
      '\\*element_noun\\*': userInfo.chosenElement || getDataFromLocalStorage('chosenElement'),
      '\\*alliance_noun\\*': userInfo.chosenAlliance || getDataFromLocalStorage('chosenAlliance'),
      '\\*trait_noun\\*': userInfo.chosenTrait || getDataFromLocalStorage('chosenTrait'),
      '\\*path_noun\\*': userInfo.chosenPath || getDataFromLocalStorage('chosenPath'),
    };
  
    Object.entries(replacements).forEach(([placeholder, replacement]) => {
      replacedText = replacedText.replace(new RegExp(placeholder, 'g'), replacement);
    });
  
    return replacedText;
  };
  
  return replaceText;
};