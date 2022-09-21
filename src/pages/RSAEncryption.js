import ContentGroup from '~/components/ContentGroup';
import ContentItem from '~/components/ContentItem';
import KeyRSAEncryption from '~/components/KeyRSAEncryption';
import RSAEncoding from '~/components/RSAEncoding';

const RSAEncryption = () => {
    return (
        <ContentGroup>
            <ContentItem title="Tìm khóa">
                <KeyRSAEncryption />
            </ContentItem>

            <ContentItem title="Mã hóa RSA">
                <RSAEncoding />
            </ContentItem>
        </ContentGroup>
    );
};

export default RSAEncryption;
