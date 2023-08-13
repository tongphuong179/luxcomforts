import { useQuery, useMutation } from '@tanstack/react-query'
import React from 'react'
import { getAllOrder } from './services/GetAllOrder'
import { Link } from 'react-router-dom'
import BaseButton from '../../../../components/button/BaseButton'
import { confirmOrder } from './services/ConfirmOrder'
import { deliveringOrder } from './services/DeliveringOrder'
import { acceptReturnOrder } from './services/AcceptReturnOrder'
import { deliveredOrder } from './services/DeliveredOrder'



const OrderAdminScreen = () => {

    const { data } = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
    console.log(data)

    const confirmMutation = useMutation((id) => confirmOrder(IDBOpenDBRequest), {
        onSuccess(data) {
            alert("Xác nhận đơn hàng")
        },
        onError(error) {
            alert('error')
        }
    })
    const deliveringMutation = useMutation((id) => deliveringOrder(id), {
        onSuccess(data) {
            alert("Đơn hàng đang được vận chuyển")
        },
        onError(error) {
            alert('error')
        }
    })
    const deliveredMutation = useMutation((id) => deliveredOrder(id), {
        onSuccess(data) {
            alert("Đơn hàng đã được vận chuyển đến địa chỉ của bạn")
        },
        onError(error) {
            alert('error')
        }
    })
    const acceptReturnMutation = useMutation((id) => acceptReturnOrder(id), {
        onSuccess(data) {
            alert("Đã hủy đơn hàng")
        },
        onError(error) {
            alert('error')
        }
    })


    const handleConfirm = (id) => {
        confirmMutation.mutate(id)
    }
    const handleDelivering = (id) => {
        deliveringMutation.mutate(id)
    }
    const handleDelivered = (id) => {
        deliveredMutation.mutate(id)
    }

    const handleAcceptReturn = (id) => {
        acceptReturnMutation.mutate(id)
    }

    return (
        <div>
            <div className='px-10 pt-20'>
                <table className='w-full border-collapse table-auto'>
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
                            <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold w-[180px]">Hành động</th>
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
                                        {order?.status !== "CANCEL" && (
                                            <div className=' space-x-2'>
                                                {(order?.status === 'WAITING' && order?.paymentType === 'COD') && <BaseButton title='Confirm' handleClick={() => handleConfirm(order.id)} className='px-6 py-2 rounded-lg text-white bg-slate-600 ' />}
                                                {(order?.status === 'CONFIRM' || order?.status === 'PAID') && <BaseButton title='Delivering' handleClick={() => handleDelivering(order.id)} className='px-6 py-2 rounded-lg text-white bg-slate-600 ' />}
                                                {order?.status === 'DELIVERING' && <BaseButton title='Delivered' handleClick={() => handleDelivered(order.id)} className='px-6 py-2 rounded-lg text-white bg-slate-600' />}
                                                {order?.status === 'RETURN' && <BaseButton title='Accept Return' handleClick={() => handleAcceptReturn(order.id)} className='px-6 py-2 rounded-lg text-white bg-slate-600' />}
                                            </div>
                                        )}
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
        </div>
    )
}

export default OrderAdminScreen