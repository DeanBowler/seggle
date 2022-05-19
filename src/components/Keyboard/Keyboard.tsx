import styled, { x } from '@xstyled/styled-components';

import { FiDelete } from 'react-icons/fi';

import { useKeyPress } from '@/hooks/useKeyPress';
import { Button } from '../Button';

interface KeyboardProps {
  onCharacter(guess: string): void;
  onBackspace(): void;
  onEnter(): void;
}

export function Keyboard({ onCharacter, onBackspace, onEnter }: KeyboardProps) {
  useKeyPress(e => {
    if (e.key === 'Backspace') {
      onBackspace();
    } else if (e.key === 'Enter') {
      onEnter();
    } else if (/^[a-z]$/i.test(e.key)) {
      onCharacter(e.key.toLocaleUpperCase());
    }
  });

  return (
    <x.div>
      <x.div row justifyContent="center" flexWrap="nowrap">
        <Key onClick={() => onCharacter('Q')}>Q</Key>
        <Key onClick={() => onCharacter('W')}>W</Key>
        <Key onClick={() => onCharacter('E')}>E</Key>
        <Key onClick={() => onCharacter('R')}>R</Key>
        <Key onClick={() => onCharacter('T')}>T</Key>
        <Key onClick={() => onCharacter('Y')}>Y</Key>
        <Key onClick={() => onCharacter('U')}>U</Key>
        <Key onClick={() => onCharacter('I')}>I</Key>
        <Key onClick={() => onCharacter('O')}>O</Key>
        <Key onClick={() => onCharacter('P')}>P</Key>
      </x.div>
      <x.div row justifyContent="center" flexWrap="nowrap">
        <x.div flex="0.5" />
        <Key onClick={() => onCharacter('A')}>A</Key>
        <Key onClick={() => onCharacter('S')}>S</Key>
        <Key onClick={() => onCharacter('D')}>D</Key>
        <Key onClick={() => onCharacter('F')}>F</Key>
        <Key onClick={() => onCharacter('G')}>G</Key>
        <Key onClick={() => onCharacter('H')}>H</Key>
        <Key onClick={() => onCharacter('J')}>J</Key>
        <Key onClick={() => onCharacter('K')}>K</Key>
        <Key onClick={() => onCharacter('L')}>L</Key>
        <x.div flex="0.5" />
      </x.div>
      <x.div row justifyContent="center" flexWrap="nowrap">
        <Key flex="1.5" onClick={() => onEnter()} fontSize={{ xs: 'default', sm: 'lg' }}>
          Enter
        </Key>
        <Key onClick={() => onCharacter('Z')}>Z</Key>
        <Key onClick={() => onCharacter('X')}>X</Key>
        <Key onClick={() => onCharacter('C')}>C</Key>
        <Key onClick={() => onCharacter('V')}>V</Key>
        <Key onClick={() => onCharacter('B')}>B</Key>
        <Key onClick={() => onCharacter('N')}>N</Key>
        <Key onClick={() => onCharacter('M')}>M</Key>
        <Key flex="1.5" onClick={() => onBackspace()}>
          <FiDelete size="1.5rem" />
        </Key>
      </x.div>
    </x.div>
  );
}

const Key = styled(Button)`
  flex: 1;
  padding-left: 1;
  padding-right: 1;
  margin: 1;
`;
