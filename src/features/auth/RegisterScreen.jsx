import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import BaseButton from '../../components/button/BaseButton'
import TextInput from '../../components/input/TextInput'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { RegisterUser } from './services/Register'
import toast, { Toaster } from 'react-hot-toast'
import SelectAddress from '../cart/SelectAddress'




const RegisterScreen = () => {
    const navigate = useNavigate()
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm()
    const [selectedAddress, setSelectedAddress] = useState({});


    const mutation = useMutation(RegisterUser, {
        onSuccess(data) {
            toast.success("Bạn đã đăng ký tài khoản thành công")
            navigate('/login')
            reset('')
            console.log(data)
        },
        onError() {
            toast.error("Đăng ký tài khoản thất bại")
        }
    })

    const onSubmit = (data) => {
        const registerData = {
            ...data,
            deliveryAddress: {
                address: selectedAddress.address,
                province_id: selectedAddress.province.value,
                province: selectedAddress.province.label,
                district_id: selectedAddress.district.value,
                district: selectedAddress.district.label,
                wardCode: selectedAddress.ward.value,
                ward: selectedAddress.ward.label
            }
        }
        mutation.mutate(registerData)
    }
    return (
        <div className='shadow-lg h-[800px] w-[800px] mx-auto my-14 bg-gray-100'>
            <div><Toaster position="top-center"
                reverseOrder={false} /></div>
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

                <div className="grid grid-cols-2 gap">
                    <div className='px-2  space-y-8'>
                        <div className='flex space-x-[80px] items-center'>
                            <label className='flex' htmlFor="">Name <span className='text-red-600'>*</span></label>
                            <TextInput placeholder="Họ và tên"  {...register('name')} />
                        </div>
                        <div className='flex space-x-[50px] items-center'>
                            <label className='flex' htmlFor=""> Username <span className='text-red-600'>*</span></label>
                            <TextInput placeholder="Tên đăng nhập" {...register('username')} />
                        </div>
                        <div className='flex space-x-[78px] items-center'>
                            <label className='flex' htmlFor="">Phone <span className='text-red-600'>*</span></label>
                            <TextInput placeholder="Số điện thoại" {...register('phone')} />
                        </div>
                        <div className='flex space-x-[84px] items-center'>
                            <label className='flex' htmlFor="">Email  <span className='text-red-600'>*</span></label>
                            <TextInput placeholder="Email" {...register('email')} />
                        </div>
                        <div className='flex space-x-[54px] items-center'>
                            <label className='flex' htmlFor="">Password  <span className='text-red-600'>*</span></label>
                            <TextInput type="password" placeholder="Mật khẩu" {...register('password')} />
                        </div>
                        <div className='flex space-x-[54px] items-center'>
                            <label className='flex' htmlFor="">ConFirm Password  <span className='text-red-600'>*</span></label>
                            <TextInput type="password" placeholder="Nhập lại mật khẩu" {...register('confirmPassword')} />
                        </div>

                    </div>
                    <div className='pl-20'>
                        <SelectAddress onSelectAddress={setSelectedAddress} />
                    </div>

                </div>


                <div className='text-center pt-8'>
                    <BaseButton title='REGISTER' className='text-gray-100 text-lg px-6 py-[10px] rounded-2xl' />
                </div>

            </form>
        </div>
    )
}

export default RegisterScreen