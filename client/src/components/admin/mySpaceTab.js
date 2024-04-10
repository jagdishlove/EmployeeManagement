import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Grid,
  Box,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import TimesheetBreakdown from "../../assets/Time sheet Breakdown.svg";
import ratingIcon from "../../assets/Performance.svg";
import Star from "../../components/stars/star";
import TimesheetBreakDown from "./mySpaceComponents/TimesheetBreakDown";
import SimpleBarChart from "../admin/mySpaceComponents/Barchart";
import ActivityCard from "../admin/mySpaceComponents/Activity"
import ConsistencyMeters from "../admin/mySpaceComponents/ConsistencyMeters"
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import moment from "moment";
import { RatingDataAction, getProjectPerformanceAction, getTodayActivityAction } from "../../redux/actions/workSpace/workSpaceAction"
import ConsistencyMeter from "../../assets/ConsistencyMeter.svg";
import { Rating } from "react-simple-star-rating";

const MySpaceTab = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [open, setOpen] = useState(false);
  const monthRef = useRef(null);

  const getHistoryData = (month, year) => {
    const params = {
      month: parseInt(month) + 1,
      year: year,
    };
    dispatch(RatingDataAction(params));
    dispatch(getProjectPerformanceAction(params));
    dispatch(getTodayActivityAction(params))
  };

  const handleYearChange = (e) => {
    handleYearMonth(e);
    setYears();
  };

  const changeMonthAccordingly = () => {
    const currentYear = moment().year();
    const yearList = [];

    if (selectedMonth < 12) {
      yearList.push(currentYear - 1, currentYear);
    } else {
      yearList.push(currentYear);
    }

    setYears(yearList);

    const monthList = [];
    const currentMonth = moment().month();
    let startMonth;
    let endMonth;

    if (currentMonth < 11) {
      startMonth = 0;
      endMonth = currentMonth;
    } else {
      startMonth = currentMonth;
      endMonth = 11;
    }

    for (let month = startMonth; month <= endMonth; month++) {
      const date = moment().year(selectedYear).month(month).startOf("month");
      monthList.push({
        value: month,
        label: date.format("MMMM"),
      });
    }

    setMonths(monthList);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMonthChange = (e) => {
    const { value } = e.target;
    getHistoryData(value, selectedYear);
    setSelectedMonth(parseInt(value));
  };

  useEffect(() => {
    const e = {
      target: {
        value: selectedYear
          ? selectedYear.toString()
          : moment().year().toString(),
      },
    };
    handleYearMonth(e, true);
  }, []);

  useEffect(() => {
    getHistoryData(selectedMonth, selectedYear);
    changeMonthAccordingly();
  }, []);

  const handleYearMonth = (e) => {
    const { value } = e.target;
    setSelectedYear(value);
    if (e.target.value !== moment().year().toString()) {
      const monthList = [];
      const currentMonth = moment().month();
      let startMonth;
      let endMonth;

      startMonth = currentMonth + 1;
      endMonth = 12;

      for (let month = startMonth; month < endMonth; month++) {
        const date = moment().year(selectedYear).month(month).startOf("month");
        monthList.push({
          value: month,
          label: date.format("MMMM"),
        });
      }
      setMonths(monthList);
      setSelectedMonth(monthList[0].value);
      getHistoryData(startMonth, value);
    } else {
      const monthList = [];
      const currentMonth = moment().month();
      let startMonth;
      let endMonth;

      startMonth = 0;
      endMonth = currentMonth;

      getHistoryData(endMonth, value);

      for (let month = startMonth; month <= endMonth; month++) {
        const date = moment().year(selectedYear).month(month).startOf("month");
        monthList.push({
          value: month,
          label: date.format("MMMM"),
        });
      }
      setMonths(monthList);
      setSelectedMonth(currentMonth);
    }
  };

  const ratingData = useSelector(
    (state) => state?.nonPersist?.workSpace?.ratingData
  );

  const todayActivityData = useSelector(
    (state) => state?.nonPersist?.workSpace?.todayActivity
  ) || [];

  const ProjectPerfomanceData = useSelector(
    (state) => state?.nonPersist?.workSpace?.projectperformance
  );

  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // Map todayActivityData into lines array
  const lines = todayActivityData.map(activity => (
    `• ${activity.description}` // Assuming description is the property you want to display
  ));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLineIndex((prevIndex) => (prevIndex + 1) % lines.length);
    }, 5000); // Change the interval duration to 5000 milliseconds (5 seconds)

    return () => clearInterval(interval);
  }, [lines]);

  return (
    
    <Grid style={{ position: 'relative', display: 'flex', flexDirection: 'column', }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{
            border: '1px solid silver',
            borderRadius: '10px',
            marginTop: '10px',
            marginLeft: '3px',
            width: '100%',
            height: '170px',
            backgroundColor: 'white',
          }}>
            <Box sx={{
              background: 'linear-gradient(45deg, #2196F3, #FF9800)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              marginLeft: '30px',
              marginTop: '3px',
              fontSize: '26px',
            }}>
              Hello, Karthik Raj S
            </Box>
            <Box sx={{
              border: '1px solid silver',
              height: '100px',
              width: '90%',
              marginLeft: '30px',
              borderRadius: '5px',
              fontSize: '13px',
              marginTop: '20px',
            }}>
              <Grid item xs={12} sx={{ color: 'silver', ml: '10px' }}>Todays Activities</Grid>
              <Grid item xs={12} sx={{ ml: '10px' }}>
                <div className="marquee-container">
                  <marquee direction="up" className="marquee">
                    {lines.map((line, index) => (
                      <div key={index} style={{ display: index === currentLineIndex ? 'block' : 'none' }}>
                        <b>{line}</b>
                      </div>
                    ))}
                  </marquee>
                </div>
              </Grid>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            <Box sx={{
              position: 'absolute',
              top: '20px',
              right: '-90px',
              display: 'flex',
              alignItems: 'center',
            }}>
              <div
                style={{
                  padding: "10px",
                  marginBottom: "20px",
                }}
              >
                <div
                  className="dropdowns"
                  style={{
                    display: "block",
                    justifyContent: "space-between",
                    width: "300px",
                  }}
                >
                  <select
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    ref={monthRef}
                    style={{
                      flex: "1",
                      padding: " 10px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                      fontSize: " 16px",
                      outline: " none",
                      fontWeight: "bolder",
                    }}
                  >
                    {months?.map((month) => (
                      <option key={month.value} value={month.value}>
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedYear}
                    onChange={handleYearChange}
                    style={{
                      flex: "1",
                      padding: " 10px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                      fontSize: " 16px",
                      outline: " none",
                      fontWeight: "bolder",
                    }}
                  >
                    {years?.map((year) => (
                      <option
                        key={year}
                        value={year}
                        style={{
                          fontSize: "16px",
                        }}
                      >
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card sx={{
                  border: '1px solid silver',
                  borderRadius: '10px',
                  width: '100%',
                  height: '130px',
                  marginTop: "45px",
                  backgroundColor: 'white',
                }}>
                  <Grid container spacing={1} mb={2}>
                    <Grid item xs={3} ml={2} mt={1}>
                      <img src={ratingIcon} />
                    </Grid>
                    <Grid item xs={4} mt={2}>
                    <b>Performance </b>
                    </Grid>{" "}
                    <Grid item xs={2} mt={2}>
                      3.0
                    </Grid>
                  </Grid>
                  <Grid item ml={6}>
                    <Star value={ratingData?.performanceRating} />
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{
                  border: '1px solid silver',
                  borderRadius: '10px',
                  width: '100%',
                  height: 'auto',
                  marginLeft: "5px",
                  marginTop: "45px",
                  backgroundColor: 'white',
                }}>
                  <Grid container spacing={-4} mb={-2}>
                    <Grid item xs={4} mt={1} ml={2}>
                      <img src={ConsistencyMeter} />
                    </Grid>
                    <Grid item xs={4} sx={{ marginTop: '12px', whiteSpace: 'nowrap' }}>
                     <b> Consistency Meter </b>
                    </Grid>
                  </Grid>
                  <Box sx={{ textAlign: "center", marginLeft: "20%" }}>
                    <ConsistencyMeters value={Math.floor(ratingData?.consistencyMeter?.value)} />
                  </Box>
                </Card>
              </Grid>
            </Grid>

          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={{ marginTop: "20px" }}>
          <Card
            style={{
              border: "1px solid silver",
              borderRadius: "10px",
              backgroundColor: "white",
              height: "420px",
            }}
          >
            <Grid container spacing={2} style={{ paddingLeft: "20px" }}>
              <Grid item xs={2}>
                <img src={TimesheetBreakdown} alt="Timesheet Breakdown" />
              </Grid>
              <Grid item xs={10} style={{ textAlign: "start", marginTop: "10px" }}>
              <b> Overall Timesheet Breakdown </b>
              </Grid>
            </Grid>
            <TimesheetBreakDown />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}

            // style={{ position: "relative" }}
            >
              <Card
                style={{
                  border: "1px solid silver",
                  borderRadius: "10px",
                  width: "100%",
                  height: "200px",
                  marginTop: "20px",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
                open={open}
                onClose={handleClose}
              >
                <Grid
                  item
                  xs={1}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "10px",
                    cursor: "pointer",
                  }}
                >
                  <OpenInFullOutlinedIcon onClick={handleClickOpen} fontSize="10px" color="silver" />
                </Grid>
                <ul> {ProjectPerfomanceData?.performanceRating?.map((item, index) => ( <li key={index} style={{ display: "flex", alignItems: "center" }}> <span style={{ marginLeft: "10px" }}>{item.project.projectName}</span> <div style={{ display: "flex", alignItems: "center" }}> <div style={{ width: "50px", height: "20px", backgroundColor: "lightgray", position: "relative" }}> <div style={{ position: "absolute", height: "100%", width: `${(item.performanceRating / 5) * 100}%`, backgroundColor: "gold", left: 0 }}> </div> </div> </div> <div style={{ display: "flex", alignItems: "center" }}> <Rating initialValue={item.performanceRating} emptyStyle={{ color: "lightgray" }} fillStyle={{ color: "gold" }} transition ratingValue={item.performanceRating} size={25} style={{ marginLeft: "10px" }} /> <span>{item.performanceRating}</span> </div> </li>))} </ul>
              </Card>
            </Grid>

            <Grid item xs={12} style={{ position: "relative" }}>
              <Card
                style={{
                  border: "1px solid silver",
                  borderRadius: "10px",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <SimpleBarChart />
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={12} mt={2}>
        <Card style={{ border: '1px solid silver', borderRadius: '10px', backgroundColor: 'white' }}>
          <ActivityCard />
        </Card >
      </Grid>
    </Grid>

  )
}

export default MySpaceTab;
