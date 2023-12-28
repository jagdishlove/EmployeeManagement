import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { Box, Button,  Grid, Tab, Tabs, Typography, } from "@mui/material";
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
  getTimesheetEntryAction,
  submitTimeSheetApprovalAction,
} from "../../redux/actions/timeSheet/timeSheetAction";
import { dateOptions, formatDateForApi } from "../../utils/dateOptions";
import SavedTimesheetEntry from "./savedTimesheetEntry";
import { useNavigate } from "react-router-dom";
import '../records/Records.css'
const Timesheet = () => {
  const theme = useTheme();
  const style = TimesheetStyle(theme);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "EEEE, MMMM d, yyyy")
  );

  const [disableSubmit, setDisableSubmit] = useState(false);
  const [totalHours, setTotalHours] = useState(null);
  const [disableTimeSheetEntryForm, setDisableTimeSheetEntryForm] =
    useState(false);

  const [disableWhileEditing, setDisabledWhileEditing] = useState(false);



  const navigate = useNavigate();

      const [value, setValue] = useState(0);


  



  const getTimesheetData = useSelector(
    (state) => state?.nonPersist?.timesheetData?.timeSheetData?.timesheetEntryId
  );

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

  return (
    <Box>
        <Typography
        style={{
          fontSize: '24px', 
          fontFamily: 'Nunito sans', 
          fontWeight: 'bold', 
          marginBottom: '10px', 
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', 
        }}
        variant="h4"
        align="center"
        mt={2}
      >        
       TIMESHEET
        </Typography>
      <div style={{ width: "100%", margin: "auto", marginBottom: "18px",border:'1px solid #008080' }} />
     
      <Tabs
        value={value}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        className="tablist" // Use the CSS class for the container
        TabIndicatorProps={{ style: { display: 'none' } }} // Hide the indicator
      >
        <Tab
          label="current"
          className="currentTab" 
          style={{
            backgroundColor:'#008080',
            width:'20%',
            color:'white',
            borderBottomRightRadius: '10px',
            borderBottomLeftRadius:'10px'
          }}
          selected={value === 0} 
        />
        <Tab
          label="History"
          className="HistoryTab" 
          style={{
            width: '20%',
            border: '2px solid #008080',
            borderBottomRightRadius: '10px',
            borderBottomLeftRadius:'10px'
          }}
          selected={value === 1} 
        />
      </Tabs>

      <SubHeader>
        <Grid container>
        
        
          <Grid item xs={7} sm={4} md={3}>
            <Dropdown
              options={dateOptions()} // Pass any additional options if needed
              value={selectedDate} // Pass the current selected value
              onChange={handleDateChange} // Pass the onChange function
              dropdownName="Date" // Pass the dropdown name
              style={style.TimesheetDateTextField} // Pass any additional style
            />
          </Grid>
        </Grid>
      </SubHeader>
      {/* Render all the rows in the timesheetRows list */}


        <TimesheetRow selectedDate={selectedDate} disableSubmit={disableSubmit} />

     
        <Grid container paddingTop="30px">
          <Grid item xs={6} sm={6} md={6}>
            <Button
              sx={style.GreenButton}
              variant="contained"
              type="submit"
              onClick={() => {
                dispatch(
                  submitTimeSheetApprovalAction(formatDateForApi(selectedDate))
                );
              }}
              disabled={disableTimeSheetEntryForm || disableWhileEditing}
            >
              <SaveOutlinedIcon sx={style.AddIconStyle} />
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.secondary.main,
                  marginLeft: "15px", // Add space to the left of the text
                }}
              >
                Submit for Approval
              </Typography>
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            sx={{ display: "flex", justifyContent: "flex-end" }}
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
    </Box>
  );
};

export default Timesheet;


