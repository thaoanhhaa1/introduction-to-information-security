import config from '~/config';
import CaesarEncryptionPlusPage from '~/pages/CaesarEncryptionPlusPage';
import HomePage from '~/pages/HomePage';
import MaterialUIPage from '~/pages/MaterialUIPage';
import MatrixEncryptionPage from '~/pages/MatrixEncryptionPage';
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
        path: '/test',
        element: MaterialUIPage,
    },
];

export default routes;
