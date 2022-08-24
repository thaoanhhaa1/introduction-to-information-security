import ContentGroup from '~/components/ContentGroup';
import MatrixDecrypt from '~/components/MatrixDecrypt';
import MatrixEncrypt from '~/components/MatrixEncrypt';

const MatrixEncryptionPage = () => {
    return (
        <ContentGroup>
            <MatrixEncrypt />
            <MatrixDecrypt />
        </ContentGroup>
    );
};

export default MatrixEncryptionPage;
