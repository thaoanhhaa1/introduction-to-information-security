import { Link, NavLink } from 'react-router-dom';
import { v4 } from 'uuid';
import Heading from '~/components/Heading';
import Image from '~/components/Image';
import config from '~/config';
import { classNames } from '~/utils';

const NavbarMobile = ({ isShow, setShowNavbarMobile }) => {
    const handleClickNavbar = (e) => {
        e.stopPropagation();
    };
    const handleClickModal = () => {
        setShowNavbarMobile(false);
    };

    return (
        <div
            onClick={handleClickModal}
            className={classNames(
                'fixed inset-0 bg-black bg-opacity-20 z-50 ease-linear duration-300 overflow-hidden',
                isShow ? '' : 'invisible opacity-0',
            )}
        >
            <div
                onClick={handleClickNavbar}
                className={classNames(
                    'absolute top-0 right-0 w-[80%] bottom-0 z-10 bg-white ease-linear duration-300',
                    isShow ? 'translate-x-0' : 'translate-x-full',
                )}
            >
                <Link
                    onClick={handleClickModal}
                    className="block m-4 w-[150px]"
                    to={config.routes.home}
                >
                    <Image src="/logo.png" alt="" />
                </Link>
                <div className="flex flex-col pt-4 px-4">
                    <Heading>Mã hóa cổ điển</Heading>
                    {config.classicalCryptographyList.map((item, index) => (
                        <NavLink
                            key={v4()}
                            className={({ isActive }) =>
                                classNames(
                                    'py-1 font-medium text-text-2 hover:text-primary transition-all',
                                    isActive ? 'text-primary' : '',
                                )
                            }
                            to={item.to}
                            onClick={handleClickModal}
                        >
                            {index + 1}. {item.title}
                        </NavLink>
                    ))}
                </div>
                <div className="pt-4 px-4">
                    <Heading>Mã hóa hiện đại</Heading>
                    {config.modernCryptography.map((item, index) => (
                        <NavLink
                            key={v4()}
                            className={({ isActive }) =>
                                classNames(
                                    'py-1 font-medium text-text-2 hover:text-primary transition-all',
                                    isActive ? 'text-primary' : '',
                                )
                            }
                            to={item.to}
                            onClick={handleClickModal}
                        >
                            {index + 1}. {item.title}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavbarMobile;
