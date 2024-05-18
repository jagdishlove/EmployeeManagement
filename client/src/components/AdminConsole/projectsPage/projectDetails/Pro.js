import React, { useEffect } from "react";

const Pro = () => {
  useEffect(() => {
    console.log("yogi");
  }, []);
  return (
    <div>
      <h1>Yogi</h1>
    </div>
  );
};

export default Pro;
