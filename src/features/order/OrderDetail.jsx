import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getOrderById } from './services/GetOrderById'
import ProductImage from '../product-detail/ProductImage';
import { formatCurrency } from '../../services/formatCurrency';
import BaseButton from '../../components/button/BaseButton';
import { cancelOrder } from './services/CancelOrder';
import { finishOrder } from './services/FinishOrder';
import { returnOrder } from './services/ReturnOrder';
import { repaymentOrder } from './services/RepaymentOrder';
import { Toaster, toast } from 'react-hot-toast';


const OrderDetail = () => {

    const { orderId } = useParams()
    const queryClient = useQueryClient()
    console.log(orderId)
    const { data, isError, isSuccess } = useQuery({ queryKey: ['orderDetail', orderId], queryFn: () => getOrderById(orderId) })
    console.log(data)
    if (isError) {
        return (
            <div> Đã có lỗi xảy ra</div>
        )
    }

    const cancelMutation = useMutation(() => cancelOrder(orderId), {
        onSuccess(data) {
            toast.success("Bạn đã hủy đơn hàng thành công")
            queryClient.invalidateQueries('orderDetail')
        }
    })
    const repaymentMutation = useMutation(() => repaymentOrder(orderId), {
        onSuccess(data) {
            if (data.message) {
                window.open(data.message, '_blank')
            } else {
                console.log(data)
            }
        },
        onError(err) {
            toast.error("Đã có lỗi xảy ra")
        }

    })
    const finishMutation = useMutation(() => finishOrder(orderId), {
        onSuccess(data) {
            toast.success("Bạn đã xác nhận đơn hàng được giao đến bạn")
            queryClient.invalidateQueries('orderDetail')
        },
        onError(err) {
            toast.error("Đã có lỗi xảy ra")
        }
    })
    const returnMutation = useMutation(() => returnOrder(orderId), {
        onSuccess(data) {
            toast.success("Bạn đã yêu cầu trả lại đơn hàng")
            queryClient.invalidateQueries('orderDetail')
        },
        onError(err) {
            toast.error("Đã có lỗi xảy ra")
        }
    })

    const handleCancel = () => {
        cancelMutation.mutate()
    }
    const handleRepayment = () => {
        repaymentMutation.mutate()
    }
    const handleFinish = () => {
        finishMutation.mutate()
    }
    const handleReturn = () => {
        returnMutation.mutate()
    }

    return (
        <div className='px-[380px] py-20' >
            <div>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
            </div>
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
                    {data?.status !== "CANCELLED" && (
                        <div className='flex space-x-2'>
                            {(data?.status === "WAITING" || data?.status === "CONFIRM" || data?.status === "PAID") && < BaseButton title='Cancel' handleClick={() => handleCancel(orderId)} className='px-6 py-2 rounded-lg text-white bg-slate-600 mt-8' />}
                            {data?.status === 'WAITING' && data?.paymentType === 'ONLINE' && <BaseButton title='Thanh toán' handleClick={() => handleRepayment(orderId)} className='px-6 py-2 rounded-lg text-white bg-slate-600 mt-8' />}
                            {data?.status === 'DELIVERED' && <BaseButton title='Finish' handleClick={() => handleFinish(orderId)} className='px-6 py-2 rounded-lg text-white bg-slate-600 mt-8' />}
                            {data?.status === 'DELIVERED' && <BaseButton title='Return' handleClick={() => handleReturn(orderId)} className='px-6 py-2 rounded-lg text-white bg-slate-600 mt-8' />}
                        </div>
                    )}
                </div>
            </div>


        </div>
    )
}

export default OrderDetail