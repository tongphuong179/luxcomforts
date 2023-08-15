import React from 'react'
import ProductImage from './ProductImage'
import ProductDescription from './ProductDescription'
import ProductSimilar from './ProductSimilar'
import { useParams } from 'react-router-dom'
import { useQueries, useQuery } from '@tanstack/react-query'
import { getProductById } from './services/getProductById'
import { formatCurrency } from '../../services/formatCurrency';


const ProductDetailScreen = () => {
    const { productId } = useParams()


    const { data } = useQuery({ queryKey: ['product', productId], queryFn: () => getProductById(productId) })
    console.log(data);
    return (
        <div>
            <div className=" grid grid-cols-2 gap-6 px-[380px]">
                {data && <ProductImage product={data.product} />}

                {data && <ProductDescription description={data.product} price_discount={data.price_discount} />}


            </div>

            <div className='px-[380px]'>
                {/* This section seems to display some product information. */}
                <div className='flex space-x-4'>
                    <p>PRODUCT SPECS</p>
                    <p>SHIPPING INFO</p>
                </div>
                {/* Displaying the product description from `data.product`. */}
                <p className='pt-5'>{data && data.product.description}</p>
                {/* Displaying the discount price from `data.discount_price`. */}
                {/* {data && data.price_discount && (
                    <p className='pt-5'>Discounted Price: {formatCurrency(data.price_discount)} </p>
                )} */}
            </div>
            <div className='px-[380px]'>
                {/* The `ProductSimilar` component, which presumably displays similar products, is commented out. */}
                {/* <ProductSimilar /> */}
            </div>
        </div>
    )
}

export default ProductDetailScreen