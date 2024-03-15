import React from "react";
import { styled } from "@mui/system";

// Styled components for creating the gradient gauge meter
const Container = styled("div")({
  position: "relative",
  width: "100%",
  height: 20,
  borderRadius: 10,
  overflow: "hidden",
});

const Bar = styled("div")({
  position: "absolute",
  top: 0,
  bottom: 0,
  width: "100%",
  borderRadius: "inherit",
  background: "linear-gradient(to right, #00e676, #ff9100)",
});

const LowValue = styled("div")({
  position: "absolute",
  top: "50%",
  left: "5px",
  transform: "translateY(-50%)",
  color: "#00e676",
  fontWeight: "bold",
});

const HighValue = styled("div")({
  position: "absolute",
  top: "50%",
  right: "5px",
  transform: "translateY(-50%)",
  color: "#ff9100",
  fontWeight: "bold",
});

// Component definition
const GradientGaugeMeter = ({ lowValue, highValue }) => {
  return (
    <Container>
      <Bar />
      <LowValue>{lowValue}</LowValue>
      <HighValue>{highValue}</HighValue>
    </Container>
  );
};

export default GradientGaugeMeter;
