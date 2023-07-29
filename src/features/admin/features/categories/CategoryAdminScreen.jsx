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
import { useState } from 'react';
import ModalDeleteCategory from './ModalDeleteCategory';

const CategoryAdminScreen = () => {

    const dispatch = useDispatch()

    const { data } = useQuery({ queryKey: ['category'], queryFn: getAllCategory })
    const [modal, setModal] = useState('')
    console.log(data);

    const handleUpdateCategory = (category) => {
        setModal('UPDATE')
        dispatch(openModal(category))
    }
    const handleDeleteCategory = (categoryId) => {
        setModal('DELETE')
        dispatch(openModal(categoryId))
    }

    return (
        <div className='pt-[80px] px-[80px]'>
            <div className='text-right pb-10' >
                <BaseButton
                    handleClick={() => {
                        setModal('ADD')
                        dispatch(openModal())
                    }
                    }
                    title="Thêm danh mục sản phẩm"
                    className='px-6 py-3 mr-1 rounded-xl text-lg text-white bg-slate-700' />
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

                                    <div className='space-x-4'>
                                        <BaseButton handleClick={() => handleUpdateCategory(category)} title='Sửa' type='button' className='px-3 py-1 rounded-lg bg-slate-600 text-white' />

                                        <BaseButton handleClick={() => handleDeleteCategory(category.id)} title='Xóa' className='px-3 py-1 rounded-lg bg-slate-600 text-white' />
                                    </div>

                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            {modal === "DELETE" ? <ModalDeleteCategory /> : <ModalCategory />}

        </div>
    )
}

export default CategoryAdminScreen