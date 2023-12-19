import React from "react";
import GaugeChart from "react-gauge-chart";

const ConsistencyMeter = ({ value }) => {
  // Convert the value to hours
  const valueInHours = value / 60;
  // Define colors based on value condition
  const arcColors = ["red", "green", "#690CE1"];
  const percentage = valueInHours > 12 ? 1 : valueInHours / 12; // Limit to 12 if greater than 12

  return (
    <div>
      <GaugeChart
        id="gauge-chart1"
        style={{
          width: "200px",
        }}
        nrOfLevels={3}
        colors={arcColors}
        arcsLength={[49, 8.3, 23]}
        arcWidth={0.3}
        arcPadding={0.02}
        percent={percentage}
        animate={false}
        textColor="black"
        formatTextValue={() => {
          const totalMinutes = valueInHours * 60;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = Math.round(totalMinutes % 60); // Round the minutes
  return `${hours} hours ${minutes} minutes`;
        }}
      />
    </div>
  );
};

export default ConsistencyMeter;
