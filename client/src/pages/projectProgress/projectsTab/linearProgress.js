import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";

const useStyles = () => ({
  root: {
    width: "100%",
    borderRadius: 0,
    border: `1px solid #36531F`,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  bar: {
    borderRadius: "0px",
    backgroundImage: "linear-gradient(90deg, #78B946 0%, #36531F 88.59%)", // Set progress bar color
  },
});

export default function LinearProgressThickness() {
  const classes = useStyles();

  const { dashboardProjectdetails } = useSelector(
    (state) => state?.nonPersist?.dashboardProjectdetails
  );

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
        color={"red"}
        sx={{
          ...classes.root,
          "& .MuiLinearProgress-bar": classes.bar,
          height: 35,
        }}
      />
    </div>
  );
}
