import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const answerAtom = atom('LOVES');

export interface GuessState {
  guesses: string[];
  started: Date;
  completed?: Date;
}

export const guessStateAtom = atomWithStorage<GuessState>('guessState', {
  guesses: [],
  started: new Date(),
});
