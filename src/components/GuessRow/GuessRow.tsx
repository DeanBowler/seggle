import { guessCharacter } from '@/utils/mapPins';
import { x } from '@xstyled/styled-components';
import { SegmentDisplay } from '../SegmentDisplay';

interface GuessRowProps {
  guess: string;
  attempt?: number;
  answer: string;
}

export function GuessRow({ guess, attempt, answer }: GuessRowProps) {
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
      <x.div display="flex" h={attempt ? '' : 3}>
        {attempt && (
          <>
            {new Array(attempt).fill('').map((_, idx) => (
              <x.div
                key={idx}
                color="hsla(0,0%,100%,85%)"
                fontSize="xl"
                userSelect="none"
              >
                •
              </x.div>
            ))}
          </>
        )}
      </x.div>
      <x.div
        display="grid"
        gridTemplateColumns={`repeat(${guess.length}, 1fr)`}
        marginTop={0.5}
        gap={2}
      >
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
