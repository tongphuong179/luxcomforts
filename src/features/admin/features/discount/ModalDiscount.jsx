import React, { useEffect, useState } from 'react'
import ModalBase from '../../../../components/modal/ModalBase'
import ControllerDatePicker from '../../../../components/input/datepicker/ControllerDatePicker'
import { useForm } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css';
import BaseButton from '../../../../components/button/BaseButton';
import TextInput from '../../../../components/input/TextInput';
import ControllerSelectMultiple from '../../../../components/select/ControllerSelectMultiple';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllProduct } from '../../../shop/services/GetAllProduct';
import { createDiscount } from './services/CreateDiscount';
import { formatDateToISO } from './services/formarDate';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../components/modal/state/ModalSlice';
import { updateDiscount } from './services/UpdateDiscount';
import { format, parseISO } from 'date-fns';
import { getAllProductByDiscount } from './services/getAllProductByDiscount';
import { updateProduct } from '../products/services/UpdateProduct';
import { axiosInstance } from '../../../../services/axios.config';


const ModalDiscount = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const infoModal = useSelector(state => state.modal.modalInfo)





    const { control, handleSubmit, reset, register, setValue } = useForm()


    const { data: options = [] } = useQuery(['products'], getAllProduct, {
        select: (data) =>
            data.map((product) => ({
                value: product.product.id,
                label: product.product.name,
            })),
    });






    const mutation = useMutation(createDiscount, {
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries('discounts')
            dispatch(closeModal())
        },
        onError(error) {
            console.log(error)
        }
    })
    useEffect(() => {

        if (infoModal) {

            setValue('limit', infoModal.limit);
            setValue('start', parseISO(infoModal.start))
            setValue('end', parseISO(infoModal.end))
            setValue('discountPercentage', infoModal.discountPercentage)
            setValue('discountAmountMax', infoModal.discountAmountMax)

        }
    }, [infoModal, setValue]);

    const updateMutation = useMutation((updateData) => updateDiscount(infoModal.id, updateData), {
        onSuccess(data) {
            queryClient.invalidateQueries('products')
            dispatch(closeModal())

        },
        onError(error) {
            console.log(error)
        },
    })
    const onSubmit = (data) => {



        const discountData = {
            limit: data.limit,
            discountPercentage: data.discountPercentage,
            discountAmountMax: data.discountAmountMax,
            start: formatDateToISO(data.start),
            end: formatDateToISO(data.end)
        }
        const product = data.product.map(item => ({
            id: item.value
        }))
        const mutateData = {
            discount: discountData,
            products: product
        }
        if (infoModal) {
            updateMutation.mutate(mutateData)
        }
        else {
            mutation.mutate(mutateData)

        }

    };




    return (
        <div>
            <ModalBase className="w-[680px] overflow-y-auto">
                <div>
                    <p className='text-center text-xl font-semibold'>Thêm chương trình giảm giá</p>
                    <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='space-y-6'>
                                <div className='space-y-3'>
                                    <p>Bắt đầu</p>
                                    <ControllerDatePicker
                                        name="start"
                                        control={control}

                                    />
                                </div>
                                <div className='space-y-3'>
                                    <p>Kết thúc</p>
                                    <ControllerDatePicker
                                        name="end"
                                        control={control}
                                    />
                                </div>
                                <div className='space-y-3'>
                                    <p>Giới hạn</p>
                                    <TextInput className='w-[240px] px-2' {...register('limit')} />
                                </div>
                                <div className='space-y-3'>
                                    <p>Tỉ lệ chiết khấu(%)</p>
                                    <TextInput className='w-[240px] px-2' {...register('discountPercentage')} />
                                </div>
                            </div>
                            <div className='space-y-6'>

                                <div className='space-y-3'>
                                    <p>Giảm tối đa(vnđ)</p>
                                    <TextInput className='w-[240px] px-2' {...register('discountAmountMax')} />
                                </div>
                                <div className='space-y-3'>
                                    <p>Sản phẩm được giảm</p>
                                    <ControllerSelectMultiple
                                        name="product"
                                        control={control}
                                        defaultValue={[]}
                                        options={options}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='pt-20 text-right space-x-5'>
                            <BaseButton title='Hủy' handleClick={() => dispatch(closeModal())} type='button' className='px-4 py-2 rounded-md bg-red-600 text-white' />
                            <BaseButton title='Thêm chương trình giảm giá' type='submit' className='px-4 py-2 rounded-md bg-slate-700 text-white' />
                        </div>

                    </form>
                </div>
            </ModalBase>
        </div>
    )
}

export default ModalDiscount