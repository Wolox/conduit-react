/* eslint-disable complexity */
/* eslint-disable import/no-named-as-default */
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Spinner from 'react-spinkit';
import cn from 'classnames';

import { BackError } from 'utils/types';
import FormInput from 'components/FormInput';
import { FORM_TYPE } from 'screens/Authentication/constants';

import { ACTION_BY_TYPE, EMAIL_OR_PASSWORD, INPUTS, UserFormKeys, USERNAME, WHITE } from './constants';
import styles from './styles.module.scss';

interface Props {
  formSubmit: (values: UserFormKeys) => void;
  isLoading?: boolean;
  backErrors?: BackError;
  formType: FORM_TYPE;
}

function UserForm({ formSubmit, isLoading, backErrors, formType }: Props) {
  const { t } = useTranslation('UserForm');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserFormKeys>();

  const onSubmit = handleSubmit((values) => {
    formSubmit(values);
  });

  const hasErrors = (key: keyof UserFormKeys) =>
    backErrors?.[EMAIL_OR_PASSWORD] || backErrors?.[key as string] || errors[key];

  return (
    <form onSubmit={onSubmit} className="column center">
      {Object.entries(INPUTS).map(([key, value]) => {
        const inputKey = key as keyof UserFormKeys;
        if (formType === FORM_TYPE.LOGIN && key === USERNAME) {
          return null;
        }

        return (
          <FormInput
            key={key}
            className="m-bottom-3 full-width"
            inputClassName={cn('full-width', styles.formInput, {
              [styles.inputError]: hasErrors(inputKey)
            })}
            errorClassName={hasErrors(inputKey) ? styles.error : styles.hideError}
            showErrorWithoutText={!!backErrors?.[EMAIL_OR_PASSWORD]}
            error={errors[inputKey]?.message || (backErrors?.[key] && `${key} ${backErrors?.[key][0]}`)}
            placeholder={t(value.placeholder)}
            inputRef={register(formType === FORM_TYPE.REGISTER ? value.validations : {})}
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
          t(`Auth:${ACTION_BY_TYPE[formType]}`)
        )}
      </button>
    </form>
  );
}

export default UserForm;
