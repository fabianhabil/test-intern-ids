'use client';

import api from '@/api/axios-instance';
import BackButton from '@/components/atoms/BackButton/BackButton';
import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input/input';
import { Label } from '@/components/ui/label/label';
import { useToast } from '@/components/ui/toast/use-toast';
import type { Item } from '@/types/data';
import { useState } from 'react';

const AddItem = () => {
    const [itemData, setItemData] = useState<Item>({
        productID: '',
        productName: ''
    });

    const { toast } = useToast();

    const onSubmit = async () => {
        if (!itemData.productID || !itemData.productName) {
            toast({
                title: 'Please fill all the fields!',
                variant: 'destructive'
            });
            return;
        }

        try {
            const response = await api.post('/item', {
                productID: itemData.productID.replace(/ /g, ''),
                productName: itemData.productName
            });

            if (response) {
                toast({ title: 'Item Created' });
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
            <div className='container flex min-h-screen flex-col justify-center gap-6'>
                <div className='flex flex-row items-center'>
                    <BackButton href='/item' />
                    <p className='text-xl md:text-3xl'>Add New Product</p>
                </div>
                <div className='flex flex-col gap-6 px-6'>
                    <div className='flex flex-col gap-2'>
                        <Label htmlFor='itemId'>Product ID</Label>
                        <Input
                            type='text'
                            id='itemId'
                            placeholder='Product ID'
                            onChange={(e) =>
                                setItemData((state) => ({
                                    ...state,
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
                            onChange={(e) =>
                                setItemData((state) => ({
                                    ...state,
                                    productName: e.target.value
                                }))
                            }
                        />
                    </div>
                    <Button onClick={onSubmit}>Create New Item</Button>
                </div>
            </div>
        </>
    );
};

export default AddItem;
