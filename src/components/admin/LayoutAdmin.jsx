import React from 'react'
import HeaderAdmin from './HeaderAdmin'
import SideBarAdmin from './SideBarAdmin'
import { Outlet } from 'react-router-dom'
const LayoutAdmin = () => {
    return (
        <div>
            <div>
                <HeaderAdmin />
            </div>
            <div className='grid grid-cols-12'>
                <div className='col-span-2 bg-slate-200'>
                    <SideBarAdmin />
                </div>
                <div className='col-span-10'>
                    <div className='w-full h-[100vh] '>
                        <Outlet />
                    </div>

                </div>
            </div>

        </div>
    )
}

export default LayoutAdmin