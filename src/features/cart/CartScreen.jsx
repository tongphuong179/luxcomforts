import React, { useEffect, useState, useRef } from 'react'
import BaseButton from '../../components/button/BaseButton'
import TextInput from '../../components/input/TextInput'
import { AiFillTag } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, removeCart } from './state/CartSlice'
import { TiDeleteOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { applyVoucher } from './services/ApplyVoucher'
import { axiosInstance } from '../../services/axios.config'
import RadioController from '../../components/input/radio/ControllerRadio'
import MyRadioGroup from '../../components/input/radio/ControllerRadio'
import ControllerRadio from '../../components/input/radio/ControllerRadio'
import { checkout } from './services/Checkout'
import { order } from './services/Order'




const CartScreen = () => {
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.auth.currentUser)
  console.log(currentUser);


  const dispatch = useDispatch()
  const carts = useSelector(state => state.cart.carts)
  console.log(carts);
  const { register, handleSubmit, control, watch } = useForm()
  const [dataCheckout, setDataCheckout] = useState('')
  const [selectedShipping, setSelectedShipping] = useState('SHOP');

  const pays = [
    {
      value: 'COD',
      label: 'Thanh toán khi nhận hàng',
    },
    {
      value: 'ONLINE',
      label: 'Thanh toán qua VnPay',
    },
  ];

  const shippings = [
    {
      value: 'GHN',
      label: 'Giao hàng nhanh',
    },
    {
      value: 'SHOP',
      label: 'Shop tự vận chuyển',
    },
  ]
  const cartCheckout = carts.map(cart => ({
    productId: cart.id,
    quantity: cart.quantity
  }))
  console.log(cartCheckout)





  const checkoutData =
  // {
  //   paymentType: "COD",
  //   deliveryType: selectedShipping,
  //   voucherCode: "",
  //   deliveryAddress: {
  //     id: 7
  //   },
  //   user: {
  //     username: currentUser.username
  //   },
  //   orderItemDTOS: cartCheckout
  // }
  {
    "paymentType": "COD",
    "deliveryType": "GHN",
    "voucherCode": "",
    "deliveryAddress": {
      "id": 7
    },
    "user": {
      "id": 3
    },
    "orderItemDTOS": [
      {
        "productId": 1,
        "quantity": 1
      }
    ]
  }


  useEffect(() => {
    const postCheckout = async () => {
      try {
        const res = await axiosInstance.post('/order/checkout', checkoutData)
        setDataCheckout(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    postCheckout()
  }, []);



  const onSubmit = async (data) => {
    const dataUpdate = {
      ...checkoutData,
      deliveryType: data.selectedShipping,

    }

    const res = await axiosInstance.post('/order/checkout', dataUpdate)
    setDataCheckout(res.data)

  }
  const handleApply = async (data) => {
    const dataApply = {
      ...checkoutData,
      voucherCode: data.voucher
    }
    try {
      const res = await axiosInstance.post('/order/checkout', dataApply)
      alert("Áp dụng voucher thành công")
      setDataCheckout(res.data)
    } catch (error) {
      alert("Voucher không hợp lệ hoặc đã hết hạn sử dụng")
    }
  }

  const orderMutation = useMutation(order, {
    onSuccess(data) {
      if (data.message) {
        window.open(data.message, '_blank')
      } else {
        alert("Bạn đã đặt hàng thành công ")
      }
    }
  })
  const handleOrder = (data) => {
    const orderData = {
      ...checkoutData,
      deliveryType: data.selectedShipping,
      voucherCode: data.voucher,
      paymentType: data.selectedPay,

    }
    console.log(orderData);
    orderMutation.mutate(orderData)

  }











  if (carts.length === 0) {
    return (
      <div>
        <div className='flex pt-10 justify-center space-x-4'>
          <p className='text-3xl'>SHOPPING CART</p>
          <span className='text-3xl text-gray-400'>&gt;</span>
          <p className='text-3xl text-gray-400'>CHECKOUT DETAILS</p>
          <span className='text-3xl text-gray-400'>&gt;</span>
          <p className='text-3xl text-gray-400'>ORDER COMPLETE</p>
        </div>
        <div className='text-2xl font-semibold py-[200px] text-center'>
          Cart is Empty
        </div>
      </div>
    )
  }
  const handleSubtract = (id) => {
    const index = carts.findIndex(product => product.id === id)
    const productCarts = [...carts]
    productCarts[index] = {
      ...productCarts[index],
      quantity: productCarts[index].quantity - 1
    }
    if (productCarts[index].quantity == 0) {
      productCarts.splice(index, 1);
    }
    dispatch(addCart(productCarts))
  }
  const handleAdd = (id) => {
    const index = carts.findIndex(product => product.id === id)
    const productCarts = [...carts]
    productCarts[index] = {
      ...productCarts[index],
      quantity: productCarts[index].quantity + 1
    }
    dispatch(addCart(productCarts))
  }
  const handleDelete = (id) => {
    const productCarts = [...carts]
    const newProductCarts = productCarts.filter(item => item.id !== id)
    dispatch(addCart(newProductCarts))
  }
  const totals = carts.reduce((total, cart) => {
    return total + (cart.quantity * cart.price_discount)
  }, 0)






  return (
    <div className='px-[280px] pb-[100px]'>
      <div className='flex pt-10 justify-center space-x-4'>
        <p className='text-3xl'>SHOPPING CART</p>
        <span className='text-3xl text-gray-400'>&gt;</span>
        <p className='text-3xl text-gray-400'>CHECKOUT DETAILS</p>
        <span className='text-3xl text-gray-400'>&gt;</span>
        <p className='text-3xl text-gray-400'>ORDER COMPLETE</p>
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div className='mt-[50px]'>
          <table className='border-b-2 '>
            <thead className='border-b-4'>
              <tr className=''>
                <th align='left' className='text-xl font-normal text-gray-700 w-[50px]'></th>
                <th align='left' className='text-xl font-normal text-gray-700 w-[400px]'>Product</th>
                <th align='left' className='text-xl font-normal text-gray-700 w-[90px]'>Price</th>
                <th align='left' className='text-xl font-normal text-gray-700 w-[90px]'>Quantity</th>
                <th align='right' className='text-xl font-normal text-gray-700 w-[90px]'>Subtotal</th>
              </tr>
            </thead>
            <tbody className=''>
              {carts.map(product => {
                return (
                  <tr key={product.id} className=''>
                    <td>
                      <div onClick={() => handleDelete(product.id)}>
                        <TiDeleteOutline size={32} className='cursor-pointer hover:bg-slate-200' />
                      </div>
                    </td>
                    <td className='py-6'>
                      <div className='flex items-center'>
                        <div>
                          <img width={70} src={product.mainImage} alt="" />
                        </div>
                        <div className='pl-2 space-y-2' >
                          <p className='text-gray-500'>{product.name} - {product.description}</p>
                          <p>Estimated Delivery Date 07/19/2023 - 07/26/2023</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>${product.price_discount}</p>
                    </td>
                    <td>
                      <div className='flex'>
                        <button className='py-2 px-2 border-[1px]' onClick={() => handleSubtract(product.id)}>-</button>
                        <p className='py-2 px-3 border-[1px]'>{product.quantity}</p>
                        <button className='py-2 px-2 border-[1px]' onClick={() => handleAdd(product.id)}>+</button>
                      </div>
                    </td>
                    <td align='right'>${product.quantity * product.price_discount} </td>
                  </tr>
                )
              })}

            </tbody>
          </table>

          <div className="flex space-x-5 pt-5">
            <BaseButton handleClick={() => navigate('/shop')} title="CONTINUE SHOPPING" className='py-2 px-5 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white' />
            <BaseButton title="REMOVE CART" className='py-2 px-4 text-white' handleClick={() => dispatch(removeCart())} />
          </div>

          <div>
            <p className='text-xl font-medium pt-14'>Hình thức giao hàng</p>
            <div className='pt-7'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ControllerRadio
                  name="selectedShipping"
                  control={control}
                  options={shippings}
                />
                <BaseButton title="cập nhật" className='px-4 py-1 text-white rounded-lg mt-4' />
              </form>

            </div>
          </div>
          <div>
            <p className='text-xl font-medium pt-14'>Địa chỉ giao hàng</p>
            <div className='pt-7'>
              <p>Phường Dịch Vọng , Cầu Giấy , Hà Nội</p>
            </div>
          </div>
        </div>

        <div className='mt-[50px] pl-4 border-l-2'>
          <p className='text-xl w-full border-b-4 pb-[2px]'>Cart ToTals</p>


          <div className='py-8'>
            <div className='flex items-center space-x-2 w-full border-b-4 pb-2'>
              <AiFillTag />
              <p className='text-gray-600'>Voucher</p>
            </div>


            <form onSubmit={handleSubmit(handleApply)}>
              <TextInput placeholder=" Coupon code" className='w-full mt-5' {...register('voucher')} />
              <BaseButton title='Apply coupon' className='w-full py-3 mt-7 text-white' />
            </form>
          </div>


          <div className='pt-8 space-y-4'>
            <div className='flex justify-between  border-b-2'>
              <p>Subtotal</p>
              <p>${totals}</p>
            </div>
            <div className='flex justify-between  border-b-2'>
              <p>Tax</p>
              <p>${dataCheckout?.deliveryFee}</p>
            </div>
            <div className='flex justify-between  border-b-2'>
              <p>Total</p>
              <p>${dataCheckout?.total}</p>
            </div>
          </div>

          <p className=' text-xl font-medium pt-14'>Hình thức thanh toán</p>


          <form onSubmit={handleSubmit(handleOrder)} className='py-5 items-center'>
            {/* Use the RadioGroupController */}
            <ControllerRadio name="selectedPay" control={control} options={pays} />
            <div className="text-center">
              <BaseButton title='Đặt hàng' className='px-32 py-4 text-white font-medium rounded-xl mt-20 ' />
            </div>


          </form>




        </div>


      </div>

    </div>
  )

}

export default CartScreen