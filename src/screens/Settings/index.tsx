import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import cn from 'classnames';

import { useSelector, useDispatch as useUserDispatch } from 'contexts/UserContext';
import { actionCreators as authActions } from 'contexts/UserContext/reducer';
import { UserProfile } from 'types/User';
import Layout from 'components/Layout';
import Button from 'components/Button';
import { removeCurrentUserToken } from 'services/AuthService';
import { SettingsParam, updateUser } from 'services/Settings';
import FormInput from 'components/FormInput';
import paths from 'components/Routes/paths';
import { BackError } from 'utils/types';

import styles from './styles.module.scss';
import { INPUTS } from './constants';

function Settings() {
  const history = useHistory();
  const { t } = useTranslation('Settings');
  const userDispatch = useUserDispatch();
  const user = useSelector((state) => state.user);
  const [backErrors, setBackErrors] = useState<BackError | undefined>({});

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { mutate, isLoading } = useMutation((params: SettingsParam) => updateUser(params), {
    onSettled: (data) => {
      if (data?.ok && data.data?.user) {
        userDispatch(authActions.setUser(data.data.user));
        history.push(paths.home);
      } else if (data?.data) {
        setBackErrors(data.data.errors);
      }
    }
  });

  const handleLogout = () => {
    userDispatch(authActions.resetUser());
    removeCurrentUserToken();
  };

  const onSubmit = handleSubmit((values: UserProfile) => {
    if (values.password === '') {
      delete values.password;
    }
    mutate({ user: values });
  });

  const hasErrors = (key: keyof UserProfile) => !!(backErrors?.[key as string] || errors[key]);

  return (
    <Layout>
      <div className={cn('full-width column center', styles.container)}>
        <h1 className={cn('m-bottom-2', styles.title)}>{t('yourSettings')}</h1>
        <div className={cn('half-width', styles.formContainer)}>
          <form className="column">
            {Object.entries(INPUTS).map(([key, input]) => {
              const inputKey = key as keyof UserProfile;

              return (
                <FormInput
                  key={key}
                  inputType={input.type}
                  className="full-width"
                  inputClassName={cn('full-width', styles.formInput, {
                    [styles.bio]: input.isTextArea,
                    [styles.inputError]: hasErrors(inputKey)
                  })}
                  errorClassName={hasErrors(inputKey) ? styles.error : styles.hideError}
                  error={errors[inputKey]?.message || (backErrors?.[key] && `${key} ${backErrors?.[key][0]}`)}
                  name={key}
                  placeholder={input.placeholder}
                  isTextarea={input.isTextArea}
                  defaultValue={user?.[key as keyof UserProfile]}
                  inputRef={register(input.validations || {})}
                  disabled={isLoading}
                />
              );
            })}
            <Button
              text={t('updateSettings')}
              onClickAction={onSubmit}
              disabled={isLoading}
              loading={isLoading}
              className={styles.updateBtn}
            />
          </form>
          <hr className={styles.divisor} />
          <Button text="Or click here to logout." onClickAction={handleLogout} className={styles.logoutBtn} />
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
