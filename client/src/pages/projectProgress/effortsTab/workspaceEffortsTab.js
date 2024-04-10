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
import {
  getAllTeamMembersAction,
  getWorkSpaceDataAction,
} from "../../../redux/actions/workSpace/workSpaceAction";
import { masterDataAction } from "../../../redux/actions/masterData/masterDataAction";
import WorkspaceLineChart from "./workspaceLineChart";
import WorkSpaceManager from "./workSpaceManager";
import { TimesheetStyle } from "../../timesheet/timesheetStyle";
import { useTheme } from "styled-components";

const options = [
  { value: "SEVEN_DAYS", label: "7D" },
  { value: "ONE_MONTH", label: "1M" },
  { value: "SIX_MONTHS", label: "6M" },
  { value: "ONE_YEAR", label: "1Y" },
  { value: "ALL", label: "ALL" },
];

export default function WorkspaceEffortsTab({ project, role }) {
  const [open, setOpen] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState("");
  const theme = useTheme();
  const style = TimesheetStyle(theme);

  const [selectedOption, setSelectedOption] = useState(options[0]);
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
        return "#000000";
    }
  };
  const dispatch = useDispatch();

  const payload = {
    projectId: project,
    timeInterval: selectedOption.value,
    employeeId: selectedTeam,
  };

  useEffect(() => {
    dispatch(masterDataAction());
  }, []);

  useEffect(() => {
    dispatch(getWorkSpaceDataAction(payload));
  }, [project, selectedOption, selectedTeam]);

  const workSpaceData = useSelector(
    (state) => state?.nonPersist?.workSpace?.workSpaceData
  );

  console.log("workSpaceData", workSpaceData);
  const teamPayload = {
    projectId: project,
  };

  useEffect(() => {
    dispatch(getAllTeamMembersAction(teamPayload));
  }, [project]);

  const teamMembers = useSelector(
    (state) => state?.nonPersist?.workSpace?.teamMembers
  );
  console.log("teamMembers", teamMembers);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionClick = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleTeamChnage = (e) => {
    console.log("e", e);
    setSelectedTeam(e.target.value);
  };

  return (
    <Grid container spacing={2} mt={2}>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          {role !== "User" ? (
            <>
              <Grid container spacing={2} mt={3}>
                <Grid item xs={6}>
                  {/* <Dropdown
                    title="Team Members"
                    value={selectedTeam}
                    label='Team Members"'
                    options={teamMembers}
                    onChange={handleTeamChnage}
                    // dropdownName="Team Members" // Pass the dropdown name
                    style={{
                      // ...style.TimesheetTextField,
                      border: "1px solid #8897ad87",
                      borderRadius: "10px",
                    }}
                    labelKey="firstName"
                    valueKey="id"
                  /> */}

                  <Dropdown
                    value={selectedTeam}
                    onChange={handleTeamChnage}
                    title="Team Members"
                    dropdownName="Team Members"
                    name="Team Members"
                    style={{
                      ...style.TimesheetTextField,
                      border: "1px solid #8897ad87",
                      borderRadius: "10px",
                    }}
                    options={teamMembers || []}
                    labelKey="firstName"
                    valueKey="id"
                    // disabled={enable}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Dropdown
                    title="Reports"
                    dropdownName="Reports" // Pass the dropdown name
                    style={{
                      ...style.TimesheetTextField,
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
   
      <Grid container justifyContent="flex-end" padding={"20px 0px"}>
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
        {role !== "User" ? (
          <>
            <WorkSpaceManager />
          </>
        ) : (
          <></>
        )}
      </Grid>
      <Grid container sx={{ padding: "20px 0px 0px 20px" }}>
        <Grid
          item
          xs={6.5}
          sx={{
            border: "1px solid #DFDFDF",
            borderRadius: "5px",
            padding: "20px",
            boxShadow: 2,
            backgroundColor:"#ffffff"
          }}
        >
          <WorkspaceLineChart
            handleClickOpen={handleClickOpen}
            selectedOption={selectedOption}
          />
        </Grid>
        <Grid item xs={0.2} />

        {role !== "User" ? (
          <Grid
            item
            xs={5.3}
            sx={{
              border: "1px solid #DFDFDF",
              borderRadius: "5px",
              height: "400px",
              boxShadow: 2,
              backgroundColor:"#ffffff"
            }}
          >
            <Grid container spacing={2} mt={2} sx={{ paddingLeft: "20px" }}>
              <Grid item xs={2}>
                <img src={TimesheetBreakdown} />
              </Grid>
              <Grid
                item
                xs={10}
                mt={1}
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
                <Grid item xs={12} sm={2}>
                  <img src={ratingIcon} alt="Rating Icon" />
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  mt={1}
                  sx={{ textAlign: "start", fontSize: "18px" }}
                >
                  Performance
                </Grid>
                <Grid
                  item
                  xs={4}
                  sm={4}
                  mt={1}
                  sx={{ textAlign: "start", fontSize: "18px" }}
                >
                  {workSpaceData?.performanceRating}
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Grid item xs={12} mt={-3} sm={4} sx={{ textAlign: "center" }}>
                  <Star value={workSpaceData?.performanceRating} />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              mt={1}
              sx={{
                border: "1px solid #DFDFDF",
                borderRadius: "5px",
                textAlign: "center",
                height: "281px",
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
