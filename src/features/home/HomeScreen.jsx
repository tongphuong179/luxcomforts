import React from 'react'
import { getCurrentUser } from '../../services/getToken'
import { homeTeam } from './constant'
import BaseButton from '../../components/button/BaseButton'
import { useNavigate } from 'react-router-dom'

const HomeScreen = () => {
    const token = getCurrentUser()
    console.log(token)
    const navigate = useNavigate()
    return (
        <div>
            <div className='text-center bg-primary py-[150px] px-[540px]'>
                <p className='text-6xl text-white'>About Us</p>
                <p className='text-xl leading-7 pt-10 text-white'>
                    Welcome to Luxcomforts.com. Finding the perfect piece for your home doesn’t have to
                    be stressful and worrisome. At Luxcomforts, we pride ourselves in delivering exceptional
                    customer service along with a carefully curated selection of high-end home furnishings for
                    your everyday needs.Our goal is to ensure that you receive the best merchandise available at
                    very reasonable prices.
                </p>
            </div>
            <div className='text-center bg-gray-100 pt-[50px] pb-[100px] px-[340px]'>
                <p className='text-3xl '>WHY US</p>
                <p className='text-lg leading-7 pt-6 '>
                    We spend countless hours daily in finding the best items to list on our website.  Each item that
                    we list is vetted for quality, functionality and overall customer satisfaction before we even
                    consider having them available for purchase.  When shopping with us, you can rest assured that
                    we got your back and will do everything neccessary to ensure that you have the best shopping
                    experience possible.
                </p>
            </div>
            <div className='pt-[100px] px-[320px]'>
                <p className='text-3xl text-gray-700'>MEET OUR TEAM</p>
                <div className='grid grid-cols-5 gap-5 pt-[100px] pb-[80px] pl-3'>
                    {homeTeam.map(item => {
                        return (
                            <div key={item.id} className='text-gray-700 text-center'>
                                <img src={item.link} alt="" className='pl-10' />
                                <p className='pt-5'>{item.name}</p>
                                <p>{item.job}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='text-center px-[320px] pt-[50px] pb-[100px]'>
                <p className='text-2xl'>KEEP IN TOUCH WITH US</p>
                <p className='text-left pt-8'>
                    We are continually working on our online store and are open to any suggestions, comments or requests.
                    If you have any questions, concerns or feedback, please do not hesitate to let us know.
                </p>
                <div className='flex items-center justify-center pt-[50px] text-white text-xl font-medium space-x-6'>
                    <BaseButton title="START SHOPPING" className='py-4 px-5 rounded-xl' handleClick={() => navigate('/cart')} />
                    <BaseButton title="CONTACT US" className='py-4 px-5 rounded-xl bg-red-600' handleClick={() => navigate('/contact')} />
                </div>
            </div>
        </div>
    )
}

export default HomeScreen