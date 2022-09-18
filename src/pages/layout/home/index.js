import { message } from "antd";
import React, { useEffect, useState } from "react";
import Card from "../../../components/home/Card";
import request from "../../../utils/request"
const Home = () => {
  const [users, setUsers] = useState()
  useEffect(()=>{
    getAllUser()
  },[])
  const getAllUser = () => {
    request('get','/user/getAllUser',{}).then(res=>{
      if(res.status === 200) {
        setUsers(res.data.users) 
      }
      else{
        message.error(res.message)
        console.log(res);
      }
    })
  }
  
  return (<>
    <div>
      <div><Card users={users} /></div>
    </div>
  </>)
}
export default Home