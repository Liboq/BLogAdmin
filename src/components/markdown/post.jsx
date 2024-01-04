import React, { useEffect, useRef } from "react";

// 编辑区
function Posts(props) {
  const inputRef = useRef(null);
  console.log(props);
  useEffect(() => {
      inputRef.current.innerHTML = props.content;
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
