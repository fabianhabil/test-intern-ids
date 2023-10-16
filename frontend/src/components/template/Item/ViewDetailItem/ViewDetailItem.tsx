'use client';

import api from '@/api/axios-instance';
import BackButton from '@/components/atoms/BackButton/BackButton';
import LoadingIcon from '@/components/atoms/LoadingIcon/LoadingIcon';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/toast/use-toast';
import type { Item } from '@/types/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ViewDetailItem = ({ params }: { params: string }) => {
    const [item, setItem] = useState<Item | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(true);

    const getItem = async () => {
        try {
            const response = await api.get(`/item/${params}`);
            if (response) {
                setItem(() => response.data.data);
                setLoading(() => false);
            }
        } catch (e: any) {
            let title: string;
            if (e.response.status === 404) {
                title = 'Product not found!';
            } else {
                title = 'Server Error';
            }
            toast({ title, variant: 'destructive' });
            router.push('/item');
        }
    };

    useEffect(() => {
        if (params) {
            getItem();
        }
    }, [params]);

    return (
        <>
            <div className='container flex min-h-screen flex-col justify-center gap-8'>
                <div className='flex flex-row items-center'>
                    <BackButton href='/item' />
                    <p className='text-xl md:text-3xl'>Product Details</p>
                </div>
                {loading ? (
                    <div className='mx-auto flex justify-center'>
                        <LoadingIcon />
                    </div>
                ) : (
                    <div className='flex flex-col items-center gap-4'>
                        <p className='text-lg md:text-2xl'>
                            Product ID : {item!.productID}
                        </p>
                        <p className='text-lg md:text-2xl'>
                            Product Name : {item!.productName}
                        </p>
                        <Link href={`/item/${item?.productID}/edit`}>
                            <Button className='w-[150px]'>Edit Product</Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewDetailItem;
