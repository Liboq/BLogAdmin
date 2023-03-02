import React, { useState } from 'react';
import { Button, Space, Table, Tag } from 'antd';
import moment from 'moment';
const { Column, ColumnGroup } = Table;

const App = (props) => {
    const dataList = props.dataList.map(item=>{
        item.type=item.pid===0?'留言板':'留言板【回复】'
        item.date =moment(item.date).format('YYYY-MM-DD hh:mm:ss') 
        return item
    })
    const delMessages = (_id)=>{
      props.delMessage({_id})
    }
    const goSee = ()=>{
      const w=window.open('about:blank');
      w.location.href="https://admin.liboqiao.top/message"
    }
    return(
        <Table rowKey={(record) => {
          return record._id;
        }} dataSource={dataList}>
            <Column title="昵称" dataIndex="mesName" key="mesName" />
            <Column title="邮箱地址" dataIndex="emailName" key="emailName" />
          <Column title="网址" dataIndex="website" key="website" />
          <Column title="日期" dataIndex="date" key="date" />
          <Column title="类型" dataIndex="type" key="type" />
          <Column title="内容" dataIndex="content" key="content" />
          <Column
            title="Action"
            render={(_, record) => (
              <Space size="middle">
                <Button type='primary' onClick={()=>goSee(record)} >查看</Button>
                <Button type='danger' onClick={()=>delMessages(record._id)}> 删除</Button>
              </Space>
            )}
          />
        </Table>
      );
}

export default App;