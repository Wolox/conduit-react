/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { useMutation } from 'react-query';

import { useSelector, useDispatch as useUserDispatch } from 'contexts/UserContext';
import { actionCreators as authActions } from 'contexts/UserContext/reducer';
import { getCurrentUserToken, getUser, setApiTokenHeader } from 'services/AuthService';

import Suspense from '../Suspense';

import { ROUTES } from './constants';
import RouteItem from './components/RouteItem';
import styles from './styles.module.scss';

function Routes() {
  const userDispatch = useUserDispatch();

  const { mutate } = useMutation(() => getUser(), {
    onSettled: (data) => {
      if (data?.data && data?.ok) {
        const {
          data: { user }
        } = data;
        if (user) {
          userDispatch(authActions.setUser(user));
        }
      }
    }
  });

  useEffect(() => {
    const token = getCurrentUserToken();
    if (token) {
      setApiTokenHeader(token);
      mutate();
    }
  }, []);

  const user = useSelector((state) => state.user);

  return (
    <Router>
      <div className={styles.container}>
        <Suspense>
          <Switch>
            {ROUTES.map(({ redirectTo, path, ...config }) => (
              <RouteItem key={path} path={path} redirectTo={redirectTo?.(user)} {...config} />
            ))}
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
}

export default Routes;
