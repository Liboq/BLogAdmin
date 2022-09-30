import {
  Button,
  Col,
  Input,
  message,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useEffect, useState } from "react";
import request from "../../../utils/request";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import Style from "./index.module.less";
import Column from "antd/lib/table/Column";
import { NavLink, useNavigate } from "react-router-dom";

const Markdown = () => {
  const [total, setTotal] = useState();
  const [tips, setTips] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [tipArr, setTipArr] = useState([]);
  const [kinds, setKinds] = useState("");
  const [title, setTitle] = useState("");
  const { Option } = Select;
  const [article, setArticle] = useState([]);
  const [pageNum, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  useEffect(() => {
    getAllTips();
  }, []);
  useEffect(() => {
    findMd();
  }, [tips, categorys, pageNum, pageSize]);
  const findMd = () => {
    const data = {
      titleZh: title,
      category: kinds === 0 || kinds ? kinds : "",
      tips: tipArr ? tipArr : [],
      pageNum,
      pageSize,
    };
    request("post", "/markdown/getRightAll", data).then((res) => {
      let Data = [];
      if (tips.length > 0 && categorys.length > 0) {
        Data = res.data.map((item) => {
          item["Date"] = item.date + "  " + item.time;
          item["category"] = categorys[item.category].categoryName;
          item["tips"] = item.tips.map((val) => {
            let curIndex;
            tips.forEach((vals, index) => {
              if (vals.id === val) {
                curIndex = index;
              }
            });
            return tips[curIndex].tipName;
          });
          //  URL
          item["URL"] = `http://localhost:8080/md/${item.titleEn}`;
          return item;
        });
      }
      setTotal(Data.length);

      setArticle(Data);
    });
  };

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
    request("get", "category/getAll", {}).then((res) => {
      if (res.status === 200) {
        console.log(res);
        setCategorys(res.data);
      } else {
        message.error(res.message);
        console.log(res);
      }
    });
  };
  const pgChange = (page, pageSize) => {
    console.log(page, pageSize);
    setPage(page);
    setPageSize(pageSize);
  };
  return (
    <>
      <div>
        <div className={Style["head"]}>
          <Row style={{ margin: "0 20px" }}>
            <Col span={7}>
              <Input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                style={{
                  width: 400,
                }}
                placeholder="请输入文章标题"
              />
            </Col>
            <Col span={7}>
              <Select
                allowClear
                mode="multiple"
                showArrow
                value={tipArr}
                placeholder="选择文章标签"
                onChange={(val, option) => {
                  console.log(option);
                  setTipArr(val);
                }}
                onClear={() => {
                  setTipArr([]);
                }}
                style={{
                  width: 400,
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
            <Col span={6}>
              <Select
                allowClear
                showSearch
                style={{
                  width: 300,
                }}
                onClear={() => {
                  setKinds("");
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
              <Button shape="circle" icon={<SyncOutlined />} />
            </Col>
            <Col span={1}>
              <Button
                shape="circle"
                onClick={() => {
                  findMd();
                }}
                icon={<SearchOutlined />}
              />
            </Col>
            <Col>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/layout/addArt");
                }}
              >
                写文章
              </Button>
            </Col>
          </Row>
        </div>
        <div>
          <Table
            pagination={false}
            rowKey={(record) => {
              return record._id;
            }}
            dataSource={article}
          >
            <Column title="标题" dataIndex="titleZh" key="titleZh" />
            <Column title="日期" dataIndex="Date" key="date" />
            <Column title="分类" dataIndex="category" key="category" />
            <Column
              title="标签"
              dataIndex="tips"
              key="tips"
              render={(tags) => (
                <>
                  {tags.map((tag) => (
                    <Tag color="blue" key={tag}>
                      {tag}
                    </Tag>
                  ))}
                </>
              )}
            />
            <Column
              title="URL"
              dataIndex="URL"
              key="URL"
              render={(url) => (
                <a href={url} target="_blank" rel="noreferrer">
                  {url}
                </a>
              )}
            />
            <Column
              title="操作"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                  <Button type="primary">
                    <NavLink to={`/layout/addArt`} state={{ id: record._id }}>
                      编辑
                    </NavLink>
                  </Button>
                  <Button type="danger">删除</Button>
                </Space>
              )}
            />
          </Table>
        </div>
        <div>
          <Pagination
            current={pageNum}
            total={total}
            showSizeChanger
            showQuickJumper
            onChange={(page, pageSize) => {
              pgChange(page, pageSize);
            }}
            showTotal={(total) => `共 ${total} 篇文章`}
          />
        </div>
      </div>
    </>
  );
};

export default Markdown;
