import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineMail } from 'react-icons/ai'
import { IoPerson } from 'react-icons/io5'
import TextInput from '../input/TextInput'

const HeaderAdmin = () => {
    return (
        <div className=' py-6 pr-[100px] pl-[20px] flex items-center justify-between border-b-2 border-gray-300'>
            <div className='flex items-center space-x-8 relative'>
                <p className='text-xl text-gray-600'>ADMIN MANAGER </p>
                <TextInput className='py-2 ml-12' placeholder='Seacrh' />
                <AiOutlineSearch size={24} className='absolute right-1' />
            </div>
            <div className='flex space-x-7 items-center'>
                <div className='flex space-x-6'>
                    <IoIosNotificationsOutline size='28' />
                    <AiOutlineMail size='28' />
                </div>
                <div className='flex items-center space-x-6'>
                    <p>Tong Phuong</p>
                    <IoPerson size={28} />
                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin