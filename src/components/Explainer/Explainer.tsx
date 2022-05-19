import { x, styled } from '@xstyled/styled-components';
import { useAtom } from 'jotai';

import { isExplainerOpenAtom } from '@/state/atoms';

import { CloseIcon } from '@/icons/CloseIcon';
import { Button } from '@/components/Button';
import { GuessRow } from '@/components/GuessRow';
import { InputRow } from '@/components/InputRow';

export function Explainer() {
  const [showExplainer, setShowExplainer] = useAtom(isExplainerOpenAtom);

  const handleClose = () => {
    setShowExplainer(false);
  };

  if (!showExplainer) {
    return null;
  }

  return (
    <Overlay>
      <x.div
        display="flex"
        flexDirection="column"
        flex="1 1 auto"
        margin={5}
        maxWidth="500px"
      >
        <x.header display="flex" justifyContent="space-between">
          <x.h1 fontSize="3xl">How to Play</x.h1>
          <Button borderRadius="3xl" p={1} onClick={handleClose} aria-label="Close help">
            <CloseIcon />
          </Button>
        </x.header>
        <x.main marginTop={5}>
          <x.div spaceY={3}>
            <p>
              Guess the <strong>SEGGLE</strong> as fast as you can
            </p>
            <p>Each guess must be a valid word.</p>
            <p>
              Characters are displayed as individual &quot;14 segment&quot; LED displays.
            </p>
            <p>
              After each guess, the color of the segments will change to show which
              segments of the display were a match.
            </p>
            <x.ul paddingTop={3}>
              <ReasonItem>
                <x.strong color="negative">Red</x.strong> segments means the correct
                answer does not use this segment.
              </ReasonItem>
              <ReasonItem>
                <x.strong color="warning">Orange</x.strong> segments shows that this
                segment is correct, but the character is not complete.
              </ReasonItem>
              <ReasonItem>
                <x.strong color="positive">Green</x.strong> segments display that this
                character is entirely correct!
              </ReasonItem>
            </x.ul>
          </x.div>
          <x.div marginTop={8} spaceY={3}>
            <x.h2 fontSize="2xl">Examples</x.h2>
            <x.article spaceY={3}>
              <x.div maxWidth="400px">
                <GuessRow answer="PRICKS" guess="STICKY" />
              </x.div>
              <x.ul paddingBottom={2}>
                <ReasonItem>Guesses I, C and K are complete &amp; correct.</ReasonItem>
                <ReasonItem>
                  S and T each have at least one &quot;segment&quot; of the display in the
                  correct place.
                </ReasonItem>
                <ReasonItem>Y has no segments in the correct place.</ReasonItem>
              </x.ul>
              <p>With the clues given, valid guesses for the 1st character are:</p>
              <x.div maxWidth="105px">
                <InputRow guess="PR" gameLength={2} />
              </x.div>
              <p>Whilst valid guesses for the 2nd character are:</p>
              <x.div maxWidth="450px">
                <InputRow guess="EFGOPQRSUZ" gameLength={10} />
              </x.div>
            </x.article>
          </x.div>
        </x.main>
      </x.div>
    </Overlay>
  );
}

const ReasonItem = styled.liBox`
  margin-left: 4;
  margin-bottom: 2;
  list-style: outside;
`;

const Overlay = styled.box`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  overflow: auto;
  background: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(1.5em);
  color: white;
`;
