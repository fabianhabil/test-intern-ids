import Link from 'next/link';

export default function IndexPage() {
    return (
        <>
            <title>Test Intern ids.id - Fabian</title>
            <div className='flex min-h-screen flex-col items-center justify-center gap-4 md:flex-row'>
                <Link
                    href='/item'
                    className='text-center text-xl font-medium underline-offset-4 hover:underline'
                >
                    View Item Data
                </Link>
                <Link
                    href='/status'
                    className='text-center text-xl font-medium underline-offset-4 hover:underline'
                >
                    View Status Data
                </Link>
                <Link
                    href='/transaction'
                    className='text-center text-xl font-medium underline-offset-4 hover:underline'
                >
                    View Transaction Data
                </Link>
            </div>
        </>
    );
}
