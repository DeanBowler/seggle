import styled from '@xstyled/styled-components';

export const Button = styled.buttonBox`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  user-select: none;
  font-size: lg;
  padding-top: 4;
  padding-bottom: 4;
  padding-left: 4;
  padding-right: 4;
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
