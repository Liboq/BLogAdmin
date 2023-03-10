import { Button, Form, Input, Popconfirm, Table, message, Modal } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Style from './index.module.less'
import { addRole, delRole, getRoles, updateRole } from '../../../../request/role';
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className={Style['editable-cell-value-wrap']}
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const Role = () => {
    
  const [dataSource, setDataSource] = useState();
  const [count, setCount] = useState(2);
  useEffect(()=>{
    getRoleList()
},[])
const getRoleList = async()=>{
    const res = await getRoles()
    if(res.status == 200){
        setDataSource(res.data)
        setCount(res.data.length)
    }
}
  const handleDelete = async(row) => {
   const  res = await delRole({_id:row._id})
   if(res.status ===200){
    message.success('删除成功')
    getRoleList()
   }else{
    message.error("删除失败")
   }
  };
  const defaultColumns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      width: '20%',
      editable: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
    },
    {
        title: '最后修改日期',
        dataIndex: 'updateDate',
      },
    {
      title: '动作',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm key={record.name} title="Sure to delete?" onConfirm={() => handleDelete(record)}>
            <a key={record.name}>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleAdd = async(values) => {
    const Data = {
      key: count,
      name: values.name,
      description: values.description,
      createDate: +new Date(),
      updateDate: +new Date(),
      permission:[]
    };
    const res = await addRole(Data)
    if(res.status == 200){
        getRoleList()
        setModal2Open(false)
    }else{
        message.error(res.message)
    }
    // setDataSource([...dataSource, newData]);
    // setCount(count + 1);
  };
  const handleSave = async (row) => {
    const res = await updateRole(row)
    if(res.status === 200){
        getRoleList()
    }else{
        message.error('修改失败')
    }
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <>
    <div>
      <Button
        onClick={()=>setModal2Open(true)}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        新增角色
      </Button>
      <Table
        components={components}
        rowClassName={() => Style['editable-row']}
        bordered
        dataSource={dataSource}
        columns={columns}
        rowKey={(record)=>record.name}
      />
    </div>
    <Modal
    title="新增角色"
    centered
    open={modal2Open}
    footer= {null}
    onCancel={()=>setModal2Open(false)}
    destroyOnClose
  >
    
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    autoComplete="off"
    onFinish={handleAdd}
  >
    <Form.Item
      label="name"
      name="name"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="description"
      name="description"
      rules={[{ required: true, message: 'Please input your description!' }]}
    >
      <Input.TextArea />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        新增角色
      </Button>
    </Form.Item>
  </Form>

  </Modal>
  </>
  );
};
export default Role