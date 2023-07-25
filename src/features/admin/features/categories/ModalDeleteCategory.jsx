import React from 'react'
import BaseButton from '../../../../components/button/BaseButton'
import { useDispatch } from 'react-redux'
import { closeModal } from '../../../../components/modal/state/ModalSlice'
import ModalBase from '../../../../components/modal/ModalBase'

const ModalDeleteCategory = () => {
    const dispatch = useDispatch()
    return (
        <ModalBase>
            <div>
                <p>Bạn có chắc chắn muốn xóa danh mục sản phẩm này không</p>
                <div className=' pt-10   space-x-6'>
                    <BaseButton title='Hủy' className='px-5 py-2 bg-red-600 text-white rounded-lg' handleClick={() => dispatch(closeModal())} />
                    <BaseButton
                        title='Xóa danh mục sản phẩm'
                        className='px-5 py-2 bg-slate-700 text-white rounded-lg'
                        type='submit'

                    />
                </div>
            </div>
        </ModalBase>
    )
}

export default ModalDeleteCategory