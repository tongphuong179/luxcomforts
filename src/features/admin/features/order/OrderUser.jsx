import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getOrderById } from '../../../order/services/GetOrderById'
import { getOrderByUser } from '../../../order/services/GetOrderByUser'
import { Link } from 'react-router-dom'

const OrderUser = () => {
    const { userId } = useParams()
    console.log(userId)
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
                        <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Địa chỉ</th>
                        <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Giá trị đơn hàng</th>
                        <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Phí vận chuyển</th>
                        <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Khuyến mãi</th>
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
                                            <div key={item.id} className='flex items-center space-x-4'>
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
                                    {order.deliveryAddress.address},{order.deliveryAddress.ward},{order.deliveryAddress.district} ,{order.deliveryAddress.province}
                                </td>

                                <td className="border-b border-slate-700 py-10 px-4 text-center">
                                    {order.amount}
                                </td>
                                <td className="border-b border-slate-700 py-10 px-4 text-center">
                                    {order.deliveryFee}
                                </td>
                                <td className="border-b border-slate-700 py-10 px-4 text-center">
                                    {order.total}
                                </td>
                                <td className="border-b border-slate-700 py-10 px-4 text-center">
                                    {order.total}
                                </td>
                                <td className="border-b border-slate-700 py-10 px-4 text-center">
                                    {order.status}
                                </td>
                                <td className="border-b border-slate-700 py-10 px-4 text-center">

                                    <Link to={`/admin/orderDetail/${order.id}`}>
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

export default OrderUser