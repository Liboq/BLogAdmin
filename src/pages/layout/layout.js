import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import layoutStyle  from './layout.module.less'
  import { Layout, Menu } from 'antd';
  import React, { useState } from 'react';
import Nav from '../../components/home/nav';

  const { Header, Sider, Content } = Layout;
  
  const Home = () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout className={layoutStyle['components-layout']}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={layoutStyle['logo']} />
          <Menu
          className={layoutStyle['menu-contain']}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: 'nav 1',
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: 'nav 2',
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: 'nav 3',
              },
            ]}
          />
        </Sider>
        <Layout className={layoutStyle["site-layout"]}>
          <Header
            className={layoutStyle["site-layout-background"]}
            style={{
              padding: 0,
            }}
          >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: layoutStyle['trigger'],
              onClick: () => setCollapsed(!collapsed),
            })}
            <div className={layoutStyle['nav-head']}><Nav/></div>
          </Header>
          <Content
            className={layoutStyle["site-layout-background"]}
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default Home;