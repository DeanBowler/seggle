import ReactDOM from 'react-dom';
import { App } from './App';
import { disableReactDevTools } from '@/utils/disableReactDevTools';

// import { registerSW } from 'virtual:pwa-register';

// if ('serviceWorker' in navigator) {
//   // && !/localhost/.test(window.location)) {
//   registerSW();
// }

if (import.meta.env.PROD) {
  disableReactDevTools();
}

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
