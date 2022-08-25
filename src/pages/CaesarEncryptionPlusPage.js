import CaesarEncryptionPlusDecrypt from '~/components/CaesarEncryptionPlusDecrypt';
import CaesarEncryptionPlusEncrypt from '~/components/CaesarEncryptionPlusEncrypt';
import ContentGroup from '~/components/ContentGroup';

const CaesarEncryptionPlusPage = () => {
    return (
        <ContentGroup>
            <CaesarEncryptionPlusEncrypt />
            <CaesarEncryptionPlusDecrypt />
        </ContentGroup>
    );
};

export default CaesarEncryptionPlusPage;
