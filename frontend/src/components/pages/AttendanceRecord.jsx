import React,{useEffect, useState} from 'react'
import { Header } from '../layout/Header'
import { Leftbar } from '../layout/Leftbar'
import { useAuth } from '../Authentication/useAuth'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import { useNavigate } from 'react-router-dom'
import TableComponent from '../layout/TableComponent'
import { Modal } from '../Modal/Modal'
import { LuSettings2 } from 'react-icons/lu'
import axios from 'axios'

export const AttendanceRecord = ({leftbar,title,setLeftbar}) => {

    const {getUser,isAuthenticated, logout} = useAuth();
    const [user] = useState(getUser());
    const navigate = useNavigate();
    const [dataRec, setDataRec] = useState([])
    const [isValidate, setIsValidate] = useState({
        title: '',
        comment: ''
    });
    if(!isAuthenticated()){
        navigate('/login');
    }

    useEffect(() => {
        document.title = title;
        
        const controller = new AbortController();

        const  fetchingData = async () => {
            try{
                const response  = await axios.get('http://localhost:5000/view_all_attendance', {
                    signal: controller.signal
                });
                
                setDataRec(response.data.attendance_data)
            }catch(e){
                if(axios.isCancel(e)){
                    controller.abort()
                }
                console.log(e)
            }
        }
        
        fetchingData();
        return () => {
            console.log("Component Unmounted");
        }
    },[])

    const handleDelete = async (id) => {
        const error = {
            title: 'Delete',
            comment: `Bounce kana ito id mo ${id}`
        }
        setIsValidate(error)
    }


    const handleUpdate = async (id) => {
        const error = {
            title: 'Update',
            comment: `Connect mo na sa backend id mo ${id}`
        }
    }

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
                    <TableComponent dataRec={dataRec} data={0} handleDelete={handleDelete} handleUpdate={handleUpdate} />
                </div>
        </div>  
        {isValidate.title && 
            <Modal 
                {...isValidate} 
                toggle={() => setIsValidate(prevState => ({
                ...prevState,
                title: '',
                comment: '',

            }))
        }/>

        }
    </div>
  )
}
