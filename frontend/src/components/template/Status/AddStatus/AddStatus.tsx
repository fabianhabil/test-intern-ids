'use client';

import api from '@/api/axios-instance';
import BackButton from '@/components/atoms/BackButton/BackButton';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { useToast } from '@/components/ui/toast/use-toast';
import type { Status } from '@/types/data';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddStatus = () => {
    const [statusData, setStatusData] = useState<Status>({
        id: 0,
        name: ''
    });

    const { toast } = useToast();
    const router = useRouter();

    const onSubmit = async () => {
        if (!statusData.name) {
            toast({
                title: 'Please fill all the fields!',
                variant: 'destructive'
            });
            return;
        }

        try {
            const response = await api.post('/status', {
                name: statusData.name
            });

            if (response) {
                toast({ title: 'Status Created' });
                router.push('/status');
            }
        } catch (e: any) {
            const title = 'Server Error';
            toast({
                title,
                variant: 'destructive'
            });
        }
    };

    return (
        <>
            <div className='container flex min-h-screen flex-col justify-center gap-6'>
                <div className='flex flex-row items-center'>
                    <BackButton href='/status' />
                    <p className='text-xl md:text-3xl'>Add New Status</p>
                </div>
                <div className='flex flex-col gap-6 px-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='name'>Status Name</Label>
                        <Input
                            type='text'
                            id='name'
                            placeholder='Status Name'
                            onChange={(e) =>
                                setStatusData((state) => ({
                                    ...state,
                                    name: e.target.value
                                }))
                            }
                        />
                    </div>
                    <Button onClick={onSubmit}>Create New Status</Button>
                </div>
            </div>
        </>
    );
};

export default AddStatus;
