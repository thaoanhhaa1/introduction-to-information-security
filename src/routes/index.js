import config from '~/config';
import HomePage from '~/pages/HomePage';
import MatrixEncryptionPage from '~/pages/MatrixEncryptionPage';

const routes = [
    {
        path: config.routes.home,
        element: HomePage,
    },
    {
        path: config.routes.example1,
        element: MatrixEncryptionPage,
    },
];

export default routes;
