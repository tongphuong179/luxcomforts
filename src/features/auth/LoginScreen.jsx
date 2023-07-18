import React from 'react'
import BaseButton from '../../components/button/BaseButton'
import TextInput from '../../components/input/TextInput'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { login } from './services/Login'
import { useDispatch } from 'react-redux'
import { loginSuccess } from './state/AuthSlice'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'


const LoginScreen = () => {

    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const navigate = useNavigate()
    const mutation = useMutation(login, {
        onSuccess(data) {
            dispatch(loginSuccess(data))
            navigate('/')
        },
        onError() {
            toast.error("phone or password invalid")
            console.log("Đăng nhập thất bại")
        }
    })

    const onSubmit = (data) => mutation.mutate(data)


    return (
        <div className='shadow-lg h-[600px] w-[600px] mx-auto my-14 bg-gray-100'>
            <div><Toaster position="top-center"
                reverseOrder={false} /></div>
            <div className="flex flex-col space-y-8 pt-8">
                <p className='text-center text-3xl font-medium text-primary'>LOGIN</p>
                <p className='text-center'>Please login using account detail bellow.</p>
            </div>
            <form className='px-6 pt-16 space-y-8' onSubmit={handleSubmit(onSubmit)}>

                <div className='flex space-x-[104px] items-center'>
                    <label className='text-lg' htmlFor="">Phone</label>
                    <TextInput placeholder="phone" {...register('phone')} />
                </div>
                <div className='flex space-x-[80px] items-center'>
                    <label className='text-lg' htmlFor="">Password</label>
                    <TextInput placeholder="password" {...register('password')} />
                </div>
                <div className='text-center pt-4'>
                    <p className=' font-medium cursor-pointer hover:opacity-80'>Forgot you password</p>
                </div>

                <div className='text-center pt-2'>
                    <BaseButton title='LOG IN' className='text-gray-100 text-lg px-6 py-[10px] rounded-2xl' />
                </div>
                <div className=' flex items-center justify-center'>
                    <p> Do not have an account?</p>
                    <Link to='/register' className='font-medium pl-1 cursor-pointer hover:opacity-80 text-primary'>Register now</Link>
                </div>
            </form>
        </div>
    )
}

export default LoginScreen