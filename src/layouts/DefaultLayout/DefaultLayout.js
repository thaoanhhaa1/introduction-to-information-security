import Header from '../components/Header';
import NavbarMobile from '../components/NavbarMobile';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <NavbarMobile />
            <div>{children}</div>
        </div>
    );
};

export default DefaultLayout;
