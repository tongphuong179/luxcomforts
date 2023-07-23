import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllProduct } from '../../../shop/services/GetAllProduct';
import BaseButton from '../../../../components/button/BaseButton';
import { GrConfigure } from 'react-icons/gr'
import { IoSettingsSharp } from 'react-icons/io5'

const ProductAdminScreen = () => {

    const { data } = useQuery({ queryKey: ['products'], queryFn: getAllProduct })
    console.log(data)
    return (
        <div className='px-10 py-[70px]'>
            <div className='text-right'>
                <BaseButton title="Thêm sản phẩm" className='px-6 py-3 mr-1 rounded-xl text-lg text-white bg-slate-700' />
            </div>

            <table className="border-collapse border border-slate-500 w-full mt-10">
                <thead>
                    <tr className='bg-s'>
                        <th className="border border-slate-900 bg-slate-700 text-white py-6 px-4 w-[50px]">STT</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-6 px-4 w-[150px]">Tên sản phẩm</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-6 px-4 ">Mô tả sản phẩm</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-6 px-4 w-[70px]">Số lượng</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-6 px-4 w-[100px]">Giá gốc(vnđ)</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-6 px-4">Ảnh</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-6 px-4 w-[100px]">Khối lượng(g)</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-6 px-4 w-[120px]">Giao hàng nhanh</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-6 px-4 w-[80px]">Đã bán</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-6 px-4 w-[100px]">Giá bán(vnđ)</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-6 px-4 w-[100px]">Hành động</th>
                    </tr>

                </thead>
                <tbody>
                    {data?.map((product, index) => {
                        return (
                            <tr key={product.product.id}>
                                <td className="border border-slate-700 py-[40px] px-[12px]">{index + 1}</td>
                                <td className="border border-slate-700 py-[40px] px-[12px]">{product.product.name}</td>
                                <td className="border border-slate-700 py-[40px] px-[12px] overflow-y-auto">{product.product.description}</td>
                                <td className="border border-slate-700 py-[40px] px-[12px]">{product.product.inventory}</td>
                                <td className="border border-slate-700 py-[40px] px-[12px]">{product.product.price}</td>
                                <td className="border border-slate-700 py-[40px] px-[12px]">{product.product.mainImage}</td>
                                <td className="border border-slate-700 py-[40px] px-[12px]">{product.product.weight}</td>
                                <td className="border border-slate-700 py-[40px] pl-[30px]"> {product.product.deliveryAvailable ? "có" : "không"}</td>
                                <td className="border border-slate-700 py-[40px] px-[12px]">{product.product.total_sold}</td>
                                <td className="border border-slate-700 py-[40px] px-[12px]">{product.price_discount}</td>
                                <td className="border border-slate-700 py-[40px] px-[12px]">
                                    <IoSettingsSharp size={30} className="ml-4 text-slate-700 cursor-pointer" />
                                </td>
                            </tr>
                        )
                    })}




                </tbody>
            </table>
        </div >
    )
}

export default ProductAdminScreen