import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { axiosInstance } from '../../services/axios.config';

const PaymentSuccess = () => {
    const [params, setParams] = useState('')
    useEffect(() => {
        const currentUrl = window.location.href;
        const urlSearchParams = new URLSearchParams(currentUrl.split('?')[1]);
        const params = {};
        for (const [key, value] of urlSearchParams.entries()) {
            params[key] = value;
        }

        // const a =
        // {
        //     "vnp_Amount": "1400000000",
        //     "vnp_BankCode": "NCB",
        //     "vnp_CardType": "ATM",
        //     "vnp_OrderInfo": "Thanh toan don hang: 30T39IW1U",
        //     "vnp_PayDate": "20230814222634",
        //     "vnp_ResponseCode": "24",
        //     "vnp_TmnCode": "NVWUQGML",
        //     "vnp_TransactionNo": "14092287",
        //     "vnp_TransactionStatus": "02",
        //     "vnp_TxnRef": "30T39IW1U",
        //     "vnp_SecureHash": "5d58ea009a1b2e9dea7fc9d663183ad43842e3dea3013c6938c5296beb325e8cd764b0398da9eb55eada75e22b11ecfea6e444979064b176a625e251823c0b17"
        // }
        // const b =
        // {
        //     "vnp_Amount": "1400000000",
        //     "vnp_BankCode": "NCB",
        //     "vnp_BankTranNo": "VNP14092289",
        //     "vnp_CardType": "ATM",
        //     "vnp_OrderInfo": "Thanh toan don hang: 31XQHUV4X",
        //     "vnp_PayDate": "20230814222857",
        //     "vnp_ResponseCode": "00",
        //     "vnp_TmnCode": "NVWUQGML",
        //     "vnp_TransactionNo": "14092289",
        //     "vnp_TransactionStatus": "00",
        //     "vnp_TxnRef": "31XQHUV4X",
        //     "vnp_SecureHash": "d9f891fc4e1f37920a574a7851f3b7d5f85a63896f8f817c956ad51c6cef5570cc8b3cf71fca649be2db62cc7aa3f591f936ef602e82d11e4c7b70f190086601"
        // }


        setParams(params)
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
            <div className='text-center text-3xl font-bold pt-[200px]'>{params.vnp_TransactionStatus === '00' ? 'Bạn đã thanh toán đơn hàng thành công' : 'Đơn hàng của bạn chưa được thanh toán'}</div>
            <div className='pt-8 pb-10 text-xl text-primary text-center'>
                <Link to='/order'>Bạn có thể xem chi tiết đơn hàng của mình</Link>
            </div>

        </div>
    )


}

export default PaymentSuccess