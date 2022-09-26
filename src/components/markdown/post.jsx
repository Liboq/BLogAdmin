import React from "react";

// 编辑区
function Posts(props) {
  return (
    <div
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
