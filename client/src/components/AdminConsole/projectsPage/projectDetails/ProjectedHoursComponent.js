import React from "react";
import styled from "styled-components";

const Watch = styled.div`
  width: 100px;
  height: 100px;
  margin-top: 10px;
  border: 3px solid #008080;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  color: #000;
  position: relative;
  background-color: white;
`;

const HourLine = styled.div`
  position: absolute;
  width: 2px;
  height: 10px;
  background-color: #cdcdcd;
  transform-origin: bottom center;
`;

const ProjectedHoursWatch = ({ hours }) => {
  const hourLines = [];
  const outerRadius = 29;
  const center = 95;

  for (let i = 0; i < 8; i++) {
    // Loop for only 8 lines
    const angle = (i * 45 * Math.PI) / 180; // Convert angle to radians for every 45 degrees
    const x1 = center + outerRadius * Math.sin(angle); // Calculate x coordinate for outer circle
    const y1 = center - outerRadius * Math.cos(angle); // Calculate y coordinate for outer circle

    hourLines.push(
      <HourLine
        key={i}
        style={{
          left: `${x1 - 48}px`,
          top: `${y1 - 57}px`,
          transform: `rotate(${i * 45}deg) translate(-50%, -100%)`,
        }}
      />
    );
  }

  return (
    <Watch
      style={{
        textAlign: "center",
      }}
    >
      {hourLines}
      <div>{hours}</div>
    </Watch>
  );
};

export default ProjectedHoursWatch;
