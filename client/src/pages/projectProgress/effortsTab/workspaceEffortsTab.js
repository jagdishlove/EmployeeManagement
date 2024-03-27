import {
  Avatar,
  Box,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import Dropdown from "../../../components/forms/dropdown/dropdown";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts";
import Star from "../../../components/stars/star";
import ratingIcon from "../../../assets/Performance.svg";
import TotalHours from "../../../assets/Total Hours.svg";
import LoggedHours from "../../../assets/Logged in hours.svg";
import TimesheetBreakdown from "../../../assets/Time sheet Breakdown.svg";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";

const options = [
  { value: "7d", label: "7D" },
  { value: "1m", label: "1M" },
  { value: "6m", label: "6M" },
  { value: "1y", label: "1Y" },
  { value: "all", label: "ALL" },
];

export default function workspaceEffortsTab() {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const manager = true;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const percentage = 80;
  const handleOptionClick = (selectedOption) => {
    setSelectedOption(selectedOption);
    // Handle selection change
  };

  const rating = 3;

  return (
    <Grid container spacing={2}>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={6}>
              <Dropdown
                title="Team Members"
                dropdownName="Team Members" // Pass the dropdown name
                style={{
                  border: "1px solid #8897ad87",
                  borderRadius: "10px",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Dropdown
                title="Reports"
                dropdownName="Reports" // Pass the dropdown name
                style={{
                  border: "1px solid #8897ad87",
                  borderRadius: "10px",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        container
        ml={2}
        spacing={2}
        mt={2}
        sx={{
          padding: "30px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "10px",
        }}
      >
        <Grid container mt={-2} justifyContent="flex-end">
          {options.map((option) => (
            <Grid item key={option.value}>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textDecoration:
                    selectedOption === option ? "underline" : "none",
                  color: selectedOption === option ? "#3689EA" : "inherit",
                }}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </button>
            </Grid>
          ))}
        </Grid>
        <Grid container mt={3}>
          {manager ? (
            <>
              <Grid container spacing={2} sx={{ paddingLeft: "35px" }}>
                <Grid
                  item
                  xs={3}
                  sx={{
                    borderRadius: "5px",
                    padding: "20px",
                    marginRight: "8px",
                    border: "1px solid #DFDFDF",
                  }}
                >
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                      <Avatar
                        alt="Logo"
                        src="https://s3-alpha-sig.figma.com/img/b73f/7d3f/3f97b55b8691134f55142949dcc75229?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i71qszz5yxZHlZnyS44WOkNW7yY4vpvANkFpV9YWiVpYxeqlnII-Nk8j0fFMQFtkUuno3g62HZujMPofiIZUFkzxKaFka6zAZkZIfBxENC~aUcHcVYGMZQaywgomW69Wi~Pq-o18woRlsnLPZ0v7C20wmbB9er64UWDbvU7xBm0IZ-6c9rjpPK6SLBTSs8aT385agX2E9sTyQizMsGx0FxS5QDlwU2pM0k2XDdTRQUBG79Ez3w2HVHpxgWowanHjuiERZGLdN0f2tRNpoEImvvM-uCeeN-TOEq4QwpWoCvDH4JBFPBGM6e9Hm9mdaL2ZLyV-tnsek3Z~5GziCPybyg__"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h6">Karthick Raj S </Typography>
                      <Typography variant="body1">
                        Project Name: FDX Registry
                      </Typography>
                      <Typography variant="body2">ID: Emp 234</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    border: "1px solid #DFDFDF",
                    borderRadius: "5px",
                    padding: "20px",
                    marginRight: "8px",
                    textAlign: "center",
                  }}
                >
                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={4}>
                      <img src={ratingIcon} />
                    </Grid>
                    <Grid item xs={4} mt={1}>
                      Performance
                    </Grid>{" "}
                    <Grid item xs={4} mt={1}>
                      3.0
                    </Grid>
                  </Grid>
                  <Star value={rating} />
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    border: "1px solid #DFDFDF",
                    borderRadius: "5px",
                    padding: "20px",
                    marginRight: "8px",
                    textAlign: "center",
                  }}
                >
                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={3}>
                      <img src={TotalHours} />
                    </Grid>
                    <Grid item mt={1} xs={9}>
                      Total Hours
                    </Grid>{" "}
                  </Grid>
                  <Typography>200</Typography>
                </Grid>
                <Grid
                  item
                  xs={3.5}
                  sx={{
                    border: "1px solid #DFDFDF",
                    borderRadius: "5px",
                    padding: "20px",
                  }}
                >
                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={4}>
                      <img src={LoggedHours} />
                    </Grid>
                    <Grid item xs={8} mt={1}>
                      Logged In Hours : 120
                    </Grid>{" "}
                  </Grid>
                  <Box
                    mt={-2}
                    sx={{
                      textAlign: "center",
                    }}
                  >
                    <CircularProgressbar
                      value={percentage}
                      text={`${percentage} hrs left`}
                      styles={{
                        root: { width: "70px" }, // Adjust the width to reduce the size
                        path: { stroke: "#4CAF50" }, // Adjust path color if needed
                        text: { fontSize: "10px", fill: "#000" }, // Adjust font size
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <Grid container sx={{ padding: "20px" }}>
          <Grid
            item
            xs={6.5}
            sx={{
              border: "1px solid #DFDFDF",
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <Grid container>
              <Grid item xs={11}>
                <Typography sx={{ color: "#000000", fontSize: "24px" }}>
                  Projected Vs Actual Progress
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <OpenInFullOutlinedIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={handleClickOpen}
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ paddingLeft: "20px" }}>
              <Grid item xs={4}>
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: "#50C01B",
                      marginRight: "5px",
                    }}
                  />
                  <Typography variant="body1" fontWeight="bold">
                    Projected Hours
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={8}>
                <Box display="flex" alignItems="center">
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      backgroundColor: "#FF66FF",
                      marginRight: "5px",
                    }}
                  />
                  <Typography variant="body1" fontWeight="bold">
                    Actual Hours
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10], label: "Duration" }]}
              yAxis={[{ data: [1, 2, 3, 5, 8, 10], label: "Time" }]}
              series={[
                {
                  name: "Time",
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  color: "#50C01B",
                },
                {
                  name: "Duration",
                  data: [3, 6.5, 1115, 11.5, 15.5, 15],
                  color: "#FF66FF",
                },
              ]}
              axes={[
                {
                  primary: true,
                  type: "linear",
                  position: "bottom",
                  label: "Duration",
                },
                { type: "linear", position: "left", label: "Time" },
              ]}
              width={500}
              height={300}
            />
          </Grid>
          <Grid item xs={0.2} />

          {manager ? (
            <Grid
              item
              xs={5.3}
              sx={{
                border: "1px solid #DFDFDF",
                borderRadius: "5px",
                height: "400px",
              }}
            >
              <Grid container spacing={2} mt={2} sx={{ paddingLeft: "20px" }}>
                <Grid item xs={2}>
                  <img src={TimesheetBreakdown} />
                </Grid>
                <Grid
                  item
                  xs={10}
                  sx={{
                    textAlign: "start",
                  }}
                >
                  Timesheet Breakdown
                </Grid>{" "}
              </Grid>
              <PieChart
                series={[
                  {
                    data: [
                      { name: "Category A", value: 20, color: "#0088FE" },
                      { name: "Category B", value: 20, color: "#FFC1CB" },
                      { name: "Category C", value: 50, color: "#00C49F" },
                      { name: "Category D", value: 10, color: "#FFBB28" },
                    ],
                    innerRadius: 70,
                    outerRadius: 100,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 240,
                    cy: 140,
                  },
                ]}
              />
            </Grid>
          ) : (
            <Grid
              item
              xs={5.3}
              sx={{
                borderRadius: "5px",
                height: "400px",
              }}
            >
              <Grid
                container
                sx={{
                  border: "1px solid #DFDFDF",
                  borderRadius: "5px",
                  textAlign: "center",
                }}
              >
                <Grid container spacing={2} mb={2}>
                  <Grid item xs={4}>
                    <img src={ratingIcon} />
                  </Grid>
                  <Grid item xs={4} mt={1}>
                    Performance
                  </Grid>{" "}
                  <Grid item xs={4} mt={1}>
                    3.0
                  </Grid>
                </Grid>
                <Star value={rating} />
              </Grid>
              <Grid
                container
                mt={1}
                sx={{
                  border: "1px solid #DFDFDF",
                  borderRadius: "5px",
                  textAlign: "center",
                  height: "300px",
                }}
              >
                <PieChart
                  series={[
                    {
                      data: [
                        { name: "Category A", value: 20, color: "#0088FE" },
                        { name: "Category B", value: 20, color: "#FFC1CB" },
                        { name: "Category C", value: 50, color: "#00C49F" },
                        { name: "Category D", value: 10, color: "#FFBB28" },
                      ],
                      innerRadius: 70,
                      outerRadius: 100,
                      cornerRadius: 5,
                      startAngle: 0,
                      endAngle: 360,
                      cx: 240,
                      cy: 140,
                    },
                  ]}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> Projected Vs Actual Progress</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <LineChart
              xAxis={[{ data: [1, 2, 3, 5, 8, 10], label: "Duration" }]}
              yAxis={[{ data: [1, 2, 3, 5, 8, 10], label: "Time" }]}
              series={[
                {
                  name: "Time",
                  data: [2, 5.5, 2, 8.5, 1.5, 5],
                  color: "#50C01B",
                },
                {
                  name: "Duration",
                  data: [3, 6.5, 1115, 11.5, 15.5, 15],
                  color: "#FF66FF",
                },
              ]}
              axes={[
                {
                  primary: true,
                  type: "linear",
                  position: "bottom",
                  label: "Duration",
                },
                { type: "linear", position: "left", label: "Time" },
              ]}
              width={500}
              height={300}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
