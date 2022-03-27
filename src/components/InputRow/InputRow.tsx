import { SegmentValue } from '@/types/segment';
import { getPins } from '@/utils/mapPins';
import { x } from '@xstyled/styled-components';
import { forwardRef } from 'react';
import { SegmentDisplay } from '../SegmentDisplay';

interface InputRowProps {
  guess: string;
  gameLength: number;
  isInvalid?: boolean;
}

export const InputRow = forwardRef(
  ({ guess, gameLength, isInvalid = false }: InputRowProps, ref) => {
    return (
      <x.div
        my={7}
        mx={3}
        display="grid"
        gridTemplateColumns={`repeat(${gameLength}, 1fr)`}
        gap={2}
        ref={ref}
      >
        {guess
          .padEnd(gameLength, ' ')
          .split('')
          .map((guessChar, i) => (
            <SegmentDisplay
              key={i}
              segments={getPins(
                guessChar,
                isInvalid ? SegmentValue.Incorrect : SegmentValue.Pending,
              )}
            />
          ))}
      </x.div>
    );
  },
);

InputRow.displayName = 'InputRow';
