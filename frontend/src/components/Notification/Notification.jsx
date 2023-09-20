import React from 'react'
import face_logo from '../../assets/levi.jpg';
import { AiOutlineCheck,AiTwotoneDelete } from 'react-icons/ai'


export const Notification = () => {
  return (
    <div className='w-full p-3 flex flex-col gap-3'>
        <div className='bg-primary p-2 rounded-md'>
            <h1 className='text-white font-secondary text-xl text-center'>Notifications</h1>
        </div>
        <div className='w-full bg-shadow rounded-md grid grid-rows-2'>
            <div className='row-span-1 p-2'>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <img 
                            src={face_logo} 
                            alt="Face logo  icon"
                            className='w-10 h-10 rounded-full'    
                        />
                        <div>
                            <h1 className='text-black font-optional text-sm font-semibold'>Levi Gernale</h1>
                            <p className='text-gray-500 italic font-optional text-xs'>September 12 2023</p>
                        </div>
                    </div>
                    <div>
                        <div className='lg:hidden xl:block bg-green-200 py-1 px-5 text-sm rounded-full font-optional text-primary'>
                            Pending
                        </div>
                    </div>
                </div>
            </div>
            <div className='row-span-1'>
                <div className='px-3'>
                    <h1 className='font-optional text-xs w-[90%]'>Hello Admin pasensya na di ako naka attendance kahapon sana madaya pa.</h1>
                    <div className='flex gap-3 justify-end mb-2 text-white'>
                        <button className='bg-primary p-1 transition-all rounded-md delay-50 ease-in-out hover:bg-onMouse'>
                            <AiOutlineCheck className='text-xl'/>
                        </button>
                        <button className='bg-red-500 p-1 transition-all rounded-md delay-50 ease-in-out hover:bg-red-800'>
                            <AiTwotoneDelete className='text-xl'/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
</div>
  )
}
