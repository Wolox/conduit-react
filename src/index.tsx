import { StrictMode } from 'react';
import { render } from 'react-dom';
import { QueryClientProvider, QueryClient } from 'react-query';

import 'scss/application.scss';

import 'config/i18n';
import App from 'components/App';

import reportWebVitals from './reportWebVitals';

const renderApp = () => {
  const queryClient = new QueryClient();

  render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>,
    document.getElementById('root')
  );
};

// Render once
renderApp();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
