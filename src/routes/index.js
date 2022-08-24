import config from '~/config';
import HomePage from '~/pages/HomePage';
import MatrixEncryptionPage from '~/pages/MatrixEncryptionPage';
import TwelveZodiacAnimalsPage from '~/pages/TwelveZodiacAnimalsPage';

const routes = [
    {
        path: config.routes.home,
        element: HomePage,
    },
    {
        path: config.routes.example1,
        element: MatrixEncryptionPage,
    },
    {
        path: config.routes.twelveZodiacAnimalsPage,
        element: TwelveZodiacAnimalsPage,
    },
];

export default routes;
