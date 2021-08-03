import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { setApiTokenHeader, setCurrentUserToken, signup } from 'services/AuthService';
import UserForm from 'components/UserForm';
import { UserFormKeys } from 'components/UserForm/constants';
import { useDispatch as useUserDispatch } from 'contexts/UserContext';
import { actionCreators as authActions } from 'contexts/UserContext/reducer';

import styles from './styles.module.scss';

function Register() {
  const { t } = useTranslation('Register');
  const userDispatch = useUserDispatch();

  const { mutate } = useMutation((params: { user: UserFormKeys }) => signup(params), {
    onSettled: (data) => {
      if (data?.data && data?.ok) {
        const {
          data: { user }
        } = data;
        userDispatch(
          authActions.setUser({
            user
          })
        );
        if (user.token) {
          setApiTokenHeader(user.token);
          setCurrentUserToken(user.token);
        }
      }
    }
  });

  const onSubmit = (values: UserFormKeys) => {
    const params = {
      user: values
    };

    mutate(params);
  };

  return (
    <div className={`full-width column center ${styles.container}`}>
      <h1 className={`m-bottom-2 ${styles.title}`}>{t('signUp')}</h1>
      <Link to="/login" className={styles.linkToAccount}>
        {t('haveAccount')}
      </Link>
      <div className="half-width">
        <UserForm formSubmit={onSubmit} />
      </div>
    </div>
  );
}

export default Register;
