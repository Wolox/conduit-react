export const WHITE = '#FFF';

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

export const INPUTS: InputsStructure = {
  username: {
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
  email: {
    placeholder: 'Email',
    type: 'email',
    validations: {
      required: { value: true, message: "Email can't be blank" },
      pattern: { value: /\S+@\S+\.\S+/, message: 'Email is invalid' }
    }
  },
  password: {
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
