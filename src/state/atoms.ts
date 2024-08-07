import { intervalToDuration } from 'date-fns';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Chance } from 'chance';

import { eligibleWords } from '@/constants';

interface Guess {
  text: string;
  submitted: Date;
}

export interface GuessState {
  guesses: Guess[];
  started: Date;
  day: number | null;
}

const createAtoms = (storageSuffix?: string) => {
  const guessStateAtom = atomWithStorage<GuessState>(
    `seggle_guess_state${storageSuffix ? `_${storageSuffix}` : ''}`,
    {
      guesses: [],
      started: new Date(),
      day: null,
    },
  );

  const answerAtom = atom(get => {
    const { day } = get(guessStateAtom);

    const chance = new Chance(day ?? 0);
    const answer = chance.pickone(eligibleWords).toLocaleUpperCase();

    return answer;
  });

  const winStateAtom = atom(get => {
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

  return {
    guessStateAtom,
    answerAtom,
    winStateAtom,
  };
};

const { answerAtom, guessStateAtom, winStateAtom } = createAtoms();
export { guessStateAtom, answerAtom, winStateAtom };

const EXPLAINER_UPDATED = new Date(2022, 4, 28);

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
