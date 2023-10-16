'use client';

import api from '@/api/axios-instance';
import BackButton from '@/components/atoms/BackButton/BackButton';
import LoadingIcon from '@/components/atoms/LoadingIcon/LoadingIcon';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { useToast } from '@/components/ui/toast/use-toast';
import type { Item } from '@/types/data';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditItem = ({ params }: { params: string }) => {
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

    const onSubmit = async () => {
        if (!item!.productID || !item!.productName) {
            toast({
                title: 'Please fill all the fields!',
                variant: 'destructive'
            });
            return;
        }

        try {
            const response = await api.put(`/item/${item!.productID}`, {
                productName: item!.productName
            });

            if (response) {
                toast({ title: 'Item Updated' });
                router.push('/item');
            }
        } catch (e: any) {
            let title: string;
            if (e.response.status === 409) {
                title = 'Item ID already exists!';
            } else {
                title = 'Server Error';
            }
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
                    <BackButton href='/item' />
                    <p className='text-xl md:text-3xl'>Edit Product</p>
                </div>
                {loading ? (
                    <div className='mx-auto flex justify-center'>
                        <LoadingIcon />
                    </div>
                ) : (
                    <div className='flex flex-col gap-6 px-6'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='itemId'>Product ID</Label>
                            <Input
                                type='text'
                                id='itemId'
                                placeholder='Product ID'
                                value={item?.productID}
                                disabled
                                onChange={(e) =>
                                    setItem((state) => ({
                                        ...state!,
                                        productID: e.target.value
                                    }))
                                }
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='productName'>Product Name</Label>
                            <Input
                                type='text'
                                id='productName'
                                placeholder='Product Name'
                                value={item?.productName}
                                onChange={(e) =>
                                    setItem((state) => ({
                                        ...state!,
                                        productName: e.target.value
                                    }))
                                }
                            />
                        </div>
                        <Button onClick={onSubmit}>Update Item</Button>
                    </div>
                )}
            </div>
        </>
    );
};

export default EditItem;
