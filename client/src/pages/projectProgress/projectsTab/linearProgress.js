import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";

export default function LinearProgressThickness() {
  const { dashboardProjectdetails } = useSelector(
    (state) => state?.persistData?.dashboardProjectdetails
  );

  // Check the color from the backend and set the appropriate bar color
  let barColor = "";
  switch (dashboardProjectdetails?.color) {
    case "Purple":
      barColor = "linear-gradient(90.24deg, #FF66FF 1.91%, #993D99 99.59%)";
      break;
    case "Red":
      barColor = "linear-gradient(90deg, #F93201 0%, #931E01 102.63%)";
      break;
    case "Green":
      barColor = "linear-gradient(90deg, #89B344 0%, #3B4D1D 101.58%)";
      break;
    case "Yellow":
      barColor = "linear-gradient(90deg, #DBE61D 0%, #7A8010 100%)";
      break;
    default:
      barColor = "linear-gradient(90.24deg, #FF66FF 1.91%, #993D99 99.59%)";
      break;
  }

  // Check if dashboardProjectdetails.progress is NaN, if NaN set it to 0
  const progressValue = isNaN(dashboardProjectdetails?.progress)
    ? 0
    : dashboardProjectdetails?.progress;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "15px",
      }}
    >
      <LinearProgress
        variant="determinate"
        value={progressValue}
        sx={{
          width: "100%",
          borderRadius: 0,
          border: `1px solid #36531F`,
          overflow: "hidden",
          backgroundColor: "transparent",
          "& .MuiLinearProgress-bar": {
            backgroundImage: barColor,
            borderRadius: "0px",
          },
          height: 35,
        }}
      />
    </div>
  );
}
