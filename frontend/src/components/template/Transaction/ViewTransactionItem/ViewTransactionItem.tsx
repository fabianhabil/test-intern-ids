'use client';

import api from '@/api/axios-instance';
import BackButton from '@/components/atoms/BackButton/BackButton';
import LoadingIcon from '@/components/atoms/LoadingIcon/LoadingIcon';
import { Button } from '@/components/ui/button/button';
import { useToast } from '@/components/ui/toast/use-toast';
import type { Transaction } from '@/types/data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ViewTransactionItem = ({ params }: { params: string }) => {
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(true);

    const getTransaction = async () => {
        try {
            const response = await api.get(`/transaction/${params}`);
            if (response) {
                setTransaction(() => response.data.data);
                setLoading(() => false);
            }
        } catch (e: any) {
            let title: string;
            if (e.response.status === 404) {
                title = 'Transaction not found!';
            } else {
                title = 'Server Error';
            }
            toast({ title, variant: 'destructive' });
            router.push('/transaction');
        }
    };

    useEffect(() => {
        if (params) {
            getTransaction();
        }
    }, [params]);

    return (
        <>
            <div className='container flex min-h-screen flex-col justify-center gap-8'>
                <div className='flex flex-row items-center'>
                    <BackButton href='/item' />
                    <p className='text-xl md:text-3xl'>Transaction Details</p>
                </div>
                {loading ? (
                    <div className='mx-auto flex justify-center'>
                        <LoadingIcon />
                    </div>
                ) : (
                    <div className='flex flex-col items-center gap-4'>
                        <p className='text-lg md:text-2xl'>
                            Status ID : {transaction!.id}
                        </p>
                        <p className='text-lg md:text-2xl'>
                            Created By : {transaction!.createBy}
                        </p>
                        <p className='text-lg md:text-2xl'>
                            Product Name : {transaction?.item?.productName}
                        </p>
                        <p className='text-lg md:text-2xl'>
                            Status : {transaction?.status?.name}
                        </p>

                        <p className='text-lg md:text-2xl'>
                            Transaction Date :{' '}
                            {new Date(
                                transaction?.transactionDate as Date
                            ).toLocaleDateString()}
                        </p>

                        <p className='text-lg md:text-2xl'>
                            Created At :{' '}
                            {new Date(
                                transaction?.track?.createOn as Date
                            ).toLocaleDateString()}
                        </p>

                        <Link href={`/transaction/${transaction?.id}/edit`}>
                            <Button className='w-[150px]'>
                                Edit Transaction
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewTransactionItem;
