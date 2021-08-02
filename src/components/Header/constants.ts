import { faEdit, faCog, faUser, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import PATHS from 'components/Routes/paths';

const itemsMenu = [
  {
    text: 'Header:signIn',
    href: PATHS.login,
    isProtected: false,
    icon: faSignInAlt
  },
  {
    text: 'Header:signUp',
    href: PATHS.register,
    isProtected: false,
    icon: faUserPlus
  },
  {
    text: 'Header:profile',
    href: PATHS.profile,
    isProtected: true,
    icon: faUser
  },
  {
    text: 'Header:editor',
    href: PATHS.editor,
    isProtected: true,
    icon: faEdit
  },
  {
    text: 'Header:settings',
    href: PATHS.settings,
    isProtected: true,
    icon: faCog
  }
];

export default itemsMenu;
