import React,{useEffect, useState} from 'react'
import { Header } from '../layout/Header'
import { Leftbar } from '../layout/Leftbar'
import { useAuth } from '../Authentication/useAuth'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import { useNavigate } from 'react-router-dom'
import TableComponent from '../layout/TableComponent'
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
                    <TableComponent />
                </div>
        </div>  
    </div>
  )
}
