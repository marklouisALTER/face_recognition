import React from 'react'

export const Navbar = () => {
  return (
    <div className='w-screen px-10 md:px-20 flex justify-between items-center py-4'>
        <h1 className='text-primary text-2xl font-bold font-fontBold'>AI Face Attendance</h1>
        <div className='flex items-center gap-5 text-primary font-secondary'>
            <p>Homepage</p>
            <p>About</p>
            <p>Our Team</p>
          </div>
        <div className='text-white bg-primary px-10 rounded-xl p-1 font-optional'>
            <p>Sign in</p>
        </div>
    </div>
  )
}
