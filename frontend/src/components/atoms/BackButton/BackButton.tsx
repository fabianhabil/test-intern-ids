import { Icons } from '@/components/icons/icons';
import { Button } from '@/components/ui/button/button';
import Link from 'next/link';

interface BackButtonType {
    href: string;
}

const BackButton = ({ href }: BackButtonType) => {
    return (
        <>
            <Link href={href}>
                <Button variant={'ghost'}>
                    <Icons.back />
                </Button>
            </Link>
        </>
    );
};

export default BackButton;
