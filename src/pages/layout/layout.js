import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MessageOutlined,
    FileImageOutlined,
    ControlOutlined,
    PieChartOutlined,
    EnvironmentFilled
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
        <Sider className={layoutStyle['side']} trigger={null} collapsible collapsed={collapsed}>
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
              {
                key:'4',
                icon:<MessageOutlined />,
                label: <> <NavLink to='/layout/message'>留言</NavLink></>
              },
              {
                key:'5',
                icon:<FileImageOutlined />,
                label: <> <NavLink to='/layout/gollery'>图库</NavLink></>
              },
              {
                key:'6',
                icon:<PieChartOutlined />,
                label: <> 图表</>,
                children:[{
                  key:'6-1',
                  icon:<EnvironmentFilled />,
                  label:<> <NavLink to='/layout/echarts/chinaMap'>ChinaMap</NavLink></>
                }]
              },
              {
                key:'7',
                icon:<ControlOutlined />,
                label: <> <NavLink to='/layout/others'>首页轮播切换</NavLink></>
              },
              {
                key:'8',
                icon:<PieChartOutlined />,
                label: <> 资源分配</>,
                children:[{
                  key:'8-1',
                  icon:<EnvironmentFilled />,
                  label:<> <NavLink to='/layout/resource/role'>角色管理</NavLink></>
                },{
                  key:'8-2',
                  icon:<EnvironmentFilled />,
                  label:<> <NavLink to='/layout/resource/permission'>权限管理</NavLink></>
                }]
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