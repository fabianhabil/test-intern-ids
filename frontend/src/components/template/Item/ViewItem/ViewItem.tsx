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
import type { Item } from '@/types/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ViewItem = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { toast } = useToast();

    const getItem = async () => {
        try {
            const response = await api.get('/item');
            if (response) {
                setItems(() => response.data.data);
                setLoading(() => false);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteItem = async (productID: string) => {
        try {
            const response = await api.delete(`/item/${productID}`);
            if (response) {
                getItem();
                toast({
                    title: 'Delete Product Success!'
                });
            }
        } catch (e) {
            console.log(e);
            toast({ title: 'Delete Product Failed!', variant: 'destructive' });
        }
    };

    useEffect(() => {
        getItem();
    }, []);

    return (
        <>
            <div className='container flex min-h-screen flex-col justify-center gap-8'>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center'>
                        <BackButton href='/' />
                        <p className='text-xl md:text-3xl'>View Item Data</p>
                    </div>
                    <Link href='/item/add'>
                        <Button>Add New Item</Button>
                    </Link>
                </div>
                <div>
                    {loading ? (
                        <div className='mx-auto flex justify-center'>
                            <LoadingIcon />
                        </div>
                    ) : (
                        <>
                            {items.length !== 0 ? (
                                <Table>
                                    <TableCaption>Product List</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className=''>
                                                Product ID
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead className='text-center'>
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {items.map((data, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell className='font-medium'>
                                                        {data.productID}
                                                    </TableCell>
                                                    <TableCell className='font-medium'>
                                                        {data.productName}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className='flex flex-row justify-center gap-4'>
                                                            <Link
                                                                href={`/item/${data.productID}`}
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
                                                                href={`/item/${data.productID}/edit`}
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
                                                                <AlertDialogTrigger asChild>
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
                                                                            Product?
                                                                        </AlertDialogTitle>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>
                                                                            Cancel
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => {
                                                                                deleteItem(
                                                                                    data.productID
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

export default ViewItem;
