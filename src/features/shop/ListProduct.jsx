import React, { useEffect } from 'react'
import ProductCard from '../product/ProductCard'
import Pagination from './Pagination'
import { useQuery } from '@tanstack/react-query'
import { getAllProduct } from './services/GetAllProduct'
import { useNavigate } from 'react-router-dom'


const ListProduct = () => {

    const navigate = useNavigate()

    // useEffect(() => {
    //     const getAllProduct = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:9090/api/products");
    //             console.log(res.data)
    //             return res.data;

    //         } catch (error) {
    //             throw new Error(error.response.data);
    //         }
    //     };
    //     getAllProduct()
    // }, [])
    const { data } = useQuery({ queryKey: ['products'], queryFn: getAllProduct })
    console.log(data)
    return (
        <div>
            <div className='grid grid-cols-3 gap-3'>
                {data?.map(product => {
                    return (
                        <ProductCard key={product.id} product={product} />
                    )
                })}
            </div>
            <div className='flex items-center justify-center py-10 cursor-pointer'>
                <Pagination />
            </div>
        </div>
    )
}

export default ListProduct