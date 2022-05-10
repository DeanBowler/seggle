import { useRef, useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { x } from '@xstyled/styled-components';
import { Chance } from 'chance';

import dictionary from '@/dictionary.json';
import { guessStateAtom, answerAtom, winStateAtom } from '@/state/atoms';

import { GuessRow } from '@/components/GuessRow';
import { InputRow } from '@/components/InputRow';
import { Keyboard } from '@/components/Keyboard';
import { WinDisplay } from '@/components/WinDisplay';
import { differenceInCalendarDays } from 'date-fns';

const gameLength = 6;
export const GAME_RELEASED = new Date(2022, 4, 5);

export function Game() {
  const [guessState, setGuessState] = useAtom(guessStateAtom);
  const { hasWon } = useAtomValue(winStateAtom);

  const guessRowEl = useRef<HTMLElement>();

  const [answer, setAnswer] = useAtom(answerAtom);

  const [guess, setGuess] = useState('');

  const eligibleWords = useMemo(
    () => dictionary.filter(word => word.length === gameLength),
    [gameLength],
  );

  useEffect(() => {
    setGuess('');
    guessRowEl.current?.scrollIntoView({});
  }, [guessState]);

  useLayoutEffect(() => {
    const daysSinceRelease = differenceInCalendarDays(new Date(), GAME_RELEASED);

    if (!guessState.started || guessState.day !== daysSinceRelease) {
      setGuessState({ guesses: [], started: new Date(), day: daysSinceRelease });
    }

    const chance = new Chance(daysSinceRelease);
    const answer = chance.pickone(eligibleWords).toLocaleUpperCase();

    setAnswer(answer);
  }, []);

  const handleCharacter = (character: string) =>
    setGuess(curr => (curr + character).slice(0, gameLength));

  const handleBackspace = () => setGuess(curr => curr.slice(0, -1));

  const isValid = useMemo(
    () => eligibleWords.includes(guess.toLocaleLowerCase()),
    [guess, eligibleWords],
  );

  const handleSubmit = () => {
    if (!isValid) return;
    if (guess.length !== gameLength) return;

    setGuessState(curr => ({
      ...curr,
      guesses: [...curr.guesses, { text: guess, submitted: new Date() }],
    }));
  };

  return (
    <x.div
      display="flex"
      flexDirection="column"
      my={3}
      h="full"
      alignItems="center"
      overflowY="hidden"
    >
      <x.div
        display="flex"
        flexDirection="column"
        flex="1 1 auto"
        px={3}
        overflowY="scroll"
        alignItems="center"
        maxWidth="359px"
      >
        {guessState.guesses.map((guess, idx) => (
          <GuessRow
            guess={guess.text}
            answer={answer}
            key={guess.text.toString()}
            attempt={idx + 1}
          />
        ))}
        {!hasWon && (
          <InputRow
            guess={guess}
            key={guess}
            ref={guessRowEl}
            gameLength={gameLength}
            isInvalid={guess.length === gameLength && !isValid}
          />
        )}
      </x.div>
      <x.div
        display="flex"
        flexDirection="column"
        marginTop={4}
        alignItems="center"
        px={1}
        maxWidth="560px"
        w="full"
      >
        <x.div w="full">
          {hasWon ? (
            <WinDisplay />
          ) : (
            <Keyboard
              onCharacter={handleCharacter}
              onBackspace={handleBackspace}
              onEnter={handleSubmit}
            />
          )}
        </x.div>
      </x.div>
    </x.div>
  );
}
