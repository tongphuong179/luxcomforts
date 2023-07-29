import React from 'react';
import { Controller } from 'react-hook-form';
import SelectMultiple from './SelectMultiple';

const ControllerSelectMultiple = ({ name, control, defaultValue, options }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { value, onChange } }) => (
                <SelectMultiple
                    value={value}
                    options={options}
                    onChange={onChange}
                />
            )}
        />
    );
};

export default ControllerSelectMultiple;
