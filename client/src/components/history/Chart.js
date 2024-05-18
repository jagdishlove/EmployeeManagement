import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Star from "../../components/stars/star";
import ConsistencyMeter from "./Consistency Meter/Consistencymeter";
import ActivityChart from "./activityChart/activityChart";

function Chart() {
  const historyData = useSelector(
    (state) => state?.persistData?.historyData.historyData
  );

  const legendItems = [
    { name: "TASKS", color: "#0088FE" },
    { name: "MEETINGS", color: "#FFBB28" },
    { name: "BREAKS", color: "#00C49F" },
    { name: "OTHERS", color: "#FFC0CB" },
    { name: "< 7.5 Hours", color: "red" },
    { name: "7.5 to 8.5 Hours", color: "green" },
    { name: "> 8.5 Hours", color: "#690CE1" },
  ];
  return (
    <Box
      sx={{
        py: "50px",
      }}
    >
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
          border: "3px dotted  rgba(0, 128, 128, 0.4)",
          padding: "10px",
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          justifyContent="center"
          display="flex"
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            style={{
              color: "#000000",
              textAlign: "center",
              paddingBottom: "15px",
            }}
            variant="h6"
          >
            <b>LEGEND</b>
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {legendItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                  border: `1px solid ${item.color}`,
                  borderRadius: "4px",
                }}
              >
                <div
                  style={{
                    width: "80px",
                    height: "25px",
                    backgroundColor: item.color,
                    marginRight: "10px",
                  }}
                ></div>
                <Typography
                  variant="body2"
                  style={{ marginRight: "10px", fontWeight: "900" }}
                >
                  {item.name}
                </Typography>
              </div>
            ))}
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          justifyContent="center"
          display="flex"
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "auto",
            borderLeft: "3px dotted  rgba(0, 128, 128, 0.4) ",
            borderRight: "3px dotted  rgba(0, 128, 128, 0.4) ",
            "@media (max-width: 768px)  ": {
              borderRight: "none",
              borderLeft: "none",
              borderTop: "3px dotted  rgba(0, 128, 128, 0.4)",
              borderBottom: "3px dotted  rgba(0, 128, 128, 0.4)",
            },
          }}
        >
          <ActivityChart />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={4}
          lg={4}
          justifyContent="center"
          display="flex"
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            style={{
              color: "#000000",
              textAlign: "center",
              marginBottom: "10px",
            }}
            variant="h6"
          >
            <b>CONSISTENCY METER</b>
          </Typography>
          <ConsistencyMeter
            value={Math.floor(historyData?.consistencyMeter?.value)}
          />

          <div className="horizontal-dotted-line"></div>

          <Typography
            style={{
              color: "#000000",
              textAlign: "center",
              marginTop: "10px", // Adjust margin-top for spacing
            }}
            variant="h6"
          >
            <b>PERFORMANCE RATING</b>
          </Typography>
          <Star value={historyData?.performanceRating} />
        </Grid>
      </Grid>

      <style>
        {`  
          .horizontal-dotted-line {
            border-top: 3px dotted  rgba(0, 128, 128, 0.4);
            width: 102%;  
            margin: 40px 0;  
          }            
          },
          
        `}
      </style>
    </Box>
  );
}

export default Chart;
