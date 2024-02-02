import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import InfoIcon from "@mui/icons-material/Info";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TimesheetStyle } from "../../pages/timesheet/timesheetStyle";
import {
  clearSuccessFlag,
  deleteTimeSheetEntryAction,
  resetUpdateTimesheet,
  saveTimeSheetEntryAction,
  updateTimeSheetEntryAction,
} from "../../redux/actions/timeSheet/timeSheetAction";
import {
  calculateTimeDifference,
  dateOptions,
  formatDateForApi,
  modifyDataFormat,
} from "../../utils/dateOptions";
import { timeValidation } from "../../utils/timeValidation";
import TimePicker from "../forms/customInputs/timePicker";
import Dropdown from "../forms/dropdown/dropdown";
import Star from "../stars/star";

const TimesheetRow = ({
  selectedDate,
  id,
  editButtonHandler,
  data,
  disabled,
  approval,
  approveSubmitHandler,
  rejectButtonHandler,
  disableSubmit,
  errorValidation,
  rowIndex,
  isHistory,
  setDisabledWhileEditing,
  timesheetForm,
}) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const masterData = useSelector((state) => state.persistData.masterData);

  const updatedMasterData = modifyDataFormat(masterData);
  const style = TimesheetStyle(theme);

  const getTimesheetData = useSelector(
    (state) => state?.nonPersist?.timesheetData?.timeSheetData?.timesheetEntryId
  );
  const [managerCommentProvided, setManagerCommentProvided] = useState(false);
  const [timeError, setTimeError] = useState("");
  const [starRating, setStarRating] = useState("5");
  const [updatedProjectNameList, setUpdatedProjectNameList] = useState([]);
  const [updatedActivityameList, setUpdatedActivityNameList] = useState([]);
  const [managerStatusData, setManagerStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editDataDisabled, setEditDataDisabled] = useState(disabled);

  const isSuccessSaveTimesheet = useSelector(
    (state) => state?.nonPersist?.timesheetData.isSuccess
  );
  const errorTimesheetEdit = useSelector(
    (state) => state?.nonPersist?.timesheetData.errorTimesheetEdit
  );

  const role = useSelector((state) => state?.persistData?.data.role);
  useEffect(() => {
    setErrors({});
    setTimeError("");
    if (!data) {
      setSelectedValues(initialSelectedValues);
    }
    if (managerStatusData?.adminComment) {
      setManagerCommentProvided(true);
    }
  }, [selectedDate, managerStatusData]);

  const [newEnteryTime, setNewEnteryTime] = useState({
    fromTime: "",
    toTime: "",
  });

  useEffect(() => {
    if (updatedProjectNameList?.length >= 1 && timesheetForm) {
      setSelectedValues({
        ...selectedValues,
        projectName: "",
      });
    }
  }, [updatedProjectNameList]);

  useEffect(() => {
    const managerStatusData = data?.timesheetApproval?.approverList.filter(
      (entry) => entry.status === "APPROVED" || entry.status === "REJECTED"
    )[0];
    setManagerStatusData(managerStatusData);
  }, [data]);

  const [errors, setErrors] = useState({
    jobTypeError: "",
    projectNameError: "",
    activityError: "",
    commentsError: "",
    commentError: "",
    ratingError: "",
    fromTimeError: "",
  });

  const initialSelectedValues = {
    jobType: "",
    projectName: "",
    activity: "",
    comments: "",
    adminComment: "",
    fromTime: "",
    toTime: "",
    rating: "",
  };

  const editedSelectedValues = {
    jobType: data?.jobTypeId || "",
    projectName: data?.projectId || "",
    activity: data?.activityId || "",
    comments: data?.comments || "",
    adminComment: "",
    fromTime: data?.startTime || "",
    toTime: data?.endTime || "",
  };

  const [selectedValues, setSelectedValues] = useState(
    data ? editedSelectedValues : initialSelectedValues
  );

  useEffect(() => {
    if (updatedActivityameList?.length > 1 && timesheetForm) {
      setSelectedValues({
        ...selectedValues,
        activity: "",
      });
    }
  }, [updatedActivityameList]);

  const handleEditClick = () => {
    editButtonHandler(id);
    setDisabledWhileEditing(true);
    setEditDataDisabled(false);
  };

  const getProjectName = (value) => {
    const updatedprojName = masterData?.jobtype
      ?.filter((data) => data.jobId === value)
      .map((data) => data.projectList)
      .flat();
    setUpdatedProjectNameList(updatedprojName);
  };
  useEffect(() => {
    getProjectName(selectedValues.jobType);
  }, [masterData, selectedValues.jobType]);

  const getActivity = (value) => {
    let jobType = selectedValues.jobType;
    let jobTypeItems = masterData.jobtype?.find(
      (value) => value.jobId === jobType
    );
    let projectItem = jobTypeItems?.projectList?.find(
      (val) => val.id === value
    );
    const projectList = projectItem?.activities;
    if (projectList && projectList.length > 0) {
      let filteredActivities = updatedMasterData.activity.filter(
        (updatedItem) =>
          projectList.some((project) => updatedItem.id === project.activityId)
      );
      setUpdatedActivityNameList(filteredActivities);
    } else {
      const allActivities = updatedMasterData.activity;
      setUpdatedActivityNameList(allActivities);
    }
  };

  useEffect(() => {
    getActivity(selectedValues.projectName);
  }, [masterData, selectedValues.projectName]);

  const automaticSelection = () => {
    if (
      updatedProjectNameList?.length === 1 &&
      !selectedValues.projectName &&
      !errors.projectNameError
    ) {
      // If there's only one option and the projectName is not selected
      setSelectedValues((prevSelectedValues) => ({
        ...prevSelectedValues,
        projectName:
          updatedProjectNameList[0].id ||
          updatedProjectNameList[0].value ||
          updatedProjectNameList[0].projectName,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        projectNameError: "",
      }));
    }
    if (
      updatedActivityameList?.length === 1 &&
      !selectedValues.activity &&
      !errors.activityError
    ) {
      // If there's only one option and the activity is not selected
      setSelectedValues((prevSelectedValues) => ({
        ...prevSelectedValues,
        activity:
          updatedActivityameList[0].id ||
          updatedActivityameList[0].value ||
          updatedActivityameList[0].activity,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        activityError: "",
      }));
    }
  };
  useEffect(() => {
    automaticSelection();
  }, [updatedProjectNameList, updatedActivityameList]);

  const onChangeHandler = (event, dropdownName) => {
    const { value } = event.target;
    if (dropdownName === "jobType") getProjectName(value);
    if (dropdownName === "projectName") getActivity(value);
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [dropdownName]: value,
    }));
  };

  const validationForm = () => {
    const newErrors = {};
    if (!selectedValues.jobType) {
      newErrors.jobTypeError = "Please Select Job Type";
    }
    if (!selectedValues.projectName) {
      newErrors.projectNameError = "Please Select Project Name";
    }
    if (!selectedValues.activity) {
      newErrors.activityError = "Please Select Activity";
    }

    if (!selectedValues.comments) {
      newErrors.commentsError = "Please Enter Comment";
    }
    if (!selectedValues.fromTime) {
      newErrors.fromTimeError = "Please Select From Time";
    }
    if (!selectedValues.toTime) {
      newErrors.toTimeError = "Please Select To Time";
    }
    if (!selectedValues.adminComment && approval) {
      newErrors.commentError = "Please Enter Comment";
    }
    if (!selectedValues.rating && approval) {
      newErrors.ratingError = "Please Select Rating";
    }

    return newErrors;
  };

  useEffect(() => {
    if (isSuccessSaveTimesheet && !data) {
      setSelectedValues(initialSelectedValues);
    } else {
      return () => {
        dispatch(clearSuccessFlag());
      };
    }
  });

  const handleSaveData = async () => {
    setLoading(true);
    try {
      const newErrors = validationForm();
      const timeError = timeValidation(getTimesheetData, newEnteryTime);

      setErrors(newErrors);
      setTimeError(timeError);

      if (
        Object.keys(newErrors).length === 0 &&
        Object.keys(timeError).length === 0
      ) {
        setEditDataDisabled(true);
        const payload = createPayload();
        await dispatch(
          saveTimeSheetEntryAction(payload, formatDateForApi(selectedDate))
        );
        getProjectName(selectedValues.jobType);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (errorTimesheetEdit) {
      setSelectedValues(editedSelectedValues);
      dispatch(resetUpdateTimesheet());
    }
  }, [errorTimesheetEdit]);

  const handleEditData = async (id) => {
    const editFormTime = {
      fromTime: selectedValues.fromTime,
      toTime: selectedValues.toTime,
    };
    const newErrors = validationForm();
    const timeError = timeValidation(getTimesheetData, editFormTime);
    editButtonHandler();
    setErrors(newErrors);
    setTimeError(timeError);
    if (
      Object.keys(newErrors).length === 0 &&
      Object.keys(timeError).length === 0
    ) {
      const payload = createPayload(id);

      dispatch(
        updateTimeSheetEntryAction(payload, formatDateForApi(selectedDate))
      );
      setDisabledWhileEditing(false);
    }
    setEditDataDisabled(false);
  };

  const createPayload = (id) => {
    const hoursDifference = calculateTimeDifference(
      selectedValues.fromTime,
      selectedValues.toTime
    );

    // Ensure that hoursDifference is a string in the "hh.mm" format with leading zeros
    const formattedHoursDifference = String(hoursDifference).padStart(5, "0");
    const payload = {
      entryDate: formatDateForApi(dateOptions(1)?.[0].value),
      timeSheetDate: formatDateForApi(selectedDate),
      projectId: selectedValues.projectName,
      jobTypeId: selectedValues.jobType,
      comments: selectedValues.comments,
      noOfHours: formattedHoursDifference,
      activityId: selectedValues.activity,
      startTime: selectedValues.fromTime,
      endTime: selectedValues.toTime,
    };

    //for update timesheetentry , created seperate id

    if (id !== undefined) {
      payload.timesheetEntryId = id;
    }
    return payload;
  };

  const findApprovalName = () => {
    if (data?.status === "APPROVED") {
      const approvedEmployee = data?.timesheetApproval?.approverList.find(
        (data) => data.status === "APPROVED"
      );
      return approvedEmployee
        ? {
            status: "approved",
            firstName: approvedEmployee.approverEmployee.firstName,
            lastName: approvedEmployee.approverEmployee.lastName,
          }
        : null;
    } else if (data?.status === "SUBMITTED") {
      const approvedEmployee = data?.timesheetApproval?.approverList.filter(
        (data) => data.status === "SUBMITTED"
      );
      return approvedEmployee
        ? {
            status: "submitted",
            data: approvedEmployee,
          }
        : null;
    } else if (data?.status === "REJECTED") {
      const approvedEmployee = data?.timesheetApproval?.approverList.find(
        (data) => data.status === "REJECTED"
      );
      return approvedEmployee
        ? {
            status: "rejected",
            firstName: approvedEmployee.approverEmployee.firstName,
            lastName: approvedEmployee.approverEmployee.lastName,
          }
        : null;
    } else if (data?.status === "SAVED") {
      const approvedEmployee = data?.timesheetApproval?.approverList.find(
        (data) => data.status === "SAVED"
      );
      return approvedEmployee
        ? {
            status: "SAVED",
            data: "data Saved",
          }
        : null;
    }
  };

  const onChangeTimeHandler = (time, fieldName) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [fieldName]: time,
    }));
    setNewEnteryTime((prevSelectedValues) => ({
      ...prevSelectedValues,
      [fieldName]: time,
    }));
  };

  const handleRefreshClick = () => {
    // Implement the refresh functionality here.
    // For example, you might want to reset the selected values to their initial state.
    setSelectedValues(initialSelectedValues);
    // Clear the timeError state
    setTimeError("");
    setErrors({});
  };

  const starHandler = (e) => {
    setStarRating(e);
  };

  // Define the tooltip message based on the data.status value

  const tooltipHandler = () => {
    let tooltipMessage = "";

    const findApprovalData = findApprovalName();

    if (
      findApprovalData?.status === "approved" ||
      findApprovalData?.status === "rejected"
    ) {
      tooltipMessage = `Your timesheet entry is ${findApprovalData?.status} by ${findApprovalData?.firstName} ${findApprovalData?.lastName}.`;
    } else if (findApprovalData?.status === "submitted") {
      const approversName = findApprovalData?.data
        .map(
          (users) =>
            `${users.approverEmployee.firstName} ${users.approverEmployee.lastName}`
        )
        .join(" and ");

      tooltipMessage = `Your timesheet entry is ${findApprovalData?.status} to ${approversName}.`;
    } else {
      tooltipMessage = "Your timesheet entry is saved  successfully.";
    }

    return tooltipMessage;
  };

  // // Define custom CSS for the tooltip content (background color)
  const tooltipContentStyle = {
    backgroundColor: "#008080", // Change this to your desired background color
    color: "white", // Change this to the text color
    padding: "8px", // Adjust padding as needed
  };
  return (
    <Box sx={style.timesheetEntryUI}>
      {approval && data ? (
        <div
          style={{
            position: "absolute",
            top: "-1rem",
            left: "1rem",
            backgroundColor: "white",
            padding: "0.25rem 0.5rem",
          }}
        >
          <Typography
            style={{
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            {`${data?.timesheet?.timesheetId.employeeFirstName || null} ${
              data?.timesheet?.timesheetId.employeeLastName || null
            }`}
          </Typography>
        </div>
      ) : null}

      {approval && data ? (
        <div
          style={{
            position: "absolute",
            top: "-1rem",
            right: "1rem",
            backgroundColor: "white",
            padding: "0.25rem 0.5rem",
            textAlign: "right",
          }}
        >
          <Typography
            style={{
              fontWeight: "bold",
              color: "#000000",
            }}
          >
            {`${data?.timesheet?.timesheetId.date || null}
            `}
          </Typography>
        </div>
      ) : null}
      <Grid container spacing={2}>
        {/* First Row */}
        <Grid container item spacing={2} xs={12} sm={12} md={6} lg={6}>
          {/* First Sub-Row */}
          <Grid
            container
            item
            xs={12}
            gap={2}
            sm={12}
            md={3}
            lg={3}
            direction="column"
          >
            <DemoItem>
              <TimePicker
                label="From Time"
                defaultValue={null}
                sx={style.TimesheetTextField}
                value={
                  selectedValues.fromTime === ""
                    ? null
                    : selectedValues.fromTime
                }
                onChangeHandler={(e) => onChangeTimeHandler(e, "fromTime")}
                disabled={editDataDisabled || approval || isHistory}
              />
            </DemoItem>
            <DemoItem>
              <TimePicker
                label="To Time"
                sx={style.TimesheetTextFieldToTime}
                value={
                  selectedValues.toTime === "" ? null : selectedValues.toTime
                }
                onChangeHandler={(e) => onChangeTimeHandler(e, "toTime")}
                disabled={editDataDisabled || approval}
              />
            </DemoItem>
          </Grid>
          {/* Second Sub-Row */}
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={9}
            lg={9}
            spacing={2}
            direction="row"
          >
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Dropdown
                options={updatedMasterData.jobtype}
                value={selectedValues.jobType}
                onChange={onChangeHandler}
                title={!data ? "Job Type" : null}
                dropdownName="jobType"
                style={{
                  ...style.TimesheetTextField,
                  border: "1px solid #8897ad87",
                  borderRadius: "10px",
                }}
                disabled={editDataDisabled || approval}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Dropdown
                options={updatedProjectNameList}
                value={selectedValues.projectName}
                title={!data ? "Project Name" : null}
                onChange={onChangeHandler}
                dropdownName="projectName"
                style={{
                  ...style.TimesheetTextField,
                  border: "1px solid #8897ad87",
                  borderRadius: "10px",
                }}
                disabled={editDataDisabled || approval}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Dropdown
                options={updatedActivityameList}
                value={selectedValues.activity}
                onChange={onChangeHandler}
                title={!data ? "Activity" : null}
                dropdownName="activity"
                style={{
                  ...style.TimesheetTextField,
                  border: "1px solid #8897ad87",
                  borderRadius: "10px",
                }}
                disabled={editDataDisabled || approval}
              />
            </Grid>
          </Grid>
          {/* Third Sub-Row */}

          {data ? (
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              direction="row"
              style={{ paddingTop: "20px" }}
            >
              <TextField
                multiline
                rows={3}
                variant="outlined"
                fullWidth
                value={selectedValues.comments}
                sx={style.TimesheetTextField1}
                inputProps={{ maxLength: 250 }}
                onChange={(e) => onChangeHandler(e, "comments")}
                disabled={editDataDisabled || approval || disableSubmit}
              />
            </Grid>
          ) : null}
        </Grid>

        {/* Second Row (Blank) */}
        <Grid container item xs={12} sm={12} md={6} lg={6} direction="row">
          <Grid container item xs={12} sm={12} md={11} lg={11} direction="row">
            {data ? (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  label={managerCommentProvided ? "" : "Manager's Comments"}
                  placeholder={approval ? "APPROVED" : ""}
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={managerStatusData?.comment}
                  sx={style.TimesheetManagerTextField}
                  inputProps={{ maxLength: 250 }}
                  onChange={(e) => onChangeHandler(e, "adminComment")}
                  disabled={!approval}
                  InputLabelProps={
                    approval
                      ? { shrink: true, htmlFor: "manager-comments" }
                      : {}
                  }
                />
              </Grid>
            ) : (
              <TextField
                label="What are you working on? (250 Characters max)"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={selectedValues.comments}
                sx={style.TimesheetTextField1}
                inputProps={{ maxLength: 250 }}
                onChange={(e) => onChangeHandler(e, "comments")}
                disabled={editDataDisabled}
              />
            )}

            {/* Condition for Buttons according to roles */}
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              direction="row"
              alignItems="center"
            >
              {data ||
              role === "user" ||
              role === "manager" ||
              role === "employee" ||
              role === "supervisor" ||
              role === "admin" ? (
                <Grid
                  container
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={5}
                  direction="row"
                  sx={style.timesheetManagerCol}
                >
                  <Star
                    onClick={starHandler}
                    approval={approval}
                    value={managerStatusData?.rating}
                  />
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} md={6} lg={7} sx={style.starSec}>
                  {/* Empty content */}
                </Grid>
              )}
              {data ? (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={7}
                  lg={7}
                  display={"flex"}
                  sx={style.starSec}
                >
                  {!approval ? (
                    <>
                      <Button
                        sx={style.GreenButton}
                        variant="contained"
                        type="submit"
                        disabled={true}
                        style={{ marginLeft: 50 }}
                      >
                        <Typography
                          variant="h6"
                          sx={{ color: theme.palette.secondary.main }}
                        >
                          {data?.status || "null"}
                        </Typography>
                      </Button>
                      <Tooltip
                        title={
                          <div style={tooltipContentStyle}>
                            {tooltipHandler()}
                          </div>
                        }
                        arrow
                        TransitionProps={{ timeout: 600 }}
                      >
                        <IconButton>
                          <InfoIcon sx={style.InfoIconStyle} />
                        </IconButton>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Button
                        sx={{
                          ...style.GreenButton,
                          marginRight: theme.spacing(1),
                          "@media (min-width: 768px) and (min-height: 1024px)":
                            {
                              width: "25%",
                            },
                          "@media (min-width: 1024px) and (min-height: 768px)":
                            {
                              width: "25%",
                            },
                        }}
                        variant="contained"
                        type="submit"
                        disabled={false}
                        onClick={() =>
                          approveSubmitHandler(
                            data,
                            starRating,
                            selectedValues.adminComment,
                            rowIndex
                          )
                        }
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: theme.palette.secondary.main,
                            "@media (min-width: 768px) and (min-height: 1024px)":
                              {
                                fontSize: "12px",
                              },
                            "@media (min-width: 1024px) and (min-height: 768px)":
                              {
                                fontSize: "12px",
                              },
                          }}
                        >
                          Approve
                        </Typography>
                      </Button>
                      <Button
                        sx={{
                          "&:hover": {
                            bgcolor: "Red", // Set the same color as the background color to remove the hover effect
                          },
                          backgroundColor: "Transparent",
                          border: "1px solid red",

                          "@media (min-width: 768px) and (min-height: 1024px)":
                            {
                              width: "25%",
                            },
                          "@media (min-width: 1024px) and (min-height: 768px)":
                            {
                              width: "25%",
                            },
                        }}
                        variant="contained"
                        type="submit"
                        onClick={() =>
                          rejectButtonHandler(
                            data,
                            starRating,
                            selectedValues.adminComment,
                            rowIndex
                          )
                        }
                        disabled={false}
                      >
                        <Typography
                          variant="h6"
                          color="ActiveBorder"
                          sx={{
                            "@media (min-width: 768px) and (min-height: 1024px)":
                              {
                                fontSize: "12px",
                              },
                            "@media (min-width: 1024px) and (min-height: 768px)":
                              {
                                fontSize: "12px",
                              },
                          }}
                        >
                          Reject
                        </Typography>
                      </Button>
                    </>
                  )}
                </Grid>
              ) : (
                <Grid item xs={12} sm={6} md={7} lg={7} sx={style.starSec}>
                  {/* Empty content */}
                </Grid>
              )}
            </Grid>
          </Grid>
          {approval ? null : (
            <Grid item xs={12} sm={12} md={1} lg={1} sx={style.iconDesign}>
              {data ? (
                <IconButton
                  disabled={
                    ["SUBMITTED", "APPROVED"].includes(data.status) || isHistory
                  }
                  onClick={() => handleEditClick()}
                >
                  <ModeEditOutlineOutlinedIcon
                    sx={
                      ["SUBMITTED", "APPROVED"].includes(data.status) ||
                      isHistory
                        ? style.IconStyleDisable
                        : style.IconStyle
                    }
                  />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleRefreshClick()}>
                  <RefreshIcon sx={style.IconStyle} />
                </IconButton>
              )}
              {data ? (
                <IconButton
                  disabled={
                    ["SUBMITTED", "APPROVED", "REJECTED"].includes(
                      data.status
                    ) || isHistory
                  }
                  onClick={() =>
                    dispatch(
                      deleteTimeSheetEntryAction(
                        id,
                        formatDateForApi(selectedDate)
                      )
                    )
                  }
                >
                  <DeleteOutlinedIcon
                    sx={
                      ["SUBMITTED", "APPROVED", "REJECTED"].includes(
                        data.status
                      ) || isHistory
                        ? style.IconStyleDisable
                        : style.IconStyle
                    }
                  />
                </IconButton>
              ) : (
                ""
              )}

              {data ? (
                <IconButton
                  disabled={disabled}
                  onClick={() => handleEditData(id)}
                >
                  <SaveOutlinedIcon
                    sx={editDataDisabled ? style.IconStyleDisable : style.IconStyle}
                  />
                </IconButton>
              ) : (
                <IconButton onClick={() => handleSaveData()}>
                  <SaveOutlinedIcon sx={style.IconStyle} />
                </IconButton>
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={style.timesheetCol4}>
          <span style={{ color: "red" }}>{errors.jobTypeError}</span>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={style.timesheetCol4}>
          <span style={{ color: "red" }}>{errors.projectNameError}</span>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={style.timesheetCol4}>
          <span style={{ color: "red" }}>{errors.activityError}</span>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={style.timesheetCol4}>
          <span style={{ color: "red" }}>{errors.commentsError}</span>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={style.timesheetCol4}>
          <span style={{ color: "red" }}>{errors.fromTimeError}</span>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={style.timesheetCol4}>
          <span style={{ color: "red" }}>{errors.toTimeError}</span>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={style.timesheetCol4}>
          <span style={{ color: "red" }}>{timeError}</span>
        </Grid>
        {approval && (
          <>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={style.timesheetCol4}>
              <span style={{ color: "red" }}>
                {errorValidation?.adminCommentError}
              </span>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={style.timesheetCol4}>
              <span style={{ color: "red" }}>
                {errorValidation?.ratingError}
              </span>
            </Grid>
          </>
        )}
      </Grid>
      {errorValidation && errorValidation[data.timesheetEntryId] && (
        <p className="error-message">
          {errorValidation[data.timesheetEntryId]}
        </p>
      )}
      {loading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgcolor="rgba(255, 255, 255, 0.7)"
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default TimesheetRow;
