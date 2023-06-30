import React from 'react'
import { twMerge } from 'tailwind-merge'
import Label from './Label'
import clsx from 'clsx'

const TextInput = React.forwardRef(
    (
        {
            className,
            label,
            placeholder,
            spacing,
            ...props
        },
        ref
    ) => {
        return (
            <div className={clsx(spacing ? spacing : 'space-x-2')}>
                {label && <Label data={label} />}
                <input
                    ref={ref}
                    type="text"
                    placeholder={placeholder}
                    className={twMerge('border border-gray-400 p-[9.5px] outline-none  rounded-md bg-gray-200  hover:border-neutral-600 focus:border-neutral-500 focus:bg-white', className)}
                    {...props}
                />
            </div>
        )
    }
)


export default TextInput