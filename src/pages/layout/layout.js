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
import Nav from '../../components/home/Nav/nav';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
  

  const { Header, Sider, Content } = Layout;
  
  const Home = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    return (
      <Layout className={layoutStyle['components-layout']}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={layoutStyle['logo']} >皮卡秋</div>
          <Menu
          className={layoutStyle['menu-contain']}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <UserOutlined />,
                label: <> <NavLink to='/layout'>首页</NavLink></>,
              },
              {
                key: '2',
                icon: <VideoCameraOutlined />,
                label: <> <NavLink to='/layout/markdown'>文章</NavLink></>,
              },
              {
                key: '3',
                icon: <UploadOutlined />,
                label: <> <NavLink to='/layout/about'>关于</NavLink></>,
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
            className={layoutStyle["site-content-background"]}
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  };
  
  export default Home;