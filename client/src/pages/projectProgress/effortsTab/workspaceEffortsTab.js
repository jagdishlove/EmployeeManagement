import {
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dropdown from "../../../components/forms/dropdown/dropdown";

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
import Lottie from "lottie-react";
import smileAnimated from "../../../assets/No_Data_found.json";
import TimesheetBreakDown from "../../../components/admin/mySpaceComponents/TimesheetBreakDown";
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
  const [dataLoaded, setDataLoaded] = useState(false);

  const daysCount = useSelector(
    (state) =>
      state?.persistData?.workSpace?.workSpaceData?.durations?.[0]?.daysCount
  );

 

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (project) {
      const payload = {
        projectId: project,
        timeInterval: selectedOption.value,
        employeeId: selectedTeam,
      };
      dispatch(getWorkSpaceDataAction(payload)).then(() => {
        setDataLoaded(true);
      });
    }
  }, [project, selectedOption, selectedTeam, dispatch]);

  useEffect(() => {
    dispatch(masterDataAction());
  }, []);

  const workSpaceData = useSelector(
    (state) => state?.persistData?.workSpace?.workSpaceData
  );
  const { workSpaceDataLoading } = useSelector(
    (state) => state?.persistData?.workSpace
  );

  useEffect(() => {
    if (project) {
      dispatch(getAllTeamMembersAction({ projectId: project }));
      setSelectedOption(options[0]);
    }
  }, [project]);

  const teamMembers = useSelector(
    (state) => state?.persistData?.workSpace?.teamMembers
  );

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
    setSelectedTeam(e.target.value);
  };

  const performanceRating = isNaN(parseFloat(workSpaceData?.performanceRating))
    ? 0
    : parseFloat(workSpaceData?.performanceRating).toFixed(2);

  return (
    <>
      {!dataLoaded || workSpaceDataLoading ? (
        <Grid
          container
          spacing={0}
          mt={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Grid>
      ) : (
        <></>
      )}
      {!workSpaceData || !project ? (
        <>
          {" "}
          <Grid
            container
            spacing={0}
            mt={1}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid
              container
              spacing={0}
              mt={1}
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{
                backgroundColor: "#fff",
                height: "400px",
              }}
            >
              <Lottie
                animationData={smileAnimated} // Replace 'yourJsonData' with the JSON data from your file
                loop
                autoplay
                style={{
                  color: "yellow",
                  width: "100px",
                }}
              />

              <Typography
                mt={5}
                sx={{
                  color: "#B2B2B2",
                  fontSize: "28px",
                }}
              >
                No Data Present
              </Typography>
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          {workSpaceData && dataLoaded ? (
            <>
              <Grid container>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                  {role !== "User" ? (
                    <>
                      <Grid container spacing={2} mt={1}>
                        <Grid item xs={6}>
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
              <Grid
                container
                mt={2}
                sx={{
                  backgroundColor: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <Grid
                  container
                  py={2}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                   
                  }}
                >
                  {options.map((option) => {
                  // Determine active options based on daysCount
                  let activeOptions = [];
                  if (daysCount > 365) {
                    activeOptions = [
                      "SEVEN_DAYS",
                      "ONE_MONTH",
                      "SIX_MONTHS",
                      "ONE_YEAR",
                      "ALL",
                    ];
                  } else if (daysCount > 6 * 30) {
                    activeOptions = [
                      "SEVEN_DAYS",
                      "ONE_MONTH",
                      "SIX_MONTHS",
                      "ONE_YEAR",
                    ];
                  } else if (daysCount > 31) {
                    activeOptions = ["SEVEN_DAYS", "ONE_MONTH", "SIX_MONTHS"];
                  } else if (daysCount > 7) {
                    activeOptions = ["SEVEN_DAYS", "ONE_MONTH"];
                  } else if (daysCount <= 7) {
                    activeOptions = ["SEVEN_DAYS"];
                  }

                  const isActive = activeOptions.includes(option.value);
                  const isSelected = option.value === selectedOption.value;

                  return (
                    <Grid item key={option.value}>
                      <button
                        style={{
                          fontWeight: "bold",
                          border: "none",
                          background: "transparent",
                          cursor: isActive ? "pointer" : "default",
                          textDecoration: isSelected ? "underline" : "none",

                          color: isSelected
                            ? "blue"
                            : isActive
                            ? "black"
                            : "gray",
                          pointerEvents: isActive ? "auto" : "none", // Disable pointer events if not active
                        }}
                        onClick={() => handleOptionClick(option)}
                      >
                        {option.label}
                      </button>
                    </Grid>
                  );
                })}
                </Grid>

                <Grid container mt={0}>
                  {role !== "User" ? (
                    <>
                      <WorkSpaceManager />
                    </>
                  ) : (
                    <></>
                  )}
                </Grid>
                <Grid
                  container
                  sx={{ justifyContent: "space-between", paddingTop: "10px" }}
                >
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    lg={6}
                    sx={{
                      boxShadow: 2,
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      backgroundColor: "#ffffff",
                      borderRadius: "5px",
                    }}
                  >
                    <WorkspaceLineChart
                      handleClickOpen={handleClickOpen}
                      selectedOption = {selectedOption}
                    />
                  </Grid>

                  {role !== "User" ? (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={5.9}
                      lg={5.9}
                      sx={{
                        boxShadow: 2,
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        backgroundColor: "#ffffff",
                        borderRadius: "5px",
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                        mt={2}
                        sx={{ paddingLeft: "20px" }}
                      >
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
                          <Typography
                            variant="h5"
                            style={{ fontWeight: "600" }}
                          >
                            {" "}
                            Timesheet Breakdown{" "}
                          </Typography>
                        </Grid>{" "}
                      </Grid>
                      {workSpaceData?.legendList?.some(
                        (item) => item.value !== 0
                      ) ? (
                        <TimesheetBreakDown approver={true} />
                      ) : (
                        <Typography
                          variant="h5"
                          color="textSecondary"
                          style={{ textAlign: "center", paddingTop: "150px" }}
                        >
                          No data available
                        </Typography>
                      )}
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={5.9}
                      lg={5.9}
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

                          height: "140px",
                          textAlign: "center",
                          backgroundColor: "#fff",
                        }}
                      >
                        <Grid
                          container
                          spacing={2}
                          mb={2}
                          sx={{ padding: "20px" }}
                        >
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
                            <b> Performance</b>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            sm={4}
                            mt={1}
                            sx={{ textAlign: "start", fontSize: "18px" }}
                          >
                            <b>{performanceRating}</b>
                          </Grid>
                        </Grid>
                        <Grid container justifyContent="center">
                          <Grid
                            item
                            xs={12}
                            mt={-5}
                            sm={4}
                            sx={{ textAlign: "center" }}
                          >
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
                          height: "380px",
                          backgroundColor: "#fff",
                        }}
                      >
                        <Grid
                          container
                          spacing={2}
                          mt={2}
                          sx={{ paddingLeft: "20px" }}
                        >
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
                            <b>Timesheet Breakdown</b>
                          </Grid>{" "}
                        </Grid>
                        <Grid container spacing={2} justifyContent={"center"}>
                          {workSpaceData?.legendList?.some(
                            (item) => item.value !== 0
                          ) ? (
                            <>
                              {" "}
                              <TimesheetBreakDown approver={true} />
                            </>
                          ) : (
                            <>
                              <Typography
                                variant="h5"
                                color="textSecondary"
                                style={{ textAlign: "center" }}
                              >
                                No data available
                              </Typography>
                            </>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>

                <Dialog
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      width: "65%",
                      maxWidth: "none",
                    },
                  }}
                >
                  <DialogContent sx={{ padding: "10px", width: "900px" }}>
                    <DialogContentText>
                      <WorkspaceLineChart
                        handleClickOpen={handleClickOpen}
                        selectedOption = {selectedOption}
                        open={true}
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
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

