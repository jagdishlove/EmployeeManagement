
import React, { useState, useEffect, useRef } from "react";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Avatar,
  Tooltip,
  Button,
} from "@mui/material";
import moment from "moment";
import {
  getAllUnderManagerAction,
  getAllRatingsAction,
  getAllDataAction,
} from "../../../redux/actions/Ratings/ratingsAction";
import Star2 from "../../stars/star2";
import { useDispatch, useSelector } from "react-redux";

export default function Ratings() {
  const dispatch = useDispatch();
  const currentMonth = moment().month();
  const currentYear = moment().year();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [years, setYears] = useState([currentYear - 1, currentYear]);
  const [months, setMonths] = useState([]);
  const [starRating, setStarRating] = useState({});
  const [pendingSaves, setPendingSaves] = useState({});

  useEffect(() => {
    dispatch(getAllUnderManagerAction());
    updateMonthOptions();
    getHistoryData(currentMonth, currentYear);
  }, [dispatch, currentMonth, currentYear]);

  const updateMonthOptions = () => {
    const monthList = Array.from({ length: 12 }, (_, index) => ({
      value: index,
      label: moment().month(index).format("MMMM"),
    }));
    setMonths(monthList);

    const yearList = [];
    if (selectedMonth < 11) {
      yearList.push(currentYear - 1, currentYear);
    } else {
      yearList.push(currentYear);
    }
    setYears(yearList);
  };

  const monthRef = useRef(null);
  // Handle changes in year dropdown
  const handleYearChange = (e) => {
    const year = parseInt(e.target.value, 10);
    setSelectedYear(year);
    setSelectedMonth(year < currentYear ? 11 : currentMonth);
    getHistoryData(year < currentYear ? 11 : currentMonth, year);
  };

  // Handle changes in month dropdown
  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value, 10);
    setSelectedMonth(month);
    getHistoryData(month, selectedYear);
  };

  const getHistoryData = (month, year) => {
    const params = { month: month + 1, year };
    dispatch(getAllUnderManagerAction(params));
    dispatch(getAllDataAction(params));
  };

  const handleStarClick = (rating, empId) => {
    setStarRating((prevRatings) => ({
      ...prevRatings,
      [empId]: rating,
    }));
    setPendingSaves((prevSaves) => ({
      ...prevSaves,
      [empId]: true,
    }));
  };

  const handleSave = async (empId) => {
    const existingRating = Data.find((r) => r.empId === empId);
    const payload = {
      empId,
      rating: starRating[empId],
      month: selectedMonth + 1,
      year: selectedYear,
    };

    try {
      if (existingRating) {
        payload.id = existingRating.id; // Use the existing rating's ID for an update
      }
      await dispatch(getAllRatingsAction(payload));
      setPendingSaves((prevSaves) => ({
        ...prevSaves,
        [empId]: false,
      }));
      await dispatch(getAllDataAction({ month: selectedMonth + 1, year: selectedYear }));
    } catch (error) {
      console.error("Error saving rating:", error);
    }
  };

  const isCurrentMonth = (month, year) => {
    return month === currentMonth && year === currentYear;
  };

  const managerData = useSelector(
    (state) => state.persistData?.loginDetails?.masterData
  );
  const designationIdToName = {};
  managerData.designation.forEach((designation) => {
    designationIdToName[designation.designationId] =
      designation.designationName;
  });

  const getEmployeeRating = (empId) => {
    if (starRating[empId] !== undefined) {
      return starRating[empId];
    }
    const ratingData = Data.find((rating) => rating.empId === empId);
    return ratingData ? ratingData.rating : 0;
  };

  const Ratings = useSelector(
    (state) => state?.persistData?.Ratings?.underMembers || []
  );

  const Data = useSelector(
    (state) => state?.persistData?.Ratings?.data?.ratings || []
  );

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "10px",
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
              padding: "2px",
              height: "45px",
              border: "1px solid #ECECEC",
              borderRadius: "5px",
              backgroundColor: "white",
              marginRight: "6px",
              marginLeft: "-40%",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              width: "270px",
              fontSize: "16px",
              outline: "none",
              fontWeight: "bolder",
            }}
          >
            {months.map((month) => (
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
              padding: "2px",
              borderRadius: "5px",
              height: "45px",
              width: "40%",
              border: "1px solid #ECECEC",
              backgroundColor: "white",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
              fontSize: "16px",
              outline: "none",
              fontWeight: "bolder",
            }}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </Box>
      <Grid container spacing={2} mt={3}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>S.No</strong></TableCell>
                <TableCell><strong>Employee Name</strong></TableCell>
                <TableCell><strong>Designation</strong></TableCell>
                <TableCell><strong>Rating</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Ratings.length > 0 ? (
                Ratings.map((employee, index) => {
                  const empId = employee.id;
                  const existingRating = Data.find((rating) => rating.empId === empId);
                  const isSave = !existingRating && isCurrentMonth(selectedMonth, selectedYear);

                  return (
                    <TableRow key={empId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <Avatar src={employee.fileStorage?.data ? `data:image/png;base64,${employee.fileStorage.data}` : null}>
                          {employee?.firstName?.charAt(0)}
                        </Avatar>
                        {employee?.firstName} {employee?.lastName}
                      </TableCell>
                      <TableCell>{designationIdToName[employee.designationId]}</TableCell>
                      <TableCell>
                        <Tooltip
                          title={
                            !isCurrentMonth(selectedMonth, selectedYear)
                              ? "Ratings for previous months are disabled"
                              : ""
                          }
                          arrow
                        >
                          <span>
                            <Star2
                              rating={getEmployeeRating(empId)}
                              onChange={(rating) => handleStarClick(rating, empId)}
                              disabled={!isCurrentMonth(selectedMonth, selectedYear)}
                            />
                          </span>
                        </Tooltip> 
                      </TableCell>
                      <TableCell>
                        {pendingSaves[empId] || isSave ? (
                          <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={() => handleSave(empId)} sx={{ minWidth: '100px', height: '40px' }}
                          disabled={getEmployeeRating(empId) === 0}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button variant="contained" color="primary" sx={{ minWidth: '100px', height: '40px' }}>
                            Update
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No data available for the selected month and year.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>
  );
}

