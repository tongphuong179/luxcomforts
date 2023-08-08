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
import { checkout } from './services/Checkout'
import { order } from './services/Order'
import SelectAddress from './SelectAddress'
import { pays, shippings } from './constant/constant'
import ControllerRadioGroup from '../../components/input/radio/ControllerRadio'
import Loading from '../../components/loading/Loading'
import { getAddressByUser } from './services/getAddressByUser'
import ControllerSelect from '../../components/select/ControllerSelect'




const CartScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const currentUser = useSelector(state => state.auth.currentUser)
  const address = useSelector(state => state.auth.address)
  const carts = useSelector(state => state.cart.carts)


  const [selectedDataCheckout, setSelectedDataCheckout] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null);


  const { register, handleSubmit, control, onChange, watch, reset } = useForm()

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  }


  const { data: userAddress, isSuccess } = useQuery(
    ['address', currentUser.id],
    () => getAddressByUser(currentUser.id),
    {
      select: (data) =>
        data.map(item => ({
          value: item.id,
          label: `${item.address},${item.ward}, ${item.district} ,${item.province} `
        }))

    }
  )


  const cartCheckout = carts.map(cart => ({
    productId: cart.id,
    quantity: cart.quantity
  }))

  const dataCheckout = {
    paymentType: "COD",
    deliveryType: 'SHOP',
    voucherCode: "",
    deliveryAddress: {
      id: userAddress && userAddress[0]?.value
    },
    user: {
      id: currentUser.id
    },
    orderItemDTOS: cartCheckout
  }

  const checkoutMutation = useMutation(checkout, {
    onSuccess(data) {
      console.log(data)
      setSelectedDataCheckout(data)
    },
    onError(err) {
      alert(err)
      reset({
        voucher: ''
      })
    }
  })

  const orderMutation = useMutation(order, {
    onSuccess(data) {
      if (data.message) {
        window.open(data.message, '_blank')
      } else {
        alert("Bạn đã đặt hàng thành công ")
      }
    },
    onError(err) {

    }

  })


  useEffect(() => {
    if (userAddress) {
      checkoutMutation.mutate(dataCheckout);
    }

  }, [userAddress]);


  const handleSelectAddress = (address) => {
    console.log(address);
    const dataCheckoutUpdate = {
      ...dataCheckout,
      deliveryAddress: {
        id: address.value
      }
    }
    checkoutMutation.mutate(dataCheckoutUpdate)

    setSelectedAddress(address);
  }

  const handleSelectShip = (newValue) => {
    const dataCheckoutUpdate = {
      ...dataCheckout,
      deliveryType: newValue,
      deliveryAddress: {
        id: selectedAddress ? selectedAddress.value : null // Sử dụng địa chỉ mới nhất hoặc null nếu chưa có địa chỉ mới
      }
    }
    checkoutMutation.mutate(dataCheckoutUpdate)
  }

  const handleApply = async (data) => {
    const dataCheckoutUpdate = {
      ...dataCheckout,
      voucherCode: data.voucher
    }
    console.log(dataCheckoutUpdate)
    checkoutMutation.mutate(dataCheckoutUpdate)
  }


  const handleOrder = (data) => {
    const dataCheckoutOrder = {
      ...dataCheckout,
      paymentType: data.selectedPays,
      deliveryType: data.selectedShipping,
      voucherCode: data.voucher,
    }
    console.log(dataCheckoutOrder)
    orderMutation.mutate(dataCheckoutOrder)
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

  const previousCartsRef = useRef(carts); // Lưu trạng thái trước của carts bằng useRef

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

    // So sánh sự thay đổi của carts trước và sau khi thay đổi số lượng
    if (JSON.stringify(previousCartsRef.current) !== JSON.stringify(productCarts)) {
      checkoutMutation.mutate({
        ...dataCheckout,
        orderItemDTOS: productCarts.map(cart => ({
          productId: cart.id,
          quantity: cart.quantity
        }))
      });
      previousCartsRef.current = productCarts; // Cập nhật trạng thái trước của carts
    }
  }

  const handleAdd = (id) => {
    const index = carts.findIndex(product => product.id === id)
    const productCarts = [...carts]
    productCarts[index] = {
      ...productCarts[index],
      quantity: productCarts[index].quantity + 1
    }
    dispatch(addCart(productCarts))

    // So sánh sự thay đổi của carts trước và sau khi thay đổi số lượng
    if (JSON.stringify(previousCartsRef.current) !== JSON.stringify(productCarts)) {
      checkoutMutation.mutate({
        ...dataCheckout,
        orderItemDTOS: productCarts.map(cart => ({
          productId: cart.id,
          quantity: cart.quantity
        }))
      });
      previousCartsRef.current = productCarts; // Cập nhật trạng thái trước của carts
    }
  }

  const handleDelete = (id) => {
    const productCarts = [...carts]
    const newProductCarts = productCarts.filter(item => item.id !== id)
    dispatch(addCart(newProductCarts))

    // So sánh sự thay đổi của carts trước và sau khi thay đổi số lượng
    if (JSON.stringify(previousCartsRef.current) !== JSON.stringify(newProductCarts)) {
      checkoutMutation.mutate({
        ...dataCheckout,
        orderItemDTOS: newProductCarts.map(cart => ({
          productId: cart.id,
          quantity: cart.quantity
        }))
      });
      previousCartsRef.current = newProductCarts; // Cập nhật trạng thái trước của carts
    }
  }
  const totals = carts.reduce((total, cart) => {
    return total + (cart.quantity * cart.price_discount)
  }, 0)

  return (
    <div className='px-[80px] 2xl:px-[200px] pb-[100px]'>
      {checkoutMutation.isLoading && (
        <Loading />
      )}
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
                <th align='left' className='text-xl font-normal text-gray-700 w-[120px]'>Price</th>
                <th align='left' className='text-xl font-normal text-gray-700 w-[120px]'>Quantity</th>
                <th align='right' className='text-xl font-normal text-gray-700 w-[120px]'>Subtotal</th>
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
                        <div className='pl-4 space-y-2' >
                          <p className='text-gray-500'>{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>{formatCurrency(product.price_discount)}</p>
                    </td>
                    <td>
                      <div className='flex'>
                        <button className='py-2 px-2 border-[1px]' onClick={() => handleSubtract(product.id)}>-</button>
                        <p className='py-2 px-3 border-[1px]'>{product.quantity}</p>
                        <button className='py-2 px-2 border-[1px]' onClick={() => handleAdd(product.id)}>+</button>
                      </div>
                    </td>
                    <td align='right'>{formatCurrency(product.quantity * product.price_discount)} </td>
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
              <ControllerRadioGroup
                name="selectedShipping"
                control={control}
                options={shippings}
                defaultValue="SHOP"
                value={selectedAddress}
                onChange={(newValue) => handleSelectShip(newValue)
                }
              />
            </div>
          </div>
          <div className='pt-10'>
            <p className='text-xl font-medium'>Địa chỉ giao hàng</p>
            {userAddress &&
              <div className='pt-10'>
                <ControllerSelect
                  name='address'
                  control={control}
                  options={userAddress}
                  defaultValue={userAddress[0]}
                  onChange={(address) => {
                    setSelectedAddress(address); // Cập nhật giá trị địa chỉ mới khi người dùng thay đổi
                    handleSelectAddress(address);

                  }}
                />
              </div>
            }
          </div>
        </div>

        <div className='mt-[50px] pl-4 border-l-2'>
          <p className='text-xl w-full border-b-4 pb-[2px]'>Cart ToTals</p>
          <div className='py-8'>
            <div className='flex items-center space-x-2 w-full border-b-4 pb-2'>
              <AiFillTag />
              <p className='text-gray-600'>Mã giảm giá</p>
            </div>


            <form onSubmit={handleSubmit(handleApply)}>
              <TextInput placeholder="Nhập mã giảm giá" className='w-full mt-5' {...register('voucher')} />
              <BaseButton title='Áp dụng' className='w-full py-3 mt-7 text-white' />
            </form>
          </div>


          <div className='pt-8 space-y-6'>
            <div className='flex justify-between  border-b-2'>
              <p>Giá trị đơn hàng</p>
              <p>{formatCurrency(totals)}</p>
            </div>
            <div className='flex justify-between  border-b-2'>
              <p>Phí vận chuyển</p>
              <p>{selectedDataCheckout ? formatCurrency(selectedDataCheckout.deliveryFee) : 0}</p>
            </div>
            <div className='flex justify-between  border-b-2'>
              <p>Khuyến mãi</p>
              <p>-{formatCurrency(selectedDataCheckout.voucher_discount)}</p>
            </div>
            <div className='flex justify-between  border-b-2'>
              <p>Số tiền bạn cần thanh toán</p>
              <p>{selectedDataCheckout ? formatCurrency(selectedDataCheckout.total) : totals}</p>
            </div>
          </div>

          <p className=' text-xl font-medium pt-14'>Hình thức thanh toán</p>


          <form onSubmit={handleSubmit(handleOrder)} className='py-5 items-center'>
            <ControllerRadioGroup
              name="selectedPays"
              control={control}
              defaultValue="ONLINE"
              options={pays}
              onChange={(newValue) => {
                console.log('Selected pay:', newValue);
              }}
            />
            {/* <ControllerRadio name="selectedPay" control={control} options={pays} /> */}
            <div className="text-center">
              <BaseButton title='Tiến hành đặt hàng' className='px-32 py-4 text-white font-medium rounded-xl mt-20 w-full' />
            </div>
          </form>
        </div>


      </div>

    </div>
  )

}

export default CartScreen