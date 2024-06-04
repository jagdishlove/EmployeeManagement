import React, { useEffect, useState } from "react";
import {
  Grid,
  Avatar,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getTimesheetReportsAction } from "../../redux/actions/dashboard/reports/reportsAction";
import { useDispatch, useSelector } from "react-redux";

const ReportsTable = ({ selectedMonth, selectedYear, projectId  }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const timesheetReports = useSelector(
    (state) => state?.persistData?.timesheetreportsDetails
  );
  console.log("timesheetReports", timesheetReports);

  const getPayload = {
    year: selectedYear,
    month: selectedMonth + 1,
    projectId:projectId !== "All" ? projectId.id : "",
  };

  useEffect(() => {
    const payload = {
      id: 5,
      name: "Santosh M",
      type: "employee",
    };
    dispatch(getTimesheetReportsAction(getPayload, payload,));
  }, []);

  useEffect(() => {
    if (timesheetReports?.content) {
      setData(timesheetReports.content);
    }
  }, [timesheetReports]);

  return (
    <div>
      {!isMobile ? (
        <TableContainer component={Paper} sx={{ textAlign: "center" }}>
          <Table>
            <TableHead>
              <TableRow>
                {[
                  "S.No",
                  "Full Name",
                  "Employee Id",
                  "Employment Type",
                  "Projects",
                  "No.of Working Days",
                  "Total Working Days",
                  "Logged In Hours",
                  "Ratings",
                  "Variable Pay",
                  "LOP",
                  "Download",
                ].map((header) => (
                  <TableCell key={header} style={{ fontSize: "12px" }}>
                    <strong>{header}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody sx={{ textAlign: "center" }}>
              {data.map((row, index) => (
                <TableRow key={index}>
                  <TableCell style={{ fontSize: "13px" }}>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    <Grid container alignItems="center" spacing={1}>
                      <Avatar
                        sx={{ color: "#fff", backgroundColor: "#4813B8" }}
                      >
                        {row.fullName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Typography style={{ fontSize: "13px" }}>
                        {row.fullName}
                      </Typography>
                    </Grid>
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>
                    {row.employeeId}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>
                    {row.employmentType}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>
                    {row.projectNames.join(", ")}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>
                    {row.noOfWorkingDays}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>
                    {row.totalWorkingDays}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>
                    {row.loggedInHours}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>
                    {row.ratings}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>
                    {row.variablePay}
                  </TableCell>
                  <TableCell style={{ fontSize: "13px" }}>
                    {row.lossOfPay}
                  </TableCell>
                  <TableCell style={{ fontSize: "16px" }}>
                    <Button
                      onClick={() => window.open(row.downloadLink, "_blank")}
                    >
                      <SimCardDownloadOutlinedIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid container justifyContent="flex-end" padding="10px">
            <Button style={{ backgroundColor: "#008080", color: "white" }}>
              <SimCardDownloadOutlinedIcon />
              Download All
            </Button>
          </Grid>
        </TableContainer>
      ) : (
        <Grid container direction="column" padding={"10px"}>
          {data.map((row, index) => (
            <Paper key={index} sx={{ padding: "10px", marginBottom: "10px" }}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <strong>S.No:</strong> {index + 1}
                </Grid>
                <Grid item xs={12} container alignItems="center">
                  <Avatar
                    sx={{
                      color: "#fff",
                      backgroundColor: "#4813B8",
                      marginRight: "10px",
                    }}
                  >
                    {row.fullName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography style={{ fontSize: "13px" }}>
                    <strong>Full Name:</strong> {row.fullName}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <strong>Employee Id:</strong> {row.employeeId}
                </Grid>
                <Grid item xs={12}>
                  <strong>Employment Type:</strong> {row.employmentType}
                </Grid>
                <Grid item xs={12}>
                  <strong>Projects:</strong> {row.projectNames.join(", ")}
                </Grid>
                <Grid item xs={12}>
                  <strong>No.of Working Days:</strong> {row.noOfWorkingDays}
                </Grid>
                <Grid item xs={12}>
                  <strong>Total Working Days:</strong> {row.totalWorkingDays}
                </Grid>
                <Grid item xs={12}>
                  <strong>Logged In Hours:</strong> {row.loggedInHours}
                </Grid>
                <Grid item xs={12}>
                  <strong>Ratings:</strong> {row.ratings}
                </Grid>
                <Grid item xs={12}>
                  <strong>Variable Pay:</strong> {row.variablePay}
                </Grid>
                <Grid item xs={12}>
                  <strong>LOP:</strong> {row.lossOfPay}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={() => window.open(row.downloadLink, "_blank")}
                  >
                    <SimCardDownloadOutlinedIcon />
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          ))}
          <Grid container justifyContent="flex-end" padding="10px">
            <Button style={{ backgroundColor: "#008080", color: "white" }}>
              <SimCardDownloadOutlinedIcon />
              Download All
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ReportsTable;
