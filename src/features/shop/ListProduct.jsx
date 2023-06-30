import React from 'react'
import ProductCard from '../product/ProductCard'
import Pagination from './Pagination'

const ListProduct = () => {
    return (
        <div>
            <div className='grid grid-cols-3 gap-3'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
            <div className='flex items-center justify-center py-10 cursor-pointer'>
                <Pagination />
            </div>
        </div>
    )
}

export default ListProduct