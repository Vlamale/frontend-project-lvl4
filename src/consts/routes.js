import AuthPage from '../pages/SignInPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import SignUpPage from '../pages/SignUpPage.jsx';
import routesPath from './routesPath.js';

const authRoutes = [
  {
    path: routesPath.main,
    Component: ChatPage,
  },
];

const publicRoutes = [
  {
    path: routesPath.main,
    redirectTo: routesPath.login,
    Component: AuthPage,
  },
  {
    path: routesPath.login,
    Component: AuthPage,
  },
  {
    path: routesPath.signUp,
    Component: SignUpPage,
  },
];

export {
  authRoutes,
  publicRoutes,
};
