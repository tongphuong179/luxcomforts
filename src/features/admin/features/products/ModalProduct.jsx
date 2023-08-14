import React, { useState, useEffect, Fragment } from 'react'
import ModalBase from '../../../../components/modal/ModalBase'
import TextInput from '../../../../components/input/TextInput';
import BaseButton from '../../../../components/button/BaseButton';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../components/modal/state/ModalSlice';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllCategory } from '../../../shop/services/GetAllCategory';
import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { AiFillCaretDown } from 'react-icons/ai'
import { useForm, Controller } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import { createProduct } from './services/CreateProduct';
import Loading from '../../../../components/loading/Loading';
import { updateProduct } from './services/UpdateProduct';
import { Toaster, toast } from 'react-hot-toast';


const ModalProduct = () => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const infoModal = useSelector(state => state.modal.modalInfo)
    const { data } = useQuery({ queryKey: ['categories'], queryFn: getAllCategory, enabled: !infoModal, })
    const [selectedImage, setSelectedImage] = useState('')
    const [selectedExtraImages, setSelectedExtraImages] = useState([]);



    const mutation = useMutation(createProduct, {
        onSuccess(data) {
            toast.success("Bạn đã thêm sản phẩm thành công")
            queryClient.invalidateQueries('products')
            dispatch(closeModal())
            reset()
        },
        onError(error) {
            toast.error("Có lỗi xảy ra khi thêm sản phẩm")
        },

    })


    const { register, handleSubmit, watch, control, reset, setValue } = useForm()

    useEffect(() => {
        console.log(infoModal)
        if (infoModal) {
            setValue('name', infoModal.name);
            setValue('inventory', infoModal.inventory);
            setValue('price', infoModal.price);
            setValue('description', infoModal.description);
            setValue('category', infoModal.category);
            setValue('weight', infoModal.weight);
            setValue('deliveryAvailable', infoModal.deliveryAvailable ? 'true' : 'false');
            // Cập nhật giá trị của ảnh chính
            if (infoModal.mainImage) {
                setValue('imageFile', ''); // Đặt giá trị trống để không hiển thị ảnh chính trong input
                setSelectedImage(infoModal.mainImage);
            }

            setSelectedExtraImages(infoModal.images)
        }
    }, [infoModal, setValue]);
    console.log(selectedImage)
    console.log(selectedExtraImages)

    const updateMutation = useMutation((updateData) => updateProduct(infoModal.id, updateData), {
        onSuccess(data) {
            toast.success("Bạn đã sửa sản phẩm thành công")
            queryClient.invalidateQueries('products')
            dispatch(closeModal())

        },
        onError(error) {
            toast.error("Đã xảy ra lỗi trong quá trình sửa sản phẩm")
        },

    })

    const updateExtraImagesInput = async () => {
        const newExtraImageFilesPromises = selectedExtraImages.map(async imageUrl => {
            const blob = await (await fetch(imageUrl)).blob();
            return new File([blob], 'extraImage.png'); // Tạo một File tạm thời từ Blob
        });

        // Đợi cho tất cả các promises được giải quyết
        const newExtraImageFiles = await Promise.all(newExtraImageFilesPromises);

        // Tạo một mảng mới chứa giá trị mới
        const newExtraImagesArray = [...newExtraImageFiles];

        // Cập nhật giá trị của trường extraImages
        setValue('extraImages', newExtraImagesArray);
    };

    const removeExtraImage = async (index) => {
        const newImages = selectedExtraImages.filter((_, i) => i !== index);
        setSelectedExtraImages(newImages);

        // Xóa hình ảnh khỏi mảng imageFile trong data
        const newImageFiles = getValues('imageFile').filter((_, i) => i !== index);
        setValue('imageFile', newImageFiles);

        // Đợi cho tất cả các promises được giải quyết
        const newExtraImageFiles = await Promise.all(newImages.map(async (imageUrl) => {
            const blob = await (await fetch(imageUrl)).blob();
            return new File([blob], 'extraImage.png');
        }));

        // Cập nhật giá trị của trường extraImages trong input
        setValue('extraImages', newExtraImageFiles);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('inventory', data.inventory);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('category', data.category.id);
        formData.append('weight', data.weight);
        formData.append('deliveryAvailable', data.deliveryAvailable === 'true');
        if (data.imageFile.length > 0) {
            formData.append('imageFile', data.imageFile[0]); // Assuming you want to upload only one image
        } else {
            const file = new File([], "");
            formData.append('imageFile', file);
        }

        if (data.extraImages.length > 0) {
            for (let i = 0; i < data.extraImages.length; i++) {
                formData.append('extraImages', data.extraImages[i]);
            }
        } else {
            const file = new File([], "");
            formData.append('extraImages', file);
        }



        if (infoModal) {
            console.log(data)

            try {
                console.log(data)
                await updateMutation.mutateAsync(formData);
            } catch (error) {
                console.log('Có lỗi khi cập nhật sản phẩm:', error);

            }
        } else {

            console.log(data)

            try {
                console.log(formData)
                await mutation.mutateAsync(formData);
            } catch (error) {
                console.log('Có lỗi khi thêm sản phẩm:', error);
            }
        }

    };



    return (
        <div>
            <ModalBase className='w-[880px]' handleClose={() => {
                reset()
                dispatch(closeModal())
            }}>
                {mutation.isLoading && (
                    <Loading />
                )}
                {updateMutation.isLoading && (
                    <Loading />
                )}
                <div>
                    <div>
                        <Toaster
                            position="top-center"
                            reverseOrder={false}
                        />
                    </div>
                    <p className='text-center font-bold text-xl '>{infoModal ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</p>
                    <form className='py-10' onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <div className='grid grid-cols-2 gap-4 pl-9'>
                            <div className=' space-y-6'>
                                <div className='space-y-2 relative' >
                                    <p className=''>Danh mục</p>
                                    {data && <Controller
                                        name='category'
                                        control={control}
                                        defaultValue={data && data.length > 0 ? data[0] : null}
                                        render={({ field }) => (
                                            <Listbox value={field.value} onChange={field.onChange}>
                                                <Listbox.Button className='rounded-md flex relative border border-gray-300 bg-gray-200 w-[342px] focus:bg-gray-200 py-[12px]'>
                                                    <span className='px-3'>{field.value.name}</span>
                                                    <span className='absolute top-4 right-[6px]'>
                                                        <AiFillCaretDown />
                                                    </span>
                                                </Listbox.Button>
                                                <Listbox.Options className='absolute top-[70px] z-20 shadow-xl overflow-y-auto'>
                                                    {data?.map((category) => (
                                                        <Listbox.Option
                                                            key={category.id}
                                                            value={category}
                                                            className='w-[342px] pl-3 py-2  cursor-pointer'
                                                            as={Fragment}
                                                        >
                                                            {({ active }) => (
                                                                <li className={twMerge(`${active ? 'bg-slate-600 text-white' : 'bg-white text-black'}`)}>
                                                                    {category.name}
                                                                </li>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            </Listbox>
                                        )}
                                    />}
                                </div>
                                <div className='space-y-2' >
                                    <p className=''> Ảnh sản phẩm</p>
                                    <TextInput
                                        type='file'
                                        multiple
                                        className='py-2 px-4'
                                        {...register('imageFile')}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const imageUrl = URL.createObjectURL(file);
                                                setSelectedImage(imageUrl);
                                            }
                                        }}
                                    />
                                    {selectedImage && (
                                        <img
                                            src={selectedImage}
                                            alt='Selected Image'
                                            className='mt-2 max-w-[200px] max-h-[200px]'
                                        />
                                    )}
                                </div>
                                <div className='space-y-2' >
                                    <p className=''> Tên sản phẩm</p>
                                    <TextInput className='py-3 px-3 w-[342px]'  {...register('name')} />
                                </div>

                                <div className='space-y-2' >
                                    <p className=''>Số lượng</p>
                                    <TextInput className='py-3 px-3 w-[342px] '{...register('inventory')} />
                                </div>
                                <div className='space-y-2' >
                                    <p className=''>Khối lượng(g)</p>
                                    <TextInput className='py-3 px-3 w-[342px] '{...register('weight')} />
                                </div>

                            </div>
                            <div className='space-y-6'>

                                <div className='space-y-2' >
                                    <p className=''>Giá gốc(vnđ)</p>
                                    <TextInput className='py-3 px-3 w-[342px]' {...register('price')} />
                                </div>
                                <div className='space-y-2' >
                                    <p className=''>Vận chuyển nhanh</p>
                                    <div className='flex space-x-6'>
                                        <TextInput type='radio' value='true' className='py-3 px-3 '   {...register('deliveryAvailable')}
                                            checked={watch('deliveryAvailable') === 'true'} />
                                        <label>Có</label>
                                    </div>
                                    <div className='flex space-x-6'>
                                        <TextInput type='radio' value='false' className='py-3 px-3 '       {...register('deliveryAvailable')}
                                            checked={watch('deliveryAvailable') === 'false'}
                                        />
                                        <label>Không</label>
                                    </div>
                                </div>
                                <div className='space-y-2' >
                                    <p className=''> ExtraImages </p>
                                    <TextInput
                                        type='file'
                                        multiple
                                        className='py-2 px-4'
                                        {...register('extraImages')}
                                        onChange={(e) => {
                                            const files = e.target.files;
                                            if (files) {
                                                const imageUrls = Array.from(files).map((file, index) => ({
                                                    id: index + 1,
                                                    imageUrl: URL.createObjectURL(file)
                                                }))
                                                setSelectedExtraImages(imageUrls);
                                                console.log(selectedExtraImages)
                                            }
                                        }}
                                    />
                                    {selectedExtraImages.length > 0 && (
                                        <div className='mt-2'>
                                            {selectedExtraImages.map((imageUrl, index) => (
                                                <img
                                                    key={index}
                                                    src={imageUrl.imageUrl}
                                                    alt={`Extra Image ${index + 1}`}
                                                    className='max-w-[200px] max-h-[200px] mr-2 mb-2'
                                                />
                                            ))}
                                        </div>
                                    )}

                                </div>
                                <div className='space-y-2' >
                                    <p className=''>Mô tả</p>
                                    <textarea className='py-2 h-36 px-3 w-[342px] border border-gray-400 bg-gray-200  hover:border-neutral-600 focus:border-neutral-500 focus:bg-white' {...register('description')} />
                                </div>
                            </div>
                        </div>
                        <div className=' pt-10 text-right mr-20 space-x-6'>
                            <BaseButton title='Hủy' type='button' className='px-5 py-2 bg-red-600 text-white rounded-lg'
                                handleClick={() => {
                                    reset()
                                    dispatch(closeModal())
                                }}
                            />
                            <BaseButton
                                title={infoModal ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                                className='px-5 py-2 bg-slate-700 text-white rounded-lg'
                                type='submit'
                                disabled={mutation.isLoading} />
                        </div>
                    </form>

                </div>
            </ModalBase >
        </div >
    )
}

export default ModalProduct