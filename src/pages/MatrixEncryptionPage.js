import MatrixDecrypt from '~/components/MatrixDecrypt';
import MatrixEncrypt from '~/components/MatrixEncrypt';

const MatrixEncryptionPage = () => {
    return (
        <div className="flex flex-wrap gap-4 p-4 max-w-5xl w-full mx-auto mt-[var(--header-height)]">
            <MatrixEncrypt />
            <div className="w-[1px] bg-black"></div>
            <MatrixDecrypt />
        </div>
    );
};

export default MatrixEncryptionPage;
