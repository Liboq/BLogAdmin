import { Button, Col, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import request from "../../../utils/request";
import { SearchOutlined,SyncOutlined  } from '@ant-design/icons';
import Style from './index.module.less'

const Markdown = () => {

  const [tips, setTips] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [tipArr,setTipArr] = useState([]);
  const [kinds,setKinds] = useState("");
  const [title,setTitle] = useState("")
  const { Option } = Select;
  const [article,setArticle] = useState([])
  useEffect(()=>{
    getAllTips()
  },[])
  const findMd =()=>{
    const data = {
      titleZh:title,
      category:kinds===0||kinds?kinds:'',
      tips:tipArr?tipArr:[]
    }
    request('post','/markdown/getRightAll',data).then(res=>{
      console.log(res);
      setArticle(res)
    })
  } 

  const getAllTips = () => {

    request("get", "tip/getAll", {}).then((res) => {
      if (res.status === 200) {
        console.log(res);
        setTips(res.data);
      } else {
        message.error(res.message);
        console.log(res);
      }
    })
      request("get", "category/getAll", {}).then((res) => {
        if (res.status === 200) {
          console.log(res);
          setCategorys(res.data);
        } else {
          message.error(res.message);
          console.log(res);
        }
      });
    findMd()  
  };
  return (
    <>
      <div>
        <div className={Style['head']}>
          <Row style={{margin:'0 20px'}}>
            <Col span={7}>
              <Input onChange={(e)=>{
                
                setTitle(e.target.value)
              }}   
              style={{
                  width: 400,
                }} placeholder="请输入文章标题"/>
            </Col>
            <Col span={7}>
            <Select
            allowClear
                mode="multiple"
                showArrow
                value={tipArr}
                placeholder="选择文章标签"
                onChange={(val,option) => {
                  console.log(option);
                setTipArr(val);
                
                console.log(tipArr);
                
                }}
                onClear={()=>{
                  setTipArr([])
                } }
                style={{
                  width: 400,
                }}
              >
                {tips.map((item,) => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.tipName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={6}>
            <Select
            allowClear
                showSearch
                style={{
                  width: 300,
                }}
                onClear={()=>{
                  setKinds('')
                }}
                onChange={(val) => {
                  setKinds(val);
                }}
                placeholder="选择文章分类"
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
            <Col span={1}>
            <Button shape="circle" icon={<SyncOutlined />}/>
            </Col>
            <Col span={1}><Button shape="circle" onClick={()=>{
              findMd()
            }} icon={<SearchOutlined />} /></Col>
            <Col>
            
            <Button type="primary" >写文章</Button>
            </Col>
          </Row>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Markdown;
