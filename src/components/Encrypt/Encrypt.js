import { v4 } from 'uuid';
import config from '~/config';
import Heading from '../Heading';
import EncryptItem from './EncryptItem/EncryptItem';

const Encrypt = ({ children }) => {
    return (
        <div>
            <Heading className="mt-5">{children}</Heading>
            <div className="grid grid-cols-5 mt-3">
                {config.classicalCryptographyList.map((item) => (
                    <EncryptItem key={v4()} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Encrypt;
