import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderByUser } from './services/GetOrderByUser'
import BaseButton from '../../components/button/BaseButton'
import ModalDeleteProduct from '../admin/features/products/ModalDeleteProduct'
import ModalOrder from './ModalOrder'
import { openModal } from '../../components/modal/state/ModalSlice'
import { order } from '../cart/services/Order';
import { Link } from 'react-router-dom'

const OrderScreen = () => {



    const currentUser = useSelector(state => state.auth.currentUser)
    const userId = currentUser.id

    const { data, isError } = useQuery(['order', userId], () => getOrderByUser(userId))
    console.log(data)

    if (isError) {
        return (
            <div>Bạn chưa có đơn hàng nào</div>
        )
    }

    return (
        <div className='px-[60px] py-[100px]'>
            <table className='w-full'>
                <thead>
                    <tr key="">
                        <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold">STT</th>
                        <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Sản phẩm</th>
                        <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Mã giao hàng nhanh</th>
                        <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Số tiền phải thanh toán</th>
                        <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Trạng thái</th>
                        <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold w-[180px]"></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((order, index) => {
                        return (
                            <tr key={order.id}>
                                <td className="border-b border-slate-700 py-10 px-4 text-center">{index + 1}</td>
                                <td className="border-b border-slate-700 py-10 px-4 text-center">
                                    {order.orderItems.map(item => {
                                        return (
                                            <div key={item.id} className='flex justify-center items-center space-x-4'>
                                                <img className='w-[80px]' src={item.product.mainImage} alt="" />
                                                <div className='text-left space-y-2'>
                                                    <p><span className='font-semibold'>Sản phẩm</span>: {item.product.name}</p>
                                                    <p>
                                                        <span className='font-semibold'>Số lương</span>: {item.quantity}
                                                    </p>
                                                    <p>
                                                        <span className='font-semibold'>Đơn giá</span>: {item.product.price}
                                                    </p>
                                                </div>

                                            </div>
                                        )
                                    })}
                                </td>
                                <td className="border-b border-slate-700 py-10 px-4 text-center">
                                    {order.ghnCode}
                                </td>
                                <td className="border-b border-slate-700 py-10 px-4 text-center">
                                    {order.total}
                                </td>
                                <td className="border-b border-slate-700 py-10 px-4 text-center">
                                    {order.status}
                                </td>
                                <td className="border-b border-slate-700 py-10 px-4 text-center">

                                    <Link to={`/orderDetail/${order.id}`}>
                                        <p className='text-primary'>Xem chi tiết</p>
                                    </Link>

                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>


        </div>
    )
}

export default OrderScreen