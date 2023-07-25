import React from 'react'
import { twMerge } from 'tailwind-merge'

const BaseButton = ({ title, type, className, handleClick, disable }) => {
    return (

        <button
            disable={disable}
            onClick={handleClick}
            className=
            {twMerge('bg-primary hover:opacity-80', className)}
            type={type}
        >
            {title}
        </button>

    )
}

export default BaseButton