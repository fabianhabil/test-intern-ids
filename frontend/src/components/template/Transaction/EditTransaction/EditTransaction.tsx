'use client';

import api from '@/api/axios-instance';
import BackButton from '@/components/atoms/BackButton/BackButton';
import LoadingIcon from '@/components/atoms/LoadingIcon/LoadingIcon';
import { Button } from '@/components/ui/button/button';
import { Calendar } from '@/components/ui/calendar/calendar';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select/select';
import { useToast } from '@/components/ui/toast/use-toast';
import type { Item, Status, Transaction } from '@/types/data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditTransaction = ({ params }: { params: string }) => {
    const [item, setItem] = useState<Item[]>([]);
    const [status, setStatus] = useState<Status[]>([]);
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(true);

    const getTransaction = async () => {
        try {
            const response = await api.get(`/transaction/${params}`);
            if (response) {
                setTransaction(() => response.data.data);
                setTransaction((state) => ({
                    ...state!,
                    productID: response.data.data.item.productID,
                    statusID: response.data.data.status.id
                }));
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

    const getItem = async () => {
        try {
            const response = await api.get('/item');
            if (response) {
                setItem(() => response.data.data);
                setLoading(() => false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getStatus = async () => {
        try {
            const response = await api.get('/status');
            if (response) {
                setStatus(() => response.data.data);
                setLoading(() => false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (params) {
            getItem();
            getStatus();
            getTransaction();
        }
    }, [params]);

    const onSubmit = async () => {
        if (
            transaction?.amount === 0 ||
            !transaction?.createBy ||
            !transaction?.customerName ||
            !transaction?.productID ||
            transaction?.statusID === 0
        ) {
            toast({
                title: 'Please fill all the fields and make sure its valid!',
                variant: 'destructive'
            });
            return;
        }

        try {
            const response = await api.put(`/transaction/${params}`, {
                ...transaction
            });

            if (response) {
                toast({ title: 'Transaction Updated' });
                router.push('/transaction');
            }
        } catch (e: any) {
            const title: string = 'Server Error';
            toast({
                title,
                variant: 'destructive'
            });
        }
    };

    return (
        <>
            <div className='container flex min-h-screen flex-col justify-center gap-6 py-8'>
                <div className='flex flex-row items-center'>
                    <BackButton href='/transaction' />
                    <p className='text-xl md:text-3xl'>Edit Transaction</p>
                </div>
                {loading ? (
                    <div className='mx-auto flex justify-center'>
                        <LoadingIcon />
                    </div>
                ) : (
                    <div className='flex flex-col gap-6 px-6'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='amount'>Amount</Label>
                            <Input
                                type='number'
                                id='amount'
                                placeholder='Amount'
                                value={transaction?.amount}
                                onChange={(e) =>
                                    setTransaction((state) => ({
                                        ...state!,
                                        amount: Number(e.target.value)
                                    }))
                                }
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='createBy'>Created By</Label>
                            <Input
                                type='text'
                                id='createBy'
                                placeholder='Created By'
                                value={transaction?.createBy}
                                onChange={(e) =>
                                    setTransaction((state) => ({
                                        ...state!,
                                        createBy: e.target.value
                                    }))
                                }
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='customerName'>Customer Name</Label>
                            <Input
                                type='text'
                                id='customerName'
                                placeholder='Customer Name'
                                value={transaction?.customerName}
                                onChange={(e) =>
                                    setTransaction((state) => ({
                                        ...state!,
                                        customerName: e.target.value
                                    }))
                                }
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='transactionDate'>
                                Transaction Date
                            </Label>
                            <Calendar
                                mode='single'
                                selected={transaction?.transactionDate as Date}
                                onSelect={(e) =>
                                    setTransaction((state) => ({
                                        ...state!,
                                        transactionDate: e as Date
                                    }))
                                }
                                className='rounded-md border'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='createBy'>Product</Label>
                            <Select
                                value={transaction?.productID!}
                                onValueChange={(e) => {
                                    setTransaction((state) => ({
                                        ...state!,
                                        productID: e
                                    }));
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Choose Product' />
                                </SelectTrigger>
                                <SelectContent>
                                    {item.map((data, index) => {
                                        return (
                                            <SelectItem
                                                value={data.productID}
                                                key={index + 500}
                                            >
                                                {data.productName}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='createBy'>Status</Label>
                            <Select
                                value={
                                    transaction?.statusID!
                                        ? `${transaction?.statusID!}`
                                        : ''
                                }
                                onValueChange={(e) => {
                                    setTransaction((state) => ({
                                        ...state!,
                                        statusID: Number(e)
                                    }));
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder='Choose Status' />
                                </SelectTrigger>
                                <SelectContent>
                                    {status.map((data, index) => {
                                        return (
                                            <SelectItem
                                                value={`${data.id}`}
                                                key={index}
                                            >
                                                {data.name}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={onSubmit}>
                            Edit Transaction
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default EditTransaction;
