import React from 'react'
import '../styles/dashboard.css'
import { Navbar } from '../layout/Navbar'
// import face_bg from '../../assets/face_bg.jpg'
export const LandingPage = () => {
  return (
    <div class="bg-gradient-to-tr from-primary to-purple-600 h-screen w-screen">
      <Navbar />
      <div className='flex items-center justify-center'>
        <div className='max-w-[90rem] w-full h-[40rem] grid grid-cols-1 md:grid-cols-2 border border-black'>
            <div className='border border-black'>

            </div>
            <div className='border border-black'>

            </div>
        </div>
      </div>
    </div>
  )
}
