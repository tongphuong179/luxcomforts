import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllProduct } from '../../../shop/services/GetAllProduct';
import BaseButton from '../../../../components/button/BaseButton';
import MenuDropDown from '../../../../components/menu/MenuDropdown';
import { IoSettingsSharp } from 'react-icons/io5'
import ModalProduct from './ModalProduct';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../../components/modal/state/ModalSlice';
import { Menu } from '@headlessui/react';

import { useState } from 'react';
import ModalDeleteProduct from './ModalDeleteProduct';



const ProductAdminScreen = () => {
    const dispatch = useDispatch()


    const [type, setType] = useState(true)
    const { data } = useQuery({ queryKey: ['products'], queryFn: getAllProduct })
    const info = useSelector(state => state.modal.modalInfo)
    console.log(info)

    const handleUpdateProduct = () => {

        dispatch(openModal(type))
    }

    const handleDeleteProduct = (productId) => {
        console.log(productId);
        setType(false)
        dispatch(openModal(productId))
    }
    return (
        <div className=' px-10 py-[50px] '>
            <div className='text-right'>
                <BaseButton handleClick={() => dispatch(openModal())} title="Thêm sản phẩm" className='px-6 py-3 mr-1 rounded-xl text-lg text-white bg-slate-700' />
            </div>

            <div className="max-h-[calc(90vh-150px)] overflow-y-auto mt-10">
                <table className="w-full border-collapse border border-slate-600 table-auto">
                    <thead>
                        <tr className='bg-s'>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">STT</th>
                            <th align='left' className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Tên sản phẩm</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Số lượng</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Giá gốc(vnđ)</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Ảnh</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Khối lượng(g)</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Giao hàng nhanh</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Đã bán</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Giá bán(vnđ)</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((product, index) => {
                            return (
                                <tr key={product.product.id}>
                                    <td className="border-b border-slate-700 py-3 px-4 text-center">{index + 1}</td>
                                    <td className="border-b border-slate-700 py-3 px-4">{product.product.name}</td>
                                    <td className="border-b border-slate-700 py-3 px-4 text-center">{product.product.inventory}</td>
                                    <td className="border-b border-slate-700 py-3 px-4 text-center ">{product.product.price}</td>
                                    <td className="border-b border-slate-700 py-3 px-4 text-center ">
                                        <img className='w-[120px]' src={product.product.mainImage} alt="" />
                                    </td>
                                    <td className="border-b border-slate-700 py-3 px-4 text-center ">{product.product.weight}</td>
                                    <td className="border-b border-slate-700 py-3 px-4 text-center ">{product.product.deliveryAvailable ? "có" : "không"}</td>
                                    <td className="border-b border-slate-700 py-3 px-4 text-center ">{product.product.total_sold}</td>
                                    <td className="border-b border-slate-700 py-3 px-4 text-center ">{product.price_discount}</td>
                                    <td className="border-b border-slate-700 py-3 px-4 text-center relative">
                                        <div className='absolute top-[50px] left-[20px]'>
                                            <MenuDropDown label={
                                                <IoSettingsSharp size={30} className="ml-4 text-slate-700 hover:text-slate-500 cursor-pointer" />
                                            } className='space-y-1'>

                                                <BaseButton handleClick={() => handleUpdateProduct(product.product.id)} title='Sửa' className='px-2 z-50 py-1 rounded-lg bg-slate-600 text-white ' />

                                                <BaseButton handleClick={() => handleDeleteProduct(product.product.id)} title='Xóa' className='px-2 z-50 py-1 rounded-lg bg-slate-600 text-white' />

                                            </MenuDropDown>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {type && <ModalProduct />}
            {!type && < ModalDeleteProduct />}

        </div >
    )
}

export default ProductAdminScreen