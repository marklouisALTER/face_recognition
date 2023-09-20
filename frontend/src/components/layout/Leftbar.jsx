import React,{useState} from 'react'

import { ImHome3 } from 'react-icons/im'
import { BiListCheck,BiSolidUserDetail,BiSolidUserPlus } from 'react-icons/bi'
import { AiFillCaretDown } from 'react-icons/ai'
import { FaUsers,FaSchool,FaClipboardList } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { IoSettingsSharp } from 'react-icons/io5'


export const Leftbar = ({leftbar}) => {
  const [isTracking, setIsTracking] = useState(false);
  const [isMonitoring, setIsMonitoring] = useState(false);
  return (
    <div className={`${leftbar ? 'w-[4rem]' : 'w-[16rem]'} p-1 bg-white shadow-md shadow-spread shadow-gray-400 transition-all delay-50 ease-in-out
    h-full overflow-x-hidden`}>
  
  <div className='w-full h-full grid grid-rows-5'>

      <div className='row-span-1 border-b-4 border-optional flex items-center justify-center'>
        
        <div className='flex gap-2 items-center rounded-md p-2 bg-transparent hover:bg-optional transition-all ease-in-out cursor-pointer'>
          
          <FaSchool className={`${leftbar ? 'object-cover w-full h-full text-primary' : 'text-primary'} text-4xl md:text-5xl`}/>
          <p 
              className={`${leftbar ? 'hidden': 'block'} text-primary font-secondary font-bold transition-all
              delay-200 ease-in-out text-2xl md:text-3xl`}>PMCI</p>
        </div>

      </div>
      <div className='row-span-4 mt-5 gap-5 flex flex-col justify-between'>
        <div className='flex flex-col gap-2'>
            <NavLink to={'/dashboard'} 
                  className={({isActive, isPending}) => 
                  isPending ? `${leftbar ? 'pt-1 mt-5 justify-center b' : 'p-4'} 
                  flex gap-2 items-center border-r-2 p-2 hover:border-primary
                  cursor-pointer transition-all delay-50 ease-in-out`
                  : 
                  isActive ? `${leftbar ? 'pt-1 mt-5 justify-center b' : 'p-4'} 
                  flex gap-2 items-center border-r-2 p-2 bg-optional text-primary
                  border-primary
                  cursor-pointer transition-all delay-50 ease-in-out`
                  :
                  `${leftbar ? 'pt-1 mt-5 justify-center b' : 'p-4'} 
                  flex gap-2 items-center border-r-2 p-2 hover:border-primary
                  cursor-pointer transition-all delay-50 ease-in-out`      
                }>
                    <ImHome3 className={`${leftbar ? 'text-2xl' : ''} text-1xl lg:text-2xl`} />
                <p 
                  className={`${leftbar ? 'hidden': 'block'} font-secondary ease-in-out text-sm md:text-md`}>Dashboard</p>
            </NavLink>
            
            <div 
                onClick={() => setIsTracking(prevState => !prevState)}
                className={`flex items-center ${leftbar ? 'pt-1 justify-center' : 'p-4 justify-between'} border-r-2 p-2
                ${isTracking ? 'bg-optional': ''}
                hover:border-primary hover:bg-optional hover:bg-optional text-secondary hover:text-primary cursor-pointer 
                transition-all delay-50 ease-in-out`}>
                  <div className={`${leftbar ? '': 'flex gap-2 items-center'}`}>
                      <BiListCheck 
                        className={`${leftbar ? 'text-2xl' : ''} text-1xl lg:text-2xl
                        ${isTracking ? 'text-primary': ''}
                        `}/>
                      <p 
                        className={`${leftbar ? 'hidden': 'block'} 
                          ${isTracking ? 'text-primary': ''}
                          font-secondary ease-in-out text-sm md:text-md`}>
                          Tracking Record
                      </p>
                  </div>
                  {!leftbar && 
                    <AiFillCaretDown 
                      className={`${isTracking ? 'rotate-0': 'rotate-90'}
                      ${isTracking ? 'text-primary': ''}`
                      }/>}
            </div>

            <div>
                <NavLink
                    to={'/tracking-record/employee-data'}  
                    className={({isActive, isPending}) => 
                    isPending ? `${isTracking ? 'block': "hidden"} flex pl-5 gap-2 items-center
                    border-r-2 p-2 bg-transparent hover:border-primary hover:bg-optional 
                    text-secondary hover:text-primary cursor-pointer transition-all delay-50 ease-in-out`
                    :
                    isActive ? `${isTracking ? 'block': "hidden"} flex pl-5 gap-2 items-center
                    border-r-2 p-2 bg-optional border-primary text-primary cursor-pointer 
                    transition-all delay-50 ease-in-out`
                    :
                    `${isTracking ? 'block': "hidden"} flex pl-5 gap-2 items-center
                    border-r-2 p-2 bg-transparent hover:border-primary hover:bg-optional 
                    text-secondary hover:text-primary cursor-pointer transition-all delay-50 ease-in-out`
                  }>

                  <BiSolidUserDetail />
                    <p className={`${leftbar ? 'hidden': 'block'} font-secondary ease-in-out text-xs md:text-sm`}>Employee Data</p>
                </NavLink>

                <NavLink
                    to={'/tracking-record/attendance-record'}  
                    className={({isActive, isPending}) => 
                    isPending ? `${isTracking ? 'block': "hidden"} flex pl-5 gap-2 items-center
                    border-r-2 p-2 bg-transparent hover:border-primary hover:bg-optional 
                    text-secondary hover:text-primary cursor-pointer transition-all delay-50 ease-in-out`
                    :
                    isActive ? `${isTracking ? 'block': "hidden"} flex pl-5 gap-2 items-center
                    border-r-2 p-2 bg-optional border-primary text-primary cursor-pointer 
                    transition-all delay-50 ease-in-out`
                    :
                    `${isTracking ? 'block': "hidden"} flex pl-5 gap-2 items-center
                    border-r-2 p-2 bg-transparent hover:border-primary hover:bg-optional 
                    text-secondary hover:text-primary cursor-pointer transition-all delay-50 ease-in-out`
                  }>
                    <FaClipboardList />
                    <p className={`${leftbar ? 'hidden': 'block'} font-secondary ease-in-out text-xs md:text-sm`}>Attendance Record</p>
                </NavLink>
            </div>

            <div 
                onClick={() => setIsMonitoring(prevState => !prevState)}
                className={`flex items-center ${leftbar ? 'pt-1 justify-center' : 'p-4 justify-between'} border-r-2 p-2
                hover:border-primary hover:bg-optional hover:bg-optional text-secondary hover:text-primary cursor-pointer 
                transition-all delay-50 ease-in-out ${isMonitoring ? 'border-primary bg-optional': 'bg-transparent'} `}>
                  <div className={`${leftbar ? '': 'flex gap-2 items-center'}`}>
                      <FaUsers 
                        className={`${leftbar ? 'text-2xl' : ''}
                        ${isMonitoring ? 'text-primary': ''}
                        text-1xl lg:text-2xl`} />
                      <p 
                        className={`${leftbar ? 'hidden': 'block'}
                        ${isMonitoring ? 'text-primary': ''}
                        font-secondary ease-in-out text-sm md:text-md`}>
                          Monitoring and Control
                      </p>
                  </div>
                  {!leftbar && 
                    <AiFillCaretDown 
                      className={`${isMonitoring ? 'rotate-0': 'rotate-90'}
                      ${isMonitoring ? 'text-primary': ''}`}
                      />}
            </div>
            <NavLink 
                to={'/monitoring-and-control/add-employee'} 
                className={({isActive, isPending}) => 
                    isPending ? `${isMonitoring ? 'block': "hidden"} flex pl-5 gap-2 items-center
                    border-r-2 p-2 bg-transparent hover:border-primary hover:bg-optional 
                    text-secondary hover:text-primary cursor-pointer transition-all delay-50 ease-in-out`
                    :
                    isActive ? `${isMonitoring ? 'block': "hidden"} flex pl-5 gap-2 items-center
                    border-r-2 p-2 bg-optional border-primary text-primary cursor-pointer 
                    transition-all delay-50 ease-in-out`
                    :
                    `${isMonitoring ? 'block': "hidden"} flex pl-5 gap-2 items-center
                    border-r-2 p-2 bg-transparent hover:border-primary hover:bg-optional 
                    text-secondary hover:text-primary cursor-pointer transition-all delay-50 ease-in-out`
                  }>
                    <BiSolidUserPlus />
                    <p className={`${leftbar ? 'hidden': 'block'} font-secondary ease-in-out text-xs md:text-sm`}>New Employee</p>
                </NavLink>
        </div>
        <div className={`${leftbar ? 'pt-1 mt-5 justify-center' : 'p-4'} flex gap-2 items-center border-r-2 p-2 bg-transparent
                  hover:border-primary text-secondary hover:text-primary cursor-pointer transition-all delay-50 ease-in-out`}>
                  <IoSettingsSharp className={`${leftbar ? 'text-2xl' : ''} text-1xl lg:text-2xl`} />
                <p 
                  className={`${leftbar ? 'hidden': 'block'} font-secondary ease-in-out text-sm md:text-md`}>Settings</p>
            </div>
      </div>
  </div>
</div>
  )
}
