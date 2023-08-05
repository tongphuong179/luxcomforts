import React, { useState, useEffect } from 'react'
import { getDistrict, getProvinces, getWard } from './services/GetAddress';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import AsyncSelect from 'react-select/async';
import TextInput from '../../components/input/TextInput';
import BaseButton from '../../components/button/BaseButton';
import { useForm } from 'react-hook-form';
import { createAddressDelivery } from './services/CreateAddressDelivery';
import { useDispatch } from 'react-redux';
import { addAddress } from '../auth/state/AuthSlice';



const SelectAddress = ({ user, address, onUpdateAddress }) => {

    console.log(address)
    const [selectedProvince, setSelectedProvince] = useState({});
    const [selectedDistrict, setSelectedDistrict] = useState({});
    const [selectedWard, setSelectedWard] = useState({});


    const dispatch = useDispatch()

    const { register, handleSubmit, setValue } = useForm()

    useEffect(() => {
        setValue('address', address.address); // Thiết lập giá trị cho trường address
        setValue('phone', address.phone); // Thiết lập giá trị cho trường phone
        setValue('name', address.name); // Thiết lập giá trị cho trường name
    }, [address]);


    const mutation = useMutation(createAddressDelivery, {
        onSuccess(data) {
            dispatch(addAddress(data))
            onUpdateAddress(data.id);

        }
    })

    const onSubmit = (data) => {
        const addressData = {
            ...data,
            user: {
                id: user.id
            },
            province_id: selectedProvince.value,
            province: selectedProvince.label,
            district_id: selectedDistrict.value,
            district: selectedDistrict.label,
            wardCode: selectedWard.value,
            ward: selectedWard.label
        }
        console.log(addressData)
        mutation.mutate(addressData)
    }

    // Tỉnh/Thành Phố
    const { data: provinces = [], isSuccess } = useQuery(["province"], getProvinces, {
        select: (data) =>
            data.data.map((item) => ({
                value: item.ProvinceID,
                label: item.ProvinceName
            }))
    })

    const filterProvinces = (inputValue) => {
        return provinces.filter((item) => item.label.toLowerCase().includes(inputValue.toLowerCase()))
    }

    const loadProvinceOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterProvinces(inputValue));
        }, 1000);
    };

    // Huyện/Quận

    const { data: districts = [] } = useQuery(
        ['district', selectedProvince.value],
        () => getDistrict(selectedProvince.value),
        {
            enabled: !!selectedProvince.value,
            select: (data) =>
                data.data.map((item) => ({
                    value: item.DistrictID,
                    label: item.DistrictName,
                })),
        }
    )
    const filterDistricts = (inputValue) => {
        return districts.filter((item) =>
            item.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadDistrictOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterDistricts(inputValue));
        }, 1000);
    };

    // Xã/Phường

    const { data: wards = [] } = useQuery(
        ['wards', selectedDistrict.value],
        () => getWard(selectedDistrict.value), // Sử dụng selectedDistrict ở đây
        {
            enabled: !!selectedDistrict.value,
            select: (data) =>
                data.data.map((item) => ({
                    value: item.WardCode,
                    label: item.WardName,
                })),
        }
    );
    const filterWards = (inputValue) => {
        return wards.filter((item) =>
            item.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };


    const loadWardOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filterWards(inputValue));
        }, 1000);
    };



    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex space-x-20'>
                    <div>
                        <p className='py-8 text-xl font-medium'>Địa chỉ giao hàng</p>
                        <div className=''>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions={provinces}
                                defaultValue={
                                    address?.province_id
                                        ? { value: address.province_id, label: address.province }
                                        : null
                                }
                                loadOptions={loadProvinceOptions}
                                value={provinces.find((province) => province.value === selectedProvince.value)}
                                onChange={(selectedOption) => {
                                    setSelectedProvince(selectedOption ? { ...selectedOption } : '');

                                }}

                                placeholder='Chọn tỉnh/thành phố'
                            />
                        </div>
                        <div className=' pt-8'>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions={districts}
                                defaultValue={
                                    address?.district_id
                                        ? { value: address.district_id, label: address.district }
                                        : null
                                }
                                loadOptions={loadDistrictOptions}
                                value={districts.find((district) => district.value === selectedDistrict.value)}
                                onChange={(selectedOption) => {
                                    setSelectedDistrict(selectedOption ? { ...selectedOption } : '');

                                }}

                                placeholder='Chọn huyện/quận'
                            />
                        </div>
                        <div className=' pt-8'>
                            <AsyncSelect
                                cacheOptions
                                defaultOptions={wards}
                                defaultValue={
                                    address?.wardCode
                                        ? { value: address.wardCode, label: address.ward }
                                        : null
                                }
                                loadOptions={loadWardOptions}
                                value={wards.find((ward) => ward.value === selectedWard.value)}
                                onChange={(selectedOption) =>
                                    setSelectedWard(selectedOption ? { ...selectedOption } : '')
                                }
                                placeholder='Chọn xã/phường'
                            />
                        </div>
                        <div className='pt-8'>
                            <TextInput placeholder="Số nhà, tên đường/thôn xóm" className='px-2 py-[6px] bg-white ' {...register('address')} />
                        </div>

                        <div>{ }</div>
                    </div>
                    <div>
                        <p className='py-8 text-xl font-medium'>Thông tin liên hệ</p>
                        <div className=' flex items-center space-x-4'>
                            <p>Số điện thoại</p>
                            <TextInput className='px-2 py-[6px] bg-white w-[200px]' {...register('phone')} />
                        </div>
                        <div className='flex items-center pt-8 space-x-[42px]'>
                            <p>Họ và tên</p>
                            <TextInput className='px-2 py-[6px] bg-whit w-[200px]'  {...register('name')} />
                        </div>
                    </div>
                </div>
                <div className='text-center pt-10'>
                    <BaseButton title='Cập nhật địa chỉ giao hàng' className='px-4 py-3 text-white rounded-lg w-full' />
                </div>
            </form>
        </div>
    );
};

export default SelectAddress;