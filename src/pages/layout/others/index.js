import { Button, Input, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { getAllSwiper, updateSwiper } from "../../../request/swiper";
import Style from "./index.module.less";
import { CloseOutlined } from '@ant-design/icons';
const Others = () => {
  const draggableView = useRef(); // 拖拽图像
  const [draggableData, setDraggableData] = useState(1); // 拖拽项的数据
  const [data, setData] = useState([]);
  const [inputVal, setVal] = useState("");
  const [currentData, setCurData] = useState([]);
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    const res = await getAllSwiper();
    if (res.status === 200) {
      setData(res.data[0].saveSwiper);
      setCurData(res.data[0].currentSwiper);
      console.log(res);
    }
  };
  const saveData = () => {
    if (inputVal.trim().length > 0) {
      console.log("i", inputVal);
      setData([...data, inputVal]);
      setVal("");
      const params = {
        saveSwiper: [...data, inputVal],
        currentSwiper: currentData,
      };
      updateSwipers(params);
    } else {
      message.warning("请输入正确的地址");
    }
  };
  const delItem = (val) =>{ 
    setData(data.filter(item=> item!==val))
    const params = {
        saveSwiper: data.filter(item=> item!==val),
        currentSwiper: currentData
      };
    updateSwipers(params)
  }
  const updateSwipers = async (params) => {
    const res = await updateSwiper(params);
    if (res.status === 200) {
      console.log(res.message);
    }
  };
  // 获取拖拽图像的容器盒子
  const getDraggablePreview = () => {
    let previewEle = document.querySelector("#draggable-preview"); // 要拖动渲染的预览图
    if (!previewEle) {
      previewEle = document.createElement("div");
      previewEle.id = "draggable-preview";
      document.body.appendChild(previewEle);
    }
    return previewEle;
  };

  const handleDragStart = (e, data) => {
    console.log("开始拖拽");
    // 保存当前 item 数据，用于在自定义图片中展示
    setDraggableData(data);

    // 为拖拽的元素添加拖拽 class 样式
    e.target.classList.add("list-item-draggable");

    // 从 body 上获取（没有则创建）用于存放自定义拖动图像的盒子
    const previewBox = getDraggablePreview();
    // 拖动图像默认是隐藏的，让其显示
    draggableView.current.style.display = "inline-flex";
    // 将拖动图像添加到 DOM 树上的盒子中
    previewBox.appendChild(draggableView.current);

    // 将 DOM 树上的拖动图像作为我们拖拽时显示的图像
    e.dataTransfer.setDragImage(previewBox, 0, 0);

    // 数据交换
    e.dataTransfer.setData("data", JSON.stringify(data));
  };

  const handleDragEnd = (e) => {
    console.log("结束拖拽");
    // 移除拖拽 class 样式
    e.target.classList.remove("list-item-draggable");

    const previewBox = getDraggablePreview();
    // removeChild，会将自定义图像从 previewBox 中移除，并且 draggableView.current 会置为 null
    previewBox.removeChild(draggableView.current);
  };

  const handleDragEnter = (e) => {
    console.log("进入目标元素", e.target.id);
    // 添加拖放图像移动到目标元素的 class 样式
    e.target.classList.add("target-draggable");
  };

  const handleDragLeave = (e) => {
    console.log("拖放离开目标元素");
    e.target.classList.remove("target-draggable");
  };

  const handleDragover = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, id) => {
    e.target.classList.remove("target-draggable");
    // 获取携带数据
    console.log(e.dataTransfer.getData("data"));
    const data1 = JSON.parse(e.dataTransfer.getData("data"));
    if (currentData.indexOf(data) === -1) {
      console.log(2);
      setCurData([...currentData, data1]);
      setData(
        data.filter((item) => {
          return item !== data1;
        })
      );
      const params = {
        saveSwiper: data.filter((item) => {
          return item !== data1;
        }),
        currentSwiper: [...currentData, data1],
      };

      updateSwipers(params);
    }
  };

  const handleDragEnterS = (e) => {
    console.log("进入目标元素", e.target.id);
    // 添加拖放图像移动到目标元素的 class 样式
    e.target.classList.add("target-draggable");
  };

  const handleDragLeaveS = (e) => {
    console.log("拖放离开目标元素");
    e.target.classList.remove("target-draggable");
  };

  const handleDragoverS = (e) => {
    e.preventDefault();
  };

  const handleDropS = async (e, id) => {
    e.target.classList.remove("target-draggable");
    // 获取携带数据
    console.log(e.dataTransfer.getData("data"));
    const data1 = JSON.parse(e.dataTransfer.getData("data"));
    if (data.indexOf(data1) === -1) {
      setData([...data, data1]);
      setCurData(
        currentData.filter((item) => {
          return item !== data1;
        })
      );
      const params = {
        saveSwiper: [...data, data1],
        currentSwiper: currentData.filter((item) => {
          return item !== data1;
        }),
      };
      updateSwipers(params);
    }
  };
  return (
    <>
      <div className={Style["others"]}>
        <h5>保存的图片</h5>
        <div
          className={Style["save-list"]}
          onDragEnter={handleDragEnterS}
          onDragLeave={handleDragLeaveS}
          onDragOver={handleDragoverS}
          onDrop={handleDropS}
        >
          {data.map((item,key) => (
           <div className={Style["save-li"]}>
             <li
              key={key}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnd={handleDragEnd}
            >
              <span>{item}</span>
              
            </li>
            <span onClick={()=>delItem(item)} className={Style["del-btn"]}><CloseOutlined /></span>
           </div>

          ))}
        </div>
        <div
          ref={draggableView}
          style={{ display: "none" }}
          className="gl-draggable-preview"
        ></div>
        <div className={Style["form"]}>
          <Input
            onChange={(e) => setVal(e.target.value)}
            value={inputVal}
            className={Style["form-input"]}
          ></Input>
          <Button onClick={() => saveData()} type="primary">
            保存
          </Button>
        </div>
        <h5>首页显示的图片</h5>
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragover}
          onDrop={handleDrop}
          className={Style["current-list"]}
        >
          {currentData.map((item, index) => (
            <li
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, item)}
              onDragEnd={handleDragEnd}
            >
              {item}
            </li>
          ))}
        </div>
      </div>
    </>
  );
};
export default Others;
