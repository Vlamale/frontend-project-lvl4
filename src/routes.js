import AuthPage from "./pages/AuthPage.jsx"

const authRoutes = [
    // {
    //     path: '/',
    //     Component: AuthWindow
    // }
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