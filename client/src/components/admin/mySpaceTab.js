import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Grid,
  Box,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import TimesheetBreakdown from "../../assets/Time sheet Breakdown.svg";
import ratingIcon from "../../assets/Performance.svg";
import Star from "../../components/stars/star";
import TimesheetBreakDown from "./mySpaceComponents/TimesheetBreakDown";
import SimpleBarChart from "../admin/mySpaceComponents/Barchart";
import ActivityCard from "../admin/mySpaceComponents/Activity";
import ConsistencyMeters from "../admin/mySpaceComponents/ConsistencyMeters";
import OpenInFullOutlinedIcon from "@mui/icons-material/OpenInFullOutlined";
import moment from "moment";
import {
  RatingDataAction,
  getProjectPerformanceAction,
  getTodayActivityAction,
} from "../../redux/actions/workSpace/workSpaceAction";
import ConsistencyMeter from "../../assets/ConsistencyMeter.svg";
import TodayActivity from "../admin/mySpaceComponents/TodayActivity";

const MySpaceTab = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState(moment().month());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const monthRef = useRef(null);

  const userName = useSelector(
    (state) => state?.persistData?.loginDetails?.data.userName
  );
  localStorage.setItem("selectedTabIndex", 0);
  localStorage.setItem("selectedSubTabIndex", 0);
  const getHistoryData = (month, year) => {
    const params = {
      month: parseInt(month) + 1,
      year: year,
    };
    dispatch(RatingDataAction(params));
    dispatch(getProjectPerformanceAction(params));
    dispatch(getTodayActivityAction(params));
  };

  const handleYearChange = (e) => {
    const { value } = e.target;
    setSelectedYear(value);
    handleYearMonth(e);
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
  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
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
    document.body.classList.add("project-progress-body");
    return () => {
      document.body.classList.remove("project-progress-body");
    };
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
    (state) => state?.persistData?.workSpace?.ratingData
  );

  const ProjectPerfomanceData = useSelector(
    (state) => state?.persistData?.workSpace?.projectperformance
  );

  const Rating = ({ rating }) => {
    const stars = [];
    const isZero = rating === 0;

    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          style={{
            color: isZero ? "lightgray" : i < rating ? "gold" : "lightgray",
            fontSize: "20px",
          }}
        >
          ★
        </span>
      );
    }
    return <>{stars}</>;
  };

  const colorPalette = [
    "#00C49F",
    "#0088FE",
    "#FFBB28",
    "#FF8042",
    "#FF6B6B",
    "#4CAF50",
    "#9C27B0",
  ];

  localStorage.removeItem("selectedProject");

  return (
    <Grid
      mt={4}
      style={{ position: "relative", display: "flex", flexDirection: "column" }}
    >
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              borderRadius: "5px",
              marginTop: "10px",
              marginLeft: "3px",
              width: "99.5%",
              height: "190px",
              backgroundColor: "white",
            }}
          >
            <Box
              sx={{
                background: "linear-gradient(45deg, #2196F3, #FF9800)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                marginLeft: "30px",
                marginTop: "3px",
                fontSize: "26px",
              }}
            >
              Hello, {userName}
            </Box>
            <TodayActivity />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: "10px",
                right: "-22px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div
                className="dropdowns"
                style={{
                  display: "block",
                  justifyContent: "space-between",
                  maxWidth: "300px",
                }}
              >
                <select
                  value={selectedMonth}
                  onChange={handleMonthChange}
                  ref={monthRef}
                  style={{
                    flex: "1",
                    padding: " 2px",
                    height: "45px",
                    border: "1px  solid #ECECEC",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    marginRight: "6px",
                    marginLeft: "-40%",
                    width: "270px",
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
                    padding: " 2px",
                    borderRadius: "5px",
                    height: "45px",
                    width: "40%",
                    border: "1px  solid #ECECEC",
                    backgroundColor: "white",
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
            </Box>
            <Grid container spacing={0}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: "5px",
                    width: "110%",
                    height: "135px",
                    marginTop: "65px",
                    backgroundColor: "white",
                  }}
                >
                  <Grid container spacing={0} mb={1}>
                    <Grid item xs={2} ml={1} mt={1}>
                      <img src={ratingIcon} />
                    </Grid>
                    <Grid item xs={8} mt={2.5} ml={0.5}>
                      <b >Over all Performance</b>
                    </Grid>
                    <Grid item xs={1} mt={2.5} ml={-1} color="#A4504A">
                      <b>
                        {ratingData?.performanceRating !== undefined
                          ? ratingData?.performanceRating.toFixed(2)
                          : ""}
                      </b>
                    </Grid>
                  </Grid>
                  <Grid item ml={12}>
                    <Star value={ratingData?.performanceRating} />
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: "5px",
                    width: "86%",
                    height: "8.5rem", // Use rem for responsive height
                    marginLeft: "2.5rem", // Use rem for responsive margin
                    marginTop: "4rem", // Use rem for responsive margin
                    backgroundColor: "white",
                    display: "flex", // Add flex display
                    flexDirection: "column", // Add flex direction
                    alignItems: "center", // Add align items
                    justifyContent: "space-around", // Add justify content
                    "@media (max-width: 600px)": { // Add media query for small screens
                      width: "90%",
                      height: "10rem",
                      marginLeft: "1rem",
                      marginTop: "2rem",
                    },
                  }}
                >
                  <Grid container spacing={0} mb={-2}> 
                    <Grid item xs={1} mt={1} ml={1}>
                      <img src={ConsistencyMeter} />
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      sx={{ marginTop: "1rem", whiteSpace: "nowrap" }} // Use rem for responsive margin
                      ml={4.5}
                    >
                      <b> Consistency Meter </b>
                    </Grid>
                  </Grid>
                  <Box sx={{ textAlign: "center", marginLeft: "10%",marginBottom:"5%" }}>
                    {ratingData?.consistencyMeter?.value !== undefined ? (
                      <ConsistencyMeters
                        value={Math.floor(ratingData?.consistencyMeter?.value)}
                      />
                    ) : (
                      <CircularProgress /> // Or any other loading indicator
                    )}
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={1} mt={-2}>
        <Grid item xs={12} md={6} style={{ marginTop: "20px" }}>
          <Card
            style={{
              borderRadius: "5px",
              backgroundColor: "white",
              height: "420px",
              width: "100%"
            }}
          >
            <Grid container spacing={0} mb={-2} ml={3} mt={2}>
              <Grid item xs={1} mt={1} ml={1}>
                <img src={TimesheetBreakdown} alt="Timesheet Breakdown" />
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ marginTop: "1rem", whiteSpace: "nowrap" }} // Use rem for responsive margin
                ml={1.5}
              >
                <strong>Overall Timesheet Breakdown </strong>
              </Grid>
            </Grid>
            <TimesheetBreakDown />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Card
                style={{
                  borderRadius: "5px",
                  width: "100%",
                  height: "200px",
                  marginTop: "20px",
                  backgroundColor: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Grid
                  item
                  xs={1}
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "20px",
                    cursor: "pointer",
                  }}
                >
                  <OpenInFullOutlinedIcon
                    onClick={handleClickOpen}
                    fontSize="10px"
                    color="silver"
                  />
                </Grid>
                <Grid
                  style={{
                    overflowY: "auto",
                    marginTop: "15px",
                    marginLeft:"6px",
                    overflowX: "hidden",
                    maxHeight: "100%",
                    paddingRight: "10px",
                    width: "100%",
                    boxSizing: "content-box",
                    maxWidth: "97.5%",
                  }}
                >
                  <Grid item width={420} ml={3}>
                    {ProjectPerfomanceData?.performanceRating &&
                      ProjectPerfomanceData?.performanceRating.length > 0 ? (
                      <ul style={{ marginTop: "17px", padding: 0 }}>
                        {ProjectPerfomanceData?.performanceRating
                          .sort(
                            (a, b) =>
                              (b.performanceRating || 0) -
                              (a.performanceRating || 0)
                          )
                          .map((item, index) => (
                            <li
                              key={index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: "10px",
                                flexWrap: "wrap",
                              }}
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  fontSize: "13px",
                                  minWidth: "100px",
                                  flex: "1 0 auto",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  color: "black",
                                  maxWidth: "80px",
                                }}
                                title={item.project.projectName}
                              >
                                <b> {item.project.projectName}</b>
                              </span>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginRight: "10px",
                                  width: "150px",
                                  flex: "2 0 auto",
                                }}
                              >
                                <div
                                  style={{
                                    width: `${((item.performanceRating || 0) / 5) * 100
                                      }%`,
                                    height: "20px",
                                    backgroundColor:
                                      colorPalette[index % colorPalette.length],
                                    position: "relative",
                                  }}
                                ></div>
                              </div>
                              <div
                                style={{
                                  alignItems: "center",
                                  flex: "1 0 auto",
                                  textAlign: "right",
                                }}
                              >
                                <Rating rating={item.performanceRating || 0} />
                                <span
                                  style={{
                                    color: "#A4504A",
                                    marginLeft: "5px",
                                  }}
                                >
                                  {item.performanceRating
                                    ? item.performanceRating.toFixed(2)
                                    : "0.0"}
                                </span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p
                        style={{
                          marginTop: "80px",
                          marginBottom: "80px",
                          marginLeft: "200px",
                        }}
                      >
                        No data available
                      </p>
                    )}
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Dialog open={open} onClose={handleClose}>
              <DialogContent>
                {/* Popup content */}
                <Box>
                  <Grid
                    style={{
                      overflowY: "auto",
                      maxHeight: "100%",
                      paddingRight: "10px",
                      boxSizing: "content-box",
                    }}
                  >
                    <Grid item width={500} ml={2}>
                      {ProjectPerfomanceData?.performanceRating &&
                        ProjectPerfomanceData?.performanceRating.length > 0 ? (
                        <ul style={{ marginTop: "17px", padding: 0 }}>
                          {ProjectPerfomanceData?.performanceRating
                            .sort(
                              (a, b) =>
                                (b.performanceRating || 0) -
                                (a.performanceRating || 0)
                            )
                            .map((item, index) => (
                              <li
                                key={index}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginBottom: "10px",
                                  flexWrap: "wrap",
                                }}
                              >
                                <span
                                  style={{
                                    marginLeft: "10px",
                                    fontSize: "12px",
                                    minWidth: "100px",
                                    flex: "1 0 auto",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    color: "black",
                                    maxWidth: "80px",
                                  }}
                                >
                                  <b title={item.project.projectName}>
                                    {item.project.projectName}
                                  </b>
                                </span>

                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    marginRight: "10px",
                                    width: "200px",
                                    flex: "2 0 auto",
                                  }}
                                >
                                  <div
                                    style={{
                                      width: `${((item.performanceRating || 0) / 5) *
                                        100
                                        }%`,
                                      height: "20px",
                                      backgroundColor:
                                        colorPalette[
                                        index % colorPalette.length
                                        ],
                                      position: "relative",
                                    }}
                                  ></div>
                                </div>
                                <div
                                  style={{
                                    alignItems: "center",
                                    flex: "1 0 auto",
                                    textAlign: "right",
                                  }}
                                >
                                  <Rating
                                    rating={item.performanceRating || 0}
                                  />
                                  <span
                                    style={{
                                      color: "#A4504A",
                                      marginLeft: "5px",
                                    }}
                                  >
                                    {item.performanceRating
                                      ? item.performanceRating.toFixed(2)
                                      : "0.0"}
                                  </span>
                                </div>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <p
                          style={{
                            marginTop: "80px",
                            marginBottom: "80px",
                            marginLeft: "150px",
                          }}
                        >
                          No data available
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>

            <Grid item xs={12} style={{ position: "relative" }}>
              <Card
                style={{
                  borderRadius: "5px",
                  width: "100%",
                  height: "210px",
                  backgroundColor: "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  overflowY: "auto",
                }}
              >
                <Grid
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "20px",
                    zIndex: 1,
                    cursor: "pointer",
                  }}
                >
                  <OpenInFullOutlinedIcon
                    onClick={handleClickOpen1}
                    fontSize="10px"
                    color="silver"
                  />
                </Grid>
                <Grid
                  style={{
                    
                    maxHeight: "100%",
                    boxSizing: "content-box",
                    marginRight:"30px"
                  }}
                >
                  <SimpleBarChart />
                </Grid>
              </Card>
            </Grid>

            <Dialog open={open1} onClose={handleClose1}>
              <DialogContent>
                {/* Popup content */}
                <Box>
                  <SimpleBarChart />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose1} color="primary">
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={10} md={8} lg={12} mt={1}>
        <Card style={{ borderRadius: "10px", backgroundColor: "white" }}>
          <ActivityCard selectedMonth={selectedMonth} selectedYear={selectedYear} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default MySpaceTab;
