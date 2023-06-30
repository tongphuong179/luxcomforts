import React from 'react'
import BaseButton from '../../components/button/BaseButton'
import TextInput from '../../components/input/TextInput'
import { Link } from 'react-router-dom'

const LoginScreen = () => {
    return (
        <div className='shadow-lg h-[600px] w-[600px] mx-auto my-14 bg-gray-100'>
            <div className="flex flex-col space-y-8 pt-8">
                <p className='text-center text-3xl font-medium text-primary'>LOGIN</p>
                <p className='text-center'>Please login using account detail bellow.</p>
            </div>
            <form className='px-6 pt-16 space-y-8'>

                <div className='flex space-x-28 items-center'>
                    <label className='text-lg' htmlFor="">Email</label>
                    <TextInput />
                </div>
                <div className='flex space-x-[80px] items-center'>
                    <label className='text-lg' htmlFor="">Password</label>
                    <TextInput />
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