import AuthPage from "./pages/AuthPage.jsx"
import ChatPage from "./pages/ChatPage.jsx"

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
    }
]

export {
    authRoutes,
    publicRoutes
}