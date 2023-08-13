import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getProductByCategory } from './services/GetProductByCategory'
import ShopNavigate from './ShopNavigate'
import ListProduct from './ListProduct'
import ProductCard from '../product/ProductCard'

const ProductCategoryScreen = () => {
    const { categoryId } = useParams()
    console.log(categoryId)
    const { data } = useQuery({ queryKey: ['products', categoryId], queryFn: () => getProductByCategory(categoryId) })
    console.log(data);
    return (
        <div className='px-[360px]'>
            <div className='pt-10 flex items-center justify-between'>
                <div className='flex text-xl space-x-4 '>
                    <p className='text-gray-500'>HOME</p>
                    <span className='text-gray-500'>/</span>
                    <p className='font-medium'>SHOP</p>
                </div>
                <div>
                    <p className='text-gray-500 text-lg'>Showing {data?.length} product for {data?.length} result</p>
                </div>
            </div>
            <div className='grid grid-cols-4 gap-4 pt-10'>
                <div>
                    <ShopNavigate />
                </div>
                <div className='col-span-3'>
                    <div className="grid grid-cols-3 gap-3">
                        {data && data.map(productData => {
                            const { product, price_discount } = productData;
                            return (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    discountPrice={price_discount}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCategoryScreen