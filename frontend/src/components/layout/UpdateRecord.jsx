import React from 'react'

export const UpdateRecord = ({toggle,attendance_id, employee_id, full_name,date,time_in,time_out}) => {

    return (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 backdrop-blur-sm">
            <div 
                data-aos="zoom-in"
                data-aos-easing="ease-in-out"
                data-aos-delay="50"
                className="bg-white rounded-md shadow-lg p-4 w-96"
            >
            <h1 className='font-secondary text-md mb-5 text-center font-semibold text-primary italic'>Edit Employee Information</h1>
                <p>{attendance_id}</p>
                <p>{employee_id}</p>
                <p>{full_name}</p>
                <p>{date}</p>
                <p>{time_in}</p>
                <p>{time_out}</p>
                <button 
                    onClick={toggle}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Close</button>
            </div>
        </div>
    )
}
