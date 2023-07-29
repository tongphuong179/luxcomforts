import React from 'react';
import Select from 'react-select';

const SelectMultiple = ({ value, options, onChange }) => {

    const customStyles = {
        container: (provided) => ({
            ...provided,
            width: '100%',
            height: '60px' // Tùy chỉnh chiều rộng của container
        }),

    }
    return (
        <Select
            isMulti
            value={value}
            options={options}
            onChange={onChange}
            styles={customStyles}
        />
    );
};

export default SelectMultiple;