import { useEffect } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import 'scss/application.scss';
import { withContextProvider } from 'contexts/UserContext';
import Routes from 'components/Routes';
import { getCurrentUserToken } from 'services/AuthService';

function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    const token = getCurrentUserToken();
    if (token) {
      console.log('TOKEN', token);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default withContextProvider(App);
