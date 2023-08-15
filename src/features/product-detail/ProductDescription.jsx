import React from 'react'
import BaseButton from '../../components/button/BaseButton'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCart } from '../cart/state/CartSlice'
import formatDate from '../admin/features/discount/services/formarDate';
import { formatCurrency } from '../../services/formatCurrency';


const ProductDescription = ({ description, price_discount }) => {

    const currentDate = Date.now();
    const estimatedDeliveryDate = new Date(currentDate);
    estimatedDeliveryDate.setDate(estimatedDeliveryDate.getDate() + 5);

    const [count, setcount] = useState(1)
    const carts = useSelector(state => state.cart.carts)

    const dispatch = useDispatch()

    const handleAddToCart = (id) => {
        const index = carts.findIndex(item => item.id === id)
        const productCarts = [...carts]

        if (index !== -1) {
            productCarts[index] = {
                ...productCarts[index],
                quantity: productCarts[index].quantity + count,
                price_discount: price_discount
            }
        }
        else {
            const product = { ...description, quantity: count, price_discount: price_discount }
            productCarts.push(product)
        }

        dispatch(addCart(productCarts))
    }
    return (
        <div className='pt-20'>
            <div>
                <p className='text-xl text-gray-800 font-medium'>{description.name}</p>
                <p className='text-lg pt-4 text-gray-600'>{description.description}</p>
                <div className='flex items-center space-x-2 pt-5 text-2xl'>
                    {(price_discount !== null && price_discount !== description.price) ? ( // Render the discounted price if discountPrice is available
                        <>
                            <p className='font-light text-gray-500 line-through'>{formatCurrency(description.price)}</p>
                            <p>{formatCurrency(price_discount)}</p> {/* Use the discountPrice prop */}
                        </>
                    ) : (
                        <p>{formatCurrency(description.price)}</p>
                    )}
                </div>

                <p className='text-gray-400 text-sm pt-3'>{description.inventory} in stock</p>
                <div className='flex items-center space-x-6 pt-5' >
                    <div className='flex'>
                        <button className='py-2 px-2 border-[1px]' onClick={() => { if (count > 1) setcount(count - 1) }}>-</button>
                        <p className='py-2 px-3 border-[1px]'>{count}</p>
                        <button className='py-2 px-2 border-[1px]' onClick={() => { if (count < description.inventory) setcount(count + 1) }}>+</button>
                    </div>
                    <div>
                        <BaseButton handleClick={() => handleAddToCart(description.id)} title="ADD TO CART" className="px-3 py-2 bg-red-500 rounded-xl text-white" />
                    </div>

                </div>
                <div className='pt-5'>
                    <img src="https://luxcomforts.com/wp-content/uploads/2021/07/payment_method.jpg" alt="" />
                </div>
                {/* <p className='pt-5 text-gray-600'>Estimated Delivery Date {formatDate(Date.now())} -{formatDate(estimatedDeliveryDate)} </p>
                <p className='pt-5'>Usually ships within 2 Business Days</p> */}
            </div>
        </div>
    )
}

export default ProductDescription