import React from 'react'
import BaseButton from '../../../../components/button/BaseButton'
import { useQuery } from '@tanstack/react-query'
import { getAllDiscount } from './services/getAllDiscount'
import formatDate from './services/formarDate'
import ModalDiscount from './ModalDiscount'
import { useDispatch } from 'react-redux'
import { openModal } from '../../../../components/modal/state/ModalSlice'

const DiscountAdminScreen = () => {
    const dispatch = useDispatch()
    const { data } = useQuery({ queryKey: ['discounts'], queryFn: getAllDiscount })

    const handleAdd = () => {
        dispatch(openModal())
    }
    return (
        <div className=' px-10 py-[50px] '>
            <div className='text-right '>
                <BaseButton
                    handleClick={handleAdd}
                    title="Thêm chương trình giảm giá"
                    className='px-6 py-3 mr-1 rounded-xl text-lg text-white bg-slate-700'
                />

            </div>
            <div className='pt-10'>
                <table className='w-full table-auto border-collapse'>
                    <thead>
                        <tr>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">STT</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Thời gian bắt đầu</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Thời gian kết thúc</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Tỉ lệ chiết khấu</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Giảm tối đa(vnđ)</th>
                            <th className="sticky top-0 bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((discount, index) => {
                            return (
                                <tr key={discount.id}>
                                    <td className="border-b border-l border-slate-700 py-5 px-4 text-center">{index + 1}</td>
                                    <td className="border-b border-slate-700 py-5 px-4 text-center">{formatDate(discount.start)}</td>
                                    <td className="border-b border-slate-700 py-5 px-4 text-center">{formatDate(discount.end)}</td>
                                    <td className="border-b border-slate-700 py-5 px-4 text-center">{discount.discountPercentage}%</td>
                                    <td className="border-b border-slate-700 py-5 px-4 text-center">{discount.discountAmountMax}</td>
                                    <td className="border-b border-r border-slate-700 py-5 px-4 text-center">
                                        <div className=' space-x-2'>


                                            <BaseButton handleClick={() => handleUpdateProduct(product.product)} title='Sửa' className='px-2 z-50 py-1 rounded-lg bg-slate-600 text-white ' />

                                            <BaseButton handleClick={() => handleDeleteProduct(product.product.id)} title='Xóa' className='px-2 z-50 py-1 rounded-lg bg-slate-600 text-white' />


                                        </div>
                                    </td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            </div>

            <ModalDiscount />
        </div>
    )
}

export default DiscountAdminScreen