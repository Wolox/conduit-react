type SettingInputs = Record<
  string,
  {
    placeholder: string;
    type: string;
    isTextArea?: boolean;
    validations?: {
      [key: string]: {
        value: string | number | boolean | RegExp;
        message: string;
      };
    };
  }
>;

export const WHITE = '#FFF';

export const INPUTS: SettingInputs = {
  username: {
    placeholder: 'Settings:usernamePlaceholder',
    type: 'text',
    validations: {
      required: {
        value: true,
        message: 'Settings:usernameRequired'
      },
      pattern: { value: /^[a-zA-Z0-9]*$/, message: 'Settings:usernameInvalid' }
    }
  },
  bio: {
    placeholder: 'Settings:bioPlaceholder',
    type: 'text',
    isTextArea: true
  },
  email: {
    placeholder: 'Settings:emailPlaceholder',
    type: 'email',
    validations: {
      required: { value: true, message: 'Settings:emailRequired' },
      pattern: { value: /\S+@\S+\.\S+/, message: 'Settings:emailInvalid' }
    }
  },
  password: {
    placeholder: 'Settings:passwordPlaceholder',
    type: 'password',
    validations: {
      minLength: {
        value: 6,
        message: 'Settings:passwordLength'
      }
    }
  }
};
