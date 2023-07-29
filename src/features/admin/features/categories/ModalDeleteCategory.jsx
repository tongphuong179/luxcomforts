import React from 'react'
import BaseButton from '../../../../components/button/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../../../components/modal/state/ModalSlice'
import ModalBase from '../../../../components/modal/ModalBase'
import { deleteCategory } from './services/DeleteCategory'
import { useQueryClient, useMutation } from '@tanstack/react-query'

const ModalDeleteCategory = () => {
    const dispatch = useDispatch()
    const categoryId = useSelector(state => state.modal.modalInfo)
    console.log(categoryId);
    const queryClient = useQueryClient()

    const mutation = useMutation(() => deleteCategory(categoryId), {
        onSuccess: () => {

            queryClient.invalidateQueries('categories');
            dispatch(closeModal());
        },

    });
    const handleDelete = () => {

        mutation.mutate();
    };
    return (
        <ModalBase>
            <div>
                <p>Bạn có chắc chắn muốn xóa danh mục sản phẩm này không ?</p>
                <div className=' pt-10 text-right  space-x-6'>
                    <BaseButton title='Hủy' className='px-5 py-2 bg-red-600 text-white rounded-lg' handleClick={() => dispatch(closeModal())} />
                    <BaseButton
                        title='Xóa danh mục sản phẩm'
                        className='px-5 py-2 bg-slate-700 text-white rounded-lg'
                        type='button'
                        handleClick={handleDelete}

                    />
                </div>
            </div>
        </ModalBase>
    )
}

export default ModalDeleteCategory