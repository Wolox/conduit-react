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
  image: {
    placeholder: 'URL of profile picture',
    type: 'text'
  },
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
  bio: {
    placeholder: 'Short bio about you',
    type: 'text',
    isTextArea: true
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
    placeholder: 'New Password',
    type: 'password',
    validations: {
      minLength: {
        value: 6,
        message: 'Password is too short (minimum is 6 characters)'
      }
    }
  }
};
