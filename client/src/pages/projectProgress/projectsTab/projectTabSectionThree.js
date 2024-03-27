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
import { LineChart } from "@mui/x-charts/LineChart";

import ProjectBarChart from "./barChart";

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
          <Grid container spacing={3}>
            <Grid item xs={6} marginTop={"60px"}>
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
                    radius: "50px",
                    backgroundColor: "#81C84B",
                    marginRight: "5px",
                  }}
                />
                <Typography variant="body1" fontWeight="bold">
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
                  }}
                />
                <Typography variant="body1" fontWeight="bold">
                  Projected Implementation Cost
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    radius: "50px",
                    backgroundColor: "#33A1EC",
                    marginRight: "5px",
                  }}
                />
                <Typography variant="body1" fontWeight="bold">
                  Budget
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box
                  sx={{
                    width: "10px",
                    height: "10px",
                    radius: "50px",
                    backgroundColor: "#FFA07A",
                    marginRight: "5px",
                  }}
                />
                <Typography variant="body1" fontWeight="bold">
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

          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10], label: "Time" }]}
            yAxis={[{ data: [1, 2, 3, 5, 8, 10], label: "Cost" }]}
            series={[
              {
                name: "Time",
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                color: "#60C0A3",
              },
              {
                name: "Cost",
                data: [3, 6.5, 1115, 11.5, 15.5, 15],
                color: "#C06060",
              },
            ]}
            axes={[
              {
                primary: true,
                type: "linear",
                position: "bottom",
                label: "Time",
              },
              { type: "linear", position: "left", label: "Cost" },
            ]}
            width={450}
            height={300}
          />
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle> </DialogTitle>
            <DialogContent>
              <DialogContentText>
                <LineChart
                  xAxis={[{ data: [1, 2, 3, 5, 8, 10], label: "Time" }]}
                  yAxis={[{ data: [1, 2, 3, 5, 8, 10], label: "Cost" }]}
                  series={[
                    {
                      name: "Time",
                      data: [2, 5.5, 2, 8.5, 1.5, 5],
                      color: "#60C0A3",
                    },
                    {
                      name: "Cost",
                      data: [3, 6.5, 1115, 11.5, 15.5, 15],
                      color: "#C06060",
                    },
                  ]}
                  axes={[
                    {
                      primary: true,
                      type: "linear",
                      position: "bottom",
                      label: "Time",
                    },
                    { type: "linear", position: "left", label: "Cost" },
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
      </Grid>
    </div>
  );
};

export default ProjectTebSectionThree;
