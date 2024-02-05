import { Container, Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

const VerticalBarGraph = ({ value, color, border }) => {
  // Set the maximum value for the progress bar
  const maxValue = 12;

  // Ensure the value for the progress bar does not exceed the maximum
  const scaledValue = value > maxValue ? 100 : (value / maxValue) * 100;

  const formattedTime = (value) => {
    return `Hours ${value}`;
  };

  return (
    <Tooltip title={formattedTime(value)} placement="top">
      <Container
        maxWidth={false}
        disableGutters
        style={{
          position: "sticky", // Make the container sticky
          bottom: 0, // Stick it to the bottom
        }}
      >
        <Grid container>
          <Grid item>
            <div
              className="your-div "
              style={{
                position: "relative",
                width: "22px", // Width of the vertical bar
                // height: "11.9vh", // Height of the vertical bar
                border: `1px solid ${border}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                backgroundColor: "transparent", // Set background color to transparent
              }}
            >
              <div
                style={{
                  height: `${scaledValue}%`, // Adjust the height based on the scaled value
                  width: "100%",
                  background: color || "blue", // Customize the color of the bar
                }}
              ></div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Tooltip>
  );
};

export default VerticalBarGraph;
