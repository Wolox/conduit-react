import PATHS from 'components/Routes/paths';

const itemsMenu = [
  {
    text: 'Header:signIn',
    href: PATHS.login,
    isProtected: false
  },
  {
    text: 'Header:signUp',
    href: PATHS.register,
    isProtected: false
  },
  {
    text: 'Header:profile',
    href: PATHS.profile,
    isProtected: true
  }
];

export default itemsMenu;
