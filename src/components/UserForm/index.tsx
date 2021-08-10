/* eslint-disable import/no-named-as-default */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-spinkit';
import cn from 'classnames';

import FormInput from 'components/FormInput';

import { INPUTS, UserFormKeys, WHITE } from './constants';
import styles from './styles.module.scss';

interface Props {
  formSubmit: (values: UserFormKeys) => void;
  isLoading?: boolean;
}

function UserForm({ formSubmit, isLoading }: Props) {
  const { t } = useTranslation('UserForm');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormKeys>();

  const onSubmit = handleSubmit((values) => {
    formSubmit(values);
  });

  return (
    <form onSubmit={onSubmit} className="column center">
      {Object.entries(INPUTS).map(([key, value]) => {
        const inputKey = key as keyof UserFormKeys;
        return (
          <FormInput
            key={key}
            className="m-bottom-3 full-width"
            inputClassName={cn('full-width', styles.formInput, {
              [styles.inputError]: errors[inputKey]
            })}
            errorClassName={errors[inputKey] ? styles.error : styles.hideError}
            error={errors[inputKey]?.message}
            placeholder={t(value.placeholder)}
            inputRef={register(value.validations)}
            name={key}
            inputType={value.type}
            disabled={isLoading}
          />
        );
      })}
      <button
        type="submit"
        className={cn(styles.signUpBtn, {
          [styles.disabledBtn]: isLoading
        })}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner name="circle" color={WHITE} className={styles.loaderBtn} fadeIn="half" />
        ) : (
          t('Register:signUp')
        )}
      </button>
    </form>
  );
}

export default UserForm;
