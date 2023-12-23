import React, { useRef, useEffect,useState } from 'react';
import { useAuth } from '../components/Authentication/useAuth'
import { useNavigate } from 'react-router-dom';
import { Leftbar } from '../components/layout/Leftbar';
import { Header } from '../components/layout/Header';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import face_logo from '../assets/face_logo.png';
import { Notification } from '../components/Notification/Notification';
import { FaClipboardList } from 'react-icons/fa'
import { BiSolidUserPlus } from 'react-icons/bi'
import { MobileNotif } from '../components/Notification/MobileNotif';
import { Capture } from './Capture';
export const Dashboard = ({title, leftbar,setLeftbar}) => {

    const {isAuthenticated, getUser, logout} = useAuth(); 
    const navigate = useNavigate();   
    const [user] = useState(getUser()); 
    const [isNotification, setIsNotification] = useState(false); 
    const [isMobileNotif, setIsMobileNotif] = useState(false); 

    useEffect(() => {

        if(!isAuthenticated()){
          navigate('/login');
        }
    
        document.title = title;
    
      },[isAuthenticated, title])

    return (
        <div className='w-screen h-screen flex'>
        <div>
            <Leftbar leftbar={leftbar}/>
        </div>
        <div className='w-full h-full'>
            <Header 
                user={user} 
                openNotif={() => setIsNotification(prevState => !prevState)} 
                logout={logout} 
                leftbar={() => setLeftbar(prevState => !prevState)}
                notifMobile ={() => setIsMobileNotif(prevState => !prevState)}
            />

            <div className='h-[85%] overflow-y-hidden'>
            
                <div className='m-2'>
                    <Breadcrumbs/>
                </div>
                <div className='h-full grid grid-cols-3 gap-5 px-5'>
                    <div className='grid grid-rows-4 gap-5 col-span-3 lg:col-span-2'>
                        <div className='row-span-1 p-3 rounded-md bg-optional shadow-md shadow-spread shadow-gray-300'>
                            <div className='flex flex-col items-center justify-between md:flex-row'>
                                <h1 className='font-optional font-bold text-primary text-2xl'>Good Morning, Markme19</h1>
                                <h1 className='font-optional text-primary font-semibold'>Date today: 
                                    <span className='font-normal italic text-black'> September 18, 2023</span>
                                </h1>
                            </div>
                            <div>
                                <h1 className='font-optional text-gray-500 italic mt-3'>Shortcut Access</h1>
                                <div className='hidden sm:flex gap-5 px-5 mt-2 '>
                                    <button 
                                        className='bg-primary px-4 py-2 text-white hover:bg-onMouse rounded-md text-sm
                                        transition-all delay-50 ease-in-out flex items-center gap-2'>
                                        <FaClipboardList />
                                        View Attendance Record
                                    </button>
                                    <button 
                                        className='bg-primary px-4 py-2 text-white hover:bg-onMouse rounded-md text-sm
                                        transition-all delay-50 ease-in-out flex items-center gap-2'>
                                        <BiSolidUserPlus className='text-xl'/>
                                        Create New Employee
                                    </button>
                                </div>

                                {/* Mobile view xs size */}
                                <div className='flex sm:hidden'>
                                <button 
                                        className='bg-primary px-4 py-2 text-white hover:bg-onMouse rounded-md text-sm
                                        transition-all delay-50 ease-in-out flex items-center gap-2 mx-auto'>
                                        <BiSolidUserPlus className='text-xl'/>
                                        Shortcut Access
                                </button>
                                </div>
                            </div>
                        </div>
                        <div 
                            className='row-span-3 flex-col rounded-md bg-optional shadow-md
                            shadow-spread shadow-gray-300 p-5'>

                                <div className='flex flex-col items-center justify-between md:flex-row'>
                                    <h1 className='font-primary text-xl'>Click open to start</h1>
                                    <button
                                        onClick={() => navigate('/capture')}
                                        className='bg-primary px-5 py-2 rounded-md font-secondary text-white
                                        hover:bg-blue-500 focus:outline-none focus:ring ring-primary'>
                                        Open the camera
                                    </button>
                                </div>
                                
                                <div className=' flex items-center justify-center mt-10'>
                                <img 
                                    src={face_logo} 
                                    alt="Dummy logo"
                                    className='object-cover w-[35%]'
                                    />
                                </div>
                        </div>
                    </div>
                    <div className='hidden lg:block rounded-md overflow-y-auto'>
                    <div className='bg-primary p-2 rounded-md'>
                        <h1 className='text-white font-secondary text-xl text-center'>Notes for today</h1>
                    </div>
                        <Notification 
                            openNotif={() => setIsNotification(prevState => !prevState)} 
                            notification={isNotification}
                        />
                    </div>
                </div>

            </div>
        </div>
        {isMobileNotif ? <MobileNotif openNotif={() => setIsMobileNotif(prevState => !prevState )}/> : '' }
        
    </div>
    );
};
