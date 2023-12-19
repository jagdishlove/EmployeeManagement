import { Box, Button, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchEmailAction } from "../../redux/actions/leaves/leaveAction";
import { masterDataAction } from "../../redux/actions/masterData/masterDataAction";
import Dropdown from "../forms/dropdown/dropdown";
import "./leaves.css";

import dayjs from "dayjs";
import InputFileUpload from "../forms/customInputs/uploadFile";

const LeaveRequestForm = ({
  addHistoryEntry,
  onChangeFormDataHandler,
  leaveRqstData,
  handleSaveLeaveApplyData,
  disableSave,
}) => {
  const { numberOfDays } = useSelector((state) => state?.nonPersist.leavesData);
  const [status, setStatus] = useState("Saved");
  const [errors, setErrors] = useState({});
  const style = {};

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newEntry = {
      fromDate: leaveRqstData.fromDate,
      toDate: leaveRqstData.toDate,
      numberOfDays: numberOfDays,
      status: status,
      ccEmails: leaveRqstData.CC,
    };
    addHistoryEntry(newEntry);
  };

  const leaveRequestSession = useSelector(
    (state) => state.persistData.masterData?.sessionList
  );

  const leaveRequestType = useSelector(
    (state) => state.persistData.masterData?.leaveTypes
  );

  useEffect(() => {
    dispatch(masterDataAction());
  }, [dispatch]);

  const searchEmailType = useSelector(
    (state) => state?.nonPersist?.leavesData?.searchEmailData
  );

  useEffect(() => {
    dispatch(getSearchEmailAction(leaveRqstData?.cc));
  }, [dispatch]);

  const autoCompleteHandler = (_, value) => {
    onChangeFormDataHandler(_, value, "cc");
  };

  const textFieldChangeHandler = (e) => {
    const value = e.target.value;
    dispatch(getSearchEmailAction(value));
  };

  const toDateHandler = (date) => {
    onChangeFormDataHandler(date, null, "toDate");
  };

  const fromDateHandler = (date) => {
    onChangeFormDataHandler(date, null, "fromDate");
  };

  const formHandleSubmit = (e, type) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      // Clear errors when there are no validation errors
      setErrors({});
      handleSaveLeaveApplyData(type);
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    // Example validation for fromDate
    if (!leaveRqstData.fromSession) {
      errors.fromSession = "Session is required";
    }

    // Example validation for toDate
    if (!leaveRqstData.toSession) {
      errors.toSession = "Session is required";
    }

    // Example validation for leaveMasterId
    if (!leaveRqstData.leaveMasterId) {
      errors.leaveMasterId = "Leave Type is required";
    }
    if (!leaveRqstData.comments) {
      errors.comments = "Comment is required";
    }

    // Check if fromDate is before toDate
    if (dayjs(leaveRqstData.fromDate).isAfter(dayjs(leaveRqstData.toDate))) {
      errors.fromDate = "From date should be before To date";
    }

    // Additional validation for "PL, PaL, COL, ML  Leave"
    if (
      leaveRqstData.leaveMasterId === "4" ||
      leaveRqstData.leaveMasterId === "5" ||
      leaveRqstData.leaveMasterId === "6" ||
      leaveRqstData.leaveMasterId === "8"
    ) {
      const currentDate = dayjs();
      const selectedFromDate = dayjs(leaveRqstData.fromDate);

      if (selectedFromDate.isBefore(currentDate)) {
        errors.fromDate = "Please choose a future date";
      }
    }

    // Check for mandatory attachment for specific leave types (11, 5, or 8)
    if (
      leaveRqstData.leaveMasterId === "11" ||
      leaveRqstData.leaveMasterId === "5" ||
      leaveRqstData.leaveMasterId === "8" ||
      (leaveRqstData.leaveMasterId === "3" &&
        numberOfDays >= 3 &&
        !leaveRqstData.attachment)
    ) {
      errors.attachment = "Attachment Mandatory";
    }

    return errors;
  };

  return (
    <Box className="dashedBorderStyle">
      <form onSubmit={handleSubmit}>
        <Typography className="leaveRequestForm" variant="h6">
          <b>LEAVE REQUEST FORM</b>
        </Typography>
        <Grid container spacing={2}>
          <Grid container item spacing={3} xs={12} sm={12} md={12}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={5}
              lg={5}
              direction="column"
            >
              <Typography variant="body1" align="center" fontWeight="bold">
                From
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="fromDate"
                  format="ddd, MMM DD,YYYY"
                  value={dayjs(leaveRqstData.fromDate)}
                  onChange={fromDateHandler}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Typography variant="body1" align="center" fontWeight="bold">
                To
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  name="toDate"
                  format="ddd, MMM DD,YYYY"
                  value={dayjs(leaveRqstData.toDate)}
                  onChange={toDateHandler}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Typography color="error">{errors.fromDate}</Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={5}
              lg={4}
              spacing={2}
              direction="row"
            >
              <Grid container item xs={12} sm={12} md={12} direction="column">
                <Typography variant="body1" align="center" fontWeight="bold">
                  Session
                </Typography>

                <Dropdown
                  options={leaveRequestSession}
                  name="fromSession"
                  value={leaveRqstData.fromSession}
                  onChange={onChangeFormDataHandler}
                  style={{
                    ...style.TimesheetTextField,
                    border: "1px solid #8897ad87",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                />
                {errors.fromSession && (
                  <Box>
                    <Typography color="error">{errors.fromSession}</Typography>
                  </Box>
                )}
                <Typography variant="body1" align="center" fontWeight="bold">
                  Session
                </Typography>
                <Dropdown
                  options={leaveRequestSession}
                  value={leaveRqstData.toSession}
                  name="toSession"
                  onChange={onChangeFormDataHandler}
                  style={{
                    ...style.TimesheetTextField,
                    border: "1px solid #8897ad87",
                    borderRadius: "10px",
                    textAlign: "center",
                  }}
                />
                {errors.toSession && (
                  <Box>
                    <Typography color="error">{errors.toSession}</Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={2}
              lg={3}
              spacing={2}
              direction="row"
            >
              <Grid container item xs={12} sm={12} md={12} direction="column">
                <Typography variant="body1" align="center" fontWeight="bold">
                  No of Days
                </Typography>

                <Box
                  style={{
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: "20px",
                    backgroundColor: "#008080",
                    height: "135px",
                    borderRadius: "20px",
                  }}
                >
                  <Typography marginTop="35px" fontSize="20px">
                    {typeof numberOfDays === "number"
                      ? numberOfDays.toFixed(1)
                      : "0"}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography variant="body1" align="right" fontWeight="bold">
                    Leave Type:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Dropdown
                    name="leaveMasterId"
                    options={leaveRequestType}
                    value={leaveRqstData.leaveMasterId}
                    onChange={onChangeFormDataHandler}
                    style={{
                      ...style.TimesheetTextField,
                      border: "1px solid #8897ad87",
                      borderRadius: "5px",
                    }}
                  />
                  {errors.leaveMasterId && (
                    <Box>
                      <Typography color="error">
                        {errors.leaveMasterId}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography variant="body1" align="right" fontWeight="bold">
                    Comments:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    value={leaveRqstData.comments}
                    label=""
                    fullWidth
                    multiline
                    rows={2}
                    name="comments"
                    onChange={onChangeFormDataHandler}
                  />
                  {errors.comments && (
                    <Box>
                      <Typography color="error">{errors.comments}</Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography variant="body1" align="right" fontWeight="bold">
                    Manager:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <TextField
                    label=""
                    fullWidth
                    onChange={onChangeFormDataHandler}
                    InputProps={{
                      readOnly: true,
                      style: { pointerEvents: "none" },
                    }}
                    value={leaveRqstData.manager}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={3}>
                  <Typography variant="body1" align="right" fontWeight="bold">
                    CC:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={9}>
                  <Autocomplete
                    value={leaveRqstData?.cc}
                    options={searchEmailType}
                    multiple
                    freeSolo
                    onChange={autoCompleteHandler}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        onChange={textFieldChangeHandler}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: "10px", justifyContent: "end" }}>
                <Box sx={{ margin: "auto" }}>
                  <InputFileUpload onChange={onChangeFormDataHandler} />
                  {errors.attachment && (
                    <Box>
                      <Typography color="error">{errors.attachment}</Typography>
                    </Box>
                  )}
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={["SUBMITTED", "APPROVED"].includes(disableSave)}
                  onChange={(e) => setStatus(e.target.value)}
                  onClick={(e) => formHandleSubmit(e, "Save")}
                >
                  Save
                </Button>
                <Button
                  onClick={(e) => formHandleSubmit(e, "Submit")}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Save & Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LeaveRequestForm;
