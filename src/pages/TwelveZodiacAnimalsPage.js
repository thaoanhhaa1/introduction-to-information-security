import React, { useEffect } from 'react';
import ContentGroup from '~/components/ContentGroup';
import TwelveZodiacAnimalsDecrypt from '~/components/TwelveZodiacAnimalsDecrypt/TwelveZodiacAnimalsDecrypt';
import TwelveZodiacAnimalsEncrypt from '~/components/TwelveZodiacAnimalsEncrypt';

const TwelveZodiacAnimalsPage = () => {
    useEffect(() => {
        document.title = 'Mật mã 12 con giáp';
    }, []);

    return (
        <ContentGroup>
            <TwelveZodiacAnimalsEncrypt />
            <TwelveZodiacAnimalsDecrypt />
        </ContentGroup>
    );
};

export default TwelveZodiacAnimalsPage;
