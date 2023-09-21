import React,{useEffect,useState} from 'react'
import { Header } from '../layout/Header'
import { Leftbar } from '../layout/Leftbar'
import { useAuth } from '../Authentication/useAuth'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import TableComponent from '../layout/TableComponent'
import { useNavigate } from 'react-router-dom'
import { LuSettings2 } from 'react-icons/lu'
import axios from 'axios'

export const EmpData = ({leftbar,setLeftbar,title}) => {
    const {getUser,isAuthenticated, logout} = useAuth();
    const [user] = useState(getUser());
    const navigate = useNavigate();
    const [data, setData] = useState([])
    if(!isAuthenticated()){
    navigate('/login');
    }

    useEffect(() => {
    
    document.title = title;

        const fetchingDatas = async () => {
        try{
            const response = await axios.get("http://localhost:5000/fetch_all_employees");
            setData(response.data.data)
        }catch(e){
            console.log(e)
        }
    }
    fetchingDatas()
    },[])
    console.log(data);

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
                <div className='h-full w-full'>
                    <div className='mt-10'>
                        <TableComponent data={data}/>
                    </div>
                </div>
            </div>
        </div>  
    </div>
  )
}
