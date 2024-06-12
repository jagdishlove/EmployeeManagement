import React, { useEffect, useState, useRef } from "react";
import {
  Grid,
  Typography,
  Autocomplete,
  TextField,
  Stack,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Dropdown from "../../components/forms/dropdown/dropdown";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useDispatch, useSelector } from "react-redux";
import { SearchEmployeeAction } from "../../redux/actions/AdminConsoleAction/users/usersAction";
import { projectListAction } from "../../redux/actions/approvals/projectListAction";
import { masterDataAction } from "../../redux/actions/masterData/masterDataAction";
import moment from "moment";
import { useTheme } from "@mui/material/styles";
import ReportsTable from "./UsersReportsTable";
import { getTimesheetReportsAction } from "../../redux/actions/dashboard/reports/reportsAction";

const Reports = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedMonth, setSelectedMonth] = useState(moment().subtract(1, 'months').month());
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const monthRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const [project, setProject] = useState("All");
  const [employmentType, setEmploymentType] = useState("All");
  const pageSize = 10;
  const isMobile = useMediaQuery("(max-width: 1050px)");

  const reporteesPages = useSelector(
    (state) =>
      state?.persistData?.timesheetreportsDetails?.timesheetreportsDetails || []
  );
 
  const totalPages = reporteesPages?.totalPages;

  const getHistoryData = (month, year) => {
    const params = {
      page: currentPage,
      size: pageSize,
      month: parseInt(month) + 1,
      year: year,
      projectId: project !== "All" ? project : "",
      employmentTypeId: employmentType !== "All" ? employmentType : "",
    };
    dispatch(getTimesheetReportsAction(params));
  };

  const getHistoryProjectData = (project) => {
    const params = {
      month: selectedMonth + 1,
      year: selectedYear,
      projectId: project !== "All" ? project : "",
      employmentTypeId: employmentType !== "All" ? employmentType : "",
    };
    dispatch(getTimesheetReportsAction(params));
  };
  const getHistoryEmployementData = (employmentType) => {
    const params = {
      month: selectedMonth + 1,
      year: selectedYear,
      projectId: project !== "All" ? project : "",
      employmentTypeId: employmentType !== "All" ? employmentType : "",
    };
    dispatch(getTimesheetReportsAction(params));
  };

  const handleMonthChange = (e) => {
    const { value } = e.target;
    getHistoryData(value, selectedYear);
    setSelectedMonth(parseInt(value));
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
      endMonth = currentMonth - 1;
    } else {
      startMonth = currentMonth ;
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

  useEffect(() => {
    getHistoryData(selectedMonth, selectedYear);
    setSelectedMonth(moment().subtract(1, 'months').month());
    setSelectedYear(moment().year());
    changeMonthAccordingly(selectedYear);
  }, [currentPage,  ]);

  const handleYearMonth = (e) => {
    const { value } = e.target;
    setSelectedYear(value);
    if (e.target.value !== moment().year().toString()) {
      const monthList = [];
      const currentMonth = moment().month();
      let startMonth;
      let endMonth;

      startMonth = currentMonth;
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

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  const employeeName = useSelector(
    (state) => state?.persistData?.userDetails?.employees?.result
  );

  const getTimeFunctDispatch = (updatedFormData) => {
    const getPayload = {
      year: selectedYear,
      month: selectedMonth + 1,
      projectId: project !== "All" ? project : "",
      employmentTypeId: employmentType !== "All" ? employmentType : "",
    };
    dispatch(getTimesheetReportsAction(getPayload, updatedFormData));
  };
  const handleEmployeeNameChange = (value) => {
    const updatedFormData = value === null ? [] : [value];
    getTimeFunctDispatch(updatedFormData);
  };
  const handleEmployeeNameChange2 = (event) => {
    dispatch(SearchEmployeeAction(event.target.value));
  };

  const handleEmploymentTypechage = (e) => {
    const { value } = e.target;
    setEmploymentType(value);
    getHistoryEmployementData(value);
  };

  useEffect(() => {
    dispatch(masterDataAction());
  }, [dispatch]);

  const masterdata3 = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.employmentType
  );
  useEffect(() => {
    dispatch(projectListAction());
  }, []);

  const projectList = useSelector(
    (state) => state.persistData?.loginDetails?.masterData?.projectBasics || []
  );
  const handleProjectListChange = (e) => {
    const { value } = e.target;
    setProject(value);
    getHistoryProjectData(value);
  };

  useEffect(() => {
    document.body.classList.add("project-progress-body");
    return () => {
      document.body.classList.remove("project-progress-body");
    };
  }, []);
  return (
    <Grid
      style={{
        paddingBottom: isSmallScreen ? "50px" : "0px",
      }}
    >
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Reports
        </Typography>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            options={employeeName || []}
            getOptionLabel={(option) => option.name}
            getOptionValue={(option) => option.id}
            onChange={(event, value) => handleEmployeeNameChange(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Search by name"
                InputProps={{
                  ...params.InputProps,
                  style: { borderRadius: "50px", backgroundColor: "white" },
                  startAdornment: (
                    <>
                      <SearchIcon />
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
                onChange={handleEmployeeNameChange2}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3} mt={-3}>
          <Typography>Employment Type / All:</Typography>
          <Dropdown
            value={employmentType}
            onChange={handleEmploymentTypechage}
            dropdownName="Employee Type"
            name="EMPType"
            options={[{ id: "All", value: "All" }, ...masterdata3] || []}
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
              border: "1px solid silver",
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3} mt={-3}>
          <Typography>Projects:</Typography>
          <Dropdown
            dropdownName="Projects"
            options={[{ id: "All", value: "All" }, ...projectList] || []}
            value={project}
            onChange={handleProjectListChange}
            style={{
              backgroundColor: "white",
              borderRadius: "5px",
              width: "100%",
              border: "1px solid silver",
            }}
            valueKey="id"
            labelKey="projectNames"
          />
        </Grid>
      </Grid>
      <div
        style={{
          width: "100%",
          margin: "auto",
          marginBottom: "18px",
          border: "1px solid silver",
          marginTop: "10px",
        }}
      />
      
      <Grid
        container
        mt={3}
        sx={{
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          borderRadius: "5px",
          backgroundColor: "white",
         
        }}
        display={"flex"}
        flexDirection={"row"}
        spacing={2}
      >
        <Grid item xs={12} sm={4} md={2} lg={2}>
          <select
            value={selectedMonth}
            onChange={handleMonthChange}
            ref={monthRef}
            style={{
              flex: "1",
              padding: "10px",
              height: "45px",
              border: "1px solid #ECECEC",
              borderRadius: "5px",
              backgroundColor: "white",
              margin: "10px 0px 0px 0px",
              width: isMobile ? "80%" : "100%",
              fontSize: "16px",
              outline: "none",
              fontWeight: "bolder",
              marginLeft: isMobile ? "10px" : "20px",
            }}
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </Grid>
        <Grid item xs={12} sm={4} md={2} lg={2}>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            style={{
              flex: "1",
              padding: "10px",
              height: "45px",
              border: "1px solid #ECECEC",
              borderRadius: "5px",
              backgroundColor: "white",
              margin: "10px 0px 0px 0px",
              width: isMobile ? "80%" : "100%",
              fontSize: "16px",
              outline: "none",
              fontWeight: "bolder",
              marginLeft: isMobile ? "10px" : "30px",
            }}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </Grid>
        <Grid item xs={12} sm={4} md={8} lg={8}>
          {totalPages > 0 && (
            <Stack
              direction="row"
              margin="10px"
              alignItems="center"
              sx={{ justifyContent: isMobile ? "flex-start" : "flex-end" }}
            >
              <Typography variant="body1" sx={{ color: "#5E5E5E" }}>
                {currentPage + 1} of {totalPages} Pages
              </Typography>
              <IconButton onClick={handlePrevPage} disabled={currentPage === 0}>
                <KeyboardArrowLeftOutlinedIcon />
              </IconButton>
              <IconButton
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                <ChevronRightOutlinedIcon />
              </IconButton>
            </Stack>
          )}
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <ReportsTable
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              projectId={project}
              employmentTypeId={employmentType}
              pageSize={pageSize}
              currentPage={currentPage}

            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Reports;
