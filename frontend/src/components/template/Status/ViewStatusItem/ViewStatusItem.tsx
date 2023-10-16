'use client';

import api from '@/api/axios-instance';
import BackButton from '@/components/atoms/BackButton/BackButton';
import LoadingIcon from '@/components/atoms/LoadingIcon/LoadingIcon';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/toast/use-toast';
import type { Status } from '@/types/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ViewStatusItem = ({ params }: { params: string }) => {
    const [status, setStatus] = useState<Status | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(true);

    const getStatus = async () => {
        try {
            const response = await api.get(`/status/${params}`);
            if (response) {
                setStatus(() => response.data.data);
                setLoading(() => false);
            }
        } catch (e: any) {
            let title: string;
            if (e.response.status === 404) {
                title = 'Status not found!';
            } else {
                title = 'Server Error';
            }
            toast({ title, variant: 'destructive' });
            router.push('/status');
        }
    };

    useEffect(() => {
        if (params) {
            getStatus();
        }
    }, [params]);

    return (
        <>
            <div className='container flex min-h-screen flex-col justify-center gap-8'>
                <div className='flex flex-row items-center'>
                    <BackButton href='/item' />
                    <p className='text-xl md:text-3xl'>Status Details</p>
                </div>
                {loading ? (
                    <div className='mx-auto flex justify-center'>
                        <LoadingIcon />
                    </div>
                ) : (
                    <div className='flex flex-col items-center gap-4'>
                        <p className='text-lg md:text-2xl'>
                            Status ID : {status!.id}
                        </p>
                        <p className='text-lg md:text-2xl'>
                            Status Name : {status!.name}
                        </p>
                        <Link href={`/status/${status?.id}/edit`}>
                            <Button className='w-[150px]'>Edit Status</Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewStatusItem;
