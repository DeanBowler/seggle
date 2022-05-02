import { useRef, useState, useMemo, useEffect, useLayoutEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { x } from '@xstyled/styled-components';

import dictionary from '@/dictionary.json';
import { guessStateAtom, answerAtom, winStateAtom } from '@/state/atoms';

import { GuessRow } from '@/components/GuessRow';
import { InputRow } from '@/components/InputRow';
import { Keyboard } from '@/components/Keyboard';

const gameLength = 6;

const isDateBeforeToday = (date: Date | string) =>
  new Date(new Date(date).toDateString()) < new Date(new Date().toDateString());

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
    const answer =
      eligibleWords[Math.floor(Math.random() * eligibleWords.length)].toLocaleUpperCase();

    setAnswer(answer);

    setGuessState({ guesses: [], started: new Date() });
    if (isDateBeforeToday(guessState.started)) {
      setGuessState({ guesses: [], started: new Date() });
    }
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
        maxWidth="400px"
      >
        {guessState.guesses.map((guess, idx) => (
          <GuessRow
            guess={guess.text}
            answer={answer}
            key={guess.submitted.toString()}
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
        px={2}
      >
        <x.div maxWidth={600} w="full">
          <Keyboard
            onCharacter={handleCharacter}
            onBackspace={handleBackspace}
            onEnter={handleSubmit}
          />
        </x.div>
      </x.div>
    </x.div>
  );
}
