import React,{useEffect, useState} from 'react'
import { Header } from '../layout/Header'
import { Leftbar } from '../layout/Leftbar'
import { useAuth } from '../Authentication/useAuth'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import { useNavigate } from 'react-router-dom'
import { Table } from '../layout/Table'
import { LuSettings2 } from 'react-icons/lu'

export const AttendanceRecord = ({leftbar,title,setLeftbar}) => {
    const {getUser,isAuthenticated, logout} = useAuth();
    const [user] = useState(getUser());
    const navigate = useNavigate();
  
    if(!isAuthenticated()){
      navigate('/login');
    }
  
    useEffect(() => {
        document.title = title;
    },[])

    return (
        <div className='w-full h-screen flex'>
        <div>
            <Leftbar leftbar={leftbar}/>
        </div>
        <div className='w-full h-full'>
            <Header user={user} logout={logout} leftbar={() => setLeftbar(prevState => !prevState)}/>
            <div className='h-[85%] px-5'>
            
                <div className='m-2'>
                    <Breadcrumbs/>
                </div>
                <div className='flex justify-end items-center'>
                        <button
                            className='bg-primary px-10 py-2 flex items-center gap-2 font-secondary text-white text-md rounded-md
                            hover:bg-green-700 shadow-md shadow-gray-300 transition-all delay-50 ease-in-out' 
                        >
                            <LuSettings2 className='text-md'/>
                            Filter
                        </button>
                        </div>
                    <Table />
                </div>
        </div>  
    </div>
  )
}
