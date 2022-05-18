import { intervalToDuration } from 'date-fns';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const answerAtom = atom('');

interface Guess {
  text: string;
  submitted: Date;
}

export interface GuessState {
  guesses: Guess[];
  started: Date;
  day: number | null;
}

export const guessStateAtom = atomWithStorage<GuessState>('seggle_guess_state', {
  guesses: [],
  started: new Date(),
  day: null,
});

export const winStateAtom = atom(get => {
  const { guesses, started } = get(guessStateAtom);
  const answer = get(answerAtom);

  const matchingGuess = guesses.filter(g => g.text === answer).slice(-1)[0];

  return {
    hasWon: Boolean(matchingGuess),
    wonAt: matchingGuess?.submitted || null,
    gameDuration:
      started &&
      matchingGuess &&
      intervalToDuration({
        start: new Date(guesses[0].submitted),
        end: new Date(matchingGuess.submitted),
      }),
  };
});

const EXPLAINER_UPDATED = new Date(2022, 3, 23);

const helpRequestedAtom = atom(false);

export const lastReadExplainerAtom = atomWithStorage<Date | null>(
  'seggle_last_read_explainer',
  null,
);

export const isExplainerOpenAtom = atom<boolean, boolean>(
  get => {
    if (get(helpRequestedAtom)) {
      return true;
    }
    const lastReadExplainer = get(lastReadExplainerAtom);
    return (
      !lastReadExplainer ||
      new Date(lastReadExplainer).getTime() < EXPLAINER_UPDATED.getTime()
    );
  },
  (_, set, update: boolean) => {
    set(helpRequestedAtom, update);
    if (!update) {
      set(lastReadExplainerAtom, new Date());
    }
  },
);
