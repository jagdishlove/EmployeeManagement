import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLeaveRequestsOfEmployeesAction } from "../../redux/actions/leaves/leaveAction";
import { masterDataAction } from "../../redux/actions/masterData/masterDataAction";
import { getLeaveType } from "../../utils/getLeaveTypeFromId";
import ModalCust from "../modal/ModalCust";

const UsersAppliedLeave = ({ color }) => {
  const allemployeesleave = useSelector(
    (state) => state?.nonPersist?.leavesData.allEmployeesLeaveData.content
  );
  const leaveTypesData = useSelector(
    (state) => state.persistData.masterData?.leaveTypes
  );

  const [isModalOpen, setModalOpen] = useState(false);
  const [filtered, setFilteredData] = useState();

  useEffect(() => {
    dispatch(masterDataAction());
    if (allemployeesleave) {
      const modifiedData = allemployeesleave?.map((item) => {
        const {
          employeeFirstName,
          employeeLastName,
          fromDate,
          toDate,
          noOfDays,
          leaveMasterId,
        } = item;
        return {
          name: `${employeeFirstName.toLowerCase()} ${employeeLastName.toLowerCase()}`,
          date: `${fromDate} ${toDate}`,
          days: noOfDays,
          type: getLeaveType(leaveMasterId, leaveTypesData),
          // status:
        };
      });
      setFilteredData(modifiedData);
    }
  }, [allemployeesleave]);
  console.log("filtered", filtered);


  // const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleIconClick = () => {
    dispatch(getAllLeaveRequestsOfEmployeesAction());
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSearchChange = (event, value) => {
    setSearchValue(value);
  };

  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option,
  });

  const iconColor = color ? "#FFFFFF" : "#008080";

  const fromDateHandler = () => {
    // onChangeFormDataHandler(date, null, "fromDate");
  };

  const toDateHandler = () => {
    // onChangeFormDataHandler(date, null, "fromDate");
  };

  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "auto",
    border: "5px solid #008080",
  };
  return (
    <Box>
      <IconButton onClick={handleIconClick}>
        <InfoIcon
          sx={{ fontSize: "25px", marginTop: "-3px", color: iconColor }}
        />
      </IconButton>
      <ModalCust sx={modalStyle} open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            color: "#008080",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            sx={{ textDecoration: "underline" }}
          >
            All Employees Leave Request
          </Typography>
        </Box>
        <Grid
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
          pt={4}
        >
          <Grid item xs={6} sm={4} md={4} lg={4}>
            <Autocomplete
              filterOptions={filterOptions}
              options={allemployeesleave?.content?.map((row) => row.name)}
              onInputChange={handleSearchChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Search by name, leave type"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                    sx: {
                      // width: "300px",
                      marginTop: "20px",
                      borderRadius: "50px",
                    },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={3} sm={4} md={4} lg={3} align="center">
            <Typography variant="body1" align="center" fontWeight="bold">
              From
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="fromDate"
                format="ddd, MMM DD,YYYY"
                value={dayjs()}
                onChange={fromDateHandler}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={3} sm={4} md={4} lg={3} align="center">
            <Typography variant="body1" align="center" fontWeight="bold">
              To
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="fromDate"
                format="ddd, MMM DD,YYYY"
                value={dayjs()}
                onChange={toDateHandler}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        <Box
          sx={{
            marginTop: "20px",
            border: "1px solid #008080",
          }}
        >
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#008080",
                color: "#ffffff",
                textAlign: "center",
              }}
            >
              <TableRow>
                <TableCell style={{ color: "white", textAlign: "center" }}>
                  Name
                </TableCell>
                <TableCell style={{ color: "white", textAlign: "center" }}>
                  Date
                </TableCell>
                <TableCell style={{ color: "white", textAlign: "center" }}>
                  No. of Days
                </TableCell>
                <TableCell style={{ color: "white", textAlign: "center" }}>
                  Leave Type
                </TableCell>
                <TableCell style={{ color: "white", textAlign: "center" }}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center" }}>{row.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.date}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.days}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{row.type}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </ModalCust>
    </Box>
  );
};

export default UsersAppliedLeave;
