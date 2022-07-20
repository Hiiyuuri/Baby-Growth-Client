import React from "react";

const style = {
  background: "linear-gradient(to right, #03a786, #29b57d, #008a45, #00753b)",
  color: "white",

  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "40px",
  width: "100%",
};

export default function Footer() {
  return (
    <div>
      <div style={style}>
        <div style={{ marginTop: "-10px" }}>BabyGrowth © 2022</div>
      </div>
    </div>
  );
}
