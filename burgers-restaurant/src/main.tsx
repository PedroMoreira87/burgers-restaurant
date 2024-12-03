import { StrictMode } from 'react';

import './index.scss';

import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import App from './App.tsx';
import i18n from './i18n.ts';
import store from './store';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  // </StrictMode>
);
