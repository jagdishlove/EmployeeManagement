import { Box, Button, Grid, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchEmailAction } from "../../redux/actions/leaves/leaveAction";
import { masterDataAction } from "../../redux/actions/masterData/masterDataAction";
import InputFileUpload from "../forms/customInputs/uploadFile";
import Dropdown from "../forms/dropdown/dropdown";
import "./leaves.css";
import UsersAppliedLeave from "./usersAppliedLeave";

const LeaveRequestForm = ({
  addHistoryEntry,
  onChangeFormDataHandler,
  leaveRqstData,
  handleSaveLeaveApplyData,
  disableSave,
  setFile,
  clearFile,
  file,
  errors,
  setErrors,
  // hasNumberDaysGreaterThanZero,
}) => {
  const { numberOfDays } = useSelector((state) => state?.nonPersist.leavesData);
  const [status, setStatus] = useState("Saved");

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
      file: leaveRqstData.file,
    };
    addHistoryEntry(newEntry);
    clearFile();
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
    // Ensure that value is an array
    const ccValue = Array.isArray(value) ? value : [value];

    // Assuming you want to join the array back to a string for the Autocomplete component
    const ccString = ccValue.join(",");

    onChangeFormDataHandler(_, ccString, "cc");
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
    const findLeaveMasterId = (leaveType) => {
      const foundLeave = leaveRequestType.find(
        (leave) => leave.leaveType === leaveType
      );

      if (foundLeave) {
        return foundLeave.leaveMasterId;
      } else {
        // Handle the case when leave type is not found
        console.error(`Leave type "${leaveType}" not found`);
        return null; // or any default value
      }
    };

    // Usage example
    const paternityLeaveId = findLeaveMasterId("Paternity Leave");
    const maternityLeaveId = findLeaveMasterId("Maternity Leave");
    const maternityIllnessLeaveId = findLeaveMasterId(
      "Maternity Illness Leave"
    );
    const adoptionLeaveForMaleId = findLeaveMasterId("Adoption Leave For Male");
    const adoptionLeaveForFemaleId = findLeaveMasterId("Adoption Leave For Female");
    const sickLeaveId = findLeaveMasterId("Sick Leave");

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
    const ccEmails = leaveRqstData.cc?.split(',').map(email => email.trim()) || [];

    const isValidCCEmails = ccEmails.every(email => isValidEmail(email));

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
      
    if (!isValidCCEmails) {
      errors.cc = "Invalid email domain.";
    }

    // Check if fromDate is before toDate
    if (dayjs(leaveRqstData.fromDate).isAfter(dayjs(leaveRqstData.toDate))) {
      errors.fromDate = "From date should be before To date";
    }

    // Additional validation for "PL, PaL, COL, ML  Leave"

    // Check for mandatory attachment for specific leave types (11, 5, or 8)
    if (
      (leaveRqstData.leaveMasterId === `${maternityIllnessLeaveId}` ||
        leaveRqstData.leaveMasterId === `${paternityLeaveId}` ||
        leaveRqstData.leaveMasterId === `${maternityLeaveId}` ||
        leaveRqstData.leaveMasterId === `${adoptionLeaveForMaleId}` ||
        leaveRqstData.leaveMasterId === `${adoptionLeaveForFemaleId}` ||
        (leaveRqstData.leaveMasterId === `${sickLeaveId}` &&
          numberOfDays >= 3 &&
          !leaveRqstData.attachment)) &&
      !file
    ) {
      errors.attachment = "Attachment Mandatory";
    }

    return errors;
  };

  const inputFileChangeHandler = (event) => {
    const file = event.target.files[0];
    setFile(file);
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
              {errors.fromDate && (
                <Box>
                  <Typography color="error" style={{ position: "absolute" }}>
                    {errors.fromDate}
                  </Typography>
                </Box>
              )}
              <Typography
                variant="body1"
                align="center"
                fontWeight="bold"
                style={{ marginTop: "10%" }}
              >
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
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                />
                {errors.fromSession && (
                  <Box>
                    <Typography color="error" style={{ position: "absolute" }}>
                      {errors.fromSession}
                    </Typography>
                  </Box>
                )}
                <Typography
                  variant="body1"
                  align="center"
                  fontWeight="bold"
                  style={{ marginTop: "11%" }}
                >
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
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                />
                {errors.toSession && (
                  <Box>
                    <Typography color="error" style={{ position: "absolute" }}>
                      {errors.toSession}
                    </Typography>
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
                    padding: "28px",
                    backgroundColor: "#008080",
                    height: "155px",
                    borderRadius: "5px",
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
                    options={leaveRequestType.map((option) =>
                      option.leaveType === "Adoption Leave For Male" ||
                      option.leaveType === "Adoption Leave For Female"
                        ? { ...option, leaveType: "Adoption Leave" }
                        : option
                    )}
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
                      <Typography
                        color="error"
                        style={{ position: "absolute" }}
                      >
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
                      <Typography
                        color="error"
                        style={{ position: "absolute" }}
                      >
                        {errors.comments}
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
                    value={
                      leaveRqstData?.cc && typeof leaveRqstData.cc === "string"
                        ? leaveRqstData.cc
                            .split(",")
                            .map((email) => email.trim())
                        : []
                    }
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
                  {errors.cc && (
                    <Box>
                      <Typography
                        color="error"
                        style={{ position: "absolute" }}
                      >
                        {errors.cc}
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: "flex", gap: "10px", justifyContent: "end" }}>
              <UsersAppliedLeave />
                
                <Box sx={{}}>
                  <InputFileUpload
                    onChange={inputFileChangeHandler}
                    file={file || leaveRqstData.file}
                  />
                  {errors.attachment && (
                    <Box>
                      <Typography
                        color="error"
                        style={{ position: "absolute" }}
                      >
                        {" "}
                        {errors.attachment}
                      </Typography>
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
