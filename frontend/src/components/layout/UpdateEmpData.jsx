import React,{useEffect, useState} from 'react'
import { Input,Form,Switch,Button,Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { SlLogout } from 'react-icons/sl'
import { AiFillSave } from 'react-icons/ai'
import { Modal } from '../Modal/Modal'
import axios from 'axios'

export const UpdateEmpData = ({handleUpdate, employee_id, first_name, last_name, face_image}) => {

  const [componentDisabled, setComponentDisabled] = useState(true);
  const [isValidate, setIsValidate] = useState({
    title: "",
    comment: ""
  })
  const [form] = Form.useForm();

  
  const onSuccess = async (values) => {

    const formData = new FormData();
    let error = {
      title: "",
      comment: "",
    };
  
    formData.append('employee_id', values.employee_id);
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
  
    if (values.imageupload && values.imageupload.length > 0) {
      const image = values.imageupload[0]; 
      formData.append('file', image, image.name);
    }
  
      try {
        const response = await axios.put(`http://localhost:5000/updateemployee/${values.employee_id}`, formData, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          },
          withCredentials: true,
        });
  
        console.log('Response from backend ', response.data);

          error = {
            title: "Success",
            comment: "Data Updated Successfully",
          };

          setIsValidate(error);

    } catch (e) {

      console.log("Error", e);
      error = {
        title: "Error",
        comment: "Data not updated, there is a problem in the server",
      };

      setIsValidate(error);
    }
    
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed", errorInfo)
  }
  const fileList = [
        {
          uid: '-1',
          name: 'face_image.png',
          status: 'done',
          url: `data:image/png;base64,${face_image}`,
          thumbUrl: `data:image/png;base64,${face_image}`,
        }
      ];

      const handleFileChange = (info) => {
        if (info.file.status === 'done') {
          console.log('Uploaded file:', info.file);
    
          // Set the uploaded file in the form values
          form.setFieldsValue({
            imageupload: [info.file.originFileObj],
          });
        }
      };
      
      const handleUpdateClick = () => {
        form.setFieldsValue({
          imageupload: form.getFieldValue('imageupload'),
        });
      };

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
                label="Emp_ID"
                name="employee_id"
                initialValue={employee_id}
                hidden
                rules={[
                  {
                    required: true,
                    message: 'Please input the Employee_id!',
                  },
                ]}
                >
                <Input/>
            </Form.Item>
              <Form.Item 
                label="First Name"
                name="first_name"
                initialValue={first_name}
                rules={[
                  {
                    required: true,
                    message: 'Please input the First Name!',
                  },
                ]}
                >
                <Input/>
            </Form.Item>
              <Form.Item 
                label="Last Name"
                name="last_name"
                initialValue={last_name}
                rules={[
                  {
                    required: true,
                    message: 'Please input the Last Name!',
                  },
                ]}
                >
                <Input/>
            </Form.Item>
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
                    message: 'Please re-insert the image again!',
                  },
                ]}
              >
                <Upload
                  listType="picture"
                  defaultFileList={[...fileList]}
                  onChange={handleFileChange}
                  accept="image/*"
                  name="file"
                >
                <Button 
                  icon={<UploadOutlined />}
                >
                  Upload
                </Button>

              </Upload>
              </Form.Item>

              <Form.Item
              wrapperCol={{
                offset: 9
              }}
              >
                <div className='flex gap-2 mt-5'>
                <Button
                  type='close'
                  onClick={handleUpdate}
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
                    onClick={handleUpdateClick}
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
