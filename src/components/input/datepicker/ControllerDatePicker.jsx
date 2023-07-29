import React from 'react'
import { Controller } from 'react-hook-form'
import BaseDatePicker from './DatePicker'


const ControllerDatePicker = ({ name, control, defaultValue, rules }) => {
    return (
        <div>
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field, fieldState }) => (
                    <div>
                        <BaseDatePicker
                            selected={field.value}
                            onChange={(date) => field.onChange(date)}
                        />
                        {fieldState.error && <p>{fieldState.error.message}</p>}
                    </div>
                )}
            />
        </div>
    )
}

export default ControllerDatePicker