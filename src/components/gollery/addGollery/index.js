import { Button, Input, message } from "antd";
import { useEffect, useState } from "react";
import Style from "./index.module.less";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  createGollery,
  getOneGollery,
  updateGollery,
  delGollery,
} from "../../../request/gollery";
import usePermission from "../../../utils/hooks";
const { TextArea } = Input;
const AddGollery = (props) => {
  const navigate = useNavigate();
  const { hasPermission } = usePermission()
  const [search, setsearch] = useSearchParams();
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [coverPath, setCoverPath] = useState("");
  const [path, setPath] = useState("");
  const _id = search.get("id");
  useEffect(() => {
    if (_id) {
      getOneGollerys();
    }
  }, []);

  const getOneGollerys = async () => {
    const res = await getOneGollery({ _id });
    if (res.status === 200) {
      setType(res.data[0].type);
      setCoverPath(res.data[0].coverPath);
      setPath(res.data[0].path.join(","));
      setDescription(res.data[0].description);
      message.info(res.message);
    }
  };
  const updateGollerys = async () => {
    if (type.trim().length <= 0) {
      return message.error("请输入正确的标题");
    }
    if (coverPath.trim().length <= 0) {
      return message.error("请输入正确的封面");
    }
    if (description.trim().length <= 0) {
      return message.error("请输入正确的描述");
    }
    if (path && path.split(",").length <= 0) {
      return message.error("请输入正确的图片");
    }
    const data = {
      id: _id,
      type,
      coverPath,
      description,
      path: path.trim().split(","),
    };
    const res = await updateGollery(data);
    if (res.status === 200) {
      navigate("/layout/gollery");
    }
  };
  const createGollerys = async () => {
    if (type.trim().length <= 0) {
      return message.error("请输入正确的标题");
    }
    if (coverPath.trim().length <= 0) {
      return message.error("请输入正确的封面");
    }
    if (description.trim().length <= 0) {
      return message.error("请输入正确的描述");
    }
    if (path && path.split(",").length <= 0) {
      return message.error("请输入正确的图片");
    }
    const data = {
      type,
      coverPath,
      description,
      path: path.trim().split(","),
    };
    const res = await createGollery(data);
    if (res.status === 200) {
      navigate("/layout/gollery");
    }
  };
  const delGollerys = async () => {
    const res = await delGollery({ _id });
    if (res.status === 200) {
      navigate("/layout/gollery");
    }
  };

  return (
    <>
      <div className={Style["addGollery"]}>
        <div className={Style["addGollery-head"]}>
          {_id ? (
            <div className={Style["addGollery-head-content"]}>
              <Button
                onClick={() => navigate("/layout/gollery")}
                type="primary"
                className={Style["addGollery-head-content-btn"]}
              >
                返回
              </Button>
              <Button
                type="danger"
                onClick={() => {
                  if (!hasPermission(100402)) {
                    message.warn("您没有权限");
                    return;
                  }
                  updateGollerys();
                }}
                className={Style["addGollery-head-content-btn"]}
              >
                更新
              </Button>
              <Button
                type="danger"
                onClick={() => {
                  if (!hasPermission(100403)) {
                    message.warn("您没有权限");
                    return;
                  }
                  delGollerys();
                }}
                className={Style["addGollery-head-content-delBtn"]}
              >
                删除
              </Button>
            </div>
          ) : (
            <div className={Style["addGollery-head-content"]}>
              <Button
                type="primary"
                className={Style["addGollery-head-content-btn"]}
                onClick={() => navigate("/layout/gollery")}
              >
                返回
              </Button>
              <Button
                type="danger"
                className={Style["addGollery-head-content-btn"]}
                onClick={() => createGollerys()}
              >
                添加
              </Button>
            </div>
          )}
        </div>
        <div className={Style["addGollery-content"]}>
          <div className={Style["addGollery-content-form"]}>
            <div className={Style["addGollery-content-form-input"]}>
              <div>标题：</div>
              <Input
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={Style["addGollery-content-form-input-item"]}
              ></Input>
            </div>
            <div className={Style["addGollery-content-form-input"]}>
              <div>描述：</div>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={Style["addGollery-content-form-input-item"]}
              ></Input>
            </div>
            <div className={Style["addGollery-content-form-input"]}>
              <div>封面：</div>
              <Input
                onChange={(e) => setCoverPath(e.target.value)}
                value={coverPath}
                className={Style["addGollery-content-form-input-item"]}
              ></Input>
            </div>
            <div className={Style["addGollery-content-form-textarea"]}>
              <div className="input-title">图片：</div>
              <TextArea
                onChange={(e) => setPath(e.target.value)}
                value={path}
                autoSize={{ minRows: 20 }}
                className={Style["addGollery-content-form-textarea-imglist"]}
              ></TextArea>
            </div>
          </div>
          <div className={Style["addGollery-content-imgs"]}>
            <ul>
              {path.trim() && path.split(",")
                ? path.split(",").map((item, index) => {
                  return (
                    <>
                      <li
                        key={index}
                        style={{
                          backgroundImage: `url(${item})`,
                        }}
                      ></li>
                    </>
                  );
                })
                : ""}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddGollery;
