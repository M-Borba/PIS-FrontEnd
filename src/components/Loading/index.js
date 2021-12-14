import React from "react";
import ReactLoading from "react-loading";

const Loading = () => (
  <div
    style={{
      position: "fixed",
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <ReactLoading type="cylon" color="#00000" height="76px" width="76px" />
  </div>
);

export default Loading;
