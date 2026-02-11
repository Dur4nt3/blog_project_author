import { createBrowserRouter } from 'react-router';

import Root from './modules/routes/root/Root';
import Login from './modules/routes/root/Login';
import Signup from './modules/routes/root/Signup';
import CreateArticle from './modules/routes/new/CreateArticle';
import Error404 from './modules/routes/errors/Error404';

import rootLoader from './modules/utilities/loaders/rootLoader';
import loginLoader from './modules/utilities/loaders/loginLoader';
import newLoader from './modules/utilities/loaders/newLoader';

import signupAction from './modules/utilities/actions/signupAction';
import loginAction from './modules/utilities/actions/loginAction';
import logoutAction from './modules/utilities/actions/logoutAction';

import newAction from './modules/utilities/actions/newAction';
import deleteAction from './modules/utilities/actions/deleteAction';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <Error404 />,
        loader: rootLoader,
    },
    {
        path: 'login',
        element: <Login />,
        errorElement: <Error404 />,
        loader: loginLoader,
        action: loginAction,
    },
    {
        path: 'signup',
        element: <Signup />,
        errorElement: <Error404 />,
        action: signupAction,
    },
    {
        path: '/new',
        element: <CreateArticle />,
        errorElement: <Error404 />,
        loader: newLoader,
        action: newAction,
    },
    {
        // Solely for handling DELETE requests
        // DO NOT ALLOW ANYTHING ELSE
        path: 'delete/:postId',
        element: <Error404 />,
        errorElement: <Error404 />,
        action: deleteAction,
    },
    {
        // Solely for handling DELETE requests
        // DO NOT ALLOW ANYTHING ELSE
        path: 'logout',
        element: <Error404 />,
        errorElement: <Error404 />,
        action: logoutAction,
    },
]);

export default router;
