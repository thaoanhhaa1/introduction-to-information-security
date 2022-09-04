import config from '~/config';
import CaesarEncryptionPlusPage from '~/pages/CaesarEncryptionPlusPage';
import HomePage from '~/pages/HomePage';
import MatrixEncryptionPage from '~/pages/MatrixEncryptionPage';
import NotFoundPage from '~/pages/NotFoundPage';
import PlayfairPage from '~/pages/PlayfairPage';
import RailFenceCipherPage from '~/pages/RailFenceCipherPage';
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
    {
        path: config.routes.caesarEncryptionPlus,
        element: CaesarEncryptionPlusPage,
    },
    {
        path: config.routes.playFair,
        element: PlayfairPage,
    },
    {
        path: config.routes.railFenceCipher,
        element: RailFenceCipherPage,
    },
    {
        path: config.routes.notFoundPage,
        element: NotFoundPage,
    },
];

export default routes;
