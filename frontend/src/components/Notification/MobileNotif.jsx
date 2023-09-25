import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { Notification } from './Notification'
import './scrollDesign.css'
export const MobileNotif = ({openNotif}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <div 
            data-aos="zoom-in"
            data-aos-easing="ease-in-out"
            data-aos-delay="50"
            className="bg-white rounded-lg shadow-lg p-4 w-full h-1/2 max-w-[40rem] mx-10 px-5 overflow-y-auto no-scrollbar">

                {/* Modal content */}
                <div className='flex justify-between'>
                    <h2 className="text-2xl font-optional font-bold mb-2">Notification</h2>
                    <button
                        className="px-4 py-2 text-gray-500
                        transition-all delay-50 ease-in-out"
                        onClick={openNotif}
                        >   
                        <AiOutlineClose />
                    </button>
                </div>
               <Notification />
        </div>
    </div>
  )
}
