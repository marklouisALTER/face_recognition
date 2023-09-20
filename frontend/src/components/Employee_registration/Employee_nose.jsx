import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Form, Select,Button, Input, Upload } from 'antd'
import { UploadOutlined,UserOutlined } from '@ant-design/icons'
export const Employee_nose = ({orientation,toggle,toggleDown}) => {

  const [employeeNames, setEmployeeNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSelectedUserName, setIsSelectedUserName] = useState();
  


  useEffect(() => {
    const fetchingData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/all_employees');
        console.log(response.data);
        setEmployeeNames(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchingData();
  }, []);
    

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const onFinish = async (values) => {
    const employeeName = values.employee_name;
    const employee_id = isSelectedUserName;
    const imageupload = values.imageupload[0];

    const formData = new FormData();
    formData.append('employee_name', employeeName);
    formData.append('employee_id', employee_id);
    formData.append('imageupload', imageupload,imageupload.name);
    

    console.log({employeeName, employee_id, imageupload})
    toggle();
  };

  

  // Image information
  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      console.log('Uploaded file:', info.file);
    }
  };

  const selectedUserName = (value) => {
      const selectedEmployeeFname = employeeNames.find(employee => employee.first_name === value)
      if (selectedEmployeeFname) {
        const employeeID = selectedEmployeeFname.employee_id;
        setIsSelectedUserName(employeeID);
      } else {
        setIsSelectedUserName(null);
      }
  }
  console.log(isSelectedUserName)

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: orientation === "vertical" ? 10: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };
  return (
    <div className='w-full ml-[1rem] md:ml-[5rem] mb-[10rem] mr-[0] md:mr-[10rem]'>
        <div className='ml-10 mb-10 flex items-center justify-center gap-2'>
              <UserOutlined className='block md:hidden text-xl text-primary'/>
              <h1 className='block md:hidden font-secondary text-2xl'>Register the nose of the user</h1>
        </div>
  <Form
    name="basic"
    initialValues={{
      employee_id: isSelectedUserName,
    }}
    className='m-0 md:m-auto'
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    {...formItemLayout}
    style={{
      maxWidth: 600,
    }}
    wrapperCol={{
      offset: orientation === "vertical" ? 2: 0,
      span: 12,
    }}

  >
    <Form.Item 
      name="employee_name"
      className='text-secondary'
      rules={[
        {
          required: true,
          message: 'I need the user ID!',
        },
      ]}
      label="Select Employee">
      
      <Select
            placeholder={loading ? 'Loading...' : 'Employee no.'}
            allowClear
            disabled={loading}
            onChange={(value) => selectedUserName(value)}
          >
            {employeeNames.map((employee, index) => (
              <Select.Option key={index} value={employee.first_name}>
                {employee.first_name}
              </Select.Option>
            ))}
          </Select>
    </Form.Item>

      <Form.Item
              wrapperCol={{
                offset: orientation == "vertical" ? 2 : 2 ,
                span: 16,
              }}
            >
            <Form.Item
              label="User Eyebrows"
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
                style= {orientation === "vertical" ? {width : "270px"}:{width: "200px"}}
                icon={<UploadOutlined />}>
                  Upload
              </Button>

            </Upload>
            </Form.Item>
            <div className='flex justify-end gap-2 md:justify-end'>
              <Button 
                classNames={toggleDown}
                className='bg-blue-600 w-[10rem] md:w-full hover:bg-blue-700 text-white'
                >
                Go back
              </Button>
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
  )
}
