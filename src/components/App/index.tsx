import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import Routes from 'components/Routes';
import { withContextProvider, useDispatch as useUserDispatch } from 'contexts/UserContext';
import { actionCreators as authActions } from 'contexts/UserContext/reducer';
import {
  getCurrentUserToken,
  getUser,
  removeCurrentUserToken,
  setApiTokenHeader
} from 'services/AuthService';
import Loader from 'components/Loader';

import 'scss/application.scss';

function App() {
  const userDispatch = useUserDispatch();
  const [loading, setLoading] = useState(true);

  const { mutate } = useMutation(() => getUser(), {
    onSettled: (data) => {
      if (data?.data && data?.ok) {
        const {
          data: { user }
        } = data;
        if (user) {
          userDispatch(authActions.setUser(user));
          setLoading(false);
        }
      } else {
        removeCurrentUserToken();
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    const token = getCurrentUserToken();
    if (token) {
      setApiTokenHeader(token);
      mutate();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? <Loader /> : <Routes />;
}

export default withContextProvider(App);
