import { isExplainerOpenAtom } from '@/state/atoms';
import { x } from '@xstyled/styled-components';
import { useSetAtom } from 'jotai';

import { FaQuestion } from 'react-icons/fa';
import { SegmentDisplay } from '../SegmentDisplay';
import { SegmentString } from '../SegmentString';

export function Header() {
  const openExplainer = useSetAtom(isExplainerOpenAtom);

  return (
    <x.div background="hsla(0,0%,0%,25%)">
      <x.div
        color="hsla(0,0%,100%,85%)"
        maxWidth="560px"
        m="0 auto"
        px={2}
        my={{
          xs: 2,
          md: 3,
        }}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        userSelect="none"
      >
        <x.div fontFamily="DSEG14" fontSize="3xl">
          <SegmentString text="SEGGLE" width="167px" />
        </x.div>
        <x.button
          onClick={() => openExplainer(true)}
          borderRadius="3xl"
          border="2px solid white"
          background="none"
          color="white"
          p={2}
        >
          <FaQuestion />
        </x.button>
      </x.div>
    </x.div>
  );
}
