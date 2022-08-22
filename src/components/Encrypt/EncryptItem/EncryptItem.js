import { Link } from 'react-router-dom';
import { EncryptionIcon } from '~/components/Icons';

const EncryptItem = ({ item }) => {
    return (
        <Link
            className="flex gap-1 px-4 py-2 items-center hover:bg-text-5 hover:bg-opacity-20 hover:text-primary transition-all rounded-md"
            to={item.to}
        >
            <EncryptionIcon className="w-[14px] h-[14px]" />
            <span>{item.title}</span>
        </Link>
    );
};

export default EncryptItem;
