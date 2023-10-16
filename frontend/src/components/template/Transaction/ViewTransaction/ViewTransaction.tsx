'use client';

import api from '@/api/axios-instance';
import BackButton from '@/components/atoms/BackButton/BackButton';
import LoadingIcon from '@/components/atoms/LoadingIcon/LoadingIcon';
import { Icons } from '@/components/icons/icons';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog/alert-dialog';
import { Button } from '@/components/ui/button/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table/table';
import { useToast } from '@/components/ui/toast/use-toast';
import type { Transaction } from '@/types/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ViewTransaction = () => {
    const [transaction, setTransaction] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { toast } = useToast();

    const getTransaction = async () => {
        try {
            const response = await api.get('/transaction');
            if (response) {
                setTransaction(() => response.data.data);
                setLoading(() => false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteTransaction = async (id: number) => {
        try {
            const response = await api.delete(`/transaction/${id}`);
            if (response) {
                getTransaction();
                toast({
                    title: 'Delete Transaction Success!'
                });
            }
        } catch (e) {
            console.log(e);
            toast({
                title: 'Delete Transaction Failed!',
                variant: 'destructive'
            });
        }
    };

    useEffect(() => {
        getTransaction();
    }, []);

    console.log(transaction);

    return (
        <>
            <div className='container flex min-h-screen flex-col justify-center gap-8'>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center'>
                        <BackButton href='/' />
                        <p className='text-xl md:text-3xl'>
                            View Transaction Data
                        </p>
                    </div>
                    <Link href='/transaction/add'>
                        <Button>Add New Transaction</Button>
                    </Link>
                </div>
                <div>
                    {loading ? (
                        <div className='mx-auto flex justify-center'>
                            <LoadingIcon />
                        </div>
                    ) : (
                        <>
                            {transaction.length !== 0 ? (
                                <Table>
                                    <TableCaption>
                                        Transaction List
                                    </TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>Created By</TableHead>
                                            <TableHead>Customer Name</TableHead>
                                            <TableHead>Item</TableHead>
                                            <TableHead>Amount</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>
                                                Transaction Date
                                            </TableHead>
                                            <TableHead>Created At</TableHead>
                                            <TableHead className='text-center'>
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {transaction.map((data, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell className='font-medium'>
                                                        {data.id}
                                                    </TableCell>
                                                    <TableCell className='font-medium'>
                                                        {data.createBy}
                                                    </TableCell>
                                                    <TableCell className='font-medium'>
                                                        {data.customerName}
                                                    </TableCell>
                                                    <TableCell className='font-medium'>
                                                        {data.item?.productName}
                                                    </TableCell>
                                                    <TableCell className='font-medium'>
                                                        {data.amount}
                                                    </TableCell>
                                                    <TableCell className='font-medium'>
                                                        {data.status?.name}
                                                    </TableCell>
                                                    <TableCell className='font-medium'>
                                                        {new Date(
                                                            data.transactionDate as Date
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className='font-medium'>
                                                        {new Date(
                                                            data.track
                                                                ?.createOn as Date
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className='flex flex-row justify-center gap-4'>
                                                            <Link
                                                                href={`/transaction/${data.id}`}
                                                            >
                                                                <Button
                                                                    variant={
                                                                        'ghost'
                                                                    }
                                                                    className='m-0 p-1'
                                                                >
                                                                    <Icons.eye color='blue' />
                                                                </Button>
                                                            </Link>
                                                            <Link
                                                                href={`/transaction/${data.id}/edit`}
                                                            >
                                                                <Button
                                                                    variant={
                                                                        'ghost'
                                                                    }
                                                                    className='m-0 p-1'
                                                                >
                                                                    <Icons.edit color='green' />
                                                                </Button>
                                                            </Link>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger
                                                                    asChild
                                                                >
                                                                    <Button
                                                                        variant={
                                                                            'ghost'
                                                                        }
                                                                        className='m-0 p-1'
                                                                    >
                                                                        <Icons.delete color='red' />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Hapus
                                                                            Transaction?
                                                                        </AlertDialogTitle>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>
                                                                            Cancel
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => {
                                                                                deleteTransaction(
                                                                                    data.id
                                                                                );
                                                                            }}
                                                                        >
                                                                            Delete
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p className='text-center text-xl md:text-3xl'>
                                    No Data Yet!
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ViewTransaction;
