import React from 'react'
import { useForm } from 'react-hook-form'
import BaseButton from '../../components/button/BaseButton'
import TextInput from '../../components/input/TextInput'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'


const RegisterScreen = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    
    const mutation = useMutation()

    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <div className='shadow-lg h-[800px] w-[600px] mx-auto my-14 bg-gray-100'>
            <div className="flex flex-col space-y-8 pt-8">
                <p className='text-center text-3xl font-medium text-primary'>Create Account</p>
                <p className='text-center'>Please register using account detail bellow.</p>
            </div>
            <div className="flex justify-center pt-2">
                <p>Already have an account?</p>
                <Link to='/login'>
                    <p className='text-primary font-medium pl-2'>Log In</p>
                </Link>
            </div>
            <form className='px-6 pt-16 space-y-8' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex space-x-[118px] items-center'>
                    <label className='' htmlFor="">Name <span className='text-red-600'>*</span></label>
                    <TextInput placeholder="Họ và tên" {...register('name')} />
                </div>
                <div className='flex space-x-[88px] items-center'>
                    <label className='' htmlFor="">Username <span className='text-red-600'>*</span></label>
                    <TextInput placeholder="Tên đăng nhập" {...register('username')} />
                </div>
                <div className='flex space-x-[116px] items-center'>
                    <label className='' htmlFor="">Phone <span className='text-red-600'>*</span></label>
                    <TextInput placeholder="Số điện thoại" {...register('phone')} />
                </div>
                <div className='flex space-x-[122px] items-center'>
                    <label className='' htmlFor="">Email  <span className='text-red-600'>*</span></label>
                    <TextInput placeholder="Email" {...register('email')} />
                </div>
                <div className='flex space-x-[94px] items-center'>
                    <label className='' htmlFor="">Password  <span className='text-red-600'>*</span></label>
                    <TextInput placeholder="Mật khẩu" {...register('password')} />
                </div>
                <div className='flex space-x-[108px] items-center'>
                    <label className='' htmlFor="">Address<span className='text-red-600'>*</span></label>
                    <TextInput placeholder="Địa chỉ" {...register('address')} />
                </div>


                <div className='text-center pt-8'>
                    <BaseButton title='REGISTER' className='text-gray-100 text-lg px-6 py-[10px] rounded-2xl' />
                </div>

            </form>
        </div>
    )
}

export default RegisterScreen