import { useEffect } from 'react';
import Encrypt from '~/components/Encrypt';

const HomePage = () => {
    useEffect(() => {
        document.title = 'Nhập môn an toàn thông tin';
    }, []);

    return (
        <>
            <div
                className="w-full h-screen bg-center bg-cover"
                style={{ backgroundImage: 'url(banner.jpg)' }}
            ></div>
            <div className="max-w-5xl mx-auto px-4">
                <Encrypt>Mã hóa cổ điển</Encrypt>
                <Encrypt>Mã hóa hiện đại</Encrypt>
            </div>
        </>
    );
};

export default HomePage;
