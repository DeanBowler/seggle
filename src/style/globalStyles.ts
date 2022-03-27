import { createGlobalStyle } from '@xstyled/styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    background: hsl(150deg 10% 20%);
  }

  /* body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    opacity: 0.05;

    background-image: url(https://as1.ftcdn.net/v2/jpg/01/22/95/22/1000_F_122952203_z1vpAYhgva4HPIQPQTVP5mZIKKbSexNU.jpg);
    background-repeat: repeat;
    background-size: 50%;
    pointer-events: none;
  }
   */
  html, body, #app {
    height: 100%;
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
