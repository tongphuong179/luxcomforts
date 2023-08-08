
import ModalBase from '../../components/modal/ModalBase'
import { closeModal } from '../../components/modal/state/ModalSlice'
import BaseButton from '../../components/button/BaseButton'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { cancelOrder } from './services/CancelOrder'

const ModalOrder = () => {
    const modalInfo = useSelector(state => state.modal.modalInfo)
    console.log(modalInfo);
    const dispatch = useDispatch()

    const mutation = useMutation(() => cancelOrder(modalInfo), {
        onSuccess(data) {
            alert('đơn hàng đã được hủy')
            dispatch(closeModal())
        }
    })

    const handleDelete = () => {
        mutation.mutate()
    }

    return (
        <ModalBase>
            <div>
                <p>Bạn có chắc chắn muốn hủy đơn hàng này không</p>
                <div className=' pt-10 text-right  space-x-6'>
                    <BaseButton title='Hủy' type='button' className='px-5 py-2 bg-red-600 text-white rounded-lg' handleClick={() => dispatch(closeModal())} />
                    <BaseButton
                        title='Đồng ý'
                        className='px-5 py-2 bg-slate-700 text-white rounded-lg'
                        type='button'
                        handleClick={handleDelete}
                    />
                </div>

            </div>
        </ModalBase>
    )
}

export default ModalOrder