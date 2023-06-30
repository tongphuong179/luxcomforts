import React from 'react'
import { companyInfoItem, customerseviceItem, imageLink, purchaseInfoItem } from './constant'
import { AiOutlineRight } from 'react-icons/ai'

const Footer = () => {
    return (
        <div>
            <div className="bg-neutral-700 text-white grid grid-cols-2 xl:grid-cols-3 md:grid-col-2 2xl:grid-cols-5 gap-6 py-14 
            px-[40px] 2xl:px-[370px] xl:px-[200px] lg:px-[160px] md:px-[100px]
            ">
                <div>
                    <p className='text-2xl pb-4'>COMPANY INFO</p>
                    {companyInfoItem.map(item => {
                        return (
                            <div key={item.id} className='flex items-center space-x-4 py-[10px] border-b-[1px] border-gray-400' >
                                <AiOutlineRight size={12} className='text-green-300' />
                                <p className='text-gray-300 cursor-pointer'>{item.title}</p>
                            </div>
                        )
                    })}
                </div>

                <div>
                    <p className='text-2xl pb-4'>PURCHASE INFO</p>
                    {purchaseInfoItem.map(item => {
                        return (
                            <div key={item.id} className='flex items-center space-x-4 py-[10px] border-b-[1px] border-gray-400' >
                                <AiOutlineRight size={12} className='text-green-300' />
                                <p className='text-gray-300 cursor-pointer'>{item.title}</p>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <p className='text-2xl pb-4'>PURCHASE INFO</p>
                    {customerseviceItem.map(item => {
                        return (
                            <div key={item.id} className='flex items-center space-x-4 py-[10px] border-b-[1px] border-gray-400' >
                                <AiOutlineRight size={12} className='text-green-300' />
                                <p className='text-gray-300'>{item.title}</p>
                            </div>
                        )
                    })}
                </div>
                <div className=' col-span-2 '>
                    <p className='text-2xl pb-4'>BUY WITH CONFIDENCE</p>
                    <div className='grid grid-cols-8 gap-1'>
                        {imageLink.map(img => {
                            return (
                                <img key={img.id} src={img.link} />
                            )
                        })}
                    </div>
                </div>


            </div>
            <div className="bg-neutral-900 text-white py-10 flex flex-col justify-center items-center">
                <p className='text-base text-gray-500'>© Copyright 2023. All Rights Reserved.</p>
                <p className="pt-2">6475 E Pacific Coast Hwy #1021</p>
                <p>Long Beach, CA 90803</p>
            </div>
        </div>
    )
}

export default Footer