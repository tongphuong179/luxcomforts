import axios from 'axios';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { axiosInstance } from '../../services/axios.config';

const PaymentSuccess = () => {
    useEffect(() => {
        const currentUrl = window.location.href;
        const urlSearchParams = new URLSearchParams(currentUrl.split('?')[1]);
        const params = {};
        for (const [key, value] of urlSearchParams.entries()) {
            params[key] = value;
        }


        console.log(params);
        const postData = async () => {
            try {
                const res = await axiosInstance.post('/order/result', params)
                return res.data
            } catch (error) {
                console.log(error);
            }

        }
        postData()


    }, []);



    return (
        <div>
            <div className='text-center text-3xl font-bold pt-[200px]'>Bạn đã thanh toán thành công</div>
            <div className='pt-8 pb-10 text-xl text-primary text-center'>
                <Link to='/order'>Bạn có thể xem chi tiết đơn hàng của mình</Link>
            </div>

        </div>
    )
}

export default PaymentSuccess