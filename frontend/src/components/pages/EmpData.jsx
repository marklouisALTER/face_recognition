import React,{useEffect,useState} from 'react'
import { Header } from '../layout/Header'
import { Leftbar } from '../layout/Leftbar'
import { useAuth } from '../Authentication/useAuth'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import { Table } from '../layout/Table'
import { useNavigate } from 'react-router-dom'
import { LuSettings2 } from 'react-icons/lu'

export const EmpData = ({leftbar,setLeftbar,title}) => {
  const {getUser,isAuthenticated, logout} = useAuth();
  const [user] = useState(getUser());
  const navigate = useNavigate();

  if(!isAuthenticated()){
    navigate('/login');
  }

  useEffect(() => {
      document.title = title;
  })

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
                <div className='h-full w-full mt-5 px-5 bg-optional rounded-md shadow-xl shadow-spread-md shadow-gray-500'>
                    <div className='flex justify-end items-center'>
                        <button
                            className='bg-primary px-10 py-2 flex items-center gap-2 font-secondary text-white text-md rounded-md
                            hover:bg-green-700 shadow-md shadow-gray-300 transition-all delay-50 ease-in-out' 
                        >
                            <LuSettings2 className='text-md'/>
                            Filter
                        </button>
                        </div>
                    <div className='mt-5'>
                        <Table />
                    </div>
                </div>
            </div>
        </div>  
    </div>
  )
}
