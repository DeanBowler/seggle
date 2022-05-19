import { x } from '@xstyled/styled-components';
import { useAtomValue } from 'jotai';

import { answerAtom, guessStateAtom, winStateAtom } from '@/state/atoms';
import { SegmentValue } from '@/types/segment';
import { guessCharacter } from '@/utils/mapPins';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { Button } from '@/components/Button';

const getCharacterValue = (guess: string, answer: string): SegmentValue => {
  const guessPins = guessCharacter(guess, answer);

  if (Object.values(guessPins).every(pin => pin === SegmentValue.Correct)) {
    return SegmentValue.Correct;
  }

  if (Object.values(guessPins).every(pin => pin === SegmentValue.Incorrect)) {
    return SegmentValue.Incorrect;
  }

  if (Object.values(guessPins).every(pin => pin === SegmentValue.Unset)) {
    return SegmentValue.Unset;
  }

  if (
    Object.values(guessPins).some(
      pin => pin === SegmentValue.Correct || pin === SegmentValue.Partial,
    )
  ) {
    return SegmentValue.Partial;
  }

  return SegmentValue.Unset;
};

const valueToEmoji = (value: SegmentValue) => {
  switch (value) {
    case SegmentValue.Correct:
      return '🟩';
    case SegmentValue.Incorrect:
      return '🟥';
    case SegmentValue.Partial:
      return '🟨';
    default:
      return '⬜';
  }
};

const guessToEmoji = (guess: string, answer: string) =>
  guess
    .split('')
    .map((char, i) => getCharacterValue(char, answer[i]))
    .map(valueToEmoji)
    .join('');

const guessesToEmoji = (guesses: string[], answer: string) =>
  guesses.map(guess => guessToEmoji(guess, answer)).join('\n');

const shortFormatDuration = ({ hours, minutes, seconds }: Duration) =>
  [hours && `${hours}h`, minutes && `${minutes}m`, seconds && `${seconds}s`]
    .filter(Boolean)
    .join(' ');

export function WinDisplay() {
  const { guesses, day } = useAtomValue(guessStateAtom);
  const answer = useAtomValue(answerAtom);
  const [, copy] = useCopyToClipboard();

  const { gameDuration } = useAtomValue(winStateAtom);

  const generateShareText = () => {
    const emoji = guessesToEmoji(
      guesses.map(g => g.text),
      answer,
    );

    return `Seggle ${day} ${guesses.length} ${
      guesses.length === 1 ? 'guess' : 'guesses'
    } ${shortFormatDuration(gameDuration)}\n\n${emoji}\n\nhttps://seggle.app`;
  };

  const handleCopyClick = () => {
    copy(generateShareText());
  };

  const handleShareClick = () => {
    navigator.share({
      text: generateShareText(),
    });
  };

  return (
    <x.div color="white" display="flex" flexDirection="column" alignItems="center" my={1}>
      <x.p fontSize="xl" paddingBottom={3}>
        {`Seggle ${day} ${guesses.length} ${
          guesses.length === 1 ? 'guess' : 'guesses'
        } ${shortFormatDuration(gameDuration)}`}
      </x.p>
      <x.div whiteSpace="pre" lineHeight={8} fontSize="2xl">
        {guessesToEmoji(
          guesses.map(g => g.text),
          answer,
        )}
      </x.div>
      <x.div display="flex" spaceX={3} marginTop={4}>
        <Button onClick={handleShareClick}>Share</Button>
        {Boolean(navigator.share) && (
          <Button onClick={handleCopyClick}>Copy results</Button>
        )}
      </x.div>
    </x.div>
  );
}
