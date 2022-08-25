const EncryptionResult = ({ encryptionResult, isEncryption = true }) => {
    return (
        <>
            {encryptionResult && (
                <div className="mt-6">
                    Chuỗi sau khi {isEncryption ? 'mã hóa' : 'giải mã'} là:{' '}
                    <strong>{encryptionResult}</strong>
                </div>
            )}
        </>
    );
};

export default EncryptionResult;
