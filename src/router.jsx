import { createBrowserRouter } from 'react-router';

import Root from './modules/routes/root/Root';
import Login from './modules/routes/root/Login';
import Signup from './modules/routes/root/Signup';
import Error404 from './modules/routes/errors/Error404';

import rootLoader from './modules/utilities/loaders/rootLoader';
import signupAction from './modules/utilities/actions/signupAction';
import loginAction from './modules/utilities/actions/loginAction';

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
        action: loginAction,
    },
    {
        path: 'signup',
        element: <Signup />,
        errorElement: <Error404 />,
        action: signupAction,
    },
]);

export default router;
