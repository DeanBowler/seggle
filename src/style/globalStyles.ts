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
  }
/* 
  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    opacity: 0.05;

    background-image: url(/images/bg.jpg);
    background-repeat: repeat;
    background-size: 420px;
    pointer-events: none;
  } */
  
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
