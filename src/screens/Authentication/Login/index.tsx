import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import cn from 'classnames';

import { login, setApiTokenHeader, setCurrentUserToken } from 'services/AuthService';
import UserForm from 'components/UserForm';
import Layout from 'components/Layout';
import { UserFormKeys } from 'components/UserForm/constants';
import paths from 'components/Routes/paths';
import { useDispatch as useUserDispatch } from 'contexts/UserContext';
import { actionCreators as authActions } from 'contexts/UserContext/reducer';
import { BackError } from 'utils/types';

import { FORM_TYPE } from '../constants';
import styles from '../styles.module.scss';

function Register() {
  const { t } = useTranslation('Auth');
  const userDispatch = useUserDispatch();
  const [errors, setErrors] = useState<BackError | undefined>({});

  const { mutate, isLoading } = useMutation((params: { user: UserFormKeys }) => login(params), {
    onSettled: (data) => {
      if (data?.data && data?.ok) {
        const {
          data: { user }
        } = data;
        if (user) {
          userDispatch(
            authActions.setUser({
              ...user
            })
          );
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
        <h1 className={`m-bottom-2 ${styles.title}`}>{t('signIn')}</h1>
        <Link to={paths.register} className={styles.linkToAccount}>
          {t('needAccount')}
        </Link>
        <div className={cn('half-width', styles.formContainer)}>
          <ul className={styles.errorsList}>
            {errors &&
              Object.entries(errors).map(([key, value]) => (
                <li key={key} className={styles.errorsListItem}>
                  {`${key} ${value}`}
                </li>
              ))}
          </ul>
          <UserForm
            formSubmit={onSubmit}
            isLoading={isLoading}
            backErrors={errors}
            formType={FORM_TYPE.LOGIN}
          />
        </div>
      </div>
    </Layout>
  );
}

export default Register;
