import React, { useEffect, useState } from 'react'
import ModalBase from '../../../../components/modal/ModalBase'
import ControllerDatePicker from '../../../../components/input/datepicker/ControllerDatePicker'
import { useForm } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css';
import BaseButton from '../../../../components/button/BaseButton';
import TextInput from '../../../../components/input/TextInput';
import ControllerSelectMultiple from '../../../../components/select/ControllerSelectMultiple';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../../components/modal/state/ModalSlice'
import { getAllUser } from '../user/services/GetAllUser';
import { createVoucher } from './services/CreateVoucher';
import { formatDateToISO } from '../discount/services/formarDate';

const ModalVoucher = () => {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()
    const { control, handleSubmit, reset, register } = useForm()

    const { data: users = [] } = useQuery(['users'], getAllUser, {
        select: (data) =>
            data.map((user) => ({
                value: user.id,
                label: user.phone,
            }))
    })

    const mutation = useMutation(createVoucher, {
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries('discounts')
            dispatch(closeModal())
        },
        onError(error) {
            console.log(error)
        }
    })

    const onSubmit = (data) => {
        const voucherData = {
            limit: data.limit,
            code: data.code,
            percentage: data.percentage,
            amountMax: data.amountMax,
            start: formatDateToISO(data.start),
            end: formatDateToISO(data.end)
        }
        const users = data.users.map(item => ({
            id: item.value
        }))
        const mutateData = {
            voucher: voucherData,
            users: users
        }
        console.log(mutateData)
        mutation.mutate(mutateData)
    }

    return (
        <div>
            <ModalBase className="w-[680px] overflow-y-auto">
                <div>
                    <p className='text-center text-xl font-semibold'>Thêm chương trình giảm giá</p>
                    <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
                        <div className='grid grid-cols-2 gap-4 pl-3'>
                            <div className='space-y-6'>
                                <div className='space-y-3'>
                                    <p>Code</p>
                                    <TextInput className='w-[240px] px-2' {...register('code')} />
                                </div>
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

                            </div>
                            <div className='space-y-6'>
                                <div className='space-y-3'>
                                    <p>Người dùng được áp dụng</p>
                                    <ControllerSelectMultiple
                                        name="users"
                                        control={control}
                                        defaultValue={[]}
                                        options={users}
                                    />
                                </div>
                                <div className='space-y-3'>
                                    <p>Tỉ lệ chiết khấu(%)</p>
                                    <TextInput className='w-[240px] px-2' {...register('percentage')} />
                                </div>

                                <div className='space-y-3'>
                                    <p>Giảm tối đa(vnđ)</p>
                                    <TextInput className='w-[240px] px-2' {...register('amountMax')} />
                                </div>

                            </div>
                        </div>

                        <div className='pt-20 text-right pr-10 space-x-5'>
                            <BaseButton title='Hủy' handleClick={() => dispatch(closeModal())} type='button' className='px-4 py-2 rounded-md bg-red-600 text-white' />
                            <BaseButton title='Thêm mã giảm giá' type='submit' className='px-4 py-2 rounded-md bg-slate-700 text-white' />
                        </div>

                    </form>
                </div>
            </ModalBase>
        </div>
    )
}

export default ModalVoucher