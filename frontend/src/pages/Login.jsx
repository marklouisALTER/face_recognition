import React,{useEffect} from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../components/Authentication/useAuth'
import { Link } from 'react-router-dom'
import { Modal } from '../components/Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { FaUserLock } from 'react-icons/fa'
import { PiSignInBold } from 'react-icons/pi'
import { BiSolidKey } from 'react-icons/bi'
import { MdVpnKeyOff } from 'react-icons/md'
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

export const Login = ({title}) => {
    
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    if(!isAuthenticated){
      navigate('/dashboard');  
    }

    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    })

    const [validation, setValidation] = useState({
        title: '',
        comment: '',
      })

    function handleCredentials(event){
        const {name, value} = event.target
        setCredentials(prevState => {
            return {...prevState,
            [name]:value
            }
        })
    }

    const submitFunction = async (e) => {
        e.preventDefault();
    
        let error = {
          title: '',
          comment: '',
        }
        
        if(credentials.username == '' && credentials.password == ''){
            error = {
              title: 'Invalid credentials',
              comment: 'Please fill up all the field'
            }
            return setValidation(error);
        }
        try {
              const response = await axios.post('http://localhost:5000/login', credentials);
                if (response.status === 200) {
                  login({
                    user: response.data.user_data.username,
                    token: response.data.token
                  })
                  console.log(response)
                  console.log('Login successful');
                  navigate('/dashboard');
                  console.log(response.data)
                } else if(response.status === 401) {
                  error = {
                    title: 'Unable to Login',
                    comment: 'Your credentials are incorrect'
                  }
                  console.log(response.data)
                  setValidation(error);
                }
        } catch (error) {
          error = {
            title: 'Unable to Login',
            comment: 'Your Credentials are incorrect'
          }
          setValidation(error);
        }
    
      };


      useEffect(() => {
    
        document.title = title;
    
      },[title])

  return (
    <div className='relative flex justify-center w-full h-screen overflow-hidden py-[5rem] p-[2rem]'>
    <div className='mt-10 min-w-[23rem] max-w-[40rem] flex flex-col'>
        <h1 className='font-secondary font-bold text-3xl text-primary text-center py-5'>Login to your Account</h1>

        <div className="mt-5 flex items-center">
            <div className="border-t border-gray-500 flex-grow"></div>
                <p className="mx-2 font-secondary flex items-center gap-2"><FaUserLock />Username</p>
            <div className="border-t border-gray-500 flex-grow"></div>
        </div>

          <div className='flex items-center justify-center'>
              <input 
                    type="text"
                    name="username"
                    value={credentials.username}
                    onChange={handleCredentials} 
                    required
                    className='border-2 border-primary w-full py-2 rounded-xl px-5 font-optional focus:outline-none
                    focus:ring focus:ring-blue-800 outline-none'/>
          </div>

          <div className="mt-5 flex items-center">
              <div className="border-t border-gray-500 flex-grow"></div>
                  <p className="mx-2 font-secondary flex items-center gap-2"><BiSolidKey />Password</p>
              <div className="border-t border-gray-500 flex-grow"></div>
          </div>

          <div className='flex items-center justify-center'>
              <input
                    type="password" 
                    name="password"
                    value={credentials.password}
                    onChange={handleCredentials}
                    required
                    className='border-2 border-primary w-full py-2 rounded-xl px-5 font-optional focus:outline-none
                    focus:ring focus:ring-blue-800 outline-none'/>
          </div>
          
          <div className='flex items-center mt-5 gap-2'>
                <input 
                        id="checked-checkbox" 
                        type="checkbox" 
                        value="" 
                        className="w-4 h-4 text-primary bg-primary border-gray-300 rounded focus:ring-blue-800 
                        dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                        dark:border-gray-600" />
                <label 
                        htmlFor="checked-checkbox" 
                        className="ml-2 text-primary text-md font-optional">
                      Remember Me
                </label>
          </div>
          
          <button 
              onClick={submitFunction}
              className='p-2 mt-5 rounded-xl transition-all delay-100 ease-in-out text-white font-secondary
              bg-primary hover:bg-blue-800 hover:text-white focus:outline-none focus:ring ring-primary flex
              items-center gap-2 justify-center'>
                <PiSignInBold />
            Sign In
          </button>
          <Link className='mt-5 mb-5 ml-auto text-primary hover:text-secondary transition-all delay-50
                ease-in-out'>
              <h1 className='font-optional flex items-center gap-2'><MdVpnKeyOff /> Forgot Password</h1>
          </Link>
          <div className='mt-20'>
              <h1 className='text-gray-400 font-secondary text-center'>@ Created by Markme 2023</h1>
          </div>
          
    </div>

{validation.title && 
<Modal {...validation} toggle={() => setValidation(prevState => ({...prevState, title: '', comment: ''}))}/>
}
      <div 
        data-aos="zoom-in"
        data-aos-easing="ease-in-out"
        data-aos-delay="50"
        className='absolute z-[-2] inset-0 w-[20rem] h-[20rem] bg-optional top-[-9rem] left-[-5rem] rounded-full'></div>
      <div 
        data-aos="zoom-in"
        data-aos-easing="ease-in-out"
        data-aos-delay="50"
        className='absolute w-[20rem] h-[20rem] bg-primary bottom-[-10rem] right-[-14rem] md:right-[-5rem] rounded-full'></div>
  </div>
  )
}
