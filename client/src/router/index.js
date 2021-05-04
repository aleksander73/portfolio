import { ControlPanel, Home, Login } from '../views';

const router = {
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/admin',
            component: Login
        },
        {
            path: '/control-panel',
            component: ControlPanel
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
};

export default router;
