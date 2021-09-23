import { FORM_TYPE } from 'screens/Authentication/constants';

export const WHITE = '#FFF';
export const EMAIL_OR_PASSWORD = 'email or password';

export const ACTION_BY_TYPE = {
  [FORM_TYPE.LOGIN]: 'signIn',
  [FORM_TYPE.REGISTER]: 'signUp'
};

export interface UserFormKeys {
  username: string;
  email: string;
  password: string;
}

interface InputSections {
  placeholder: string;
  type: string;
  validations: {
    [key: string]: {
      value: string | number | boolean | RegExp;
      message: string;
    };
  };
}

type InputsStructure = Record<keyof UserFormKeys, InputSections>;

export enum FormKeys {
  USERNAME = 'username',
  EMAIL = 'email',
  PASSWORD = 'password'
}

export const INPUTS: InputsStructure = {
  [FormKeys.USERNAME]: {
    placeholder: 'UserForm:username',
    type: 'text',
    validations: {
      required: {
        value: true,
        message: 'UserForm:usernameRequiredMessage'
      },
      pattern: { value: /^[a-zA-Z0-9]*$/, message: 'UserForm:usernameInvalidMessage' }
    }
  },
  [FormKeys.EMAIL]: {
    placeholder: 'UserForm:email',
    type: 'email',
    validations: {
      required: { value: true, message: 'UserForm:emailRequiredMessage' },
      pattern: { value: /\S+@\S+\.\S+/, message: 'UserForm:emailInvalidMessage' }
    }
  },
  [FormKeys.PASSWORD]: {
    placeholder: 'UserForm:password',
    type: 'password',
    validations: {
      required: { value: true, message: 'UserForm:passwordRequiredMessage' },
      minLength: {
        value: 6,
        message: 'UserForm:passwordLengthMessage'
      }
    }
  }
};
