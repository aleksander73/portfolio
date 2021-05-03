import { ControlPanel, Home, Login } from '../views';

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
        },
        {
            name: 'control-panel',
            path: '/control-panel',
            component: ControlPanel
        }
    ]
};

export default router;
