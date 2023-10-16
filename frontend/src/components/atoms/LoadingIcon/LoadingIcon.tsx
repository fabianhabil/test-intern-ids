import Image from 'next/image';

const LoadingIcon = () => {
    return (
        <>
            <Image src='/loading.svg' width={50} height={50} alt='loading' />
        </>
    );
};

export default LoadingIcon;
