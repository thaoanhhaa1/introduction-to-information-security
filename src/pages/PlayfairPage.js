import { useEffect } from 'react';
import PlayfairEncrypt from '~/components/PlayfairEncrypt';

const PlayfairPage = () => {
    useEffect(() => {
        document.title = 'Mật mã Playfair';
    }, []);

    return (
        <div className="max-w-[600px] w-full mx-auto px-4 pt-2 mt-[var(--header-height)]">
            <PlayfairEncrypt />
        </div>
    );
};

export default PlayfairPage;
