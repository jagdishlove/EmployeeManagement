import React from "react";
import GaugeChart from "react-gauge-chart";
import { useSelector } from "react-redux";

const GaugeMeter = () => {
  // Project Details
  const { projectDetailsData } = useSelector(
    (state) => state.persistData?.projectDetails
  );

  // Calculate the percent based on the complexity level
  const calculatePercent = () => {
    if (projectDetailsData?.complexity === "HIGH") {
      return 1;
    } else if (projectDetailsData?.complexity === "MEDIUM") {
      return 0.5;
    } else if (projectDetailsData?.complexity === "LOW") {
      return 0.1;
    } else {
      return 0;
    }
  };

  return (
    <div style={{ position: "relative", width: "160px", height: "120px" }}>
      <GaugeChart
        id="gauge-chart1"
        arcWidth={0.3}
        neddleColor="#86D26B"
        colors={["#86D26B", "#FFC371", "#D65A5A"]}
        percent={calculatePercent()} // Use the calculated percent
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "5px",
          transform: "translate(-50%, 10%)",
          fontSize: "14px",
        }}
      >
        Low
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 85%)",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        Complexity
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "5px",
          transform: "translate(50%, 10%)",
          fontSize: "14px",
        }}
      >
        High
      </div>
    </div>
  );
};

export default GaugeMeter;
