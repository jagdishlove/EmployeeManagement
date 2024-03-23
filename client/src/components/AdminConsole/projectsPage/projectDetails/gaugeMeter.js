import React from "react";
import GaugeChart from "react-gauge-chart";
import { useSelector } from "react-redux";

const GaugeMeter = () => {
  // Project Details
  const { projectDetailsData } = useSelector(
    (state) => state.nonPersist?.projectDetails
  );
  console.log("projectDetailsData", projectDetailsData);

  // Calculate the percent based on the complexity level
  const calculatePercent = () => {
    if (projectDetailsData.complexity === "HIGH") {
      return 1.0;
    } else if (projectDetailsData.complexity === "MEDIUM") {
      return 0.25;
    } else if (projectDetailsData.complexity === "LOW") {
      return 0;
    } else {
      return 0;
    }
  };

  return (
    <div style={{ position: "relative", width: "140px", height: "80px" }}>
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
          fontSize: "12px",
        }}
      >
        Low
      </div>
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, 70%)",
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
          fontSize: "12px",
        }}
      >
        High
      </div>
    </div>
  );
};

export default GaugeMeter;
