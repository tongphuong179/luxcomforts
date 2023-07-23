import React, { useEffect } from 'react'
import ProductCard from '../product/ProductCard'
import Pagination from './Pagination'
import { useQuery } from '@tanstack/react-query'
import { getAllProduct } from './services/GetAllProduct'
import { useNavigate } from 'react-router-dom'


const ListProduct = () => {

    const navigate = useNavigate()


    const { data } = useQuery({ queryKey: ['products'], queryFn: getAllProduct })
    console.log(data)
    return (
        <div>
            <div className='grid grid-cols-3 gap-3'>
                {data?.map((productData) => {
                    const { product, price_discount } = productData;

                    return (

                        <ProductCard
                            key={product.id}
                            product={product}
                            discountPrice={price_discount}
                        />
                    );

                })}
            </div>
            <div className='flex items-center justify-center py-10 cursor-pointer'>
                <Pagination />
            </div>
        </div>
    );
}

export default ListProduct