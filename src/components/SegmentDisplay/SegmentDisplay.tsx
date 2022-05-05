import { SegmentValue } from '@/types/segment';
import { useTheme } from 'styled-components';

export type Segment =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g1'
  | 'g2'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm';

export interface SegmentDisplayProps {
  segments: Partial<Record<Segment, SegmentValue>>;
  renderInactivePins?: boolean;
}

const GLOW_VALUES = [SegmentValue.Correct, SegmentValue.Incorrect, SegmentValue.Partial];

export function SegmentDisplay({
  segments,
  renderInactivePins = true,
}: SegmentDisplayProps) {
  const theme = useTheme();

  const segmentColor = (segment: Segment) => {
    switch (segments[segment]) {
      case SegmentValue.Correct:
        return theme.colors.positive;
      case SegmentValue.Partial:
        return theme.colors.warning;
      case SegmentValue.Incorrect:
        return theme.colors.negative;
      case SegmentValue.Pending:
        return 'hsl(0, 0%, 90%)';
      default:
        return renderInactivePins ? 'hsla(0, 0%, 50%, .25)' : 'transparent';
    }
  };

  const filter = (segment: Segment) =>
    GLOW_VALUES.includes(segments[segment] ?? SegmentValue.Unset) ? 'url(#glow)' : '';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
      width="100%"
      viewBox="0 0 140 200"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={7} />
          <feComponentTransfer>
            <feFuncA type="linear" slope={0.5} />
          </feComponentTransfer>
          <feMerge>
            {/* <feMergeNode /> */}
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M120 161.5V180h-8.613L82 131v-19h8.613L120 161.5Z"
        fill={segmentColor('m')}
        filter={filter('m')}
      />
      <path
        d="M79 180H61v-67.935L70 102l9 10.065V180Z"
        fill={segmentColor('l')}
        filter={filter('l')}
      />
      <path
        d="M20 161.5V180h8.613L58 131v-19h-8.613L20 161.5Z"
        fill={segmentColor('k')}
        filter={filter('k')}
      />
      <path
        d="M120 38.5V20h-8.613L82 69v19h8.613L120 38.5Z"
        fill={segmentColor('j')}
        filter={filter('j')}
      />
      <path
        d="M79 20H61v67.936L70 98l9-10.064V20Z"
        fill={segmentColor('i')}
        filter={filter('i')}
      />
      <path
        d="M20 38.5V20h8.613L58 69v19h-8.613L20 38.5Z"
        fill={segmentColor('h')}
        filter={filter('h')}
      />
      <path
        d="m81 91.5-8.5 8.5 8.5 8.5h39l8.5-8.5-8.5-8.5H81Z"
        fill={segmentColor('g2')}
        filter={filter('g2')}
      />
      <path
        d="M20.5 91.5 12 100l8.5 8.5h39L68 100l-8.5-8.5h-39Z"
        fill={segmentColor('g1')}
        filter={filter('g1')}
      />
      <path
        d="m9 11-9 9v69l9 9 9-9V20l-9-9Z"
        fill={segmentColor('f')}
        filter={filter('f')}
      />
      <path
        d="m9 102-9 9v69l9 9 9-9v-69l-9-9Z"
        fill={segmentColor('e')}
        filter={filter('e')}
      />
      <path
        d="m19.112 200-8.612-9 8.612-9h101.776l8.612 9-8.612 9H19.112Z"
        fill={segmentColor('d')}
        filter={filter('d')}
      />
      <path
        d="m131 11-9 9v69l9 9 9-9V20l-9-9Z"
        fill={segmentColor('b')}
        filter={filter('b')}
      />
      <path
        d="m131 102-9 9v69l9 9 9-9v-69l-9-9Z"
        fill={segmentColor('c')}
        filter={filter('c')}
      />
      <path
        d="M19.112 18 10.5 9l8.612-9h101.776l8.612 9-8.612 9H19.112Z"
        fill={segmentColor('a')}
        filter={filter('a')}
      />
    </svg>
  );
}
