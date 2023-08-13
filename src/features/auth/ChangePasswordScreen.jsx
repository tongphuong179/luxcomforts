import React from 'react'
import TextInput from '../../components/input/TextInput'
import BaseButton from '../../components/button/BaseButton'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { changePassword } from './services/ChangePassword'

const ChangePasswordScreen = () => {

    const { register, handleSubmit } = useForm()
    const mutation = useMutation(changePassword, {
        onSuccess(data) {
            console.log(data)
            alert("Bạn đã đổi mật khẩu thành công")
        }
    })
    const onSubmit = (data) => {
        mutation.mutate(data)
    }
    return (
        <div className='h-[400px] w-[600px] mx-auto my-14 bg-gray-100'>
            <form className='px-6 pt-16 space-y-8' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex space-x-[140px] items-center'>
                    <label className='text-lg' htmlFor="">Phone</label>
                    <TextInput placeholder="phone" {...register('phone')} />
                </div>
                <div className='flex space-x-[80px] items-center'>
                    <label className='text-lg' htmlFor="">Old password</label>
                    <TextInput type="password" placeholder="Old Password" {...register('oldPassword')} />
                </div>
                <div className='flex space-x-[74px] items-center'>
                    <label className='text-lg' htmlFor="">New password</label>
                    <TextInput type="password" placeholder="New Password" {...register('newPassword')} />
                </div>


                <div className='text-center pt-2'>
                    <BaseButton title='CHANGE PASSWORD' className='text-gray-100 text-lg px-6 py-[10px] rounded-2xl' />
                </div>

            </form>
        </div>
    )
}

export default ChangePasswordScreen