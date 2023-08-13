import React, { useEffect, useState } from 'react'
import { BiLogoFacebook } from 'react-icons/bi'
import { AiFillInstagram } from 'react-icons/ai'
import { BiLogoTwitter } from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'
import { ImCart } from 'react-icons/im'
import { ImUser } from 'react-icons/im'
import { BiSearch } from 'react-icons/bi'
import { navigateItem } from './constant'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from '@headlessui/react'
import { logoutSuccess } from '../../../features/auth/state/AuthSlice'
import { removeCart } from '../../../features/cart/state/CartSlice'

const Header = () => {
    const currentUser = useSelector(state => state.auth.currentUser)
    const carts = useSelector(state => state.cart.carts)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [showHeader, setShowHeader] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 60) {
                setShowHeader(true)
            } else {
                setShowHeader(false)
            }
        }


        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return (
        <div>
            <div className='w-full py-2 bg-neutral-800  flex items-center justify-end pr-[20px] md:pr-[130px] lg:pr-[190px] xl:pr-[230px]  2xl:pr-[375px] '>
                <div className='flex items-center space-x-[6px] pr-2'>
                    <BiLogoFacebook color='white' className='cursor-pointer' />
                    <AiFillInstagram color='white' className='cursor-pointer' />
                    <BiLogoTwitter color='white' className='cursor-pointer' />
                    <HiOutlineMail color='white' className='cursor-pointer' />
                </div>
                <div className='flex pl-2 items-center border-l-[1px] border-white border-opacity-30'>
                    <p className='text-white opacity-80 text-sm pr-2 cursor-pointer'>Contact Us</p>
                    <p className='text-white opacity-80 text-sm pl-2 cursor-pointer border-l-[1px] border-white border-opacity-30'>FAQ</p>
                </div>
            </div>
            <div className={`${showHeader ? 'fixed z-50 top-0 right-0 left-0' : 'block'} transition-all duration-300 py-6 px-[40px] 2xl:px-[360px] xl:px-[200px] lg:px-[160px] md:px-[100px]
              bg-white opacity-80 shadow-xl flex items-center `}>
                <div>
                    <Link to='/'>
                        <img src="src/assets/luxcomforts-logo.png" alt="logo" width={170} className='cursor-pointer' />
                    </Link>
                </div>
                <div className='flex space-x-4 pl-8 flex-1 items-center'>
                    {navigateItem.map(item => {
                        return (
                            <Link key={item.id} to={item.link} className=''>
                                <p className="text-gray-600 text-base">{item.title}</p>
                            </Link>
                        )
                    })}
                    <BiSearch size={22} className='text-gray-700 hover:cursor-pointer' />
                </div>
                <div className='flex pr-4 space-x-4 relative'>

                    {currentUser ? (<div className='pt-1'>
                        <Menu>

                            <Menu.Button >{currentUser.username}</Menu.Button>
                            <Menu.Items className="bg-slate-300 pl-1 py-2 space-y-2 rounded-lg absolute top-10 left-[-40px]">
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            className={`${active && ' bg-slate-600 text-white cursor-pointer'}`}
                                            onClick={() => {
                                                dispatch(logoutSuccess())
                                                dispatch(removeCart())
                                            }}
                                        >
                                            Logout
                                        </div>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <div
                                            className={`${active && 'bg-slate-600 text-white cursor-pointer'}`}
                                            onClick={() => {
                                                navigate('change-password')
                                            }}
                                        >
                                            Change password
                                        </div>
                                    )}
                                </Menu.Item>

                            </Menu.Items>
                        </Menu>
                    </div>) : (
                        <div className='pr-2'>
                            <Link to='/login'>
                                <div className='border-2 border-gray-400 rounded-full px-[7px] py-[7px] hover:bg-purple-600 hover:cursor-pointer group'>
                                    <ImUser className='text-gray-400 group-hover:text-white' />
                                </div>
                            </Link>

                        </div>
                    )}
                    <div className='pl-[20px] border-l-2 relative'>
                        <Link to='/cart'>
                            <div className='border-2 border-gray-400 rounded-full px-[7px] py-[7px] hover:bg-purple-600 hover:cursor-pointer group'>
                                <ImCart className='text-gray-400 group-hover:text-white' />
                            </div>
                            {carts.length > 0 && (<span className='absolute top-[-6px] right-[-12px] px-[6px] rounded-full text-white bg-red-600 border-[1px]'>
                                {carts.length}
                            </span>)}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header