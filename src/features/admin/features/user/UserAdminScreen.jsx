import { useMutation, useQuery } from '@tanstack/react-query'
import React from 'react'
import { getAllUser } from './services/GetAllUser'
import BaseButton from '../../../../components/button/BaseButton'
import { useState } from 'react'
import { updateRoleUser } from './services/UpdateRoleUser'
import { Link } from 'react-router-dom'

const UserAdminScreen = () => {

    const { data, isError } = useQuery({ queryKey: ['users'], queryFn: getAllUser })
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const mutation = useMutation(updateRoleUser, {
        onSuccess(data) {
            console.log(data)
        },
        onError() {
            console.log('false')
        }
    })


    if (isError) {
        return (
            <div>
                Đã có lỗi xảy ra , có vẻ như bạn không phải admin
            </div>
        )
    }
    const handleClickUser = (user) => {
        setShowConfirmationModal(true);
        setSelectedUser(user);
    };
    const handleConfirmMakeAdmin = () => {
        console.log(selectedUser.phone)
        mutation.mutate({
            phone: selectedUser.phone,
            roleName: 'ADMIN'
        })
        setShowConfirmationModal(false);
    };

    const handleCancelMakeAdmin = () => {
        setShowConfirmationModal(false);
    };

    return (
        <div className='px-10 py-28'>
            <table className="border-collapse border border-slate-500 w-full">
                <thead>
                    <tr className='bg-s'>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl">Họ và tên</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl">Tên hiển thị</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl w-[250px]">Email</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl w-[180px]">Số điện thoại</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl w-[180px]">Địa chỉ</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl">Point</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl">Roles</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl w-[160px]">Hành động</th>
                        <th className="border border-slate-900 bg-slate-700 text-white py-3 text-xl ">Đơn hàng</th>
                    </tr>

                </thead>
                <tbody>

                    {data?.map(user => {
                        return (
                            <tr key={user.id}>
                                <td className="border border-slate-700 py-[20px] pl-[16px]">{user.name}</td>
                                <td className="border border-slate-700 py-[20px] pl-[16px]">{user.username}</td>
                                <td className="border border-slate-700 py-[20px] pl-[16px]">{user.email}</td>
                                <td className="border border-slate-700 py-[20px] pl-[16px]">{user.phone}</td>
                                <td className="border border-slate-700 py-[20px] pl-[16px]">{user.address}</td>
                                <td className="border border-slate-700 py-[20px] pl-[16px]">{user.point}</td>
                                <td className="border border-slate-700 py-[20px] pl-[16px]"> {user.roles.some(role => role.name === "ADMIN") ? 'ADMIN' : "USER"} </td>
                                <td className="border border-slate-700 py-[12px] pl-[10px]">
                                    {user.roles.some(role => role.name === "ADMIN") ? '' : (
                                        <BaseButton title="MAKE ADMIN" className='ml-[6px] px-5 py-2 bg-slate-700 text-white text-sm rounded-2xl' handleClick={() => handleClickUser(user)} />
                                    )}

                                </td>
                                <td className="border border-slate-700 py-[20px] pl-[16px]">
                                    <Link to={`/admin/orderUser/${user.id}`}>
                                        <p className='text-primary'>Xem chi tiết</p>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}


                </tbody>
            </table>
            {showConfirmationModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white p-8 rounded-lg">
                        <p>Bạn có chắc chắn muốn người dùng này trở thành ADMIN?</p>
                        <div className="mt-4 flex justify-end">
                            <BaseButton
                                title="Hủy"
                                className="mr-4 px-4 py-2 bg-red-500 text-white rounded-lg"
                                handleClick={handleCancelMakeAdmin}
                            />
                            <BaseButton
                                title="Xác nhận"
                                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                                handleClick={handleConfirmMakeAdmin}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserAdminScreen