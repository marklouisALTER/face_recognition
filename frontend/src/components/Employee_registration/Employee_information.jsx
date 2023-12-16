import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Form, Select,Button, Input, Upload } from 'antd'
import { UploadOutlined,SolutionOutlined } from '@ant-design/icons'
import { Modal } from '../Modal/Modal'


export const Employee_information = ({toggle,orientation}) => {
  
  const [validation, setValidation] = useState({
    title: '',
    comment: '',
  })



  const onFinish = async (values) => {

    let error = {
      title: '',
      comment: '',
    }

    console.log('Success:', values);
    const firstname = values.firstname;
    const lastname = values.lastname;
    const imageupload = values.imageupload[0];
  
    const formData = new FormData();
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('file', imageupload, imageupload.name); // Use 'file' as the key for the image
  
    try {
      const response = await axios.post('http://localhost:5000/employeedata', formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        },
      });

      toggle();
    } catch (error) {
      console.error('Error:', error);
      error = {
        title: 'Unable to register',
        comment: 'There is problem in the server'
      }
      setValidation(error)
    }
    
  };
  
  
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  // Image information
  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      console.log('Uploaded file:', info.file);
    }
  };


  return (
    <div className='w-full ml-[1rem] mr-[0] md:mr-[10rem]'>
        <div className='ml-10 mb-10 flex items-center justify-center gap-2'>
              <SolutionOutlined className='block md:hidden text-xl text-primary'/>
              <h1 className='block md:hidden font-secondary text-2xl'>Register the user</h1>
        </div>
        <div className=''>  
            <div className=''>
            <Form
            name="basic"
            className='m-0 md:m-auto'
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              offset: orientation === "vertical" ? 2: 0,
              span: 16,
            }}
            style={{
              maxWidth: 600
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            // layout='vertical'
          >
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[
                {
                  required: true,
                  message: 'Please input your First Name!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: 'Please input your Last Name!',
                },
              ]}
            >
              <Input />
            </Form.Item> 

            <Form.Item
              wrapperCol={{
                offset: orientation == "vertical" ? 2 : 10 ,
                span: 16,
              }}
              
            >
            <Form.Item
              label="Face Image"
              name="imageupload"
              valuePropName="fileList"
              getValueFromEvent={(e) =>
                e.fileList.map((file) => file.originFileObj)
              }
              rules={[
                {
                  required: true,
                  message: 'Please put atleast one image!',
                },
              ]}
              >
              

            <Upload
              listType="picture"
              accept="image/*"
              // beforeUpload={() => true}
              name="imageupload"
              onChange={handleFileChange}
              
            >
              <Button 
                style= {orientation === "vertical" ? {width : "250px"}:{width: "200px"}}
                icon={<UploadOutlined />}>
                
                Upload</Button>
            </Upload>
            </Form.Item>
            <div className='flex justify-end gap-2 md:justify-end'>
              <Button 
                type="success" 
                htmlType="submit"
                className='bg-primary w-[10rem] md:w-full hover:bg-green-700 text-white'
                >
                Submit and proceed
              </Button>
            </div>
            </Form.Item>
          </Form>
          </div>
        </div>
        {validation.title && 
                    <Modal {...validation} toggle={() => setValidation(prevState => ({...prevState, title: '', comment: ''}))}/>
                }
    </div>
  )
}
