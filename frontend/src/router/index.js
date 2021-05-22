import { ControlPanel, Home, Login, Project } from '../views';

const router = {
    routes: [
        {
            path: '/',
            component: Home
        },
        {
            path: '/projects/:id',
            component: Project
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
