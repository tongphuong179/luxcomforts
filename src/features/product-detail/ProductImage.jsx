import React from 'react'
import ReactImageMagnify from 'react-image-magnify';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination } from 'swiper/modules';

const ProductImage = ({ product }) => {
    console.log(product)
    return (
        <div>
            <div className="pt-10">
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: false,
                        src: product.mainImage,
                        width: 560,
                        height: 580
                    },
                    largeImage: {
                        src: product.mainImage,
                        width: 1200,
                        height: 1800
                    }
                }} />
            </div>

            <div className='py-8'>
                <Swiper
                    spaceBetween={100}
                    slidesPerView={3}
                    loop={true}
                    navigation={true}
                    modules={[Navigation, Pagination]}
                    className="mySwiper"
                >
                    {product?.images.map(image => {
                        return (
                            <SwiperSlide key={image.id} >
                                <img className='w-[110px] h-[5.3vw]' src={image.imageUrl} alt="" />
                            </SwiperSlide>
                        )
                    })}


                </Swiper>

            </div>
        </div>
    )
}

export default ProductImage