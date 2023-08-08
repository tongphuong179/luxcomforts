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



const SelectAddress = ({ onSelectAddress }) => {

    const [selectedProvince, setSelectedProvince] = useState({});
    const [selectedDistrict, setSelectedDistrict] = useState({});
    const [selectedWard, setSelectedWard] = useState({});
    const [address, setAddress] = useState('');

    useEffect(() => {
        onSelectAddress({
            province: selectedProvince,
            district: selectedDistrict,
            ward: selectedWard,
            address: address,
        });
    }, [selectedProvince, selectedDistrict, selectedWard, address]);

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
            <div className='flex space-x-20'>
                <div>
                    <div className=''>
                        <AsyncSelect
                            cacheOptions
                            defaultOptions={provinces}
                            loadOptions={loadProvinceOptions}
                            value={provinces.find((province) => province.value === selectedProvince.value)}
                            onChange={(selectedOption) => {
                                setSelectedProvince(selectedOption ? { ...selectedOption } : '');
                                onSelectAddress({
                                    province: selectedProvince,
                                    district: selectedOption ? { ...selectedOption } : '',
                                    ward: selectedWard,
                                });

                            }}
                            placeholder='Chọn tỉnh/thành phố'
                        />
                    </div>
                    <div className=' pt-8'>
                        <AsyncSelect
                            cacheOptions
                            defaultOptions={districts}
                            loadOptions={loadDistrictOptions}
                            value={districts.find((district) => district.value === selectedDistrict.value)}
                            onChange={(selectedOption) => {
                                setSelectedDistrict(selectedOption ? { ...selectedOption } : '');
                                onSelectAddress({
                                    province: selectedProvince,
                                    district: selectedDistrict,
                                    ward: selectedOption ? { ...selectedOption } : '',
                                });

                            }}

                            placeholder='Chọn huyện/quận'
                        />
                    </div>
                    <div className=' pt-8'>
                        <AsyncSelect
                            cacheOptions
                            defaultOptions={wards}
                            loadOptions={loadWardOptions}
                            value={wards.find((ward) => ward.value === selectedWard.value)}
                            onChange={(selectedOption) => {
                                setSelectedWard(selectedOption ? { ...selectedOption } : '')
                                onSelectAddress(selectedOption ? { ...selectedOption } : '');
                            }
                            }
                            placeholder='Chọn xã/phường'
                        />
                    </div>
                    <div className='pt-8'>
                        <TextInput
                            placeholder="Số nhà, tên đường/thôn xóm"
                            className='px-2 py-[6px] bg-white '
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>


                </div>

            </div>
        </div>
    );
};

export default SelectAddress;