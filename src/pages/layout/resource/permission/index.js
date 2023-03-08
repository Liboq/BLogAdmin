import { permmsionList } from "../../../../utils/permission";
import { DownOutlined } from "@ant-design/icons";
import { Tree, Table, Button } from "antd";
import { useEffect, useRef, useState } from "react";
import { getRoles, addOneRole, delOneRole } from "../../../../request/role";
import Style from "./index.module.less";
const Permission = () => {
  const dataRef = useRef();
  const [selectData, setSelectData] = useState([]);
  const [selectTree, setSelectTree] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [initKeys, setInitKeys] = useState([]);
  useEffect(() => {
    dataRef.current = data;
  }, [data]);
  useEffect(() => {
    getRoleData();
  }, []);
  const onTreeSelect = (selectedKeys, info) => {
    setSelectTree(selectedKeys);
    const keys = dataRef.current
      .filter((item) => item.permission.includes(selectedKeys[0]))
      .map((item) => item.name);
    setInitKeys(keys);
    setSelectedRowKeys(keys);
  };
  const updateRoles = async () => {
    const addRoleList = selectedRowKeys
      .filter((item) => {
        return !initKeys.includes(item);
      })
      .map((item) => ({
        name: item,
        type: "add",
        permission: selectTree,
      }));
    const delRoleList = initKeys
      .filter((item) => {
        return !selectedRowKeys.includes(item);
      })
      .map((item) => ({
        name: item,
        type: "del",
        permission: selectTree,
      }));
    const params = [...addRoleList, ...delRoleList];

    params.forEach((item) => {
      if (item.type === "del") {
        delOneRoles(item);
      }
      if (item.type === "add") {
        addOneRoles(item);
      }
    });
    await getRoleData();
    setTimeout(() => {
      onTreeSelect(selectTree);
    }, 100);
  };
  const addOneRoles = async (params) => await addOneRole(params);
  const delOneRoles = async (params) => await delOneRole(params);

  const getRoleData = async () => {
    const res = await getRoles();
    if (res.status === 200) {
      setData(res.data);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKey, selectedRows) => {
      setSelectData(selectedRows);
      setSelectedRowKeys(selectedRowKey);
    },

    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
    selectedRowKeys,
  };
  return (
    <>
      <div className={Style["permission-content"]}>
        <div className={Style["permission-tree"]}>
          <div>菜单列表</div>
          <TreePermission onSelect={onTreeSelect}></TreePermission>
        </div>
        <div className={Style["permission-role"]}>
          <div>所有角色</div>
          {selectTree.length > 0 ? (
            <RoleTable
              updateRoles={updateRoles}
              selectTree={selectTree}
              data={dataRef}
              rowSelection={rowSelection}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
const TreePermission = (props) => {
  return (
    <>
      <div>
        <Tree
          showLine
          switcherIcon={<DownOutlined />}
          fieldNames={{ title: "name", key: "status" }}
          onSelect={props.onSelect}
          treeData={permmsionList}
        />
      </div>
    </>
  );
};
const RoleTable = (props) => {
  const columns = [
    {
      title: "角色名称",
      dataIndex: "name",
    },
    {
      title: "角色描述",
      dataIndex: "description",
    },
    {
      title: "是否有权限",
      dataIndex: "permission",
      render: (permission) =>
        permission.includes(props.selectTree[0]) ? "有" : "没有",
    },
  ];

  return (
    <>
      <div>
        <div>
          <Button type="primary" onClick={props.updateRoles}>
            确认分配
          </Button>
        </div>
        <Table
          rowSelection={{
            type: "checkbox",
            ...props.rowSelection,
          }}
          columns={columns}
          dataSource={props.data.current}
          rowKey={(row) => row.name}
        />
      </div>
    </>
  );
};
export default Permission;
