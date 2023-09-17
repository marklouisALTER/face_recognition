import React,{useEffect,useState} from 'react'
import { Header } from '../layout/Header'
import { Leftbar } from '../layout/Leftbar'
import { useAuth } from '../Authentication/useAuth'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import { Table } from '../layout/Table'
import { useNavigate } from 'react-router-dom'

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
    <div className='w-screen h-screen flex'>
        <div>
            <Leftbar leftbar={leftbar}/>
        </div>
        <div className='w-full h-full'>
            <Header user={user} logout={logout} leftbar={() => setLeftbar(prevState => !prevState)}/>
            <div className=''>
            
                <div className='m-2'>
                    <Breadcrumbs/>
                </div>
                <div className='mt-10'>
                    <Table />
                </div>

            </div>
        </div>  
    </div>
  )
}
