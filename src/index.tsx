import ReactDOM from 'react-dom';
import { App } from './App';

import { registerSW } from 'virtual:pwa-register';

if ('serviceWorker' in navigator) {
  // && !/localhost/.test(window.location)) {
  registerSW();
}

const app = document.getElementById('app');
ReactDOM.render(<App />, app);
