import { Image, message } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "../../../components/home/Card";
import request from "../../../utils/request";
import Style from "./index.module.less";

moment.locale('zh-cn')

// welcome
const Welcome = () =>{
const nowTime = new Date().getHours()
const  userName = useSelector(state=>state.User).userName
console.log(userName);
console.log(nowTime);
const timeZh = () =>{
  if(nowTime<12&&nowTime>=0){
    return '早上'
  }
  if(nowTime>=12&& nowTime<18){
    return '下午'
  }
  if(nowTime>=18){
    return '晚上'
  }
}
  return (<><div className={Style['welcome-box']}><Image
  className={Style['img']}
    width={180}
    src={require('../../../img/pikachu.jpeg')}
  />
  <div className={Style['welcome-right']}>
  <div className={Style['welcome-time']}><div>{timeZh()}好，</div><div className={Style['welcome-name']}>{userName}</div>!</div>
  <div className={Style['welcome-wisdom']}><div className={Style['poem']}>三人行，必有我师焉</div><div>——孔子</div></div>
  </div>
  </div></>)

}

// time
const Time = () => {
  const [ip,setIp] = useState('')
  const [time,setTime] = useState(moment().format('YYYY-MM-DD HH:mm:ss'))
  setInterval(()=>{
    setTime(moment().format('YYYY-MM-DD HH:mm:ss'))
  },1000)
  const getUserIp = ()=>{
    request('get','user/getUserIp',{}).then(res=>{
      if (res.status === 200) {
      setIp(res.data.ip)
      } else {
        message.error(res.message);
        console.log(res);
  }
})
}
  useEffect(() => {
    getUserIp()
  }, [])  
  return (<><div className={Style['time-content']}><div className={Style['time-date']}>{time}</div>
  <span className={Style['time-ip']}>ip地址：{ip}</span></div> </>)
}
const Home = () => {
  const [users, setUsers] = useState([]);
  const [arts,setArts] =useState([])
  useEffect(() => {
    getAllUser();
    getAllArticle()
  }, []);
  const getAllArticle = () =>{
    request('get','/markdown/getAll',{}).then(res=>{
      if(res.status === 200) {
        setArts(res.data)
      }else{
        message.error(res.message)
      }
    })
  }
  const getAllUser = () => {
    request("get", "/user/getAllUser", {}).then((res) => {
      if (res.status === 200) {
        setUsers(res.data.users);
      } else {
        message.error(res.message);
        console.log(res);
      }
    });
  };

  return (
    <>
      <div className={Style["home"]}>
        <div className={Style["head"]}>
          <div className={Style["welcome"]}>
            <Welcome />
          </div>
          <div className={Style["time"]}><Time /></div>
          <div className={Style["notice"]}>公告</div>
        </div>
        <div className={Style["cards"]}>
          <Cards numbers={users.length} arts={arts} />
        </div>
      </div>
    </>
  );
};
export default Home;
