import i18next from 'i18next';

i18next.addResources('es', 'UserForm', {
  username: 'Usuario',
  usernameRequiredMessage: 'El nombre de usuario no puede estar en blanco',
  usernameInvalidMessage: 'El nombre de usuario es inválido',
  email: 'Email',
  emailRequiredMessage: 'El email no puede estas en blanco',
  emailInvalidMessage: 'El email es inválido',
  password: 'Contraseña',
  passwordRequiredMessage: 'La contraseña no puede estas en blanco',
  passwordLengthMessage: 'La contraseña es muy corta (mínimo debe tener 6 caracteres)'
});

i18next.addResources('en', 'UserForm', {
  username: 'Username',
  usernameRequiredMessage: "Username is invalid can't be blank",
  usernameInvalidMessage: 'Username is invalid',
  email: 'Email',
  emailRequiredMessage: "Email can't be blank",
  emailInvalidMessage: 'Email is invalid',
  password: 'Password',
  passwordRequiredMessage: "Password can't be blank",
  passwordLengthMessage: 'Password is too short (minimum is 6 characters)'
});
