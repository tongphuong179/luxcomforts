import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useSelector } from 'react-redux'
import { getOrderById } from './services/GetOrderByUser'

const OrderScreen = () => {

    const currentUser = useSelector(state => state.auth.currentUser)
    const userId = currentUser.id

    const { data } = useQuery(['order', userId], () => getOrderById(userId))

    console.log(data)


    return (
        <div>OrderScreen</div>
    )
}

export default OrderScreen