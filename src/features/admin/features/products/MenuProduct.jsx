import React from 'react'
import { IoSettingsSharp } from 'react-icons/io5'
import { Menu } from '@headlessui/react'
import MenuDropDown from '../../../../components/menu/MenuDropdown'
import BaseButton from '../../../../components/button/BaseButton'

const MenuProduct = () => {
    return (
        <div>
            <MenuDropDown label={
                <IoSettingsSharp size={30} className="ml-4 text-slate-700 hover:text-slate-500 cursor-pointer" />
            } className=''>
                <Menu.Item>
                    <BaseButton title='sửa' />
                </Menu.Item>
                <Menu.Item>
                    <BaseButton title='Xóa' />
                </Menu.Item>

            </MenuDropDown>
        </div>
    )
}

export default MenuProduct
