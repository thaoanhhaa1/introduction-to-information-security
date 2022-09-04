import ContentGroup from '~/components/ContentGroup';
import ContentItem from '~/components/ContentItem';
import RailFenceCipherV1Encrypt from '~/components/RailFenceCipherV1Encrypt';
import RailFenceCipherV2Encrypt from '~/components/RailFenceCipherV2Encrypt';

const RailFenceCipherPage = () => {
    return (
        <ContentGroup>
            <ContentItem title="Mã hóa theo độ sâu">
                <RailFenceCipherV1Encrypt />
            </ContentItem>
            <ContentItem title="Mã hóa theo khóa">
                <RailFenceCipherV2Encrypt />
            </ContentItem>
        </ContentGroup>
    );
};

export default RailFenceCipherPage;
