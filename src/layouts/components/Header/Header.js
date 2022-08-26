import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import HeaderItem from '~/components/HeaderItem';
import Image from '~/components/Image';
import config from '~/config';

const navHeader = [
    {
        title: 'Mã hóa cổ điển',
    },
    {
        title: 'Mã hóa hiện đại',
    },
];

const Header = () => {
    return (
        <div className="fixed top-0 left-0 right-0 shadow-lg h-[var(--header-height)] z-[5] bg-white">
            <div className="flex justify-between items-center p-4 w-full max-w-5xl mx-auto">
                <Link className="block w-[150px]" to={config.routes.home}>
                    <Image src="/logo.png" alt="" />
                </Link>
                <div className="flex justify-between items-center">
                    <HeaderItem
                        navbar={config.classicalCryptographyList}
                        key={v4()}
                    >
                        Mã hóa cổ điển
                    </HeaderItem>
                    <HeaderItem key={v4()}>Mã hóa hiện đại</HeaderItem>
                </div>
            </div>
        </div>
    );
};

export default Header;
