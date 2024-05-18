import React from "react";
import GaugeChart from "react-gauge-chart";

const ConsistencyMeter = ({ value }) => {
  // Convert the value to hours
  const valueInHours = value ? value / 60 : 0;
  // Define colors based on value condition
  const arcColors = ["red", "green", "#690CE1"];
  const percentage = valueInHours > 12 ? 1 : valueInHours / 12;

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
          if (valueInHours === 0) {
            return `00 hours 00 minutes`;
          }
          const totalMinutes = valueInHours * 60;
          const hours = Math.floor(totalMinutes / 60);
          const minutes = Math.round(totalMinutes % 60); // Round the minutes
          return hours > 0 || minutes > 0
            ? `${hours} hours ${minutes} minutes`
            : `00 hours 00 minutes`;
        }}
      />
    </div>
  );
};

export default ConsistencyMeter;