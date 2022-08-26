import { v4 } from 'uuid';
import Heading from '../Heading';
import EncryptItem from './EncryptItem/EncryptItem';

const Encrypt = ({ children, navbar }) => {
    return (
        <div>
            <Heading className="mt-5">{children}</Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-3">
                {navbar &&
                    navbar.map((item) => (
                        <EncryptItem key={v4()} item={item} />
                    ))}
            </div>
        </div>
    );
};

export default Encrypt;
