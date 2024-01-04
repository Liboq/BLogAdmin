import React, {  useState } from "react";
import Posts from "./post";
import ViewMd from "./view";

import './style/github-dark.css';
import './style/index.css';
import { useEffect } from "react";

function Markdown(props) {
  
  useEffect(()=>{
    setText(props.oldContent)
  },[props.oldContent])
  const [text, setText] = useState('')
  props.getMd(text)
  
  const setT =(val)=>{
    setText(val)
  }
  return (
    <>
    <div className="marked">

      <Posts
      content = {props.oldContent}
      setText={setT}
       
      ></Posts>
      <ViewMd   text ={text} ></ViewMd>
    </div>
    </>
  );
}
export default Markdown;
