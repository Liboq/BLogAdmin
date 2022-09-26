import { Row, Col } from "antd/lib/grid";
import { Input, Button, Select, DatePicker, message, TimePicker, Upload, Image } from "antd";
import request from "../../../utils/request";
import { useEffect, useState } from "react";
import moment from "moment";
import Style from "./index.module.less";
import Markdown from "../../markdown/markdown";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { useNavigate,useLocation,useParams } from "react-router-dom";

moment.locale("zh-cn");
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }

  return isJpgOrPng && isLt2M;
};
const AddArt = () => {
  const [titleZh, setTitleZh] = useState("");
  const [titleEn, setTitleEn] = useState("");
  // 文章 分类
  const [tips, setTips] = useState([]);
  // 文章标题
  const [tipArr, setTipArr] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const defaultDate = moment(new Date(), "YYYY-MM-DD");
  const defaultTime = moment(new Date(), "HH:mm:ss");
  const [date, setDate] = useState(defaultDate.format("YYYY-MM-DD"));
  const [time, setTime] = useState(defaultTime.format("HH:mm:ss"));
  const [kinds, setKinds] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);
  const location =  useLocation()
  const [oldArt,setOld] =useState()
  const [artId,setArtId] = useState()
 
  let oldContent
  let artContent;
  const { Option } = Select;
  const navigate =  useNavigate()
  const getOneMd = async () =>{
     const res = await request('get','/markdown/getOneMd',{id:artId})
     console.log(res);
     setTipArr(res.data[0].tips)
     setKinds(+res.data[0].category)
     setImageUrl(res.data[0].image_main)
     setTitleEn(res.data[0].titleEn)
     setTitleZh(res.data[0].titleZh)
     if(imageUrl){
      setLoading(true)
     }
     oldContent = res.data[0].content
     console.log(oldContent);
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
      request("get", "category/getAll", {}).then((res) => {
        if (res.status === 200) {
          console.log(res);
          setCategorys(res.data);
        } else {
          message.error(res.message);
          console.log(res);
        }
      });
    });
  };
  useEffect(() => {
    getAllTips();
     if(location.state){
    setArtId(location.state.id)

  }
  }, []);

  useEffect(()=>{
    if(artId){
      getOneMd()
    }

  },[artId])
  const getMd = (value) => {
    artContent = value;
  };
  const save = async(isDraft) => {
    const userName = JSON.parse(localStorage.getItem('userInfo')).userName
    const data = {
      authorName:userName,
      titleZh,
      titleEn,
      tips: tipArr,
      date,
      time,
      isDraft,
      category:kinds,
      imageUrl
    };
    if(isDraft===1){
      data['content'] = artContent
    }else{
      data['draft'] = artContent
    }
    let result = false
   const flag = titleZh.trim()&&titleEn.trim()&&tips.length>0&&date&&time&&kinds!==""&&artContent.trim()
   if(flag){
    if(artId){
      data['_id'] = artId
      const res = await request('post','/markdown/updateOneMd',data)
      if(res.status===200){
        message.success(res.message)
         result = true
      }
      else{
        message.error(res.message)
        result = false
      }
    }
    else{
      const res = await request('post','/markdown/addMd',data)
      if(res.status===200){
        message.success(res.message)
         result = true
        
      }
      else{
        message.error(res.message)
        result = false
      }
    }
    
   }else{
    result = false
    message.error('不能为空')
   }
   return result
  };
 const  saveDraft = async() =>{
  const res = await save(0)
  if(res){
  navigate('/layout/markdown')

  }
 }
  const saveRight = async() =>{
    const res = await save(1)
    if(res){
    navigate('/layout/markdown')

    }
  }
  const handleChange = (info) => {
    console.log(info.file.originFileObj);

      getBase64(info.file.originFileObj, (url) => {
        setImageUrl(url);
      });
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <div className={Style["mark-add"]}>
        <div className={Style["head"]}>
          <Row align="middle">
            <Col span={10} style={{ margin: " 0 20px" }}>
              <Input
              required
                value={titleZh}
                onChange={(e) => {
                  setTitleZh(e.target.value);
                }}
                size="large"
                placeholder="请输入中文标题"
              />
            </Col>
            <Col span={6} style={{ margin: " 0 20px" }}>
              <Input
                onChange={(e) => {
                  setTitleEn(e.target.value);
                }}
                value={titleEn}
                size="large"
                placeholder="请输入英文标题"
              />
            </Col>
            
            <Col span={2} style={{ margin: " 0 20px"  }}>
            <ImgCrop rotate>
            <Upload
            style={{display:'flex',justifyContent:'center'}}
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? <Image src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
    </Upload>
    </ImgCrop > </Col>
            <Col span={1} style={{ margin: " 0 20px" }}>
              <Button type="primary" onClick={()=>{saveDraft()}}>
                存为草稿
              </Button>
            </Col>
            <Col span={1} style={{ margin: " 0 20px" }}>
              <Button type="primary" onClick={()=>{saveRight();}
                }>发布文章</Button>
            </Col>
          </Row>
          <Row>
            <Col span={9} style={{ margin: " 0 20px" }}>
              文章分类：
              <Select
                showSearch
                style={{
                  width: 400,
                }}
                onChange={(val) => {
                  setKinds(val);
                }}
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
            <Col span={7} style={{ margin: " 0 10px" }}>
              文章标签：
              <Select
                mode="multiple"
                showArrow
                value={tipArr}
                onChange={(val) => {
                  setTipArr(val);
                }}
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
            <Col span={5} style={{ margin: " 0 10px" }}>
              时间：
              <DatePicker
                onChange={(_, val) => {
                  setDate(val);
                }}
                placement="bottomRight"
                defaultValue={defaultDate}
              />
              <TimePicker
                onChange={(_, val) => {
                  setTime(val);
                }}
                defaultValue={defaultTime}
              />
            </Col>
          </Row>
          <div></div>
          <div></div>
        </div>
        <Markdown oldContent={oldContent} getMd={getMd} />
      </div>
    </>
  );
};
export default AddArt;
