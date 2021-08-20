import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import cn from 'classnames';

import { setApiTokenHeader, setCurrentUserToken, signup } from 'services/AuthService';
import UserForm from 'components/UserForm';
import Layout from 'components/Layout';
import { UserFormKeys } from 'components/UserForm/constants';
import paths from 'components/Routes/paths';
import { useDispatch as useUserDispatch } from 'contexts/UserContext';
import { actionCreators as authActions } from 'contexts/UserContext/reducer';
import { BackError } from 'utils/types';

import styles from '../styles.module.scss';
import { FORM_TYPE } from '../constants';

function Register() {
  const { t } = useTranslation('Auth');
  const userDispatch = useUserDispatch();
  const [errors, setErrors] = useState<BackError | undefined>({});

  const { mutate, isLoading } = useMutation((params: { user: UserFormKeys }) => signup(params), {
    onSettled: (data) => {
      if (data?.data && data?.ok) {
        const {
          data: { user }
        } = data;
        if (user) {
          userDispatch(authActions.setUser(user));
          setApiTokenHeader(user.token);
          setCurrentUserToken(user.token);
        }
      } else if (data?.data) {
        setErrors(data.data.errors);
      }
    }
  });

  const onSubmit = (values: UserFormKeys) => {
    const params = {
      user: values
    };

    setErrors(undefined);
    mutate(params);
  };

  return (
    <Layout>
      <div className={`full-width column center ${styles.container}`}>
        <h1 className={`m-bottom-2 ${styles.title}`}>{t('signUp')}</h1>
        <Link to={paths.login} className={styles.linkToAccount}>
          {t('haveAccount')}
        </Link>
        <div className={cn('half-width', styles.formContainer)}>
          <UserForm
            formSubmit={onSubmit}
            isLoading={isLoading}
            backErrors={errors}
            formType={FORM_TYPE.REGISTER}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Register;
