import React from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'





const MenuDropDown = ({ label, className, children }) => {
    return (
        <Menu className>
            {({ open }) => (
                <>
                    <Menu.Button className=''>{label}</Menu.Button>
                    <Transition
                        show={open}
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                    >
                        <Menu.Items static className={twMerge('flex flex-col', className)}>
                            {children}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}

export default MenuDropDown