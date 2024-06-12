import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const tooltipStyle = {
    visibility: visible ? "visible" : "hidden",
    width: "120px",
    backgroundColor: "black",
    color: "#fff",
    textAlign: "center",
    padding: "5px 0",
    borderRadius: "6px",
    position: "absolute",
    zIndex: 1,
    bottom: "125%",
    left: "50%",
    transform: "translateX(-50%)",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.3s",
  };

  const containerStyle = {
    position: "relative",
    display: "inline-block",
  };

  return (
    <div
      style={containerStyle}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      <div style={tooltipStyle}>{text}</div>
    </div>
  );
};

export default Tooltip;
