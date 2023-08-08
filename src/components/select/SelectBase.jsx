
import React from 'react'
import Select from 'react-select'

const SelectBase = ({ value, options, onChange }) => {
    return (
        <Select
            value={value}
            options={options}
            onChange={onChange}
        />
    )
}

export default SelectBase