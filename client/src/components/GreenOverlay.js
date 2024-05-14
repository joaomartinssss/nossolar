import React from "react";

const BlackOverlay = ({ show }) => {
  return show ? (
    <div
      style={{
        background: "green",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
    </div>
  ) : null;
};

export default BlackOverlay;
