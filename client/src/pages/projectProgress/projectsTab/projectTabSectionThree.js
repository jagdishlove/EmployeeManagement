import React, { useState } from "react";
import {
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
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ProjectBarChart from "./barChart";



const data = [
 
  {
    time: "2024-03-25",
    projectedImplementationCost: 1.2,
    actualImplementationCost: 0.0,
  },
  {
    time: "2024-03-26",
    projectedImplementationCost: 1.6,
    actualImplementationCost: 0.0,
  },
  {
    time: "2024-03-27",
    projectedImplementationCost: 2.0,
    actualImplementationCost: 0.0,
  },
  {
    time: "2024-03-28",
    projectedImplementationCost: 2.4,
    actualImplementationCost: 91.13982987587345,
  },
  {
    time: "2024-03-29",
    projectedImplementationCost: 2.8000000000000003,
    actualImplementationCost: 100.0,
  },
  {
    time: "2024-03-30",
    projectedImplementationCost: 3.4,
    actualImplementationCost: 91.13982987587345,
  },
  {
    time: "2024-03-31",
    projectedImplementationCost: 2.8000000000000003,
    actualImplementationCost: 100.0,
  },
  
];

const ProjectTebSectionThree = () => {
  const [open, setOpen] = useState(false);
  const [openBar, setOpenBar] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenBar = () => {
    setOpenBar(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenBar(false);
  };

  const [interval, setInterval] = useState("7D");
  const [filteredData, setFilteredData] = useState(data);
  const handleIntervalChange = (newInterval) => {
    setInterval(newInterval);
    // Logic to filter data based on interval
    // Example: filter for last 7 days, 1 month, 6 months, 1 year, or show all data
    let newData;
    switch (newInterval) {
      case '7D':
        newData = data.filter((item) => new Date(item.time) >= new Date(data[data.length - 1].time) - 7 * 24 * 60 * 60 * 1000);
        break;
      case '1M':
        newData = data.filter((item) => new Date(item.time) >= new Date(data[data.length - 1].time) - 30 * 24 * 60 * 60 * 1000);
        break;
      case '6M':
        newData = data.filter((item) => new Date(item.time) >= new Date(data[data.length - 1].time) - 6 * 30 * 24 * 60 * 60 * 1000);
        break;
      case '1Y':
        newData = data.filter((item) => new Date(item.time) >= new Date(data[data.length - 1].time) - 365 * 24 * 60 * 60 * 1000);
        break;
      case 'All':
        newData = data;
        break;
      default:
        newData = data;
    }
    setFilteredData(newData);
  };

  return (
    <div>
      <Grid
        container
        style={{
          paddingTop: "20px",
          justifyContent: "space-between",
          gap: 1, // Adjust the gap between Grid containers here
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={5.9}
          lg={5.9}
          sx={{
            boxShadow: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={6} marginTop={"110px"}>
              <ProjectBarChart />
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <OpenInFullOutlinedIcon
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={handleClickOpenBar}
                />
              </Box>
              <Dialog open={openBar} onClose={handleClose}>
                <DialogTitle> </DialogTitle>
                <DialogContent>
                  <ProjectBarChart />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#81C84B",
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  fontWeight="bold"
                  style={{ fontSize: "14px", lineHeight: "15px" }}
                >
                  Actual Implementation Cost
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#20D7FE",
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  fontWeight="bold"
                  style={{ fontSize: "14px", lineHeight: "15px" }}
                >
                  Projected Implementation Cost
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#33A1EC",
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  fontWeight="bold"
                  style={{ fontSize: "14px", lineHeight: "15px" }}
                >
                  Budget
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#FFA07A",
                    marginRight: "5px",
                    borderRadius: "50%",
                  }}
                />
                <Typography
                  fontWeight="bold"
                  style={{ fontSize: "14px", lineHeight: "15px" }}
                >
                  Time
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Projected Implementation graph */}
        <Grid
          item
          xs={12}
          sm={12}
          md={5.9}
          lg={5.9}
          sx={{
            boxShadow: 2,
            p: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={11}>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#60C0A3",
                    marginRight: "5px",
                  }}
                />
                <Typography variant="body1" fontWeight="bold">
                  Projected Implementation
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    backgroundColor: "#C06060",
                    marginRight: "5px",
                  }}
                />
                <Typography variant="body1" fontWeight="bold">
                  Actual Implementation
                </Typography>
              </Box>
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

          <div style={{ marginBottom: '20px' }}>
        <Button onClick={() => handleIntervalChange('7D')} variant={interval === '7D' ? 'contained' : 'outlined'}>7D</Button>
        <Button onClick={() => handleIntervalChange('1M')} variant={interval === '1M' ? 'contained' : 'outlined'}>1M</Button>
        <Button onClick={() => handleIntervalChange('6M')} variant={interval === '6M' ? 'contained' : 'outlined'}>6M</Button>
        <Button onClick={() => handleIntervalChange('1Y')} variant={interval === '1Y' ? 'contained' : 'outlined'}>1Y</Button>
        <Button onClick={() => handleIntervalChange('All')} variant={interval === 'All' ? 'contained' : 'outlined'}>All</Button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={filteredData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="projectedImplementationCost" stroke="#8884d8" activeDot={{ r: 8 }} name="Projected Implementation Cost" />
          <Line type="monotone" dataKey="actualImplementationCost" stroke="#82ca9d" activeDot={{ r: 8 }} name="Actual Implementation Cost" />
        </LineChart>
      </ResponsiveContainer>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle> </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <div style={{ marginBottom: "20px" }}>
                  <Button
                    onClick={() => handleIntervalChange("7D")}
                    variant={interval === "7D" ? "contained" : "outlined"}
                  >
                    7D
                  </Button>
                  <Button
                    onClick={() => handleIntervalChange("1M")}
                    variant={interval === "1M" ? "contained" : "outlined"}
                  >
                    1M
                  </Button>
                  <Button
                    onClick={() => handleIntervalChange("6M")}
                    variant={interval === "6M" ? "contained" : "outlined"}
                  >
                    6M
                  </Button>
                  <Button
                    onClick={() => handleIntervalChange("1Y")}
                    variant={interval === "1Y" ? "contained" : "outlined"}
                  >
                    1Y
                  </Button>
                  <Button
                    onClick={() => handleIntervalChange("All")}
                    variant={interval === "All" ? "contained" : "outlined"}
                  >
                    All
                  </Button>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={filteredData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="projectedImplementationCost"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Projected Implementation Cost"
                    />
                    <Line
                      type="monotone"
                      dataKey="actualImplementationCost"
                      stroke="#82ca9d"
                      activeDot={{ r: 8 }}
                      name="Actual Implementation Cost"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectTebSectionThree;
