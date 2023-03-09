import { useEffect, useState } from "react";
import { getAllUser, updateUserRole } from "../../../../request/user";
import { Button, Select, Space, Table, Tag, Form, Input, Modal, message } from "antd";
import { getRoles } from "../../../../request/role";

const UserManage = () => {
  const [data, setData] = useState([]);

  const getAllUsers = async () => {
    const res = await getAllUser();
    if (res.status === 200) {
      setData(res.data.users);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <DataTable getAllUsers={getAllUsers}  data={data}></DataTable>
    </>
  );
};
const Dialog = (props) => {
  const [selectedPermission,setSelectedPermission] = useState([])
  const [roleList,setRoleList] =useState([])
  const getRoleList = async ()=>{
    const res = await getRoles()
    const initRoleList = res.data.map(item=>({
      value:item.name,
      label:item.name
    }))
    setRoleList(initRoleList)
  }
  const initPermission = props.selectRow.role.map(item=>{
    return {
      value:item,
      label:item
    }
  })
  const handleChange = (value)=>{
    setSelectedPermission(value)
  }
  const updateUserRoles = async() => {
    
    const params = {
      _id:props.selectRow._id,
      role:selectedPermission
    }
    const res = await updateUserRole(params)
    if(res.status === 200){
      message.success(res.message)
      props.setModal2Open(false)
      props.getAllUsers()
    }else{
      message.error(res.message)
    }

  };
  useEffect(()=>{
    getRoleList()
  },[])
  return (
    <>
      <Modal
        title="新增角色"
        centered
        open={props.modal2Open}
        footer={null}
        onCancel={() => props.setModal2Open(false)}
        destroyOnClose
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={updateUserRoles}
        >
          <Form.Item
            label="昵称"
            name="昵称"
          >
            <Input disabled defaultValue={props.selectRow.userName} />
          </Form.Item>

          <Form.Item
            label="description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              showArrow
              placeholder="角色"
              options={roleList}
              defaultValue={initPermission}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确认编辑
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

const DataTable = (props) => {
  const handleEdit = (row) => {
    setSelectRow(row)
    setModal2Open(true);
  };
  const [modal2Open, setModal2Open] = useState(false);
  const [selectRow,setSelectRow] = useState({})
  const columns = [
    {
      title: "昵称",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "手机号码",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "角色",
      dataIndex: "role",
      key: "role",
      render: (_, { role }) => (
        <>
          {role.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "动作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>编辑</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table
        rowKey={(record) => record.userName}
        columns={columns}
        dataSource={props.data}
      />
      {modal2Open&&<Dialog getAllUsers={props.getAllUsers} selectRow={selectRow} modal2Open={modal2Open} setModal2Open={setModal2Open}></Dialog>}
    </>
  );
};
export default UserManage;
