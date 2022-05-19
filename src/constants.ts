import dictionary from '@/dictionary.json';

export const gameLength = 6;
export const GAME_RELEASED = new Date(2022, 4, 5);

export const eligibleWords = dictionary.filter(word => word.length === gameLength);
