import { useEffect } from 'react';
import ContentGroup from '~/components/ContentGroup';
import MatrixDecrypt from '~/components/MatrixDecrypt';
import MatrixEncrypt from '~/components/MatrixEncrypt';

const MatrixEncryptionPage = () => {
    useEffect(() => {
        document.title = 'Nhập môn an toàn thông tin';
    }, []);

    return (
        <ContentGroup>
            <MatrixEncrypt />
            <MatrixDecrypt />
        </ContentGroup>
    );
};

export default MatrixEncryptionPage;
