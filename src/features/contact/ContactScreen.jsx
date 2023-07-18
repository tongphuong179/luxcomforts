import React from 'react'
import TextInput from '../../components/input/TextInput'
import BaseButton from '../../components/button/BaseButton'

const ContactScreen = () => {
    return (
        <div>
            <div className='bg-neutral-800 text-center py-[90px]'>
                <p className='text-white text-2xl font-medium'>Contact Us</p>
            </div>
            <div className='py-[80px] px-[360px]'>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-8'>
                        <div className='border-b-4 pb-2'>
                            <p className='w-full text-gray-600'>SEND US AN EMAIL</p>
                        </div>
                        <div className='space-y-4'>
                            <p>Your name</p>
                            <TextInput className='w-full' />
                        </div>
                        <div className='space-y-4'>
                            <p>Your Email</p>
                            <TextInput className='w-full' />
                        </div>
                        <div className='space-y-4'>
                            <p>Subject</p>
                            <TextInput className='w-full' />
                        </div>
                        <div className='space-y-4'>
                            <p>Your name</p>
                            <TextInput className='w-full py-10' />
                        </div>
                        <div>
                            <BaseButton title='SUBMIT' className='bg-neutral-800 py-2 px-4 text-white' />
                        </div>


                    </div>
                    <div className='pl-2 pt-1'>
                        <p className='text-gray-600'>Have any questions or need to get more information about the product? Either way, you’re in the right spot.</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ContactScreen