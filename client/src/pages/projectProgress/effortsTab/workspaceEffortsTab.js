import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dropdown from "../../../components/forms/dropdown/dropdown";
import { PieChart } from "@mui/x-charts";
import Star from "../../../components/stars/star";
import ratingIcon from "../../../assets/Performance.svg";

import TimesheetBreakdown from "../../../assets/Time sheet Breakdown.svg";
import "react-circular-progressbar/dist/styles.css";

import { useDispatch, useSelector } from "react-redux";
import { getWorkSpaceDataAction } from "../../../redux/actions/workSpace/workSpaceAction";
import { masterDataAction } from "../../../redux/actions/masterData/masterDataAction";
import WorkspaceLineChart from "./workspaceLineChart";
import WorkSpaceManager from "./workSpaceManager";

const options = [
  { value: "SEVEN_DAYS", label: "7D" },
  { value: "ONE_MONTH", label: "1M" },
  { value: "SIX_MONTHS", label: "6M" },
  { value: "ONE_YEAR", label: "1Y" },
  { value: "ALL", label: "ALL" },
];

export default function workspaceEffortsTab({ project }) {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const timesheetData = [
    { name: "TASKS", value: 20, color: "#0088FE" },
    { name: "OTHERS", value: 20, color: "#FFC1CB" },
    { name: "MEETINGS/CALLS", value: 50, color: "#00C49F" },
    { name: "BREAKS", value: 10, color: "#FFBB28" },
  ];

  console.log("timesheetData", timesheetData);

  const getColorByCategory = (name) => {
    switch (name) {
      case "TASKS":
        return "#0088FE";
      case "OTHERS":
        return "#FFC1CB";
      case "MEETINGS/CALLS":
        return "#00C49F";
      case "BREAKS":
        return "#FFBB28";
      default:
        return "#000000"; // Default color
    }
  };
  const dispatch = useDispatch();

  const payload = {
    projectId: 173,
    timeInterval: selectedOption.value,
  };

  useEffect(() => {
    dispatch(masterDataAction());
  }, []);

  useEffect(() => {
    dispatch(getWorkSpaceDataAction(payload));
  }, [project, selectedOption]);

  const workSpaceData = useSelector(
    (state) => state?.nonPersist?.workSpace?.workSpaceData
  );

  console.log("workSpaceData", workSpaceData);

  const manager = true;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionClick = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          {manager ? (
            <>
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
            </>
          ) : (
            <></>
          )}
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
        <Grid container justifyContent="flex-end" mb={1}>
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
        <Grid container mt={1}>
          {manager ? (
            <>
              <WorkSpaceManager />
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
            <WorkspaceLineChart
              handleClickOpen={handleClickOpen}
              selectedOption={selectedOption}
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
                    data:
                      workSpaceData?.legendList?.length > 0
                        ? workSpaceData.legendList.map((item) => ({
                            name: item.name,
                            value: item.value,
                            color: getColorByCategory(item.name),
                            label: item.name,
                          }))
                        : [],
                    innerRadius: 70,
                    outerRadius: 100,
                    cornerRadius: 5,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 150,
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
                <Grid container spacing={2} mb={2} sx={{ padding: "20px" }}>
                  <Grid item xs={2}>
                    <img src={ratingIcon} />
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    mt={1}
                    sx={{
                      textAlign: "start",
                      fontSize: "18px",
                    }}
                  >
                    Performance
                  </Grid>{" "}
                  <Grid
                    item
                    xs={4}
                    mt={1}
                    sx={{
                      textAlign: "start",
                      fontSize: "18px",
                    }}
                  >
                    {workSpaceData?.performanceRating}
                  </Grid>
                </Grid>
                <Grid
                  ml={14}
                  mt={-2}
                  sx={{
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Star value={workSpaceData?.performanceRating} />
                </Grid>
              </Grid>
              <Grid
                container
                mt={1}
                sx={{
                  border: "1px solid #DFDFDF",
                  borderRadius: "5px",
                  textAlign: "center",
                  height: "291px",
                }}
              >
                <PieChart
                  series={[
                    {
                      data:
                        workSpaceData?.legendList?.length > 0
                          ? workSpaceData.legendList.map((item) => ({
                              name: item.name,
                              value: item.value,
                              color: getColorByCategory(item.name),
                              label: item.name,
                            }))
                          : [],
                      innerRadius: 70,
                      outerRadius: 100,
                      cornerRadius: 5,
                      startAngle: 0,
                      endAngle: 360,
                      cx: 150,
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
            <WorkspaceLineChart
              handleClickOpen={handleClickOpen}
              selectedOption={selectedOption}
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
