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
import { useSelector } from 'react-redux';

  

  const { Header, Sider, Content } = Layout;
  
  const Home = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const state = useSelector(state=>state)
    const itemList = [
      {
        key: '1',
        icon: <UserOutlined />,
        label: <> <NavLink to='/layout'>首页</NavLink></>,
      },
      {
        permission:1001,
        key: '2',
        icon: <VideoCameraOutlined />,
        label: <> <NavLink to='/layout/markdown'>文章</NavLink></>,
      },
      {
        permission:1002,
        key: '3',
        icon: <UploadOutlined />,
        label: <> <NavLink to='/layout/about'>关于</NavLink></>,
      },
      {
        permission:1003,
        key:'4',
        icon:<MessageOutlined />,
        label: <> <NavLink to='/layout/message'>留言</NavLink></>
      },
      {
        permission:1004,
        key:'5',
        icon:<FileImageOutlined />,
        label: <> <NavLink to='/layout/gollery'>图库</NavLink></>
      },
      {
        permission:1005,
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
        permission:1006,
        key:'7',
        icon:<ControlOutlined />,
        label: <> <NavLink to='/layout/others'>首页轮播切换</NavLink></>
      },
      {
        permission:1007,
        key:'8',
        icon:<PieChartOutlined />,
        label: <> 资源分配</>,
        children:[{
          permission:100701,
          key:'8-1',
          icon:<EnvironmentFilled />,
          label:<> <NavLink to='/layout/resource/role'>角色管理</NavLink></>
        },{
          permission:100702,
          key:'8-2',
          icon:<EnvironmentFilled />,
          label:<> <NavLink to='/layout/resource/permission'>权限管理</NavLink></>
        },{
          permission:100703,
          key:'8-3',
          icon:<EnvironmentFilled />,
          label:<> <NavLink to='/layout/resource/user'>用户管理</NavLink></>
        }]
      },
    ].filter(item=>{
      if(item.permission){
      return state.Roles.role.includes(item.permission)
      }else{
        return true
      }
    })
    return (
      <Layout className={layoutStyle['components-layout']}>
        <Sider className={layoutStyle['side']} trigger={null} collapsible collapsed={collapsed}>
          <div className={layoutStyle['logo']} >皮卡秋</div>
          <Menu
          className={layoutStyle['menu-contain']}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={itemList}
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