/* eslint-disable @typescript-eslint/naming-convention */
import { lazy } from 'react';

import { UserProfile } from 'types/User';

import PATHS from './paths';

const Home = lazy(() => import('screens/Dashboard'));
const EditorScreen = lazy(() => import('screens/EditorScreen'));
const Login = lazy(() => import('screens/Authentication/Login'));
const Register = lazy(() => import('screens/Authentication/Register'));
const Article = lazy(() => import('screens/Article'));
const Profile = lazy(() => import('screens/Profile'));
const Error = lazy(() => import('screens/Error'));
const Settings = lazy(() => import('screens/Settings'));
// Add imports for screens above (FOR GENERATORS, DO NOT REMOVE)

const MAIN_PUBLIC_PATH = PATHS.login;
const MAIN_PRIVATE_PATH = PATHS.home;

/* When adding routes, add them ABOVE the Home route
 * or it will redirect you to incorrect screens */
export const ROUTES = [
  // Leaving this as an example for then the Login screen exists
  {
    exact: true,
    path: PATHS.login,
    component: Login,
    title: 'Routes:loginTitle',
    description: 'Routes:loginDescription',
    redirectTo: (user: UserProfile | null) => (user ? MAIN_PRIVATE_PATH : undefined)
  },
  {
    exact: true,
    path: PATHS.register,
    component: Register,
    title: 'Routes:registerTitle',
    redirectTo: (user: UserProfile | null) => (user ? MAIN_PRIVATE_PATH : undefined)
  },
  {
    exact: true,
    path: PATHS.editor,
    component: EditorScreen,
    title: 'Routes:editorTitle',
    redirectTo: (user: UserProfile | null) => (user ? undefined : MAIN_PUBLIC_PATH)
  },
  {
    exact: false,
    path: PATHS.editorBySlug,
    component: EditorScreen,
    title: 'Routes:editorTitle',
    redirectTo: (user: UserProfile | null) => (user ? undefined : MAIN_PUBLIC_PATH)
  },
  {
    exact: true,
    path: PATHS.errorScreen,
    component: Error,
    title: 'Routes:error',
    redirectTo: (user: UserProfile | null) => (user ? undefined : MAIN_PUBLIC_PATH)
  },
  {
    path: PATHS.article,
    component: Article,
    title: 'Routes:articleTitle'
  },
  {
    exact: true,
    path: PATHS.profile,
    component: Profile,
    title: 'Routes:profileTitle'
  },
  {
    exact: true,
    path: PATHS.settings,
    component: Settings,
    title: 'Routes:settings',
    redirectTo: (user: UserProfile | null) => (user ? undefined : MAIN_PUBLIC_PATH)
  },
  {
    exact: false,
    path: PATHS.home,
    component: Home,
    title: 'Routes:homeTitle',
    description: 'Routes:homeDescription'
  }
];
