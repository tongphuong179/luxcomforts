import React from 'react';
import BaseButton from '../../components/button/BaseButton';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../services/formatCurrency';

const ProductCard = ({ product, discountPrice }) => { // Updated to accept `discountPrice` prop
    const navigate = useNavigate();
    console.log(product)

    return (
        <div className='relative group' onClick={() => navigate(`/product/${product.id}`)}>
            <div className=''>
                <img src={product.mainImage} alt="card" className='w-full h-[15vw]' />
            </div>
            {discountPrice && ( // Render the discount price badge only if there's a discountPrice
                <div className='absolute top-8 left-2 px-[6px] py-[12px] border-[1px] rounded-full bg-red-600'>
                    <p className='text-white text-lg font-medium'>Sale!</p>
                </div>
            )}
            <div className='absolute -z-10 top-[260px] invisible left-0 group-hover:top-[248px] group-hover:visible group-hover:z-10 transition-all duration-200'>
                <BaseButton title="QUICK VIEW" className='text-white px-[98px] py-2' />
            </div>
            <div>
                <p className='pt-4 text-lg text-gray-700 text-center font-bold'>{product.name}</p>

                <div className='flex pt-4 justify-center items-center space-x-2'>

                    {discountPrice ? ( // Render the discounted price if discountPrice is available
                        <>
                            <p className='font-light text-gray-500 line-through'>{formatCurrency(product.price)}</p>
                            <p>{formatCurrency(discountPrice)} </p> {/* Use the discountPrice prop */}
                        </>
                    ) : (
                        <p>{formatCurrency(product.price)}</p>
                    )}

                </div>

            </div>
        </div>
    );
};

export default ProductCard;
