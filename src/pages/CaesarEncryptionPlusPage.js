import { useEffect } from 'react';
import CaesarEncryptionPlusDecrypt from '~/components/CaesarEncryptionPlusDecrypt';
import CaesarEncryptionPlusEncrypt from '~/components/CaesarEncryptionPlusEncrypt';
import ContentGroup from '~/components/ContentGroup';

const CaesarEncryptionPlusPage = () => {
    useEffect(() => {
        document.title = 'Mật mã Caesar';
        window.scrollTo(0, 0);
    }, []);

    return (
        <ContentGroup>
            <CaesarEncryptionPlusEncrypt />
            <CaesarEncryptionPlusDecrypt />
        </ContentGroup>
    );
};

export default CaesarEncryptionPlusPage;
