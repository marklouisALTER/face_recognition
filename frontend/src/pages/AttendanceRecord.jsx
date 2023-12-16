import React,{useEffect, useState} from 'react'
import { Header } from '../components/layout/Header'
import { Leftbar } from '../components/layout/Leftbar'
import { useAuth } from '../components/Authentication/useAuth'
import { Breadcrumbs } from '../components/layout/Breadcrumbs'
import { useNavigate } from 'react-router-dom'
import TableComponent from '../components/layout/TableComponent'
import { Modal } from '../components/Modal/Modal'
import { LuSettings2 } from 'react-icons/lu'
import axios from 'axios'
import { UpdateRecord } from '../components/layout/UpdateRecord'

export const AttendanceRecord = ({leftbar,title,setLeftbar}) => {

    const {getUser,isAuthenticated, logout} = useAuth();
    const [user] = useState(getUser());
    const navigate = useNavigate();
    const [dataRec, setDataRec] = useState([])
    const [popupUpdate, setPopupUpdate] = useState(false)
    const [selectedDataValue, setSelectedDataValue] = useState([])
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

        try{
            const response = await axios.delete(`http://localhost:5000/attendance_record/${id}`)
            const updateData = dataRec.filter(item => item.attendance_id !== id)
            setDataRec(updateData)

            const error = {
                title: 'Success',
                comment: `The ${id} is Successfully Deleted`
            }

            setIsValidate(error)
        }catch(e){

        }
    }
    
    // Update button it will filter the data 
    const handleUpdate = async (id) => {
        const selectedData = dataRec.filter(items => items.attendance_id === id)
        setSelectedDataValue(selectedData[0])
        setPopupUpdate(true)
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
                    <TableComponent 
                        dataRec={dataRec} 
                        data={0} 
                        handleDelete={handleDelete} 
                        handleUpdate={handleUpdate} 
                    />
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
        }/>}

        {popupUpdate && 
            <UpdateRecord 
                {...selectedDataValue}
                toggle={() => setPopupUpdate(prevState =>!prevState)}
            />
        }
    </div>
)
}
