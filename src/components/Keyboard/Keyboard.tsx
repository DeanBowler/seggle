import styled, { x } from '@xstyled/styled-components';

import { FiDelete } from 'react-icons/fi';

import { useKeyPress } from '@/hooks/useKeyPress';

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
        <GuessButton onClick={() => onCharacter('Q')}>Q</GuessButton>
        <GuessButton onClick={() => onCharacter('W')}>W</GuessButton>
        <GuessButton onClick={() => onCharacter('E')}>E</GuessButton>
        <GuessButton onClick={() => onCharacter('R')}>R</GuessButton>
        <GuessButton onClick={() => onCharacter('T')}>T</GuessButton>
        <GuessButton onClick={() => onCharacter('Y')}>Y</GuessButton>
        <GuessButton onClick={() => onCharacter('U')}>U</GuessButton>
        <GuessButton onClick={() => onCharacter('I')}>I</GuessButton>
        <GuessButton onClick={() => onCharacter('O')}>O</GuessButton>
        <GuessButton onClick={() => onCharacter('P')}>P</GuessButton>
      </x.div>
      <x.div row justifyContent="center" flexWrap="nowrap">
        <x.div flex="0.5" />
        <GuessButton onClick={() => onCharacter('A')}>A</GuessButton>
        <GuessButton onClick={() => onCharacter('S')}>S</GuessButton>
        <GuessButton onClick={() => onCharacter('D')}>D</GuessButton>
        <GuessButton onClick={() => onCharacter('F')}>F</GuessButton>
        <GuessButton onClick={() => onCharacter('G')}>G</GuessButton>
        <GuessButton onClick={() => onCharacter('H')}>H</GuessButton>
        <GuessButton onClick={() => onCharacter('J')}>J</GuessButton>
        <GuessButton onClick={() => onCharacter('K')}>K</GuessButton>
        <GuessButton onClick={() => onCharacter('L')}>L</GuessButton>
        <x.div flex="0.5" />
      </x.div>
      <x.div row justifyContent="center" flexWrap="nowrap">
        <GuessButton
          flex="1.5"
          onClick={() => onEnter()}
          fontSize={{ xs: 'default', sm: 'lg' }}
        >
          Enter
        </GuessButton>
        <GuessButton onClick={() => onCharacter('Z')}>Z</GuessButton>
        <GuessButton onClick={() => onCharacter('X')}>X</GuessButton>
        <GuessButton onClick={() => onCharacter('C')}>C</GuessButton>
        <GuessButton onClick={() => onCharacter('V')}>V</GuessButton>
        <GuessButton onClick={() => onCharacter('B')}>B</GuessButton>
        <GuessButton onClick={() => onCharacter('N')}>N</GuessButton>
        <GuessButton onClick={() => onCharacter('M')}>M</GuessButton>
        <GuessButton flex="1.5" onClick={() => onBackspace()}>
          <FiDelete size="1.5rem" />
        </GuessButton>
      </x.div>
    </x.div>
  );
}

const GuessButton = styled.buttonBox`
  display: flex;
  align-items: center;
  justify-content: center;

  user-select: none;
  flex: 1;
  font-size: lg;
  margin: 1;
  padding-top: 4;
  padding-bottom: 4;
  padding-left: 0;
  padding-right: 0;
  border-radius: lg;

  border: 2px solid hsla(0, 0%, 100%, 0.75);
  background-color: transparent;
  color: hsla(0, 0%, 100%, 0.9);

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.1);
  }

  &:focus-visible {
    border-color: positive;
    outline: none;
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: translateY(2px);
  }
`;
