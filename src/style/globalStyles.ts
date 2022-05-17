import { createGlobalStyle } from '@xstyled/styled-components';

export const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: 'DSEG14';
    font-style: normal;
    font-weight: 300;
    src: local(''),
          url('./fonts/DSEG14Classic-Regular.woff2') format('woff2')
  }

  body {
    background: hsl(150deg 15% 20%);
    
    background-image: linear-gradient(
  215deg,
  hsl(148deg 18% 19%) 0%,
  hsl(147deg 31% 17%) 17%,
  hsl(146deg 48% 15%) 54%,
  hsl(147deg 41% 16%) 77%,
  hsl(149deg 25% 18%) 90%,
  hsl(150deg 16% 20%) 97%,
  hsl(151deg 16% 22%) 100%,
  hsl(152deg 16% 23%) 100%
);
  }

  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    opacity: 0.5;

    background-image: url(/images/background-lighten.svg);
    background-repeat: repeat;
    pointer-events: none;
  }
  
  html, body, #app {
    height: 100%;
  }

  button {
    cursor: pointer;
    font-size: lg;
    background: transparent;
    color: white;
    border: 2px solid hsla(0, 0%, 100%, 0.9);
    padding: 2 3;
    border-radius: 4px;
    user-select: none;
  }

  html * {
    @media only screen and (min-device-width: 736px) {
      ::-webkit-scrollbar {
          width: 8px;
      }

      ::-webkit-scrollbar-track {
  /*       
          border-radius: 10px;
          
          background: rgba(0,0,0,0.15); */
      }

      ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: rgba(0,0,0,0.5);
      }
    }
  }
`;
