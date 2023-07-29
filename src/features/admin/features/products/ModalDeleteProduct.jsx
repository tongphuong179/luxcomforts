import React from 'react'
import ModalBase from '../../../../components/modal/ModalBase'
import { closeModal } from '../../../../components/modal/state/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import BaseButton from '../../../../components/button/BaseButton'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteProduct } from './services/DeleteProduct'

const ModalDeleteProduct = () => {
    const productId = useSelector(state => state.modal.modalInfo)
    console.log(productId);
    const queryClient = useQueryClient()

    const mutation = useMutation(() => deleteProduct(productId), {
        onSuccess: () => {
            // On successful deletion, invalidate the cached data for the product list
            queryClient.invalidateQueries('products');
            dispatch(closeModal());
        },
        // Handle any errors here if needed
    });


    const handleDelete = () => {
        // Call the mutation to delete the product
        mutation.mutate();
    };


    const dispatch = useDispatch()
    return (
        <ModalBase>
            <div>
                <p>Bạn có chắc chắn muốn xóa  sản phẩm này không</p>
                <div className=' pt-10 text-right  space-x-6'>
                    <BaseButton title='Hủy' type='button' className='px-5 py-2 bg-red-600 text-white rounded-lg' handleClick={() => dispatch(closeModal())} />
                    <BaseButton
                        title='Xóa sản phẩm'
                        className='px-5 py-2 bg-slate-700 text-white rounded-lg'
                        type='button'
                        handleClick={handleDelete}
                    />
                </div>

            </div>
        </ModalBase>
    )
}

export default ModalDeleteProduct