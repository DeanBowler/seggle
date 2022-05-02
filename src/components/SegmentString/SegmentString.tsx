import { getPins } from '@/utils/mapPins';
import { x } from '@xstyled/styled-components';
import { SegmentDisplay } from '../SegmentDisplay';

interface SegmentStringProps {
  text: string;
  width?: string;
}

export function SegmentString({ text, width = '200px' }: SegmentStringProps) {
  return (
    <x.div
      display="grid"
      gridTemplateColumns={`repeat(${text.length}, 1fr)`}
      gap={1}
      w={width}
    >
      {text.split('').map((char, i) => (
        <SegmentDisplay key={i} segments={getPins(char)} />
      ))}
    </x.div>
  );
}
