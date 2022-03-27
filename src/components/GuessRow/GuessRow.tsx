import { answerAtom } from '@/state/atoms';
import { guessCharacter } from '@/utils/mapPins';
import { x } from '@xstyled/styled-components';
import { useAtomValue } from 'jotai';
import { SegmentDisplay } from '../SegmentDisplay';

interface GuessRowProps {
  guess: string;
  attempt?: number;
}

export function GuessRow({ guess, attempt }: GuessRowProps) {
  const answer = useAtomValue(answerAtom);

  return (
    <x.div
      my={1}
      display="flex"
      flexDirection="column"
      background="hsla(0,0%,0%,25%)"
      pb={4}
      px={3}
      borderRadius="xl"
    >
      <x.div display="flex" marginBottom={0.5}>
        {new Array(attempt).fill('').map((_, idx) => (
          <x.div key={idx} color="hsla(0,0%,100%,85%)" fontSize="xl">
            •
          </x.div>
        ))}
      </x.div>
      <x.div display="grid" gridTemplateColumns={`repeat(${guess.length}, 1fr)`} gap={2}>
        {guess.split('').map((guessChar, idx) => (
          <SegmentDisplay
            key={guessChar + idx}
            segments={guessCharacter(guessChar, answer[idx])}
          />
        ))}
      </x.div>
    </x.div>
  );
}
