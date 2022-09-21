import { message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import request from "../../../utils/request";
import Style from './index.module.less'

// Time
const Time = () => {
    const [ip, setIp] = useState("");
    const [time, setTime] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
    setInterval(() => {
      setTime(moment().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);
    const getUserIp = () => {
      request("get", "user/getUserIp", {}).then((res) => {
        if (res.status === 200) {
          setIp(res.data.ip);
        } else {
          message.error(res.message);
          console.log(res);
        }
      });
    };
    useEffect(() => {
      getUserIp();
    }, []);
    return (
      <>
        <div className={Style["time-content"]}>
          <div className={Style["time-date"]}>{time}</div>
          <span className={Style["time-ip"]}>ip地址：{ip}</span>
        </div>
      </>
    );
  };

  export default Time