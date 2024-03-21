import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import enTranslations from '@shopify/polaris/locales/en.json';
import reportWebVitals from './reportWebVitals';
import { AppProvider, Page, Layout } from '@shopify/polaris';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const i18n = {
  ...enTranslations, // Use English translations as base
  Polaris: {
    ...(enTranslations.Polaris || {}),
  },
};
root.render(
  <React.StrictMode>
    <AppProvider i18n={i18n}>
      <Page>
        <Layout>
          <App />
        </Layout>
      </Page>
    </AppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
