import {
  Button,
  Col,
  Image,
  Input,
  List,
  message,
  Modal,
  Row,
  Tag,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cards from "../../../components/home/Card";
import request from "../../../utils/request";
import Style from "./index.module.less";
import * as echarts from "echarts";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import Time from "../../../components/home/Time";

moment.locale("zh-cn");

// welcome
const Welcome = () => {
  const nowTime = new Date().getHours();
  const userName = useSelector((state) => state.User).userName;
  console.log(userName);
  console.log(nowTime);
  const timeZh = () => {
    if (nowTime < 12 && nowTime >= 0) {
      return "早上";
    }
    if (nowTime >= 12 && nowTime < 18) {
      return "下午";
    }
    if (nowTime >= 18) {
      return "晚上";
    }
  };
  return (
    <>
      <div className={Style["welcome-box"]}>
        <Image
          className={Style["img"]}
          width={180}
          src={require("../../../img/pikachu.jpeg")}
        />
        <div className={Style["welcome-right"]}>
          <div className={Style["welcome-time"]}>
            <div>{timeZh()}好，</div>
            <div className={Style["welcome-name"]}>{userName}</div>!
          </div>
          <div className={Style["welcome-wisdom"]}>
            <div className={Style["poem"]}>三人行，必有我师焉</div>
            <div>——孔子</div>
          </div>
        </div>
      </div>
    </>
  );
};

// home
const Home = () => {
  const [ecDom, setEchom] = useState("");
  const [users, setUsers] = useState([]);
  const [arts, setArts] = useState([]);
  const [tips, setTips] = useState([]);
  const [categorys, setCategorys] = useState([]);
  // 新建 标签
  const [tipName, setTipName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTitle, setEditeTitle] = useState("");
  const [editeValue, setEditeVal] = useState("");
  // 获取想要编辑的id
  const [editId, setEditId] = useState();
  const handleOk = () => {
    editCategory();
    editTip();
    setIsModalOpen(false);
    setEditId();
    setEditeVal("");
  };
  const showTipModal = () => {
    setIsModalOpen(true);
    setEditeTitle("编辑文章标签");
  };
  const showCategoryModal = () => {
    setIsModalOpen(true);
    setEditeTitle("编辑文章分类");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditId();
    setEditeVal("");
  };
  useEffect(() => {
    getAllUser();
    getAllArticle();
    getTips();
    getCategorys();
    var echarts = document.getElementById("echarts");
    setEchom(echarts);
  }, []);

  const addTip = () => {
    request("post", "/tip/addTip", { tipName }).then((res) => {
      if (res.status === 200) {
        getTips();
        message.success(res.message);
        setTipName("");
      }
      message.error(res.message);
    });
  };
  const editTip = () => {
    if (editTitle === "编辑文章标签") {
      const data = { id: editId, categoryName: editeValue };
      request("post", "/tip/updateTip", data).then((res) => {
        if (res.status === 200) {
          getTips();
          message.success(res.message);
        }
        message.error(res.message);
      });
    }
  };
  const delTip = (id) => {
    request("post", "/tip/delTip", { id }).then((res) => {
      if (res.status === 200) {
        getTips();
        message.success(res.message);
      }
      message.error(res.message);
    });
  };
  const addCategory = () => {
    request("post", "/category/addCategory", { categoryName }).then((res) => {
      if (res.status === 200) {
        getCategorys();
        message.success(res.message);
        setCategoryName("");
      }
      message.error(res.message);
    });
  };
  const editCategory = () => {
    if (editTitle === "编辑文章分类") {
      const data = { id: editId, categoryName: editeValue };
      request("post", "/category/updateCategory", data).then((res) => {
        if (res.status === 200) {
          getCategorys();
          message.success(res.message);
        }
        message.error(res.message);
      });
    }
  };
  const delCategory = (id) => {
    request("post", "/category/delCategory", { id }).then((res) => {
      if (res.status === 200) {
        getCategorys();
        message.success(res.message);
        setCategoryName("");
      }
      message.error(res.message);
    });
  };

  const getTips = () => {
    request("get", "/tip/getAll", {}).then((res) => {
      if (res.status === 200) {
        setTips(res.data);
      } else {
        message.error(res.message);
      }
    });
  };

  const getCategorys = () => {
    request("get", "/category/getAll", {}).then((res) => {
      if (res.status === 200) {
        setCategorys(res.data);
      } else {
        message.error(res.message);
      }
    });
  };
  const getAllArticle = () => {
    request("get", "/markdown/getAll", {}).then((res) => {
      if (res.status === 200) {
        setArts(res.data);
      } else {
        message.error(res.message);
      }
    });
  };
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
  // echarts
  if (ecDom !== "") {
    const myChart = echarts.init(ecDom);
    let dataChart = [];
    const categoryNum = arts.map((item) => item.category);
    // 获取文章类型 及 数量
    dataChart = categorys.map((item) => {
      let number = 0;
      categoryNum.forEach((val) => {
        console.log(item.id === +val);
        if (item.id === +val) {
          number++;
        }
      });
      return { value: number, name: item.categoryName };
    });
    myChart.setOption({
      title: {
        text: "文章分类",
        left: "center",
      },
      tooltip: {},
      legend: {
        orient: "vertical",
        left: "left",
        type: "scroll",
        scrollDataIndex: 5,
        data: dataChart.map((item) => {
          return item.name;
        }),
      },
      series: [
        {
          name: "文章类型",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: dataChart,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  }

  // 绘制图表

  return (
    <>
      <div className={Style["home"]}>
        <div className={Style["head"]}>
          <div className={Style["welcome"]}>
            <Welcome />
          </div>
          <div className={Style["time"]}>
            <Time />
          </div>
          <div className={Style["notice"]}>公告</div>
        </div>
        <div className={Style["cards"]}>
          <Cards numbers={users.length} arts={arts} />
        </div>
        <div className={Style["dataSet"]}>
          <div
            className={Style["echarts"]}
            id="echarts"
            style={{ width: "600px", height: "500px" }}
          ></div>
          <div className={Style["tips"]}>
            <div>文章标签管理</div>
            <Row>
              <Col span={18} style={{ margin: " 0 10px 0 0 " }}>
                <Input
                  onChange={(e) => {
                    setTipName(e.target.value);
                  }}
                  value={tipName}
                />
              </Col>
              <Col style={{ marginRight: "10px" }} span={4}>
                <Button onClick={addTip} type="primary">
                  新建
                </Button>
              </Col>
            </Row>
            <div>
              {tips.map((item) => {
                return (
                  <>
                    <Tag
                      onDoubleClick={() => {
                        showTipModal();
                        setEditId(item.id);
                        setEditeVal(item.tipName);
                      }}
                      key={item.id}
                      color={item.color ? item.color : "#f50"}
                      closable
                      onClose={(e) => {
                        e.preventDefault();
                        delTip(item.id);
                      }}
                    >
                      {item.tipName}
                    </Tag>
                  </>
                );
              })}
            </div>
          </div>
          <div className={Style["category"]}>
            <div>文章类别管理</div>
            <Row>
              <Col span={18} style={{ margin: " 0 10px 0 0 " }}>
                <Input
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                  value={categoryName}
                />
              </Col>
              <Col style={{ marginRight: "10px" }} span={4}>
                <Button onClick={addCategory} type="primary">
                  新建
                </Button>
              </Col>
            </Row>
            <List
              itemLayout="horizontal"
              dataSource={categorys}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <div className={Style["circle"]}>{item.id}</div>
                  <div>{"《  " + item.categoryName + "  》"}</div>
                  <div>
                    <Button
                      onClick={() => {
                        showCategoryModal();
                        setEditId(item.id);
                        setEditeVal(item.categoryName);
                      }}
                    >
                      <EditFilled />
                    </Button>
                    <Button onClick={() => delCategory(item.id)}>
                      <DeleteFilled />
                    </Button>
                  </div>
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
      <Modal
        centered
        title={editTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          value={editeValue}
          onChange={(e) => {
            setEditeVal(e.target.value);
          }}
        />
      </Modal>
    </>
  );
};
export default Home;
