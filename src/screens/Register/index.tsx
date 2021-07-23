import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import FormInput from 'components/FormInput';

import styles from './styles.module.scss';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

function Register() {
  const { t } = useTranslation('Register');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterForm>();

  const onSubmit = handleSubmit((data) => {
    console.log('[handle-submit]', data);
  });

  return (
    <div className={`full-width column center ${styles.container}`}>
      <h1 className={`m-bottom-2 ${styles.title}`}>{t('signUp')}</h1>
      <Link to="/login" className={styles.linkToAccount}>
        {t('haveAccount')}
      </Link>
      <div className="half-width">
        <form onSubmit={onSubmit} className="column center">
          <FormInput
            className="m-bottom-3 full-width"
            inputClassName={cn('full-width', styles.formInput, { [styles.inputError]: errors.username })}
            errorClassName={errors.username ? styles.error : styles.hideError}
            error={errors.username?.message}
            placeholder={t('username')}
            inputRef={register({
              required: { value: true, message: "Username is invalid can't be blank" },
              pattern: { value: /^[a-zA-Z0-9]*$/, message: 'Username is invalid' }
            })}
            name="username"
            inputType="text"
          />
          <FormInput
            className="m-bottom-3 full-width"
            inputClassName={cn('full-width', styles.formInput, { [styles.inputError]: errors.email })}
            errorClassName={errors.email ? styles.error : styles.hideError}
            error={errors.email?.message}
            placeholder={t('email')}
            inputRef={register({
              required: { value: true, message: "Email can't be blank" },
              pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' }
            })}
            name="email"
            inputType="email"
          />
          <FormInput
            className="m-bottom-3 full-width"
            inputClassName={cn('full-width', styles.formInput, { [styles.inputError]: errors.password })}
            errorClassName={errors.password ? styles.error : styles.hideError}
            error={errors.password?.message}
            placeholder={t('password')}
            inputRef={register({
              required: { value: true, message: "Password can't be blank" },
              minLength: { value: 6, message: 'Password is too short (minimum is 6 characters)' }
            })}
            name="password"
            inputType="password"
          />
          <button type="submit" className={styles.signUpBtn}>
            {t('signUp')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
