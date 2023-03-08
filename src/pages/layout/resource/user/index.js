import { useEffect, useState } from "react";
import { getAllUser } from "../../../../request/user";
import { Button, Select, Space, Table, Tag, Form, Input } from "antd";
import { transformTree } from "../../../../utils/local";
import { permmsionList } from "../../../../utils/permission";

const UserManage = () => {
  const [data, setData] = useState([]);

  const getAllUsers = async () => {
    const res = await getAllUser();
    if (res.status === 200) {
      console.log(res);
      setData(res.data.users);
    }
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <>
      <DataTable data={data}></DataTable>
    </>
  );
};
const Modal = () => {
  const [modal2Open, setModal2Open] = useState(false);
  const selctData = transformTree(permmsionList);
  const updateUserRole = () => {};
  return (
    <>
      <Modal
        title="新增角色"
        centered
        open={modal2Open}
        footer={null}
        onCancel={() => setModal2Open(false)}
        destroyOnClose
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={updateUserRole}
        >
          <Form.Item
            label="name"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="description"
            name="description"
            rules={[
              { required: true, message: "Please input your description!" },
            ]}
          >
            <Select></Select>
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
        <Button>编辑</Button>
      </Space>
    ),
  },
];

const DataTable = (props) => (
  <Table
    rowKey={(record) => record.userName}
    columns={columns}
    dataSource={props.data}
  />
);
export default UserManage;
