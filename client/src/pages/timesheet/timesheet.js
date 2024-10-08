import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "../../components/forms/dropdown/dropdown";
import SubHeader from "../../components/subHeader/subHeader";
import TimesheetRow from "../../components/timesheetRow/timesheetRow";
import { TimesheetStyle } from "../../pages/timesheet/timesheetStyle";
import {
  getLastThreeTimesheetEntryAction,
  getTimesheetEntryAction,
  submitTimeSheetApprovalAction,
} from "../../redux/actions/timeSheet/timeSheetAction";
import {  formatDateForApi, transformDates } from "../../utils/dateOptions";
import SavedTimesheetEntry from "./savedTimesheetEntry";
import { useNavigate } from "react-router-dom";
import "../records/Records.css";
const Timesheet = () => {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "EEEE, MMMM d, yyyy")
  );
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [totalHours, setTotalHours] = useState(null);
  const [disableTimeSheetEntryForm, setDisableTimeSheetEntryForm] =
    useState(false);

  const [disableWhileEditing, setDisabledWhileEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  localStorage.setItem("selectedTabIndex", 0);

  const navigate = useNavigate();

  const [value, setValue] = useState(0);

  const getTimesheetData = useSelector(
    (state) =>
      state?.persistData?.timesheetData?.timeSheetData?.timesheetEntryId
  );

  const getLastThreeTimesheetData = useSelector((state) => state?.persistData?.timesheetData?.lastthreetimeSheetData);

  useEffect(() => {
    dispatch(getLastThreeTimesheetEntryAction());
  }, [dispatch]);

  // Transform backend dates for the dropdown
  const transformedDates = transformDates(getLastThreeTimesheetData);


  const formattedDurations = getTimesheetData?.map((duration) => {
    let hours = 0;
    let minutes = 0;

    // If it's a string, split it by "." and convert to numbers
    const [hoursPart, minutesPart] = duration.noOfHours
      .toString()
      .split(":")
      .map(Number);
    hours = hoursPart || 0;
    minutes = minutesPart || 0;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  });

  useEffect(() => {
    if (getTimesheetData) {
      const totalMilliseconds = formattedDurations?.reduce(
        (total, formattedDuration) => {
          return total + moment.duration(formattedDuration).asMilliseconds();
        },
        0
      );

      setTotalHours(moment.utc(totalMilliseconds).format("HH:mm"));
    } else {
      setTotalHours(null);
    }
  }, [getTimesheetData, formattedDurations]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(getTimesheetEntryAction(formatDateForApi(selectedDate)));
    }

    return () => {
      isMounted = false;
    };
  }, [selectedDate]);

  const handleDateChange = (event) => {
    const { value } = event.target;

    setSelectedDate(value);

    // Handle date change logic here // Selected date value
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      navigate("/timesheet");
    } else if (newValue === 1) {
      navigate("/history");
    }
  };
  const handleApprovalClick = async () => {
    setLoading(true);
    try {
      await dispatch(
        submitTimeSheetApprovalAction(formatDateForApi(selectedDate))
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box style={{ paddingBottom: "50px" }}>
      <Typography
        style={{
          fontSize: "24px",
          fontFamily: "Nunito sans",
          fontWeight: "bold",
          marginBottom: "10px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
        variant="h4"
        align="center"
        mt={2}
      >
        TIMESHEET
      </Typography>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid #008080",
        }}
      />

      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className="tablist" // Use the CSS class for the container
        TabIndicatorProps={{ style: { display: "none" } }} // Hide the indicator
      >
        <Tab
          label="current"
          className="currentTab"
          style={{
            backgroundColor: "#008080",
            width: "100px",
            color: "white",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
          selected={value === 0}
        />
        <Tab
          label="History"
          className="HistoryTab"
          style={{
            width: "100px",
            border: "2px solid #008080",
            borderBottomRightRadius: "10px",
            borderBottomLeftRadius: "10px",
          }}
          selected={value === 1}
        />
      </Tabs>

      <SubHeader>
        <Grid container>
          <Grid item xs={7} sm={4} md={3}>
            <Dropdown
              options={transformedDates}
              value={selectedDate}
              onChange={handleDateChange}
              
              dropdownName="date"
              style={style.TimesheetDateTextField}
              valueKey="value"
              labelKey="label"
            />
          </Grid>
        </Grid>
      </SubHeader>
      {/* Render all the rows in the timesheetRows list */}

      <TimesheetRow
        selectedDate={selectedDate}
        disableSubmit={disableSubmit}
        timesheetForm={true}
      />

      <Grid
        container
        style={{
          paddingBottom: isMobile ? "10px" : "0px",
          paddingTop: isMobile ? "0px" : "30px",
        }}
      >
        <Grid item xs={12} sm={6} md={6}>
          <Button
            sx={style.GreenButton}
            variant="contained"
            type="submit"
            onClick={handleApprovalClick}
            disabled={disableTimeSheetEntryForm || disableWhileEditing}
          >
            <SaveOutlinedIcon
              sx={style.AddIconStyle}
              style={{ margin: isMobile ? "0px" : "2px" }}
            />
            <Typography
              variant="h6"
              sx={{
                color: theme.palette.secondary.main,
                marginLeft: isMobile ? "0px" : "15px",
              }}
            >
              Submit for Approval
            </Typography>
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          sx={{
            display: "flex",
            justifyContent: isMobile ? "flex-start" : "flex-end",
            marginTop: isMobile ? "20px" : "0px",
          }}
        >
          <Button>
            <Typography
              variant="h8"
              style={{
                backgroundColor: "transparent",
                color: "#008080",
                paddingRight: "15px",
              }}
              sx={{ color: theme.palette.secondary.main }}
            >
              <b>TOTAL HOURS</b>
            </Typography>
          </Button>
          <Button sx={style.GreenButton} variant="contained">
            <Typography
              variant="h6"
              sx={{ color: theme.palette.secondary.main, px: "10px " }}
            >
              {totalHours || "0"}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <SavedTimesheetEntry
        selectedDate={selectedDate}
        setDisableSubmit={setDisableSubmit}
        setDisableTimeSheetEntryForm={setDisableTimeSheetEntryForm}
        setDisabledWhileEditing={setDisabledWhileEditing}
      />
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

export default Timesheet;
