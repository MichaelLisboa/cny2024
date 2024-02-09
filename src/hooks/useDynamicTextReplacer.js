import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

export const useDynamicTextReplacer = () => {
  const { getUserInfo } = useContext(AppContext);
  const userInfo = getUserInfo();

  const getDataFromLocalStorage = (key) => {
    if (typeof localStorage !== 'undefined') {
      const storedUserState = localStorage.getItem('userState');
      if (storedUserState) {
        const parsedUserState = JSON.parse(storedUserState);
        return parsedUserState.userInfo[key];
      }
    }
    return null;
  };

  const replaceText = (text) => {
    if (text === undefined) console.error('Text is undefined', text);

    const replacements = {
      '\\*element_noun\\*': userInfo?.chosenElement.choice || getDataFromLocalStorage('chosenElement').choice,
      '\\*element_endResult\\*': userInfo?.chosenElement.element_endResult || getDataFromLocalStorage('chosenElement').element_endResult,
      '\\*alliance_noun\\*': userInfo?.chosenAlliance.choice || getDataFromLocalStorage('chosenAlliance').choice,
      '\\*alliance_endResult\\*': userInfo?.chosenAlliance.alliance_endResult || getDataFromLocalStorage('chosenAlliance').alliance_endResult,
      '\\*trait_noun\\*': userInfo?.chosenTrait || getDataFromLocalStorage('chosenTrait'),
      '\\*path_noun\\*': userInfo?.chosenPath.choice || getDataFromLocalStorage('chosenPath').choice,
      '\\*path_endResult\\*': userInfo?.chosenPath.path_endResult || getDataFromLocalStorage('chosenPath').path_endResult,
      '\\*riddle_endResult\\*': userInfo?.riddleResult.riddle_endResult || getDataFromLocalStorage('riddleResult').riddle_endResult,
      '\\*puzzle_endResult\\*': userInfo?.potteryPuzzleResult.puzzle_endResult || getDataFromLocalStorage('potteryPuzzleResult').puzzle_endResult,
      '\\*calligraphy_endResult\\*': userInfo?.calligraphyChallengeResult.calligraphy_endResult || getDataFromLocalStorage('calligraphyChallengeResult').calligraphy_endResult,

    };

    Object.entries(replacements).forEach(([placeholder, replacement]) => {
      text = text.replace(new RegExp(placeholder, 'g'), replacement);
    });

    return text;
  };

  return replaceText;
};
