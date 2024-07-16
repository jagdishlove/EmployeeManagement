import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import InfoIcon from "@mui/icons-material/Info";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { format } from "date-fns";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TimesheetStyle } from "../../pages/timesheet/timesheetStyle";
import {
  clearSuccessFlag,
  deleteTimeSheetEntryAction,
  getMostCommonTimesAction,
  resetUpdateTimesheet,
  saveTimeSheetEntryAction,
  updateTimeSheetEntryAction,
} from "../../redux/actions/timeSheet/timeSheetAction";
import {
  calculateTimeDifference,
  dateOptions,
  formatDateForApi,
} from "../../utils/dateOptions";
import { timeValidation } from "../../utils/timeValidation";
// import TimePicker from "../forms/customInputs/timePicker";
import Dropdown from "../forms/dropdown/dropdown";
import Star from "../stars/star";
import Checkbox from "@mui/material/Checkbox";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import moment from "moment";

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
  superAdmin,
  onCommentChange,
  onRatingChange,
  comments,
  ratings,
  selectedCards,
  handleCheckboxChange,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const masterData = useSelector(
    (state) => state.persistData?.loginDetails?.masterData
  );
  const allActivities = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.activity
  );
  const isMobile = useMediaQuery("(max-width: 600px)");
  const style = TimesheetStyle(theme);
  let filterJobType; // Declare filterJobType outside the if-else block

  if (superAdmin || approval) {
    filterJobType = masterData?.jobtype?.filter(
      (item) => item.status === "ACTIVE"
    );
  } else {
    filterJobType = masterData?.jobTypeForLoggedInUser?.filter(
      (item) => item.status === "ACTIVE"
    );
  }

  const getTimesheetData = useSelector(
    (state) =>
      state?.persistData?.timesheetData?.timeSheetData?.timesheetEntryId
  );
  const [managerCommentProvided, setManagerCommentProvided] = useState(false);
  const [timeError, setTimeError] = useState("");
  const [starRating, setStarRating] = useState("5");
  const [updatedProjectNameList, setUpdatedProjectNameList] = useState([]);
  const [updatedActivityameList, setUpdatedActivityNameList] = useState([]);
  const [managerStatusData, setManagerStatusData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [withoutFormatTime, setWithoutFormatTime] = useState({
    fromTime: "",
    toTime: "",
  });
  console.log("withoutFormatTime", withoutFormatTime);
  const [preFillTimeSheetRow, setPreFillTimeSheetRow] = useState({
    fromTime: "",
    toTime: "",
  });

  const isSuccessSaveTimesheet = useSelector(
    (state) => state?.persistData?.timesheetData.isSuccess
  );
  const errorTimesheetEdit = useSelector(
    (state) => state?.persistData?.timesheetData.errorTimesheetEdit
  );

  const mostCommonTimesData = useSelector(
    (state) => state?.persistData?.timesheetData?.mostCommonTimesData
  );

  const role = useSelector(
    (state) => state?.persistData?.loginDetails?.data.role
  );
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
        activity: "",
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

  console.log("selectedValues", selectedValues);

  const [initialDataState, setInitialDataState] = useState(
    initialSelectedValues
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
  };

  const getProjectName = (value) => {
    let updatedprojName; // Declare filterJobType outside the if-else block

    if (superAdmin || approval) {
      updatedprojName = masterData?.jobtype
        ?.filter((data) => data.jobId === value)
        .map((data) => data.projectList)
        .flat();
      setUpdatedProjectNameList(updatedprojName);
    } else {
      updatedprojName = masterData?.jobTypeForLoggedInUser
        ?.filter((data) => data.jobId === value)
        .map((data) => data.projectList)
        .flat();
      setUpdatedProjectNameList(updatedprojName);
    }
  };

  useEffect(() => {
    getProjectName(selectedValues.jobType);
  }, [masterData, selectedValues.jobType]);

  const getActivity = (value) => {
    let jobType = selectedValues.jobType;

    let jobTypeItems; // Declare filterJobType outside the if-else block

    if (superAdmin || approval) {
      jobTypeItems = masterData.jobtype?.find(
        (value) => value.jobId === jobType
      );
    } else {
      jobTypeItems = masterData.jobTypeForLoggedInUser?.find(
        (value) => value.jobId === jobType
      );
    }

    let projectItem = jobTypeItems?.projectList?.find(
      (val) => val.id === value
    );

    const projectList = projectItem?.activities;

    setUpdatedActivityNameList(projectList);
  };

  useEffect(() => {
    getActivity(selectedValues.projectName);
  }, [masterData, selectedValues.projectName]);

  const automaticSelection = () => {
    if (updatedProjectNameList?.length === 1 && !errors.projectNameError) {
      // If there's only one option and the projectName is not selected
      setSelectedValues((prevSelectedValues) => ({
        ...prevSelectedValues,
        projectName: updatedProjectNameList[0].id,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        projectNameError: "",
      }));
    }

    if (updatedActivityameList?.length === 0) {
      setUpdatedActivityNameList(allActivities);
    }
    if (
      updatedActivityameList?.length === 1 &&
      !selectedValues.activity &&
      !errors.activityError
    ) {
      // If there's only one option and the activity is not selected
      setSelectedValues((prevSelectedValues) => ({
        ...prevSelectedValues,
        activity: updatedActivityameList[0]?.activityId,
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
    if (dropdownName === "jobType") {
      setSelectedValues({
        ...selectedValues,
        activity: "",
      });
      getProjectName(value);
    }
    if (dropdownName === "projectName") getActivity(value);
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [dropdownName]: value,
    }));

    if (superAdmin) {
      if (dropdownName === "adminComment") {
        const comment = value;
        onCommentChange(comment);
      }
    }
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
    if (!selectedValues.fromTime && !initialDataState.fromTime) {
      newErrors.fromTimeError = "Please Select From Time";
    }
    if (!selectedValues.toTime && !initialDataState.toTime) {
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
        const payload = createPayload();
        await dispatch(
          saveTimeSheetEntryAction(payload, formatDateForApi(selectedDate))
        );
        setSelectedValues(initialSelectedValues);
        setNewEnteryTime({
          fromTime: "",
          toTime: "",
        });
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
      fromTime: selectedValues.fromTime.substring(0, 5),
      toTime: selectedValues.toTime.substring(0, 5),
    };
    const filteredData = getTimesheetData.filter(
      (entry) => entry.timesheetEntryId !== id
    );
    const newErrors = validationForm();
    const timeError = timeValidation(filteredData, editFormTime);
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
  };

  const createPayload = (id) => {
    const hoursDifference = calculateTimeDifference(
      selectedValues.fromTime,
      selectedValues.toTime
    );

    // Ensure that hoursDifference is a string in the "hh.mm" format with leading zeros
    const formattedHoursDifference = String(hoursDifference).padStart(5, "0");

    const startTime = initialDataState?.fromTime || selectedValues.fromTime;
    const endTime = initialDataState?.toTime || selectedValues.toTime;
    const payload = {
      entryDate: formatDateForApi(dateOptions(1)?.[0].value),
      timeSheetDate: formatDateForApi(selectedDate),
      projectId: selectedValues.projectName,
      jobTypeId: selectedValues.jobType,
      comments: selectedValues.comments,
      noOfHours: formattedHoursDifference,
      activityId: selectedValues.activity,
      startTime: startTime,
      endTime: endTime,
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
            firstName: approvedEmployee?.approverEmployee?.firstName,
            lastName: approvedEmployee?.approverEmployee?.lastName,
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
            firstName: approvedEmployee?.approverEmployee?.firstName,
            lastName: approvedEmployee?.approverEmployee?.lastName,
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
    const date = new Date(time);
    setWithoutFormatTime((prev) => ({ ...prev, [fieldName]: time }));
    // Get hours and minutes
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [fieldName]: `${hours}:${minutes}`,
    }));

    setNewEnteryTime((prevSelectedValues) => ({
      ...prevSelectedValues,
      [fieldName]: `${hours}:${minutes}`,
    }));
    setInitialDataState(initialSelectedValues);
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
    if (superAdmin) {
      onRatingChange(e);
    }
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
            `${users?.approverEmployee?.firstName} ${users?.approverEmployee?.lastName}`
        )
        .join(" and ");

      tooltipMessage = `Your timesheet entry is ${findApprovalData?.status} to ${approversName}.`;
    } else {
      tooltipMessage = "Your timesheet entry is saved  successfully.";
    }

    return tooltipMessage;
  };

  const parseTimeStringToDate = (timeString) => {
    if (!timeString) {
      return null; // Or you can return a default date value if needed
    }
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return dayjs(date);
  };

  // // Define custom CSS for the tooltip content (background color)
  const tooltipContentStyle = {
    backgroundColor: "#008080", // Change this to your desired background color
    color: "white", // Change this to the text color
    padding: "8px", // Adjust padding as needed
  };

  localStorage.removeItem("selectedProject", "currentPage");

  const formatTimeForDisplay = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return format(date, "hh:mm a"); // Format to 12-hour format with AM/PM
  };

  useEffect(() => {
    dispatch(getMostCommonTimesAction());
  }, []);

  const handleCommonTimeClick = (fromTime, toTime) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      fromTime: fromTime, // Store in 24-hour format for server communication
      toTime: toTime, // Store in 24-hour format for server communication
    }));

    setWithoutFormatTime({
      fromTime: dayjs(fromTime, "HH:mm"),
      toTime: dayjs(toTime, "HH:mm"),
    });
  };
  // Function to sort times
  const sortTimes = (times) => {
    return times.slice().sort((a, b) => {
      const timeA = dayjs(a.startTime, "HH:mm");
      const timeB = dayjs(b.startTime, "HH:mm");
      return timeA.isBefore(timeB) ? -1 : timeA.isAfter(timeB) ? 1 : 0;
    });
  };

  // Sorted mostCommonTimesData
  const sortedMostCommonTimesData = useMemo(
    () => sortTimes(mostCommonTimesData || []),
    [mostCommonTimesData]
  );
  const matchingDataWithTime = (toTime) => {
    const isGivenTimeInList = sortedMostCommonTimesData.some(
      (item) => item.startTime.slice(0, 2) === toTime.slice(0, 2)
    );
    if (isGivenTimeInList) {
      return isGivenTimeInList;
    }

    const toTimeDate = new Date(`1970-01-01T${toTime}Z`);
    // If no exact match, find the first item where startTime is greater than or equal to toTime
    const filteredData = sortedMostCommonTimesData
      ?.filter((item) => {
        const startTimeDate = new Date(`1970-01-01T${item.startTime}Z`);
        return startTimeDate > toTimeDate;
      })
      .sort((a, b) => {
        const startTimeDateA = new Date(`1970-01-01T${a.startTime}Z`);
        const startTimeDateB = new Date(`1970-01-01T${b.startTime}Z`);
        return startTimeDateA - startTimeDateB;
      });
    // Return the nearest match or an empty array if none found
    return !!filteredData;
  };

  const timeSheetDataFunction = () => {
    const newSortedTimeSheetData = getTimesheetData
      ?.slice()
      .sort((a, b) =>
        moment(a.startTime, "HH:mm:ss").diff(moment(b.startTime, "HH:mm:ss"))
      );
    const lastIndex = newSortedTimeSheetData[newSortedTimeSheetData.length - 1];
    const fromTime = lastIndex?.startTime;
    const toTime = lastIndex?.endTime;
    const matchingDataTime = matchingDataWithTime(toTime);
    const findMatchingStartTimes = (toTime, array) => {
      const toTimeDate = new Date(`1970-01-01T${toTime}Z`);

      // Check for exact match
      const matchingItems = array.filter((item) => item.startTime === toTime);
      if (matchingItems.length > 0) {
        return matchingItems;
      }

      // If no exact match, find startTimes greater than toTime and sort them
      const sorted = array
        .filter((item) => {
          const startTimeDate = new Date(`1970-01-01T${item.startTime}Z`);
          return startTimeDate > toTimeDate;
        })
        .sort((a, b) => {
          const startTimeDateA = new Date(`1970-01-01T${a.startTime}Z`);
          const startTimeDateB = new Date(`1970-01-01T${b.startTime}Z`);
          return startTimeDateA - startTimeDateB;
        });
      return sorted;
    };
    if (matchingDataTime) {
      const filtered = findMatchingStartTimes(
        toTime,
        sortedMostCommonTimesData
      );
      setPreFillTimeSheetRow({
        fromTime: filtered[0]?.startTime || "",
        toTime: filtered[0]?.endTime || "",
      });
      setInitialDataState((prev) => ({
        ...prev,
        fromTime: filtered[0]?.startTime || "",
        toTime: filtered[0]?.endTime || "",
      }));
    } else {
      setPreFillTimeSheetRow({
        fromTime: "",
        toTime: "",
      });
    }
  };

  useEffect(() => {
    if (sortedMostCommonTimesData) {
      if (getTimesheetData?.length > 0) {
        timeSheetDataFunction();
      } else {
        setPreFillTimeSheetRow({
          fromTime: sortedMostCommonTimesData[0]?.startTime,
          toTime: sortedMostCommonTimesData[0]?.endTime,
        });
        setInitialDataState((prev) => ({
          ...prev,
          fromTime: sortedMostCommonTimesData[0]?.startTime,
          toTime: sortedMostCommonTimesData[0]?.endTime,
        }));
      }
    }
  }, [sortedMostCommonTimesData, getTimesheetData]);

  return (
    <div className="timesheet-container">
      {!data && sortedMostCommonTimesData && (
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          {sortedMostCommonTimesData.map((timeEntry, index) => (
            <Grid item key={index}>
              <Button
                variant="outlined"
                onClick={() =>
                  handleCommonTimeClick(timeEntry.startTime, timeEntry.endTime)
                }
              >
                {formatTimeForDisplay(timeEntry.startTime)} -{" "}
                {formatTimeForDisplay(timeEntry.endTime)}
              </Button>
            </Grid>
          ))}
        </Grid>
      )}

      <Box
        sx={{
          ...style.timesheetEntryUI,
          marginTop: isMobile ? "2rem" : "2rem",
          border:
            data?.dayType === "HOLIDAY" || data?.dayType === "WEEKEND"
              ? "2px solid #800000"
              : "2px solid #008080",
        }}
      >
        {(approval && data) || superAdmin ? (
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
              {`${data?.timesheet?.timesheetId?.employeeFirstName || null} ${
                data?.timesheet?.timesheetId?.employeeLastName || null
              }`}
            </Typography>
          </div>
        ) : null}

        {(approval && data) || superAdmin ? (
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
                ${data?.dayType || ""}`}
            </Typography>
          </div>
        ) : null}
        {superAdmin ? (
          <>
            {data.status !== "APPROVED" && data.status !== "REJECTED" && (
              <div
                style={{
                  position: "absolute",
                  top: "-0.5rem",
                  right: "0rem",
                  padding: "0.50rem 0.50rem",
                }}
              >
                <Checkbox
                  checked={selectedCards[data.timesheetEntryId] || false}
                  onChange={() => handleCheckboxChange(data.timesheetEntryId)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
            )}
          </>
        ) : (
          <></>
        )}

        <Grid container spacing={2}>
          {/* First Row */}
          <Grid container item spacing={2} xs={12} sm={12} md={7} lg={7}>
            {/* First Sub-Row */}
            <Grid
              container
              item
              xs={12}
              gap={2}
              sm={12}
              md={3.5}
              lg={3.5}
              direction="column"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <TimePicker
                    label="From Time"
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                    sx={(style.TimesheetTextFieldToTime, { width: "auto" })}
                    value={
                      selectedValues.fromTime === ""
                        ? parseTimeStringToDate(preFillTimeSheetRow.fromTime)
                        : selectedValues
                        ? parseTimeStringToDate(selectedValues.fromTime)
                        : parseTimeStringToDate(selectedValues.fromTime)
                    }
                    onChange={(e) => onChangeTimeHandler(e, "fromTime")}
                    disabled={disabled || approval || isHistory || superAdmin}
                  />
                </DemoItem>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoItem>
                  <TimePicker
                    label="To Time"
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock,
                    }}
                    sx={(style.TimesheetTextFieldToTime, { width: "auto" })}
                    value={
                      selectedValues.toTime === ""
                        ? parseTimeStringToDate(preFillTimeSheetRow.toTime)
                        : selectedValues
                        ? parseTimeStringToDate(selectedValues.toTime)
                        : parseTimeStringToDate(selectedValues.toTime)
                    }
                    onChange={(e) => onChangeTimeHandler(e, "toTime")}
                    disabled={disabled || approval || superAdmin}
                  />
                </DemoItem>
              </LocalizationProvider>
            </Grid>
            {/* Second Sub-Row */}
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={8.5}
              lg={8.5}
              spacing={2}
              direction="row"
            >
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <Dropdown
                  options={filterJobType}
                  value={selectedValues.jobType}
                  onChange={onChangeHandler}
                  title={!data ? "Job Type" : null}
                  dropdownName="jobType"
                  style={{
                    ...style.TimesheetTextField,
                    border: "1px solid #8897ad87",
                    borderRadius: "10px",
                  }}
                  disabled={disabled || approval || superAdmin}
                  labelKey="jobType"
                  valueKey="jobId"
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
                  disabled={disabled || approval}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Dropdown
                  options={updatedActivityameList || allActivities}
                  value={selectedValues?.activity}
                  onChange={onChangeHandler}
                  title={!data ? "Activity" : null}
                  dropdownName="activity"
                  style={{
                    ...style.TimesheetTextField,
                    border: "1px solid #8897ad87",
                    borderRadius: "10px",
                  }}
                  disabled={disabled || approval || superAdmin}
                  labelKey="activityType"
                  valueKey="activityId"
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
                  disabled={disabled || approval || disableSubmit || superAdmin}
                />
              </Grid>
            ) : null}
          </Grid>

          {/* Second Row (Blank) */}
          <Grid container item xs={12} sm={12} md={5} lg={5} direction="row">
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={11}
              lg={11}
              direction="row"
            >
              {data ? (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    label={managerCommentProvided ? "" : "Manager's Comments"}
                    placeholder={approval ? "APPROVED" : ""}
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    value={managerStatusData?.comment || comments}
                    sx={style.TimesheetManagerTextField}
                    inputProps={{ maxLength: 250 }}
                    onChange={(e) => onChangeHandler(e, "adminComment")}
                    disabled={
                      !approval ||
                      (superAdmin && !(data.status === "SUBMITTED"))
                    }
                    InputLabelProps={
                      approval
                        ? {
                            shrink: true,
                            htmlFor: "manager-comments",
                            style: {
                              backgroundColor:
                                data?.dayType === "HOLIDAY" ||
                                data?.dayType === "WEEKEND"
                                  ? "#800000"
                                  : "#008080",
                            },
                          }
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
                  disabled={disabled}
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
                role === "admin" ||
                role === "superAdmin" ? (
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
                      data={data}
                      value={managerStatusData?.rating || ratings}
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
                    {!approval ||
                    (superAdmin && !(data.status === "SUBMITTED")) ? (
                      <>
                        <Button
                          sx={style.GreenButton}
                          variant="contained"
                          type="submit"
                          disabled={true}
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
                              bgcolor: "Red",
                              // Set the same color as the background color to remove the hover effect
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
                            color="#000000"
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
            {approval || superAdmin ? null : (
              <Grid item xs={12} sm={12} md={1} lg={1} sx={style.iconDesign}>
                {data ? (
                  <IconButton
                    disabled={
                      ["SUBMITTED", "APPROVED"].includes(data.status) ||
                      isHistory ||
                      !disabled
                    }
                    onClick={() => handleEditClick()}
                  >
                    <ModeEditOutlineOutlinedIcon
                      sx={
                        ["SUBMITTED", "APPROVED"].includes(data.status) ||
                        isHistory ||
                        !disabled
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
                      sx={disabled ? style.IconStyleDisable : style.IconStyle}
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

            {data && timeError && (
              <span style={{ color: "red" }}>
                Please edit again data is not saved or{" "}
                <span
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    setSelectedValues(editedSelectedValues);
                    setTimeError();
                    setDisabledWhileEditing(false);
                  }}
                >
                  reset
                </span>
              </span>
            )}
          </Grid>
          {(approval || superAdmin) && (
            <>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={style.timesheetCol4}
              >
                <span style={{ color: "red" }}>
                  {errorValidation?.adminCommentError}
                </span>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={style.timesheetCol4}
              >
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
    </div>
  );
};

export default TimesheetRow;
