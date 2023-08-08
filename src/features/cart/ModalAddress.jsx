import React from 'react'
import ModalBase from '../../components/modal/ModalBase';
import SelectAddress from './SelectAddress';

const ModalAddress = () => {
    return (
        <div>
            <ModalBase>
                <SelectAddress onSelectAddress={() => { }} />
            </ModalBase>
        </div>
    )
}

export default ModalAddress