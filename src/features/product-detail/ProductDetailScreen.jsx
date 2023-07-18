import React from 'react'
import ProductImage from './ProductImage'
import ProductDescription from './ProductDescription'
import ProductSimilar from './ProductSimilar'
import { useParams } from 'react-router-dom'
import { useQueries, useQuery } from '@tanstack/react-query'
import { getProductById } from './services/getProductById'

const ProductDetailScreen = () => {
    const { productId } = useParams()

    const { data } = useQuery({ queryKey: ['product', productId], queryFn: () => getProductById(productId) })
    console.log(data);
    return (
        <div>
            <div className=" grid grid-cols-2 gap-6 px-[380px]">
                {data && <ProductImage product={data} />}
                {data && <ProductDescription description={data} />}
            </div>

            <div className='px-[380px]'>
                <div className='flex space-x-4'>
                    <p>PRODUCT SPECS</p>
                    <p>SHIPPING INFO</p>
                </div>
                <p className='pt-5'>Our garden pot offers great and new ideas of nurturing your favorite flowers, fruits and vegetables around your home. It features a sturdy, outstanding band for firmness and durability. This planting pot is creatively constructed from pine wood material. Definitely, it comes with elegant look and style that will seamlessly blend with the visuals of your deck, patio or entry way. Wood construction Lightweight and durable Measures 12″ X 7″</p>
            </div>
            <div className='px-[380px]'>
                {/* <ProductSimilar /> */}
            </div>
        </div>
    )
}

export default ProductDetailScreen