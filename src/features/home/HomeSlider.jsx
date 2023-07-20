import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import BaseButton from '../../components/button/BaseButton';
import { useNavigate } from 'react-router-dom';

const HomeSlider = () => {
    const navigate = useNavigate()
    return (
        <>
            <Swiper
                pagination={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                modules={[Autoplay, Navigation, Pagination]}
                className="mySwiper">

                <SwiperSlide>
                    <div className='relative'>
                        <img className='w-full h-[80vh] brightness-75' src="https://luxcomforts.com/wp-content/uploads/2021/05/slide1.jpg" alt="" />
                        <div className='absolute top-[40%] left-[32%] flex flex-col items-center'>
                            <p className='text-3xl font-nomal text-white '>LIVING MADE EASY</p>
                            <p className='text-lg text-white'>Shop From a Carefully Curated List of Fine Home Goods and Art Decor Furnishings</p>
                            <BaseButton handleClick={() => navigate('/shop')} title='SHOP NOW' className='py-1 px-2 bg-transparent hover:bg-slate-300 border-2 rounded-2xl text-white mt-4' />
                        </div>

                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className='relative'>
                        <img className='w-full h-[80vh] brightness-75' src="https://luxcomforts.com/wp-content/uploads/2021/05/slide2.jpg" alt="" />
                        <div className='absolute top-[40%] left-[32%] flex flex-col items-center'>
                            <p className='text-3xl font-nomal text-white '>NEW AGE MODERN LUXURY</p>
                            <p className='text-lg text-white'>Comfort, Style and Beauty.  High End Contemporary Living at Your Finger Tips</p>
                            <BaseButton handleClick={() => navigate('/shop')} title='SHOP NOW' className='py-1 px-2 bg-transparent hover:bg-slate-300 border-2 rounded-2xl text-white mt-4' />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img className='w-full h-[80vh]' src="https://luxcomforts.com/wp-content/uploads/2022/09/Lux-Comforts-wb-Fall-Super-Sale-22.png" alt="" />
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default HomeSlider