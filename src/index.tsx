import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss';
import './styles/Header.scss';
import './styles/Banner.scss';
import './styles/Slots.scss';
import './styles/Profile.scss';
import './styles/RefferalSystem.scss';
import './styles/Deposit.scss';
import App from './App';
import { Provider } from 'react-redux/es/exports'
import { store } from './redux/store';
import './Translation/i18n'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

