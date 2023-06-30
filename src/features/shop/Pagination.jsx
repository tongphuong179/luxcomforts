import React from 'react'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const Pagination = () => {
    return (
        <div>
            <ul className='flex space-x-4 items-center list-none'>
                <li className='px-[4px] py-1 border-[2px] rounded-full text-gray-500 font-medium'>
                    <BsChevronLeft size={20} className='text-gray-500' />
                </li>
                <li className='px-[11px] py-1 border-[2px] rounded-full text-gray-500 font-medium'>1</li>
                <li className='px-[11px] py-1 border-[2px] rounded-full text-gray-500 font-medium bg-primary text-white'>2</li>
                <li className='px-[11px] py-1 border-[2px] rounded-full text-gray-500 font-medium'>3</li>
                <li className='px-[11px] py-1 border-[2px] rounded-full text-gray-500 font-medium'>4</li>
                <li className='px-[11px] py-1 border-[2px] rounded-full text-gray-500 font-medium'>5</li>
                <li className='px-[11px] py-1 border-[2px] rounded-full text-gray-500 font-medium'>6</li>
                <li>...</li>
                <li className='px-[11px] py-1 border-[2px] rounded-full text-gray-500 font-medium'>99</li>
                <li className='px-[11px] py-1 border-[2px] rounded-full text-gray-500 font-medium'>100</li>
                <li className='px-[11px] py-1 border-[2px] rounded-full text-gray-500 font-medium'>101</li>
                <li className='px-[4px] py-1 border-[2px] rounded-full text-gray-500 font-medium'>
                    <BsChevronRight size={20} className='text-gray-500' />
                </li>
            </ul>
        </div>
    )
}

export default Pagination