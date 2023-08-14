import React, { useState } from 'react'
import ModalBase from '../../components/modal/ModalBase';
import SelectAddress from './SelectAddress';
import { useForm } from 'react-hook-form';
import TextInput from '../../components/input/TextInput';
import BaseButton from '../../components/button/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import { createAddressDelivery } from './services/CreateAddressDelivery';
import { closeModal } from '../../components/modal/state/ModalSlice';

const ModalAddress = () => {

    const currentUser = useSelector((state) => state.auth.currentUser)
    const userId = currentUser.id
    const dispatch = useDispatch()

    const { register, reset, handleSubmit } = useForm()
    const [selectedAddress, setSelectedAddress] = useState({});

    const mutation = useMutation((addressData) => createAddressDelivery(userId, addressData), {
        onSuccess(data) {
            console.log(data)
            alert("Bạn đã thêm địa chỉ thành công")
            dispatch(closeModal())
        }
    })

    const onSubmit = (data) => {
        const addressData = {
            ...data,
            address: selectedAddress.address,
            province_id: selectedAddress.province.value,
            province: selectedAddress.province.label,
            district_id: selectedAddress.district.value,
            district: selectedAddress.district.label,
            wardCode: selectedAddress.ward.value,
            ward: selectedAddress.ward.label

        }
        mutation.mutate(addressData)
    }

    return (
        <div>
            <ModalBase className='w-[700px] h-[600px]'>
                <p className='text-center pt-3 pb-12 text-2xl font-medium'>Thêm địa chỉ</p>
                <form className='' onSubmit={handleSubmit(onSubmit)}>
                    <div className=' flex space-x-8 '>
                        <SelectAddress onSelectAddress={setSelectedAddress} />
                        <div className='space-y-9'>
                            <div className='flex space-x-4 items-center'>
                                <label className='flex' htmlFor="">Name <span className='text-red-600'>*</span></label>
                                <TextInput placeholder="Họ và tên"  {...register('name')} className='py-1' />
                            </div>
                            <div className='flex space-x-4 items-center'>
                                <label className='flex' htmlFor="">Phone <span className='text-red-600'>*</span></label>
                                <TextInput placeholder="Số điện thoại"  {...register('phone')} className='py-1' />
                            </div>
                        </div>


                    </div>
                    <div className='text-right pt-[150px] space-x-6'>
                        <BaseButton handleClick={() => dispatch(closeModal())} type="button" title="Hủy" className='text-white px-4 py-1 rounded-lg' />
                        <BaseButton type="submit" title="Thêm địa chỉ" className='text-white px-4 py-1 rounded-lg' />
                    </div>
                </form>

            </ModalBase>
        </div>
    )
}

export default ModalAddress