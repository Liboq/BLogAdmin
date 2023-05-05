import React, { useEffect, useRef } from "react";

// 编辑区
function Posts(props) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (!props.content) {
      inputRef.current.innerHTML= ''
    } else {
      inputRef.current.innerHTML = props.content;
    }
  }, [props.content]);
  return (
    <div
      ref={inputRef}
      id="input"
      className="input-region markdownStyle"
      contentEditable="plaintext-only"
      onInput={(e) => {
        props.setText(e.target.innerText);
      }}
    ></div>
  );
}
export default Posts;
