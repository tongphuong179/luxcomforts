import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { getAllOrder } from './services/GetAllOrder'
import { Link } from 'react-router-dom'
import BaseButton from '../../../../components/button/BaseButton'
import { confirmOrder } from './services/ConfirmOrder'
import { deliveringOrder } from './services/DeliveringOrder'
import { acceptReturnOrder } from './services/AcceptReturnOrder'
import { deliveredOrder } from './services/DeliveredOrder'
import { Toaster, toast } from 'react-hot-toast'
import { printOrder } from './services/PrintOrder'
import Loading from '../../../../components/loading/Loading'
import { formatCurrency } from '../../../../services/formatCurrency'



const OrderAdminScreen = () => {

    const { data } = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
    console.log(data)

    const queryClient = useQueryClient()

    const confirmMutation = useMutation((id) => confirmOrder(id), {
        onSuccess(data) {
            toast.success("Xác nhận đơn hàng")
            queryClient.invalidateQueries('orders')
        },
        onError(error) {
            toast.error('Đã có lỗi xảy ra')
        }
    })
    const deliveringMutation = useMutation((id) => deliveringOrder(id), {
        onSuccess(data) {
            alert("Đơn hàng đang được vận chuyển")
            queryClient.invalidateQueries('orders')
        },
        onError(error) {
            toast.error('Đã có lỗi xảy ra')
        }
    })
    const deliveredMutation = useMutation((id) => deliveredOrder(id), {
        onSuccess(data) {
            alert("Đơn hàng đã được vận chuyển đến địa chỉ của khách hàng ")
            queryClient.invalidateQueries('orders')
        },
        onError(error) {
            toast.error('Đã có lỗi xảy ra')
        }
    })
    const acceptReturnMutation = useMutation((id) => acceptReturnOrder(id), {
        onSuccess(data) {
            toast.success("Đã xác nhận trả lại đơn hàng")
            queryClient.invalidateQueries('orders')
        },
        onError(error) {
            toast.error('Đã có lỗi xảy ra')
        }
    })


    const handleConfirm = (id) => {
        confirmMutation.mutate(id)
    }
    const handlePrintOrder = async (orderId) => {
        try {
            const printData = await printOrder(orderId)
            window.open(printData, '_blank')
        } catch (error) {
            console.error("Đã xảy ra lỗi khi in đơn hàng", error);
            // Xử lý lỗi nếu cần
        }
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
            {(confirmMutation.isLoading || deliveredMutation.isLoading || deliveredMutation.isLoading || acceptReturnMutation.isLoading) && (
                <Loading />
            )}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='px-10 pt-20'>
                <table className='w-full border-collapse table-auto'>
                    <thead>
                        <tr key="">
                            <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold">STT</th>
                            <th className=" bg-slate-700 text-white py-6 px-4 text-lg font-semibold">Sản phẩm</th>

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
                                                <div key={item.id} className='flex pt-5 ml-[100px] items-center space-x-4 '>
                                                    <img className='w-[80px]' src={item.product.mainImage} alt="" />
                                                    <div className='text-left space-y-2'>
                                                        <p><span className='font-semibold'>Sản phẩm</span>: {item.product.name}</p>
                                                        <p>
                                                            <span className='font-semibold'>Số lương</span>: {item.quantity}
                                                        </p>
                                                        <p>
                                                            <span className='font-semibold'>Đơn giá</span>: {formatCurrency(item.product.price)}
                                                        </p>
                                                    </div>

                                                </div>
                                            )
                                        })}
                                    </td>

                                    <td className="border-b border-slate-700 py-10 px-4 text-center">
                                        {formatCurrency(order.total)}
                                    </td>
                                    <td className="border-b border-slate-700 py-10 px-4 text-center">
                                        {order.status}
                                    </td>
                                    <td className="border-b border-slate-700 py-10 px-4 text-center">
                                        {order?.status !== "CANCEL" && (
                                            <div className=' space-x-2'>
                                                {(order?.status === 'WAITING' && order?.paymentType === 'COD') && <BaseButton title='Confirm' handleClick={() => handleConfirm(order.id)} className='px-6 py-2 rounded-lg text-white bg-slate-600 ' />}
                                                {(order?.status === 'CONFIRM' || order?.status === 'PAID'|| order?.status === 'PACKING') && <BaseButton title='Print order' handleClick={() => handlePrintOrder(order.id)} className='px-6 py-2 rounded-lg text-white bg-slate-600 mt-8' />}
                                                {order?.status === 'PACKING' && < BaseButton title='Delivering' handleClick={() => handleDelivering(order.id)} className='px-6 py-2 rounded-lg text-white bg-slate-600 mt-8' />}
                                                {order?.status === 'DELIVERING' && order?.deliveryType === 'SHOP' && <BaseButton title='Delivered' handleClick={() => handleDelivered(order.id)} className='px-6 py-2 rounded-lg text-white bg-slate-600' />}
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