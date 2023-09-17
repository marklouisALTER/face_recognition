import React, { useEffect } from 'react'
import { FaBars } from 'react-icons/fa'
import { BiSolidUser,BiDotsVertical } from 'react-icons/bi'
import { AiFillNotification,AiFillCaretDown } from 'react-icons/ai'
import { useState } from 'react'
import { Link } from 'react-router-dom'


export const Header = ({user,leftbar,logout}) => {

    // const { logout } = useAuth();
  
    const [isActiveProfile, setIsActiveProfile] = useState(false);


    return (
    <div>

    <div className='flex justify-between p-3 bg-primary items-center px-5'>
      <FaBars 
            onClick={leftbar}
            className='text-2xl cursor-pointer text-secondary hover:text-optional'
      />              
      <div className='flex items-center gap-5'>

            <div className="relative inline-block">

                <div 
                      onClick={() => setIsActiveProfile(prevState => !prevState)}
                      className='hidden md:flex items-center gap-2 bg-primary hover:bg-white p-1 px-3 rounded-md
                      transition-all delay-100 ease-in-out cursor-pointer text-white hover:text-primary'>
                      
                      <div className='bg-optional rounded-full'>
                        <BiSolidUser className='text-2xl'/>
                      </div>

                      {user && <p className='font-primary font-thin text-xs'>{user}</p>}
                      
                      <AiFillCaretDown className=''/>
                </div>
                {isActiveProfile &&
                (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg shadow-spread shadow-gray-300 rounded-lg">
                    <div className="py-2">
                      <Link 
                        to={''}
                        className="block px-4 py-2 font-secondary text-gray-800 hover:bg-gray-100">
                        Settings
                      </Link>

                      <button
                        onClick={logout}
                        className="block px-4 py-2 text-gray-800 font-secondary hover:bg-gray-100">
                        Logout
                      </button>
                      
                    </div>
                    <div className="absolute top-[-1rem] right-[.7rem] mt-2 w-6 h-6 transform translate-x-1 -rotate-45 bg-white"></div>
                </div>
                )}
             </div>

                <div className='hidden md:flex bg-transparent p-2 rounded-md cursor-pointer text-white hover:bg-secondary hover:text-primary hover:bg-white'>
                    <AiFillNotification className='text-2xl'/>
                </div>

                <div className='flex bg-transparent p-2 rounded-md cursor-pointer text-white hover:bg-secondary hover:text-primary hover:bg-white md:hidden'>
                    <BiDotsVertical className='text-2xl'/>
                </div>


      </div>
  </div>
</div>
  )
}
