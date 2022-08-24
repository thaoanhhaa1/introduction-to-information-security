import React from 'react';
import ContentGroup from '~/components/ContentGroup';
import TwelveZodiacAnimalsDecrypt from '~/components/TwelveZodiacAnimalsDecrypt/TwelveZodiacAnimalsDecrypt';
import TwelveZodiacAnimalsEncrypt from '~/components/TwelveZodiacAnimalsEncrypt';

const TwelveZodiacAnimalsPage = () => {
    return (
        <ContentGroup>
            <TwelveZodiacAnimalsEncrypt />
            <TwelveZodiacAnimalsDecrypt />
        </ContentGroup>
    );
};

export default TwelveZodiacAnimalsPage;
