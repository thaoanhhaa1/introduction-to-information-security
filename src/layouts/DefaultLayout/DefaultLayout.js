import Header from '../components/Header';
import NavbarMobile from '../components/NavbarMobile';

const DefaultLayout = ({ children }) => {
    return (
        <div className="pb-20">
            <Header />
            <NavbarMobile />
            <div>{children}</div>
        </div>
    );
};

export default DefaultLayout;
