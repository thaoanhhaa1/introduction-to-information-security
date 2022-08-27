import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import HeaderItem from '~/components/HeaderItem';
import { MenuIcon } from '~/components/Icons';
import Image from '~/components/Image';
import config from '~/config';

const Header = ({ setShowNavbarMobile }) => {
    return (
        <div className="fixed top-0 left-0 right-0 shadow-lg h-[var(--header-height)] z-[5] bg-white">
            <div className="flex justify-between items-center p-4 w-full max-w-5xl mx-auto">
                <Link className="block w-[150px]" to={config.routes.home}>
                    <Image src="/logo.png" alt="" />
                </Link>
                <div className="hidden sm:flex justify-between items-center">
                    <HeaderItem
                        navbar={config.classicalCryptographyList}
                        key={v4()}
                    >
                        Mã hóa cổ điển
                    </HeaderItem>
                    <HeaderItem key={v4()}>Mã hóa hiện đại</HeaderItem>
                </div>
                <button
                    onClick={() => setShowNavbarMobile(true)}
                    className="sm:hidden px-4 py-2 hover:bg-primary hover:bg-opacity-10 transition-all rounded-lg"
                >
                    <MenuIcon className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
};

export default Header;
