import React, { useEffect } from 'react'
import ModalBase from '../../../../components/modal/ModalBase'
import TextInput from '../../../../components/input/TextInput'
import { closeModal } from '../../../../components/modal/state/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import BaseButton from '../../../../components/button/BaseButton'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategory } from './services/CreateCategory'
import Loading from '../../../../components/loading/Loading'

const ModalCategory = () => {
    const dispatch = useDispatch()

    const infoModal = useSelector(state => state.modal.modalInfo)

    const { handleSubmit, register, setValue } = useForm()
    const queryClient = useQueryClient()
    const mutation = useMutation(createCategory, {
        onSuccess(data) {
            console.log(data)
            queryClient.invalidateQueries('categories')
            dispatch(closeModal())
        },
        onError(err) {
            console.log(err)
        }
    })
    const updateMutation = useMutation((categoryUpdate) => updateMutation(infoModal.id, categoryUpdate))

    useEffect(() => {
        if (infoModal) {
            setValue('name', infoModal.name)
        }

    }, [infoModal, setValue])

    const onSubmit = (data) => {

        if (infoModal) {
            mutation.mutate({
                id: infoModal.id,
                name: data.name
            })

        } else {

            mutation.mutate(data)
            console.log(data)
        }
    }
    return (
        <div>
            <ModalBase className='w-100'>
                {mutation.isLoading && (
                    <Loading />
                )}
                <div>
                    <form className='p-6' onSubmit={handleSubmit(onSubmit)}>
                        <div className='space-y-6'>
                            <p>Tên danh mục sản phẩm</p>
                            <TextInput placeholder='Tên danh mục' className='w-[320px]' {...register('name')} />
                        </div>
                        <div className=' pt-10 text-right  space-x-6'>
                            <BaseButton title='Hủy' type='button' className='px-5 py-2 bg-red-600 text-white rounded-lg' handleClick={() => dispatch(closeModal())} />
                            <BaseButton
                                title={infoModal ? 'Cập nhật danh mục sản phẩm' : 'Thêm danh mục sản phẩm'}
                                className='px-5 py-2 bg-slate-700 text-white rounded-lg'
                                type='submit'
                            />
                        </div>
                    </form>
                </div>
            </ModalBase>
        </div>
    )
}

export default ModalCategory