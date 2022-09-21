
import { Row,Col } from "antd/lib/grid";
import { Input, Button, Select, DatePicker,  message, TimePicker } from "antd";
import request from "../../../utils/request";
import { useEffect, useState } from "react";
import moment from "moment";
import Style from './index.module.less'
import Markdown from "../../markdown/markdown";

moment.locale("zh-cn");
const AddArt = () => {
  const [tips,setTips] = useState([])
  const [tipArr, setTipArr] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const defaultDate = moment(new Date(),'YYYY-MM-DD')
  const defaultTime = moment(new Date(), 'HH:mm:ss')
  const [date, setDate] = useState(defaultDate.format('YYYY-MM-DD'));
  const [time, setTime] = useState(defaultTime.format('HH:mm:ss'));
  const [kinds,setKinds] = useState('')
  let  artContent 
  const { Option } = Select;
  const getAllTips = () => {
    request("get", "tip/getAll", {}).then((res) => {
      if (res.status === 200) {
        console.log(res);
        setTips(res.data);
      } else {
        message.error(res.message);
        console.log(res);
      }
      request("get", "category/getAll", {}).then((res) => {
        if (res.status === 200) {
          console.log(res);
          setCategorys(res.data) 
        } else {
          message.error(res.message);
          console.log(res);
        }
    });
  })
}
  useEffect(() => {
    getAllTips();
  }, []);
  const getMd = (value) =>{
     artContent = value
  }
  const savaDraft = () =>{
    console.log(tipArr);
    console.log(time);
    console.log(date);
    console.log(artContent);
  }

  return (
    <>
      <div className={Style["mark-add"]}>
        <div className={Style["head"]}>
            <Row>
                <Col span={13} style={{margin:' 0 20px'}}>
                <Input size="large" placeholder="请输入中文标题" />
                </Col>
                <Col span={6} style={{margin:' 0 20px'}}>
                <Input size="large" placeholder="请输入英文标题" /></Col>
                <Col span={1} style={{margin:' 0 20px'}}>
                <Button type="primary" onClick={savaDraft}>存为草稿</Button>
                </Col >
                <Col span={1} style={{margin:' 0 20px'}}><Button type="primary">发布文章</Button></Col>
            </Row>
            <Row>
                <Col span={9} style={{margin:' 0 20px'}}>
                文章分类：
                <Select
                  showSearch
                  style={{
                    width: 400,
                  }}
                  onChange={(val)=>{setKinds(val)}}
                  placeholder="选择文章分类"
                  optionFilterProp="children"
                  value={kinds}
                >
                  {categorys.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.categoryName}
                      </Option>
                    );
                  })}
                </Select>
                </Col>
                <Col span={7} style={{margin:' 0 10px'}}>
                文章标签：
                <Select
                  mode="multiple"
                  showArrow
                  value={tipArr}
                  onChange={(val)=>{setTipArr(val)}}
                  style={{
                    width: 300,
                  }}
                >
                  {tips.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.tipName}
                      </Option>
                    );
                  })}
                </Select>
                </Col>
                <Col span={5} style={{margin:' 0 10px'}}>
                时间：<DatePicker onChange={(_,val)=>{setDate(val)}} placement="bottomRight" defaultValue={defaultDate}   />
                <TimePicker onChange={(_,val)=>{setTime(val)}} defaultValue={defaultTime}  />
                </Col>
            </Row>
            <div></div>
            <div></div>
        </div>
        <Markdown getMd={getMd} />
      </div>
    </>
  );
};
export default AddArt;
