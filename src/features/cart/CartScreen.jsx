import React, { useState } from 'react'
import BaseButton from '../../components/button/BaseButton'
import TextInput from '../../components/input/TextInput'
import { AiFillTag } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { addCart, removeCart } from './state/CartSlice'
import { TiDeleteOutline } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { applyVoucher } from './services/ApplyVoucher'
import { axiosInstance } from '../../services/axios.config'


const CartScreen = () => {
  const navigate = useNavigate()
  const currentUser = useSelector(state => state.auth.currentUser)


  const dispatch = useDispatch()
  const carts = useSelector(state => state.cart.carts)
  const { register, handleSubmit } = useForm()





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
    return total + (cart.quantity * cart.price)
  }, 0)

  const onSubmit = async (data) => {
    try {
      const res = await axiosInstance.get(`/voucher/apply?voucherCode=${data.voucher}&username=${currentUser.username}`)
    } catch (error) {
      console.error(error);
    }
  }

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
                      <p>${product.price}</p>
                    </td>
                    <td>
                      <div className='flex'>
                        <button className='py-2 px-2 border-[1px]' onClick={() => handleSubtract(product.id)}>-</button>
                        <p className='py-2 px-3 border-[1px]'>{product.quantity}</p>
                        <button className='py-2 px-2 border-[1px]' onClick={() => handleAdd(product.id)}>+</button>
                      </div>
                    </td>
                    <td align='right'>${product.quantity * product.price} </td>
                  </tr>
                )
              })}

            </tbody>
          </table>

          <div className="flex space-x-5 pt-5">
            <BaseButton handleClick={() => navigate('/shop')} title="CONTINUE SHOPPING" className='py-2 px-5 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white' />
            <BaseButton title="REMOVE CART" className='py-2 px-4 text-white' handleClick={() => dispatch(removeCart())} />
          </div>
        </div>

        <div className='mt-[50px] pl-4 border-l-2'>
          <p className='text-xl w-full border-b-4 pb-[2px]'>Cart ToTals</p>
          <div className='pt-8 space-y-4'>
            <div className='flex justify-between  border-b-2'>
              <p>Subtotal</p>
              <p>${totals}</p>
            </div>
            <div className='flex justify-between  border-b-2'>
              <p>Tax</p>
              <p>$0.00</p>
            </div>
            <div className='flex justify-between  border-b-2'>
              <p>Total</p>
              <p>${totals}</p>
            </div>
          </div>

          <div className='pt-7 text-center flex justify-center'>
            <img width={350} src="https://static.afterpay.com/button/checkout-with-afterpay/black-on-mint.svg" alt="" />
          </div>

          <div className='py-8'>
            <BaseButton title="PROCEED TO CHECKOUT" className="w-full py-3 bg-red-600 text-white font-medium text-xl" />
            <p className='text-center py-5 text-gray-400'>or</p>
            <BaseButton title="VN PAY" className="w-full py-3 bg-blue-600 text-white font-medium text-xl" />
          </div>

          <div>
            <div className='flex items-center space-x-2 w-full border-b-4 pb-2'>
              <AiFillTag />
              <p className='text-gray-600'>Coupon</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput placeholder=" Coupon code" className='w-full mt-5' {...register('voucher')} />
              <BaseButton title='Apply coupon' className='w-full py-3 mt-7 text-white' />
            </form>

          </div>
        </div>


      </div>

    </div>
  )

}

export default CartScreen