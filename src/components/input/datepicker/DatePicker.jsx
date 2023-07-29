import React from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const BaseDatePicker = ({ selected, onChange }) => {

    return (
        <div>

            <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={selected}
                onChange={onChange}

            />
        </div>
    )
}

export default BaseDatePicker