import { useEffect } from 'react';
import ContentGroup from '~/components/ContentGroup';
import PlayfairDecrypt from '~/components/PlayfairDecrypt';
import PlayfairEncrypt from '~/components/PlayfairEncrypt';

const PlayfairPage = () => {
    useEffect(() => {
        document.title = 'Mật mã Playfair';
        window.scrollTo(0, 0);
    }, []);

    return (
        <ContentGroup>
            <PlayfairEncrypt />
            <PlayfairDecrypt />
        </ContentGroup>
    );
};

export default PlayfairPage;
