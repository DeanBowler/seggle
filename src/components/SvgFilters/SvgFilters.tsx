export const ABBERATION_FILTER = 'abberation';

export const SvgFilterDefinitions = () => (
  <svg width="0" height="0">
    <defs>
      <filter id={ABBERATION_FILTER}>
        <feColorMatrix
          type="matrix"
          result="red_"
          values="4 0 0 0 0
            0 0 0 0 0 
            0 0 0 0 0 
            0 0 0 1 0"
        />
        <feOffset in="red_" dx="2" dy="-2" result="red">
          <animate
            attributeName="dy"
            values="-3;-0"
            dur="500ms"
            repeatCount="indefinite"
          />
          <animate
            attributeName="dx"
            values="3;0;3"
            dur="500ms"
            repeatCount="indefinite"
          />
        </feOffset>
        <feColorMatrix
          type="matrix"
          in="SourceGraphic"
          result="blue_"
          values="0 0 0 0 0
            0 3 0 0 0 
            0 0 10 0 0 
            0 0 0 1 0"
        />
        <feOffset in="blue_" dx="-2" dy="2" result="blue" dur="1s">
          <animate
            attributeName="dx"
            values="-3;-0"
            dur="500ms"
            repeatCount="indefinite"
          />
          <animate attributeName="dy" values="3;0" dur="500ms" repeatCount="indefinite" />
        </feOffset>
        <feBlend mode="screen" in="red" in2="blue" />
      </filter>
    </defs>
  </svg>
);
