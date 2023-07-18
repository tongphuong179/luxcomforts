import React from 'react'
import { twMerge } from 'tailwind-merge'

const BaseButton = ({ title, type, className, handleClick }) => {
    return (

        <button
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