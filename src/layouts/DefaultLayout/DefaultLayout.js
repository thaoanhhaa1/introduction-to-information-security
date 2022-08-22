import Header from '../components/Header';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div>{children}</div>
        </div>
    );
};

export default DefaultLayout;
