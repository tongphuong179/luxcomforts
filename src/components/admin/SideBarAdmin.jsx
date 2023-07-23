import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BsPersonFillGear } from 'react-icons/bs';
import { PiShoppingCartSimpleBold } from 'react-icons/pi';
import { BiSolidCategory } from 'react-icons/bi';
import { BiSolidDiscount } from 'react-icons/bi';
import { TbDiscount2 } from 'react-icons/tb';
import { GiBuyCard } from 'react-icons/gi';

const SidebarLink = ({ to, children }) => {
    const location = useLocation();

    // Kiểm tra xem địa chỉ URL hiện tại có khớp với đường dẫn trong `to` của `Link` hay không
    const isActive = location.pathname.substring(7) === `${to}`;

    return (
        <Link to={to}>
            <div
                className={`flex pl-8 py-3 mt-6 space-x-6 items-center hover:bg-slate-400 hover:cursor-pointer ${isActive ? 'bg-slate-400' : ''
                    }`}
            >
                {children}
            </div>
        </Link>
    );
};

const SideBarAdmin = () => {
    return (
        <div className='h-[100vh]  border-r-2 border-gray-300'>


            <div className='pt-[80px] space-y-8'>
                <SidebarLink to='user'>
                    <BsPersonFillGear size={28} />
                    <p className='text-xl pt-[2px]'>User</p>
                </SidebarLink>
                <SidebarLink to='product'>
                    <PiShoppingCartSimpleBold size={28} />
                    <p className='text-xl pt-[2px]'>Product</p>
                </SidebarLink>
                <SidebarLink to='category'>
                    <BiSolidCategory size={28} />
                    <p className='text-xl pt-[2px]'>Category</p>
                </SidebarLink>
                <SidebarLink to='discount'>
                    <BiSolidDiscount size={28} />
                    <p className='text-xl pt-[2px]'>Discount</p>
                </SidebarLink>
                <SidebarLink to='voucher'>
                    <TbDiscount2 size={28} />
                    <p className='text-xl pt-[2px]'>Voucher</p>
                </SidebarLink>
                <SidebarLink to='order'>
                    <GiBuyCard size={28} />
                    <p className='text-xl pt-[2px]'>Order</p>
                </SidebarLink>
            </div>
        </div>
    );
};

export default SideBarAdmin;
