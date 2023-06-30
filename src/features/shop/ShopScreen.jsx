import React from 'react'
import ShopNavigate from './ShopNavigate'
import ListProduct from './ListProduct'

const ShopScreen = () => {
    return (
        <div className='px-[360px]'>
            <div className='pt-10 flex items-center justify-between'>
                <div className='flex text-xl space-x-4 '>
                    <p className='text-gray-500'>HOME</p>
                    <span className='text-gray-500'>/</span>
                    <p className='font-medium'>SHOP</p>
                </div>
                <div>
                    <p className='text-gray-500 text-lg'>Showing 1–12 of 3597 results</p>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4 pt-10'>
                <div>
                    <ShopNavigate />
                </div>
                <div className='col-span-3'>
                    <ListProduct />
                </div>
            </div>
        </div>
    )
}

export default ShopScreen