'use client';

import api from '@/api/axios-instance';
import BackButton from '@/components/atoms/BackButton/BackButton';
import LoadingIcon from '@/components/atoms/LoadingIcon/LoadingIcon';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { useToast } from '@/components/ui/toast/use-toast';
import type { Status } from '@/types/data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditStatus = ({ params }: { params: string }) => {
    const [status, setStatus] = useState<Status | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const [loading, setLoading] = useState<boolean>(true);

    const getItem = async () => {
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
            getItem();
        }
    }, [params]);

    const onSubmit = async () => {
        if (!status!.name) {
            toast({
                title: 'Please fill all the fields!',
                variant: 'destructive'
            });
            return;
        }

        try {
            const response = await api.put(`/status/${status!.id}`, {
                name: status?.name
            });

            if (response) {
                toast({ title: 'Status Updated' });
                router.push('/status');
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
            <div className='container flex min-h-screen flex-col justify-center gap-8'>
                <div className='flex flex-row items-center'>
                    <BackButton href='/status' />
                    <p className='text-xl md:text-3xl'>Edit Status</p>
                </div>
                {loading ? (
                    <div className='mx-auto flex justify-center'>
                        <LoadingIcon />
                    </div>
                ) : (
                    <div className='flex flex-col gap-6 px-6'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='name'>Status Name</Label>
                            <Input
                                type='text'
                                id='name'
                                placeholder='Status Name'
                                value={status?.name}
                                onChange={(e) =>
                                    setStatus((state) => ({
                                        ...state!,
                                        name: e.target.value
                                    }))
                                }
                            />
                        </div>
                        <Button onClick={onSubmit}>Update Status</Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default EditStatus;
