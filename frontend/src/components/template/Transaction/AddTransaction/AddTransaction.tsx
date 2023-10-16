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
import type { Status, Item, Transaction } from '@/types/data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AddTransaction = () => {
    const [item, setItem] = useState<Item[]>([]);
    const [status, setStatus] = useState<Status[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [transactionData, setTransactionData] = useState<Transaction>({
        amount: 0,
        createBy: '',
        customerName: '',
        id: 0,
        transactionDate: new Date(),
        productID: '',
        statusID: 0
    });

    const router = useRouter();

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
        getItem();
        getStatus();
    }, []);

    const { toast } = useToast();

    const onSubmit = async () => {
        if (
            transactionData.amount === 0 ||
            !transactionData.createBy ||
            !transactionData.customerName ||
            !transactionData.productID ||
            transactionData.statusID === 0
        ) {
            toast({
                title: 'Please fill all the fields and make sure its valid!',
                variant: 'destructive'
            });
            return;
        }

        try {
            const response = await api.post('/transaction', {
                ...transactionData
            });

            if (response) {
                toast({ title: 'Transaction Created' });
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
                    <p className='text-xl md:text-3xl'>Add New Transaction</p>
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
                                onChange={(e) =>
                                    setTransactionData((state) => ({
                                        ...state,
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
                                onChange={(e) =>
                                    setTransactionData((state) => ({
                                        ...state,
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
                                onChange={(e) =>
                                    setTransactionData((state) => ({
                                        ...state,
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
                                selected={
                                    transactionData.transactionDate as Date
                                }
                                onSelect={(e) =>
                                    setTransactionData((state) => ({
                                        ...state,
                                        transactionDate: e as Date
                                    }))
                                }
                                className='rounded-md border'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='createBy'>Product</Label>
                            <Select
                                value={transactionData.productID!}
                                onValueChange={(e) => {
                                    setTransactionData((state) => ({
                                        ...state,
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
                                    transactionData.statusID!
                                        ? `${transactionData.statusID!}`
                                        : ''
                                }
                                onValueChange={(e) => {
                                    setTransactionData((state) => ({
                                        ...state,
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
                            Create New Transaction
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default AddTransaction;
