import React from 'react'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { AiOutlineSearch } from 'react-icons/ai'
import { AiOutlineMail } from 'react-icons/ai'
import { IoPerson } from 'react-icons/io5'
import TextInput from '../input/TextInput'

const HeaderAdmin = () => {
    return (
        <div className=' py-6 pr-[100px] bg-slate-200 pl-[20px] flex items-center justify-between border-b-2 border-gray-300'>

            <div className='flex items-center space-x-[50px] relative'>
                <img width={200} src="https://luxcomforts.com/wp-content/uploads/2021/05/luxcomforts_logo.png" alt="" />
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