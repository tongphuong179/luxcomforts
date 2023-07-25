import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllCategory } from '../../../shop/services/GetAllCategory';
import BaseButton from '../../../../components/button/BaseButton';
import MenuDropDown from '../../../../components/menu/MenuDropdown';
import { IoSettingsSharp } from 'react-icons/io5'
import { Menu } from '@headlessui/react';
import ModalCategory from './ModalCategory';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../components/modal/state/ModalSlice';

const CategoryAdminScreen = () => {

    const dispatch = useDispatch()

    const { data } = useQuery({ queryKey: ['category'], queryFn: getAllCategory })
    console.log(data);

    return (
        <div className='pt-[80px] px-[80px]'>
            <div className='text-right pb-10' >
                <BaseButton handleClick={() => dispatch(openModal())} title="Thêm danh mục sản phẩm" className='px-6 py-3 mr-1 rounded-xl text-lg text-white bg-slate-700' />
            </div>
            <table className="border-collapse border border-slate-500 w-full">
                <thead>
                    <tr className='bg-s'>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl">STT</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl">Tên danh mục sản phẩm</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl w-[250px]">Hành động</th>
                    </tr>

                </thead>
                <tbody>
                    {data?.map((category, index) => {
                        return (
                            <tr key={category.id}>
                                <td className="border border-slate-700 py-8 px-4 text-center">{index + 1}</td>
                                <td className="border border-slate-700 py-8 px-4 text-center">{category.name}</td>
                                <td className="border border-slate-700 py-8 px-4 text-center">
                                    <MenuDropDown label={
                                        <IoSettingsSharp size={30} className="ml-4 text-slate-700 hover:text-slate-500 cursor-pointer" />
                                    } className='space-y-2'>
                                        <Menu.Item>
                                            <BaseButton handleClick={() => handleUpdateProduct()} title='Sửa' className='px-2 py-1 bg-slate-600 text-white' />
                                        </Menu.Item>
                                        <Menu.Item>
                                            <BaseButton handleClick={() => handleDeleteProduct()} title='Xóa' className='px-2 py-1 bg-slate-600 text-white' />
                                        </Menu.Item>
                                    </MenuDropDown>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            <ModalCategory />
        </div>
    )
}

export default CategoryAdminScreen