import React, {  useState } from "react";
import Posts from "./post";
import ViewMd from "./view";

import './style/github-dark.css';
import './style/index.css';

function Markdown() {
  const [text, setText] = useState("");
 
  return (
    <>
    <div className="marked-head">welcome to markdown edit</div>
    <div className="marked">

      <Posts
      setText={setText}
       
      ></Posts>
      <ViewMd   text ={text} ></ViewMd>
    </div>
    </>
  );
}
export default Markdown;
