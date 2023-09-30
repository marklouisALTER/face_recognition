import React,{useState} from 'react'
import { Input,Form,Switch,Button,DatePicker,TimePicker } from 'antd'
import { SlLogout } from 'react-icons/sl'
import { AiFillSave } from 'react-icons/ai'
import { UploadOutlined } from '@ant-design/icons'
import dayjs from 'dayjs';
import { Modal } from '../Modal/Modal'
import customParseFormat from 'dayjs/plugin/customParseFormat';
import axios from 'axios'
dayjs.extend(customParseFormat);



export const UpdateRecord = ({toggle,attendance_id, employee_id, full_name,date,time_in,time_out}) => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    const [isValidate, setIsValidate] = useState({
        title: "",
        comment: ""
    });
    const [form] = Form.useForm();
    const rawDate = new Date(date)
    const formatedDate = rawDate.toISOString().split('T')[0];
    const dateFormat = 'YYYY/MM/DD';

    const timeInObject = new Date(time_in);
    const timeOutObject = new Date(time_out);
    const timeOutString = timeOutObject.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    });
    const timeInString = timeInObject.toLocaleTimeString([], {
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZone: 'UTC' 
    });
    
    const onSuccess = async (values) => {
        
        const formData = new FormData();
        formData.append('employee_id', values.employee_id); 
        formData.append('attendance_id', values.attendance_id);
        formData.append('full_name', values.full_name);
        formData.append('date', values.date);
        formData.append('time_in', values.time_in);
        formData.append('time_out', values.time_out);

        let error = {
            title: "",
            comment: "",
        };

        try{
            const response = await axios.put(`http://localhost:5000/updateattendance/${values.attendance_id}`, formData, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                }
            })
            console.log('Response from backend ', response.data);
            error = {
                title: "Success",
                comment: "Attendance record updated successfully",
            };
            
            setIsValidate(error);
        }catch(err){
            console.log("Error", err);
            error = {
                title: "Error",
                comment: "Data not updated, there is a problem in the server",
            };
            setComponentDisabled(error);
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log(errorInfo)
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 backdrop-blur-sm">
            <div 
                data-aos="zoom-in"
                data-aos-easing="ease-in-out"
                data-aos-delay="50"
                className="bg-white rounded-md shadow-lg p-4 w-96"
            >
            <h1 className='font-secondary text-md mb-5 text-center font-semibold text-primary italic'>Edit Employee Information</h1>
            <div className='flex items-center gap-2 mb-2'>
            <h1 className='font-optional'>Enable</h1>
                <Switch
                    checkedChildren="ON" unCheckedChildren="OFF"
                    style={{backgroundColor: componentDisabled ? "gray" : ""}}
                    onClick={() => setComponentDisabled(prevState => !prevState)}
                />
            </div>
            <Form
                className='mt-5'
                form={form}
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                layout="horizontal"
                disabled={componentDisabled}
                style={{
                    maxWidth: 600,
                }}
                onFinish={onSuccess}
                onFinishFailed={onFinishFailed}
                autoComplete='off'
                >
                    <Form.Item
                        name="employee_id"
                        label="Employee ID"
                        hidden
                        initialValue={employee_id}
                        rules={[
                        {
                            required: true,
                            message: "Please enter the employee ID",
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="attendance_id"
                        label="Attendance ID"
                        hidden
                        initialValue={attendance_id}
                        rules={[
                        {
                            required: true,
                            message: "Please enter the attendance ID",
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item
                        name="full_name"
                        label="Full Name"
                        initialValue={full_name}
                        rules={[
                        {
                            required: true,
                            message: "Please enter a full name",
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    
                    <Form.Item 
                        label="Date"
                        rules={[
                            {
                                required: true,
                                message: "Please enter a date",
                            },
                            ]}
                    >
                        
                        <DatePicker 
                            defaultValue={dayjs(formatedDate, dateFormat)} 
                            format={dateFormat} 
                            style={{width: '100%'}}
                        />

                    </Form.Item>
                    <Form.Item 
                        label="Time In"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the Time in",
                            },
                            ]}
                    >
                        
                        <TimePicker 
                            defaultValue={dayjs(timeInString, 'HH:mm:ss')} 
                            style={{width: '100%'}}
                        />
                    </Form.Item>
                    <Form.Item 
                        label="Time Out"
                        rules={[
                            {
                                required: true,
                                message: "Please enter the Time Out",
                            },
                            ]}
                    >
                        
                        <TimePicker 
                            defaultValue={dayjs(timeOutString, 'HH:mm:ss')}
                            style={{width: '100%'}}
                        />
                    </Form.Item>
                    
                    <Form.Item
                        wrapperCol={{
                            offset: 9
                        }}
                    >
                <div className='flex gap-2 mt-5'>
                <Button
                    type='close'
                    onClick={toggle}
                    disabled={componentDisabled}
                    className={`${componentDisabled ? 'bg-gray-500' : 'bg-black hover:bg-gray-800'} text-white cursor-pointer flex gap-2 items-center`}
                >
                    <SlLogout/>
                    Go back
                </Button>
                <Button
                    type='success'
                    htmlType='submit'
                    className={`${componentDisabled ? 'bg-gray-500' : 'bg-primary hover:bg-blue-500'} text-white cursor-pointer flex gap-2 items-center`}
                    disabled={componentDisabled}
                    >
                        <AiFillSave />
                        Submit
                </Button>
                
                </div>
            </Form.Item>
            </Form>
            </div>

            {isValidate.title && (
          <Modal 
            {...isValidate} 
              toggle={() => 
                setIsValidate(prevState => ({
                  ...prevState, title: '', comment: ''})
                )}
          />
        )}
        </div>
    )
}
