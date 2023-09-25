import React,{useEffect,useState, useMemo} from 'react'
import { Header } from '../layout/Header'
import { Leftbar } from '../layout/Leftbar'
import { useAuth } from '../Authentication/useAuth'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import TableComponent from '../layout/TableComponent'
import { useNavigate } from 'react-router-dom'
import { LuSettings2 } from 'react-icons/lu'
import { Modal } from '../Modal/Modal'

import axios from 'axios'
import { UpdateEmpData } from '../layout/UpdateEmpData'

export const EmpData = ({leftbar,setLeftbar,title}) => {

    const {getUser,isAuthenticated, logout} = useAuth();
    const [user] = useState(getUser());
    const navigate = useNavigate();
    const [data, setData] = useState([])
    const [dataUpdate, setDataUpdate] = useState(false);
    const [selectUpdateValue, setSelectUpdateValue] = useState([])
    const [isValidate, setIsValidate] = useState({
        title: '',
        comment: ''
    })


    if(!isAuthenticated()){
    navigate('/login');
    }

    
    useEffect(() => {
    
    document.title = title;
        const controller = new AbortController();
        const fetchingDatas = async () => {
        try{
            const response = await axios.get("http://localhost:5000/fetch_all_employees", {
                signal: controller.signal
            });
            setData(response.data.data)
        }catch(e){
            if(axios.isCancel(e)){
                controller.abort()
            }
            console.log(e);
        }

    }
    fetchingDatas();

    return () => {
        console.log("Components unmounted");
    }
    },[title])
    
    
    const handleUpdate = async (id) => {

        const selectUpdate = data.filter(item => item.employee_id === id);
        setSelectUpdateValue(selectUpdate[0]);
        setDataUpdate(true)
    }

    const handleDelete = async (id) => {
        let error ={
            title: "",
            comment: '',
        }
            try{
                const responseDel = await axios.delete(`http://localhost:5000/employeedata/${id}`)
                const updatedData = data.filter(item => item.employee_id !== id);
                setData(updatedData);   
                error = {
                    title: "Success",
                    comment: `You Successfully Deleted the ID :${id}`,
                }
                setIsValidate(error)
            }catch(e){
                error = {
                    title: "Server Error",
                    comment: `Server Error : ${e}`,
                }
                setIsValidate(error)
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
                <div className='h-full w-full'>
                    <div className='mt-10'>
                        <TableComponent 
                                data={data} 
                                dataRec={null} 
                                handleDelete={handleDelete} 
                                handleUpdate={handleUpdate}
                        />
                    </div>
                </div>
            </div>
        </div>  


        {isValidate.title && (
            <Modal 
                {...isValidate} 
                toggle={() => 
                    setIsValidate(prevState => ({
                        ...prevState, 
                        title: '', 
                        comment: ''
                    }))
                }/>
        )}

        {dataUpdate && (
            <UpdateEmpData 
            {...selectUpdateValue}
            handleUpdate={() => setDataUpdate(prevState => !prevState)}
            />
        )}


    </div>
  )
}
