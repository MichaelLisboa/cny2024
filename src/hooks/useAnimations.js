// src/hooks/useAnimations.js
import { useContext } from 'react';
import { AnimationContext } from '../contexts/AnimationContext';

export const useAnimations = () => useContext(AnimationContext);
