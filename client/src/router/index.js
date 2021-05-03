import { Home, Login } from '../views';

const router = {
    routes: [
        {
            name: 'home',
            path: '/',
            component: Home
        },
        {
            name: 'login',
            path: '/admin',
            component: Login
        }
    ]
};

export default router;
