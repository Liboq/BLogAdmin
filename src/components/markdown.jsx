import React, { useState } from "react";
import Posts from "./post";
import ViewMd from "./view";

import "./style/github-dark.css";
import "./style/index.css";

function Markdown() {
  const [text, setText] = useState("");
  const funDownload = function (content) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement("a");
    const filename = new Date().getTime();
    eleLink.download = filename + ".md";
    eleLink.style.display = "none";
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  };

  return (
    <>
      <div className="marked-head">
        <span>welcome to markdown edit</span>{" "}
        <span className="abs-btn">
          <button onClick={() => funDownload(text)} className="load-btn">
            导出为md文件
          </button>{" "}
        </span>{" "}
      </div>
      <div className="marked">
        <Posts setText={setText}></Posts>
        <ViewMd text={text}></ViewMd>
      </div>
    </>
  );
}
export default Markdown;
