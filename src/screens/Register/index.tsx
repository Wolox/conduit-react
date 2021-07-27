import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { signup } from 'services/AuthService';
import UserForm from 'components/UserForm';
import { UserFormKeys } from 'components/UserForm/constants';

import styles from './styles.module.scss';

function Register() {
  const { t } = useTranslation('Register');

  const onSubmit = (values: UserFormKeys) => {
    const params = {
      user: values
    };

    signup(params);
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
