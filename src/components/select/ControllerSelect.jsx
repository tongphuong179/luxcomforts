import React from 'react'
import { Controller } from 'react-hook-form';
import SelectBase from './SelectBase';
const ControllerSelect = ({ name, control, defaultValue, options, onChange }) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { value, onChange: controllerOnChange } }) => (
                    <SelectBase
                        value={value}
                        options={options}
                        onChange={(selectedOption) => {
                            controllerOnChange(selectedOption); // Gọi hàm onChange của Controller để cập nhật giá trị trong form
                            onChange(selectedOption); // Gọi hàm onChange đã truyền vào từ props
                        }}
                    />
                )}
            />
        </div>
    )
}

export default ControllerSelect