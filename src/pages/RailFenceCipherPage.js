import { useEffect } from 'react';
import ContentGroup from '~/components/ContentGroup';
import ContentItem from '~/components/ContentItem';
import RailFenceCipherV1Encrypt from '~/components/RailFenceCipherV1Encrypt';
import RailFenceCipherV2Encrypt from '~/components/RailFenceCipherV2Encrypt';

const RailFenceCipherPage = () => {
    useEffect(() => {
        document.title = 'Mã hàng rào sắt - Nhập môn an toàn thông tin';
    }, []);

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
