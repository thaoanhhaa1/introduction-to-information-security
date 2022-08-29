import { useEffect } from 'react';
import Encrypt from '~/components/Encrypt';
import config from '~/config';

const HomePage = () => {
    useEffect(() => {
        document.title = 'Nhập môn an toàn thông tin';
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div
                className="w-full h-screen bg-center bg-cover"
                style={{ backgroundImage: 'url(banner.jpg)' }}
            ></div>
            <div className="max-w-5xl mx-auto px-4">
                <Encrypt navbar={config.classicalCryptographyList}>
                    Mã hóa cổ điển
                </Encrypt>
                <Encrypt>Mã hóa hiện đại</Encrypt>
            </div>
        </>
    );
};

export default HomePage;
