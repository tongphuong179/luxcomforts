import React from 'react'
import BaseButton from '../../components/button/BaseButton'
import TextInput from '../../components/input/TextInput'
import { Link } from 'react-router-dom'


const RegisterScreen = () => {
    return (
        <div className='shadow-lg h-[700px] w-[600px] mx-auto my-14 bg-gray-100'>
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
            <form className='px-6 pt-16 space-y-8'>

                <div className='flex space-x-[88px] items-center'>
                    <label className='' htmlFor="">Username <span className='text-red-600'>*</span></label>
                    <TextInput />
                </div>
                <div className='flex space-x-[122px] items-center'>
                    <label className='' htmlFor="">Email  <span className='text-red-600'>*</span></label>
                    <TextInput />
                </div>
                <div className='flex space-x-[92px] items-center'>
                    <label className='' htmlFor="">Password  <span className='text-red-600'>*</span></label>
                    <TextInput />
                </div>
                <div className='flex space-x-[32px] items-center'>
                    <label className='' htmlFor="">Confirm password  <span className='text-red-600'>*</span></label>
                    <TextInput />
                </div>


                <div className='text-center pt-8'>
                    <BaseButton title='REGISTER' className='text-gray-100 text-lg px-6 py-[10px] rounded-2xl' />
                </div>

            </form>
        </div>
    )
}

export default RegisterScreen