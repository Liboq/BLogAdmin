
import Github from '../../..//img/github.svg'
import NavModule from './nav.module.less'
import {useSelector} from 'react-redux'
import { Dropdown, Avatar, Menu, Space } from 'antd';
import cookie from 'react-cookies'
import { useNavigate} from 'react-router-dom'




const Nav = () =>{
  const menu = (
    <Menu
      selectable
      defaultSelectedKeys={['1']}
      items={[
        {
          key: '1',
          label: '我的主页',
        },
        {
          key: '2',
          label: '我的信息',
        },
        {
          key: '3',
          label: (<><div href='/' onClick={()=>{
            layout()
          }}>退出登陆</div></>),
        },
      ]}
    />
  );
    const user = useSelector(state=>state.User)
    console.log(user,'nav');
    const navigate = useNavigate()
    const layout = ()=>{
      localStorage.setItem('userInfo','')
            cookie.save('user-info','')
            cookie.save('pikachu-token','')
      navigate('/')
    }
    return (
        <>
    
        <a className={NavModule['nav-item']} href="https://github.com/Liboq/react-markdown-edit" target="_balnk"><img src={Github} alt="github" /></a>

        <Dropdown overlay={menu}>

      <Space>
      <div className={NavModule['nav-item']}>
        <Avatar
        style={{
          backgroundColor: '#f56a00',
          verticalAlign: 'middle',
        }}
        size="large"
        gap='4'
      >
        {user.userName}
      </Avatar>
        </div>
      </Space>
  </Dropdown>

        </>
    )
}
export default Nav