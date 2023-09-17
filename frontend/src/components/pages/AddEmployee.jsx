import React,{useEffect,useState} from 'react'
import { Header } from '../layout/Header'
import { Leftbar } from '../layout/Leftbar'
import { useAuth } from '../Authentication/useAuth'
import { Breadcrumbs } from '../layout/Breadcrumbs'
import { Table } from '../layout/Table'

export const AddEmployee = ({leftbar,setLeftbar,title}) => {
    const {getUser, logout} = useAuth();
    const [user] = useState(getUser());
    useEffect(() => {
        document.title = title;
        console.log('leftbar:', leftbar);
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
                <div className=''>

                </div>

            </div>
        </div>  
    </div>
)
}
