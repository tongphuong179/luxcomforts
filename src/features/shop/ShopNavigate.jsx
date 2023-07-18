import { Disclosure } from '@headlessui/react'
import React from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { shopNavigateItems } from './constant'


const ShopNavigate = () => {
    return (
        <div>
            <div className='text-gray-600 text-xl font-medium'>BROWSE</div>
            <div className='bg-gray-300 w-[34px] h-1 mt-4'></div>
            <div className='pt-8'>
                {shopNavigateItems.map(item => {
                    return (
                        <Disclosure className='border-b-[1px] border-red-600' key={item.id}>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="flex w-full text-gray-700 justify-between py-2 mb-1  text-left text-lg
                     focus:outline-none focus-visible:ring ">
                                        <span className='text-gray-700'>{item.category}</span>
                                        <BsChevronDown
                                            className={`${open ? 'rotate-180 transform' : ''
                                                } `}
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-4  text-base text-gray-700 border-l-[1px] ">
                                        {item.products.map(product => {
                                            return (
                                                <div key={product.id} className=' py-2 '>{product.name}<span className='text-gray-400'> ({product.count})</span></div>
                                            )
                                        })}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    )
                })}
            </div>
        </div>
    )
}

export default ShopNavigate