import React, { useState, useEffect, Fragment } from 'react'
import ModalBase from '../../../../components/modal/ModalBase'
import TextInput from '../../../../components/input/TextInput';
import BaseButton from '../../../../components/button/BaseButton';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../components/modal/state/ModalSlice';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllCategory } from '../../../shop/services/GetAllCategory';
import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { AiFillCaretDown } from 'react-icons/ai'
import { useForm, Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { createProduct } from './services/CreateProduct';
import Loading from '../../../../components/loading/Loading';


const ModalProduct = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()


    const { data } = useQuery({ queryKey: ['categories'], queryFn: getAllCategory })

    const mutation = useMutation(createProduct, {
        onSuccess(data) {
            console.log(data)
            dispatch(closeModal())
        },
        onError(error) {
            console.log('thêm thất bại')
        },

    })




    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm()


    const onSubmit = async (data) => {

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('inventory', data.inventory);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('category', data.category.id);
        formData.append('imageFile', data.imageFile[0]); // Assuming you want to upload only one image
        for (let i = 0; i < data.extraImages.length; i++) {
            formData.append('extraImages', data.extraImages[i]);
        }

        await mutation.mutate(formData);
        queryClient.refetchQueries('categories');
    };



    return (
        <div>
            <ModalBase className='w-[880px]'>
                {mutation.isLoading && (
                    <Loading />
                )}
                <div>
                    <p className='text-center font-bold text-xl '>Thêm sản phẩm</p>
                    <form className='py-10' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div className='grid grid-cols-2 gap-4 pl-9'>
                            <div className=' space-y-6'>
                                <div className='space-y-2 relative' >
                                    <p className=''>Danh mục</p>
                                    <Controller
                                        name='category'
                                        control={control}
                                        defaultValue={data && data.length > 0 ? data[0] : null}
                                        render={({ field }) => (
                                            <Listbox value={field.value} onChange={field.onChange}>
                                                <Listbox.Button className='rounded-md flex relative border border-gray-300 bg-gray-200 w-[342px] focus:bg-gray-200 py-[12px]'>
                                                    <span className='px-3'>{field.value.name}</span>
                                                    <span className='absolute top-4 right-[6px]'>
                                                        <AiFillCaretDown />
                                                    </span>
                                                </Listbox.Button>
                                                <Listbox.Options className='absolute top-[70px] z-20 shadow-xl overflow-y-auto'>
                                                    {data?.map((category) => (
                                                        <Listbox.Option
                                                            key={category.id}
                                                            value={category}
                                                            className='w-[342px] pl-3 py-2  cursor-pointer'
                                                            as={Fragment}
                                                        >
                                                            {({ active }) => (
                                                                <li className={twMerge(`${active ? 'bg-slate-600 text-white' : 'bg-white text-black'}`)}>
                                                                    {category.name}
                                                                </li>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Listbox>
                                        )}
                                    />
                                </div>
                                <div className='space-y-2' >
                                    <p className=''> Ảnh sản phẩm</p>
                                    <TextInput type='file' multiple className='py-2 px-4' {...register('imageFile')} />
                                </div>
                                <div className='space-y-2' >
                                    <p className=''> Tên sản phẩm</p>
                                    <TextInput className='py-3 px-3 w-[342px]' {...register('name')} />
                                </div>

                                <div className='space-y-2' >
                                    <p className=''>Số lượng</p>
                                    <TextInput className='py-3 px-3 w-[342px] '{...register('inventory')} />
                                </div>

                            </div>
                            <div className='space-y-6'>

                                <div className='space-y-2' >
                                    <p className=''>Giá gốc(vnđ)</p>
                                    <TextInput className='py-3 px-3 w-[342px]' {...register('price')} />
                                </div>
                                <div className='space-y-2' >
                                    <p className=''> ExtraImages </p>
                                    <TextInput type='file' multiple className='py-2 px-4' {...register('extraImages')} />
                                </div>
                                <div className='space-y-2' >
                                    <p className=''>Mô tả</p>
                                    <textarea className='py-2 h-36 px-3 w-[342px] border border-gray-400 bg-gray-200  hover:border-neutral-600 focus:border-neutral-500 focus:bg-white' {...register('description')} />
                                </div>
                            </div>
                        </div>
                        <div className=' pt-10 text-right mr-20 space-x-6'>
                            <BaseButton title='Hủy' type='button' className='px-5 py-2 bg-red-600 text-white rounded-lg' handleClick={() => dispatch(closeModal())} />
                            <BaseButton
                                title='Thêm sản phẩm'
                                className='px-5 py-2 bg-slate-700 text-white rounded-lg'
                                type='submit'
                                disabled={mutation.isLoading} />
                        </div>
                    </form>

                </div>
            </ModalBase >
        </div >
    )
}

export default ModalProduct