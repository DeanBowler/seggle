import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { ThemeProvider, Preflight, x } from '@xstyled/styled-components';

import { useAtom } from 'jotai';

import dictionary from './dictionary.json';

import { theme } from '@/style/theme';
import { answerAtom, guessStateAtom } from '@/state/atoms';
import { GuessRow } from './components/GuessRow';
import { Keyboard } from './components/Keyboard';
import { InputRow } from './components/InputRow';
import { GlobalStyles } from './style/globalStyles';

const gameLength = 6;

const isDateBeforeToday = (date: Date | string) =>
  new Date(new Date(date).toDateString()) < new Date(new Date().toDateString());

export function App() {
  const [guessState, setGuessState] = useAtom(guessStateAtom);

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
    console.log(answer);

    setGuessState({ guesses: [], started: new Date() });
    if (isDateBeforeToday(guessState.started)) {
      setGuessState({ guesses: [], started: new Date() });
    }
  }, []);

  useEffect(() => {
    if (!guessState.completed && guessState.guesses.slice(-1)[0] === answer) {
      setGuessState({
        ...guessState,
        completed: new Date(),
      });
    }
  }, [guessState]);

  const hasFinished = Boolean(guessState.completed);

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

    setGuessState(curr => ({ ...curr, guesses: [...curr.guesses, guess] }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <GlobalStyles />
      <x.div
        display="flex"
        flexDirection="column"
        padding={3}
        h="full"
        alignItems="center"
      >
        <x.div
          display="flex"
          flexDirection="column"
          flex="1 1 auto"
          overflowY="scroll"
          alignItems="center"
          maxWidth="400px"
        >
          {guessState.guesses.map((guess, idx) => (
            <GuessRow guess={guess} key={guess} attempt={idx + 1} />
          ))}
          {!hasFinished && (
            <InputRow
              guess={guess}
              key={guess}
              ref={guessRowEl}
              gameLength={gameLength}
              isInvalid={guess.length === gameLength && !isValid}
            />
          )}
        </x.div>

        <x.div display="flex" flexDirection="column" marginTop={4} alignItems="center">
          <x.div maxWidth={600} w="full">
            <Keyboard
              onCharacter={handleCharacter}
              onBackspace={handleBackspace}
              onEnter={handleSubmit}
            />
          </x.div>
        </x.div>
      </x.div>
    </ThemeProvider>
  );
}
