
import { Row,Col } from "antd/lib/grid";
import { Input, Button, Select, DatePicker,  message } from "antd";
import request from "../../../utils/request";
import { useEffect, useState } from "react";
import moment from "moment";
import Style from './index.module.less'
import Markdown from "../../markdown/markdown";

moment.locale("zh-cn");
const AddArt = () => {
  const [tips, setTips] = useState([]);
  const defaultDate = moment(new Date())
  const [date, setDate] = useState(moment(new Date()));
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
    });
  };
  useEffect(() => {
    getAllTips();
  }, []);
  const getMd = (value) =>{
     artContent = value
  }
  const savaDraft = () =>{
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
                  placeholder="选择文章分类"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    optionA.children
                      .toLowerCase()
                      .localeCompare(optionB.children.toLowerCase())
                  }
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
                <Col span={7} style={{margin:' 0 20px'}}>
                文章标签：
                <Select
                  mode="multiple"
                  showArrow
                  defaultValue={["gold", "cyan"]}
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
                <Col span={5} style={{margin:' 0 20px'}}>
                时间：<DatePicker placement="bottomRight" defaultValue={defaultDate}  Value={date} />
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
