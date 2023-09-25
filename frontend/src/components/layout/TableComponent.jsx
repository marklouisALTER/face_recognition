import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Button, Input, Space, Table } from 'antd';
import { SearchOutlined } from '@ant-design/icons';


const TableComponent = ({data,dataRec,handleDelete, handleUpdate}) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  // const handleDelete = async (id) => {
  //   console.log(id)
  // }


  const columnsEmployeeData = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      width: '30%',
      ...getColumnSearchProps('first_name'),
      sorter: (a, b) => a.first_name.length - b.first_name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      width: '30%',
      ...getColumnSearchProps('last_name'),
    },
    {
      title: 'Face Image',
      dataIndex: 'face_image',
      key: 'face_image',
      ...getColumnSearchProps('face_image'),
      render: (text) => (
        <img 
            src={`data:image/png;base64,${text}`}
            alt="Face"
            style={{maxWidth: '100px', maxHeight: '100px', borderRadius: '20%'}}
        />
      )
    },


    {
      title: 'Actions',
      dateIndex: 'actions',
      key: 'actions',
      render: (text,record) => (
        <span className='flex-col md:flex-row'>
            <Button 
                size="small" 
                onClick={() => handleUpdate(record.employee_id)}
                className='mr-0 md:mr-1 text-blue-500 border border-blue-500' >
                  Update
            </Button>
            <Button 
                type="primary" 
                danger 
                size="small" 
                onClick={() => handleDelete(record.employee_id)}>
                  Delete
            </Button>
        </span>
      )
    }
    
  ];

  const columnsAttendanceRecord = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      width: '20%',
      ...getColumnSearchProps('full_name'),
      sorter: (a, b) => a.full_name.length - b.full_name.length,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: '20%',
      ...getColumnSearchProps('date'),
    },
    {
      title: 'Time In',
      dataIndex: 'time_in',
      key: 'time_in',
      ...getColumnSearchProps('time_in'),
    },
    {
      title: 'Time Out',
      dataIndex: 'time_out',
      key: 'time_out',
      ...getColumnSearchProps('time_out'),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (text,record) => (
        <span className='flex-col md:flex-row'>
          <Button 
              type="primary" 
              size="small" 
              onClick={() => handleUpdate(record.attendance_id)}
              className='mr-0 md:mr-1 text-blue-500 border border-blue-500'>
                Update
          </Button>
          <Button 
              type="primary" 
              danger 
              size="small" 
              onClick={() => handleDelete(record.attendance_id)}>
                Delete
          </Button>
        </span>
      ),
    }
    
  ];

  const whatData = data.length > 0 ? data : (dataRec || []);

  
  return <Table 
            columns={data.length > 0 ? columnsEmployeeData : columnsAttendanceRecord } 
            dataSource={whatData.map((item) => ({
                ...item,
                key: item.employee_id
            }))}
            pagination={{ pageSize: 4 }} />;
};

export default TableComponent;
