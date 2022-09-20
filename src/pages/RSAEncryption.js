import ContentGroup from '~/components/ContentGroup';
import ContentItem from '~/components/ContentItem';
import KeyRSAEncryption from '~/components/KeyRSAEncryption';

const RSAEncryption = () => {
    return (
        <ContentGroup>
            <ContentItem title="Tìm khóa">
                <KeyRSAEncryption />
            </ContentItem>

            <ContentItem title="Mã hóa RSA"></ContentItem>
        </ContentGroup>
    );
};

export default RSAEncryption;
