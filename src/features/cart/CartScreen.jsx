import React, { useState } from 'react'
import BaseButton from '../../components/button/BaseButton'
import TextInput from '../../components/input/TextInput'
import { AiFillTag } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const CartScreen = () => {
  const [count, setCount] = useState(1)

  const productCart = useSelector(state => state.cart.product)
  if (!productCart) {
    return (
      <div className="px-360px py-200px text-white font-semibold text-2xl text-center ">Cart is empty</div>
    )
  }
  return (
    <div className='px-[340px] pb-[100px]'>
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
                <th align='left' className='text-xl font-normal text-gray-700 w-[400px]'>Product</th>
                <th align='left' className='text-xl font-normal text-gray-700 w-16'>Price</th>
                <th align='left' className='text-xl font-normal text-gray-700 w-[110px]'>Quantity</th>
                <th align='left' className='text-xl font-normal text-gray-700'>Subtotal</th>
              </tr>
            </thead>
            <tbody className=''>
              <tr className=''>
                <td>
                  <div className='flex items-center'>
                    <div>
                      <img width={70} src="	https://luxcomforts.com/wp-content/uploads/2023/05/274841_1-300x300.jpg" alt="" />
                    </div>
                    <div className='pl-2 space-y-2' >
                      <p className='text-gray-500'>{productCart.name}</p>
                      <p>Estimated Delivery Date 07/19/2023 - 07/26/2023</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p>$94.05</p>
                </td>
                <td>
                  <div className='flex'>
                    <button className='py-2 px-2 border-[1px]' onClick={() => { if (count > 0) setcount(count - 1) }}>-</button>
                    <p className='py-2 px-3 border-[1px]'>{productCart.quantity}</p>
                    <button className='py-2 px-2 border-[1px]' onClick={() => setcount(count + 1)}>+</button>
                  </div>
                </td>
                <td>$94.05</td>
              </tr>
            </tbody>
          </table>

          <div className="flex space-x-5 pt-5">
            <BaseButton title="CONTINUE SHOPPING" className='py-2 px-5 bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white' />
            <BaseButton title="UPDATE CART" className='py-2 px-4 text-white' />
          </div>
        </div>

        <div className='mt-[50px] pl-4 border-l-2'>
          <p className='text-xl w-full border-b-4 pb-[2px]'>Cart ToTals</p>
          <div className='pt-8 space-y-4'>
            <div className='flex justify-between  border-b-2'>
              <p>Subtotal</p>
              <p>$94.05</p>
            </div>
            <div className='flex justify-between  border-b-2'>
              <p>Tax</p>
              <p>$0.00</p>
            </div>
            <div className='flex justify-between  border-b-2'>
              <p>Total</p>
              <p>$94.05</p>
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

            <TextInput placeholder=" Coupon code" className='w-full mt-5' />
            <BaseButton title='Apply coupon' className='w-full py-3 mt-7 text-white' />
          </div>
        </div>


      </div>

    </div>


  )
}

export default CartScreen