import AuthPage from "./pages/SignInPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"

const authRoutes = [
    {
        path: '/',
        Component: ChatPage
    }
]

const publicRoutes = [
    {
        path: '/',
        redirectTo: '/login',
        Component: AuthPage
    },
    {
        path: '/login',
        Component: AuthPage
    },
    {
        path: '/signup',
        Component: SignUpPage
    }
]

export {
    authRoutes,
    publicRoutes
}