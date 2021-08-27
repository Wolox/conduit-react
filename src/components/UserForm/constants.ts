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
    placeholder: 'Username',
    type: 'text',
    validations: {
      required: {
        value: true,
        message: "Username is invalid can't be blank"
      },
      pattern: { value: /^[a-zA-Z0-9]*$/, message: 'Username is invalid' }
    }
  },
  [FormKeys.EMAIL]: {
    placeholder: 'Email',
    type: 'email',
    validations: {
      required: { value: true, message: "Email can't be blank" },
      pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' }
    }
  },
  [FormKeys.PASSWORD]: {
    placeholder: 'Password',
    type: 'password',
    validations: {
      required: { value: true, message: "Password can't be blank" },
      minLength: {
        value: 6,
        message: 'Password is too short (minimum is 6 characters)'
      }
    }
  }
};
