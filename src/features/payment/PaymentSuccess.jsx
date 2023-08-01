import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../../services/axios.config';

const PaymentSuccess = () => {
    useEffect(() => {
        const currentUrl = window.location.href;
        const urlSearchParams = new URLSearchParams(currentUrl);
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
        <div className='text-center text-3xl font-bold py-[200px]'>Bạn đã thanh toán thành công</div>
    )
}

export default PaymentSuccess