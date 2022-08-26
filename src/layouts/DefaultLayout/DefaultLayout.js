import { useEffect, useState } from 'react';
import Header from '../components/Header';
import NavbarMobile from '../components/NavbarMobile';

const DefaultLayout = ({ children }) => {
    const [isShowNavbarMobile, setShowNavbarMobile] = useState(false);

    useEffect(() => {
        if (isShowNavbarMobile) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'overlay';
    }, [isShowNavbarMobile]);

    return (
        <div className="pb-20">
            <Header setShowNavbarMobile={setShowNavbarMobile} />
            <NavbarMobile
                setShowNavbarMobile={setShowNavbarMobile}
                isShow={isShowNavbarMobile}
            />
            <div>{children}</div>
        </div>
    );
};

export default DefaultLayout;
