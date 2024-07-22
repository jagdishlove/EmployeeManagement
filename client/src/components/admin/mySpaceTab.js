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
  Typography
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

  const ProjectPerfomanceData1 = useSelector(
    (state) => state?.persistData?.workSpace?.projectperformance?.legendList
  );
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
  localStorage.removeItem("pcurrentPage");
  localStorage.removeItem("currentPage");
  localStorage.removeItem("ccurrentPage");
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
                background: "linear-gradient(45deg, #4C83F0, #D46678)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                marginLeft: "15px",
                marginTop: "5px",
                fontSize: "26px",
              }}
            >
              <b> Hello, {userName}</b>
            </Box>
            <TodayActivity />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "absolute",
                top: "15px",
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
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: '5px',
                    width: '100%',
                    height: '135px',
                    marginTop: { xs: '20px', md: '65px' },
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px',
                  }}
                >
                  <Grid container spacing={2} alignItems="center" sx={{ width: '100%' }}>
                    <Grid item xs={2}>
                      <Box
                        component="img"
                        src={ratingIcon}
                        alt="Rating Icon"
                        sx={{ width: '40px', height: '40px' }} // Set fixed size
                      />
                    </Grid>
                    <Grid item xs={8} ml={1}>
                      <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                        <b>Overall Performance</b>
                      </Box>
                    </Grid>
                    <Grid item xs={1} color="#A4504A">
                      <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                        <b>
                          {ratingData?.performanceRating !== undefined
                            ? ratingData?.performanceRating.toFixed(2)
                            : ''}
                        </b>
                      </Box>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: "15px" }}>
                    <Star value={ratingData?.performanceRating} />
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    borderRadius: '5px',
                    width: '100%',
                    height: { xs: '10rem', md: '8.5rem' },
                    marginTop: { xs: '20px', md: '65px' },
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                  }}
                >
                  <Grid container spacing={-1} mb={-2}>
                    <Grid item xs={1} mt={1} ml={1}>
                      <img src={ConsistencyMeter} alt="Consistency Meter" />
                    </Grid>
                    <Grid
                      item
                      xs={2}
                      sx={{ marginTop: '1rem', whiteSpace: 'nowrap' }}
                      ml={4.5}
                    >
                      <b> Consistency Meter </b>
                    </Grid>
                  </Grid>
                  <Box sx={{ textAlign: 'center', marginLeft: '10%', marginBottom: '5%' }}>
                    {ratingData?.consistencyMeter?.value !== undefined ? (
                      <ConsistencyMeters value={Math.floor(ratingData?.consistencyMeter?.value)} />
                    ) : (
                      <CircularProgress />
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
            <Grid item xs={12} style={{ alignItems: "center" }}>
              <Card
                sx={{
                  borderRadius: '5px',
                  width: '100%',
                  height: '200px',
                  marginTop: '20px',
                  backgroundColor: 'white',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Grid
                  item
                  xs={1}
                  sx={{
                    position: 'absolute',
                    top: '5px',
                    right: '20px',
                    cursor: 'pointer',
                  }}
                >
                  <OpenInFullOutlinedIcon
                    onClick={handleClickOpen}
                    fontSize="10px"
                    color="silver"
                  />
                </Grid>
                <Grid
                  sx={{
                    overflowY: 'auto',
                    marginTop: '15px',
                    marginLeft: '6px',
                    overflowX: 'hidden',
                    maxHeight: '100%',
                    paddingRight: '10px',
                    width: '100%',
                    boxSizing: 'content-box',
                    maxWidth: '97.5%',
                    flex: '1 1 auto',
                    display: 'flex',
                    justifyContent: 'center', // Center horizontally
                    alignItems: 'center', // Center vertically
                  }}
                >
                  <Grid item width={420} ml={3}>
                    {ProjectPerfomanceData?.performanceRating &&
                      ProjectPerfomanceData?.performanceRating.length > 0 ? (
                      <ul style={{ marginTop: '17px', padding: 0 }}>
                        {ProjectPerfomanceData?.performanceRating
                          .sort(
                            (a, b) =>
                              (b.performanceRating || 0) - (a.performanceRating || 0)
                          )
                          .map((item, index) => (
                            <li
                              key={index}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '10px',
                                flexWrap: 'wrap',
                              }}
                            >
                              <span
                                style={{
                                  marginLeft: '10px',
                                  fontSize: '13px',
                                  minWidth: '100px',
                                  flex: '1 0 auto',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  color: 'black',
                                  maxWidth: '80px',
                                }}
                                title={item.project.projectName}
                              >
                                <b>{item.project.projectName}</b>
                              </span>

                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  marginRight: '10px',
                                  width: '150px',
                                  flex: '2 0 auto',
                                }}
                              >
                                <div
                                  style={{
                                    width: `${((item.performanceRating || 0) / 5) * 100}%`,
                                    height: '20px',
                                    backgroundColor:
                                      colorPalette[index % colorPalette.length],
                                    position: 'relative',
                                  }}
                                ></div>
                              </div>
                              <div
                                style={{
                                  alignItems: 'center',
                                  flex: '1 0 auto',
                                  textAlign: 'right',
                                }}
                              >
                                <Rating rating={item.performanceRating || 0} />
                                <span
                                  style={{
                                    color: '#A4504A',
                                    marginLeft: '5px',
                                  }}
                                >
                                  {item.performanceRating
                                    ? item.performanceRating.toFixed(2)
                                    : '0.0'}
                                </span>
                              </div>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p
                        style={{
                          textAlign: 'center',
                          margin: 0,
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
                            marginTop: "95px",
                            marginBottom: "80px",
                            marginLeft: "180px",
                          }}
                        >
                          No  data  available
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
                    padding:"5px"
                    // marginRight: "20px"
                  }}
                >
                  {ProjectPerfomanceData1 && ProjectPerfomanceData1.length > 0 ? (
                      <SimpleBarChart />
                    ) : (
                      <Typography
                        variant="body1"
                        align="center"
                        style={{ textAlign: "center", marginRight: "-24px" }}
                      >
                        No data available
                      </Typography>
                    )}
                </Grid>
              </Card>
            </Grid>

            <Dialog open={open1} onClose={handleClose1}>
              <DialogContent>
                {/* Popup content */}
                <Box>
                <Grid >
                    {ProjectPerfomanceData1 && ProjectPerfomanceData1.length > 0 ? (
                      <SimpleBarChart />
                    ) : (
                      <Typography
                        variant="body1"
                        align="center"
                        style={{padding:"80px 200px 80px 200px"}}
                      >
                        No data available
                      </Typography>
                    )}
                  </Grid>
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
