import React from 'react'
import ModalBase from '../../../../components/modal/ModalBase'
import { closeModal } from '../../../../components/modal/state/ModalSlice'
import { useDispatch, useSelector } from 'react-redux'
import BaseButton from '../../../../components/button/BaseButton'
import { useQuery } from '@tanstack/react-query'
import { deleteProduct } from './services/DeleteProduct'

const ModalDeleteProduct = () => {
    const productId = useSelector(state => state.modal.modalInfo)
    console.log(productId);

    const handleDelete = () => {
        const { data, isLoading } = useQuery({ queryKey: ['product', productId], queryFn: () => deleteProduct(productId) })
    }

    const dispatch = useDispatch()
    return (
        <ModalBase>
            <div>
                <form>
                    <p>Bạn có chắc chắn muốn xóa  sản phẩm này không</p>
                    <div className=' pt-10   space-x-6'>
                        <BaseButton title='Hủy' type='button' className='px-5 py-2 bg-red-600 text-white rounded-lg' handleClick={() => dispatch(closeModal())} />
                        <BaseButton
                            title='Xóa danh mục sản phẩm'
                            className='px-5 py-2 bg-slate-700 text-white rounded-lg'
                            type='submit'
                            handleClick={handleDelete}
                        />
                    </div>
                </form>
            </div>
        </ModalBase>
    )
}

export default ModalDeleteProduct