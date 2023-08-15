import React from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getOrderById } from '../../../order/services/GetOrderById'
import { formatCurrency } from '../../../../services/formatCurrency'
import BaseButton from '../../../../components/button/BaseButton'
import { cancelOrder } from '../../../order/services/CancelOrder'
import { confirmOrder } from './services/ConfirmOrder'
import { deliveringOrder } from './services/DeliveringOrder'
import { finishOrder } from '../../../order/services/FinishOrder'
import { acceptReturnOrder } from './services/AcceptReturnOrder'
import { deliveredOrder } from './services/DeliveredOrder'
import Loading from '../../../../components/loading/Loading';
import { printOrder } from './services/PrintOrder'
import { Toaster, toast } from 'react-hot-toast'

const OrderAdminDetail = () => {
    const { orderId } = useParams()
    console.log(orderId)
    const { data, isError, isSuccess } = useQuery({ queryKey: ['orderDetail', orderId], queryFn: () => getOrderById(orderId) })
    console.log(data)


    const queryClient = useQueryClient()


    const confirmMutation = useMutation(() => confirmOrder(orderId), {
        onSuccess(data) {
            toast.success("Xác nhận đơn hàng")
            queryClient.invalidateQueries('orderDetail')
        },
        onError(error) {
            alert('error')
        }
    })
    const deliveringMutation = useMutation(() => deliveringOrder(orderId), {
        onSuccess(data) {
            toast.success("Đơn hàng đang được vận chuyển")
            queryClient.invalidateQueries('orderDetail')
        },
        onError(error) {
            alert('error')
        }
    })
    // const printMutation = useMutation(() => printOrder(orderId), {
    //     onSuccess(data) {
    //         console.log(data)
    //     },
    //     onError(error) {
    //         toast.error("Đã xảy ra lỗi")
    //     }
    // })
    const deliveredMutation = useMutation(() => deliveredOrder(orderId), {
        onSuccess(data) {
            toast.success("Đơn hàng đã được vận chuyển đến địa chỉ của khách hàng")
            queryClient.invalidateQueries('orderDetail')
        },
        onError(error) {
            toast.error("Đã xảy ra lỗi")
        }
    })
    const acceptReturnMutation = useMutation(() => acceptReturnOrder(orderId), {
        onSuccess(data) {
            toast.success("Bạn đã xác nhận đơn yêu cầu được trả lại đơn hàng từ khách hàng")
            queryClient.invalidateQueries('orderDetail')
        },
        onError(error) {
            toast.error("Đã xảy ra lỗi")
        }
    })


    const handleConfirm = () => {
        confirmMutation.mutate()
    }
    const handleDelivering = () => {
        deliveringMutation.mutate()
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
    const handleDelivered = () => {
        deliveredMutation.mutate()
    }

    const handleAcceptReturn = () => {
        acceptReturnMutation.mutate()
    }
    return (
        <div className='px-[100px] py-20' >
            {deliveringMutation.isLoading && (
                <Loading />
            )}
            <div><Toaster position="top-center"
                reverseOrder={false} /></div>
            <div >
                <p className='text-3xl font-semibold'>Đơn hàng</p>

                <div className='grid grid-cols-2 gap-4'>
                    {data && data?.orderItems.map(product => {
                        return (
                            <div key={product.id} className='pt-10 flex space-x-[80px]'>
                                <div className='space-x-4'>
                                    <div className='space-y-6 pt-2'>
                                        <div className='flex space-x-4 items-center'>
                                            <p className='text-xl font-medium'>Sản phẩm</p>
                                            <p>{product.product.name}</p>
                                        </div>
                                        <div className='flex space-x-4 items-center text-left'>
                                            <p className='text-xl font-medium'>Số lượng:</p>
                                            <p>{product.quantity}</p>
                                        </div>
                                        <div className='flex space-x-4 items-center text-left'>
                                            <p className='text-xl font-medium'>Đơn giá:</p>
                                            <p>{formatCurrency(product.price)}</p>
                                        </div>

                                    </div>
                                </div>
                                <img src={product.product.mainImage} alt="" className='w-[200px] h-[200px]' />
                            </div>
                        )
                    })}
                </div>


            </div>
            <div className='pt-20 flex space-x-[200px]'>
                <div className='space-y-4'>
                    <div>
                        <p className='text-3xl font-semibold'>Địa chỉ giao hàng</p>
                        <div className='pt-4'>
                            <p className='text-lg'>{data?.deliveryAddress.address},{data?.deliveryAddress.ward},{data?.deliveryAddress.district} ,{data?.deliveryAddress.province}</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-3xl font-semibold'>Hình thức thanh toán</p>
                        <div className='pt-6'>
                            <p className='text-lg'>
                                {data?.paymentType === 'COD' ? 'Thanh toán khi nhận hàng' : 'Thanh toán qua VNPAY'}
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className='text-3xl font-semibold'>Hình thức giao hàng</p>
                        <div className='pt-6'>
                            <p className='text-lg'>
                                {data?.deliveryType === 'SHOP' ? 'Shop tự vận chuyển' : 'Giao hàng nhanh'}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className='text-3xl font-semibold'>Giá trị</p>
                    <div className='pt-6 space-y-4'>
                        <div className='flex space-x-[84px] items-center'>
                            <p className='text-xl font-medium'>Giá trị đơn hàng:</p>
                            <p className='font-medium text-lg'>{data?.amount ? formatCurrency(data.amount) : 0}</p>
                        </div>
                        <div className='flex space-x-[92px] items-center'>
                            <p className='text-xl font-medium'>Phí vận chuyển:</p>
                            <p className='font-medium text-lg'>{data?.deliveryFee ? formatCurrency(data.deliveryFee) : 0}</p>
                        </div>
                        <div className='flex space-x-[120px] items-center'>
                            <p className='text-xl font-medium'>Khuyến mãi:</p>
                            <p className='font-medium text-lg'>-{data?.voucher_discount ? formatCurrency(data.voucher_discount) : 0}</p>
                        </div>
                        <div className='flex space-x-[16px] items-center'>
                            <p className='text-xl font-medium'>Số tiền phải thanh toán:</p>
                            <p className='font-medium text-lg'>{data?.total ? formatCurrency(data.total) : 0}</p>
                        </div>
                    </div>
                </div>


            </div>
            <div className='pt-20 flex space-x-[300px]'>
                <div>
                    <p className='text-3xl font-semibold'>Trạng thái đơn hàng</p>
                    <div className='pt-8'>
                        <p className='text-lg'>{data?.status}</p>
                    </div>
                </div>
                <div >
                    <p className='text-3xl font-semibold'>Thao tác</p>
                    {data?.status !== "CANCEL" && (
                        <div className='flex space-x-2'>
                            {data?.status === 'WAITING' && data?.paymentType === "COD" && <BaseButton title='Confirm' handleClick={() => handleConfirm(orderId)} className='px-6 py-2 rounded-lg text-white bg-slate-600 mt-8' />}
                            {data?.status === 'PACKING' && <BaseButton title='Delivering' handleClick={() => handleDelivering(orderId)} className='px-6 py-2 rounded-lg text-white bg-slate-600 mt-8' />}
                            {(data?.status === 'CONFIRM' || data?.status === 'PAID'|| data?.status === 'PACKING') && <BaseButton title='Print Order' handleClick={() => handlePrintOrder(orderId)} className='px-6 py-2 rounded-lg text-white bg-slate-600 mt-8' />}
                            {data?.status === 'DELIVERING' && data?.deliveryType === 'SHOP' && <BaseButton title='Delivered' handleClick={() => handleDelivered(orderId)} className='px-6 py-2 rounded-lg text-white bg-slate-600 mt-8' />}
                            {data?.status === 'RETURN' && <BaseButton title='Accept Return' handleClick={() => handleAcceptReturn(orderId)} className='px-6 py-2 rounded-lg text-white bg-slate-600 mt-8' />}
                        </div>
                    )}
                </div>
            </div>


        </div>
    )
}

export default OrderAdminDetail