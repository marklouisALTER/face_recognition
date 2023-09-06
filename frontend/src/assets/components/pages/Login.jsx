import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { AiOutlineArrowRight } from 'react-icons/ai'
export const Login = () => {
    
    const [login, setLogin] = useState({
        username: "",
        password: ""
    })

    const [message, setMessage] = useState("")

    function handleChange(event){
        const {name, value} = event.target
        setLogin(prevState => {
            return {...prevState,
            [name]:value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://127.0.0.1:5000/login', login)
        .then(response => {
            setMessage(response)
            console.log("login successful")
        })
        .catch(error => {
            setMessage("Login unsuccessful")
        })
    }
    
    // console.log(message)

  return (
    <div 
        className='grid grid-cols-1 lg:grid-cols-3 w-screen h-screen'
    >
            <div 
                className='col-span-1 bg-primary grid grid-row-6'
            >
                <div className='row-span-1 flex items-center justify-center'>
                    <h1 className='text-white text-2xl font-primary font-bold pl-5'>Philippine Malabon Cultural Institute</h1>
                </div>
                <div className='row-span-4'>
                    <div className='mt-5'>
                        <h1 className='text-white pl-5 text-xl font-secondary font-bold'>Login to your Account</h1>
                            <form
                                className='flex flex-col mt-[2rem] gap-5 px-[3rem]'
                                onSubmit={handleSubmit}    
                            >
                                <div className="relative z-0 mb-6 w-full group">
                                    <input 
                                            className='block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2
                                            border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-900
                                            focus:outline-none focus:ring-0 focus:border-green-900 peer'
                                            type="text" 
                                            name="username"
                                            value={login.username}
                                            onChange={handleChange}
                                            placeholder=''
                                    />
                                    <label 
                                            className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300
                                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
                                            peer-focus:text-green-900 peer-focus:dark:text-green-900 peer-placeholder-shown:scale-100
                                            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Enter your Username
                                    </label>

                                </div>

                                <div className="relative z-0 mb-6 w-full group">
                                    <input 
                                            className='block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2
                                            border-white appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-900
                                            focus:outline-none focus:ring-0 focus:border-green-900 peer'
                                            type="password"
                                            name="password"
                                            value={login.password}
                                            onChange={handleChange} 
                                            placeholder=''
                                    />
                                    <label 
                                            className="peer-focus:font-medium absolute text-sm text-white dark:text-gray-400 duration-300 
                                            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-900 
                                            peer-focus:dark:text-green-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                            peer-focus:scale-75 peer-focus:-translate-y-6">
                                            Enter your Password
                                    </label>
                                </div>
                                <button 
                                        className='bg-secondary p-3 rounded-xl text-green-900 font-bold hover:bg-green-900 hover:text-white 
                                        transition-all delay-100 ease-in-out'
                                        style={{letterSpacing: '2px'}}
                                        type="submit">
                                            Login
                                </button>
                            </form>

                            <h1 className='mt-[4rem] flex items-center justify-end mr-[3rem] gap-3 font-semiboldt cursor-pointer hover:text-green-900'>Forgot password<AiOutlineArrowRight/></h1>
                    </div>
                </div>
                {/* <div className='row-span-1 border border-black'>

                </div> */}

            </div>
            
            <div className='col-span-2 grid grid-row-6 bg-secondary'>
                <div className='row-span-1 border border-black'>
                </div>
                <div className='row-span-5 border border-black'>

                </div>
            </div>
    </div>
  )
}
