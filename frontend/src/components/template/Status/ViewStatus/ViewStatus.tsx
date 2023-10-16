'use client';

import api from '@/api/axios-instance';
import BackButton from '@/components/atoms/BackButton/BackButton';
import LoadingIcon from '@/components/atoms/LoadingIcon/LoadingIcon';
import { Icons } from '@/components/icons/icons';
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
import type { Status } from '@/types/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const ViewStatus = () => {
    const [status, setStatus] = useState<Status[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
        getStatus();
    }, []);

    return (
        <>
            <div className='container flex min-h-screen flex-col justify-center gap-8'>
                <div className='flex flex-row items-center justify-between'>
                    <div className='flex flex-row items-center'>
                        <BackButton href='/' />
                        <p className='text-xl md:text-3xl'>View Status Data</p>
                    </div>
                    <Link href='/status/add'>
                        <Button>Add New Status</Button>
                    </Link>
                </div>
                <div>
                    {loading ? (
                        <div className='mx-auto flex justify-center'>
                            <LoadingIcon />
                        </div>
                    ) : (
                        <>
                            {status.length !== 0 ? (
                                <Table>
                                    <TableCaption>Status List</TableCaption>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className=''>
                                                Status ID
                                            </TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead className='text-center'>
                                                Action
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {status.map((data, index) => {
                                            return (
                                                <TableRow key={index}>
                                                    <TableCell className='font-medium'>
                                                        {data.id}
                                                    </TableCell>
                                                    <TableCell className='font-medium'>
                                                        {data.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className='flex flex-row justify-center gap-4'>
                                                            <Link
                                                                href={`/status/${data.id}`}
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
                                                                href={`/status/${data.id}/edit`}
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

export default ViewStatus;
