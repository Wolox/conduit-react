import { QueryClientProvider, QueryClient } from 'react-query';

import { withContextProvider } from 'contexts/UserContext';
import Routes from 'components/Routes';
import 'scss/application.scss';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default withContextProvider(App);
