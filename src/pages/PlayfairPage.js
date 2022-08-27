import { useEffect } from 'react';
import ContentGroup from '~/components/ContentGroup';
import PlayfairDecrypt from '~/components/PlayfairDecrypt';
import PlayfairEncrypt from '~/components/PlayfairEncrypt';

const PlayfairPage = () => {
    useEffect(() => {
        document.title = 'Mật mã Playfair';
    }, []);

    return (
        <ContentGroup>
            <PlayfairEncrypt />
            <PlayfairDecrypt />
        </ContentGroup>
    );
};

export default PlayfairPage;
