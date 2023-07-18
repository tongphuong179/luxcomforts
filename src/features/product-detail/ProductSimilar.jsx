import React from 'react'
import ProductCard from '../product/ProductCard'

const ProductSimilar = () => {
    return (
        <div>
            <p className='pt-10'>YOU MAY ALSO LIKE</p>
            <div className="grid grid-cols-4 gap-4 pt-[50px] pb-10">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    )
}

export default ProductSimilar