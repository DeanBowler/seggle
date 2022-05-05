import { Pin } from '@/types/pin';
import { SegmentValue } from '@/types/segment';

export const characterMap: Record<string, Pin[]> = {
  '0': ['a', 'b', 'c', 'd', 'e', 'f', 'm', 'j'],
  '1': ['b', 'c'],
  '2': ['a', 'b', 'g1', 'g2', 'e', 'd'],
  '3': ['a', 'b', 'c', 'd', 'g1'],
  '4': ['f', 'g1', 'g2', 'b', 'c'],
  '5': ['a', 'f', 'g1', 'g2', 'c', 'd'],
  '6': ['a', 'f', 'g1', 'g2', 'c', 'd', 'e'],
  '7': ['a', 'b', 'c'],
  '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g1', 'g2'],
  '9': ['a', 'b', 'c', 'd', 'f', 'g1', 'g2'],
  A: ['a', 'b', 'c', 'e', 'f', 'g1', 'g2'],
  B: ['a', 'b', 'c', 'd', 'g2', 'i', 'l'],
  C: ['a', 'f', 'e', 'd'],
  D: ['a', 'b', 'c', 'd', 'i', 'l'],
  E: ['a', 'f', 'g1', 'g2', 'e', 'd'],
  F: ['a', 'f', 'g1', 'e'],
  G: ['a', 'f', 'g2', 'c', 'd', 'e'],
  H: ['b', 'c', 'e', 'f', 'g1', 'g2'],
  I: ['a', 'd', 'i', 'l'],
  J: ['b', 'c', 'd', 'e'],
  K: ['f', 'e', 'g1', 'j', 'm'],
  L: ['f', 'e', 'd'],
  M: ['b', 'c', 'e', 'f', 'j', 'h'],
  N: ['b', 'c', 'e', 'f', 'h', 'm'],
  O: ['a', 'b', 'c', 'd', 'e', 'f'],
  P: ['a', 'b', 'f', 'e', 'g1', 'g2'],
  Q: ['a', 'b', 'c', 'd', 'e', 'f', 'm'],
  R: ['a', 'b', 'f', 'e', 'g1', 'g2', 'm'],
  S: ['a', 'f', 'g1', 'g2', 'c', 'd'],
  T: ['a', 'i', 'l'],
  U: ['b', 'c', 'd', 'e', 'f'],
  V: ['f', 'e', 'k', 'j'],
  W: ['b', 'c', 'e', 'f', 'k', 'm'],
  X: ['h', 'j', 'k', 'm'],
  Y: ['h', 'j', 'l'],
  Z: ['a', 'd', 'j', 'k'],
};

export const getPins = (character: string, value: SegmentValue = SegmentValue.Pending) =>
  characterMap[character]?.reduce(
    (acc, char) => ({
      [char]: value,
      ...acc,
    }),
    {},
  ) ?? {};

export const guessCharacter = (guess: string, answer: string) => {
  const guessPins = characterMap[guess];
  const answerPins = characterMap[answer];

  const allCorrect = guess === answer;

  return guessPins.reduce(
    (acc, char) => ({
      [char]: allCorrect
        ? SegmentValue.Correct
        : answerPins?.includes(char)
        ? SegmentValue.Partial
        : SegmentValue.Incorrect,
      ...acc,
    }),
    {} as Record<Pin, SegmentValue>,
  );
};
