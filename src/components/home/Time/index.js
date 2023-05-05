import { message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import request from "../../../utils/request";
import Style from './index.module.less'

// Time
const Time = (props) => {
    const [time, setTime] = useState(moment().format("YYYY-MM-DD HH:mm:ss"));
    setInterval(() => {
      setTime(moment().format("YYYY-MM-DD HH:mm:ss"));
    }, 1000);

    return (
      <>
        <div className={Style["time-content"]}>
          <div className={Style["time-date"]}>{time}</div>
          <span className={Style["time-ip"]}>ip地址：{props.ip}</span>
        </div>
      </>
    );
  };

  export default Time