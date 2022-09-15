
import Github from '../../img/github.svg'
import NavModule from './nav.module.less'
import {useSelector} from 'react-redux'
import { Avatar } from 'antd'

const Nav = () =>{
    const user = useSelector(state=>state.User)
    console.log(user);
    return (
        <>
        
         
        <a className={NavModule['nav-item']} href="https://github.com/Liboq/react-markdown-edit" target="_balnk"><img src={Github} alt="github" /></a>

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
        </>
    )
}
export default Nav