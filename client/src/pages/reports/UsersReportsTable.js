import React, { useEffect, useMemo, useState } from "react";
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
  Box,
} from "@mui/material";
import SimCardDownloadOutlinedIcon from "@mui/icons-material/SimCardDownloadOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import {  getSingleDownloadReportAction, getTimesheetReportsAction } from "../../redux/actions/dashboard/reports/reportsAction";
import { useDispatch, useSelector } from "react-redux";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ReportsTable = ({
  selectedMonth,
  selectedYear,
  projectId,
  employmentTypeId,
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [expandedProjects, setExpandedProjects] = useState([]);
  const timesheetReports = useSelector(
    (state) => state?.persistData?.timesheetreportsDetails
  );

  const singleDownloadReport = useSelector((state) => state?.persistData);
  console.log("singleDownloadReport", singleDownloadReport);
  const employeeId = 5;
  const params = {
    year: selectedYear,
    month: selectedMonth + 1,
  };
  // useEffect(() => {
  //   dispatch(getSingleDownloadReportAction( params));
  // }, []);

  const getPayload = useMemo(
    () => ({
      year: selectedYear,
      month: selectedMonth + 1,
      projectId: projectId !== "All" ? projectId : "",
      employmentTypeId: employmentTypeId !== "All" ? employmentTypeId : "",
    }),
    [selectedYear, selectedMonth, projectId, employmentTypeId]
  );

  useEffect(() => {
    dispatch(getTimesheetReportsAction(getPayload));
  }, [dispatch, selectedMonth, selectedYear, projectId, employmentTypeId]);

  useEffect(() => {
    if (timesheetReports?.timesheetreportsDetails) {
      setData(timesheetReports?.timesheetreportsDetails?.content);
    }
  }, [timesheetReports]);

  const toggleProjectExpansion = (index) => {
    if (expandedProjects.includes(index)) {
      setExpandedProjects(
        expandedProjects.filter((projectIndex) => projectIndex !== index)
      );
    } else {
      setExpandedProjects([...expandedProjects, index]);
    }
  };


  const handleDownload = () => {
    // Dispatch the action to fetch the download link
    dispatch(getSingleDownloadReportAction(params, employeeId))
      .then((response) => {
        // Extract the download link from the response
        const downloadLink = response?.data?.downloadLink;
        console.log("downloadLink", downloadLink)
        // Check if the download link is available
        if (downloadLink) {
          // Create a temporary anchor element
          const link = document.createElement("a");
          link.href = downloadLink;
          link.target = "_blank"; // Open in a new tab
          link.download = "report.pdf"; // Set the filename
          // Trigger the download by simulating a click
          link.click();
        } else {
          // Handle case where download link is not available
          console.error("Download link not found");
        }
      })
      .catch((error) => {
        // Handle any errors that occur during the download process
        console.error("Error downloading report:", error);
      });
  };
  
  
  return (
    <div>
      {!isMobile ? (
        <TableContainer
          component={Paper}
          sx={{ textAlign: "center", padding: "10px" }}
        >
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
              {data?.map((row, index) => (
                <React.Fragment key={row.sNo}>
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
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          width: {
                            xs: "100%", // Full width on small screens
                            sm: "200px", // Specific width on medium and larger screens
                            md: "170px",
                          },
                          height: "40px",
                          padding: "0 8px",
                        }}
                      >
                        <Box
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "flex",
                            alignItems: "center",
                            flex: 1,
                          }}
                        >
                          {row?.projectNames
                            .slice(0, 1)
                            ?.map((project, projectIndex) => (
                              <Grid
                                item
                                key={projectIndex}
                                sx={{
                                  border: "1px solid #AEAEAE",
                                  borderRadius: "8px",
                                  padding: "10px",
                                  margin: "5px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  color: "#000000",
                                  backgroundColor: "#ffffff",
                                }}
                              >
                                {project}
                              </Grid>
                            ))}
                        </Box>
                        {/* Conditionally render the button */}
                        {row.projectNames.length > 1 && (
                          <Button
                            variant="text"
                            onClick={() => toggleProjectExpansion(index)}
                            sx={{
                              fontSize: "20px",
                              color: "#1475E7",
                              paddingRight: "8px",
                              minWidth: "auto", // Adjust button width to fit content
                            }}
                          >
                            {expandedProjects.includes(index) ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </Button>
                        )}
                      </Box>
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
                        onClick={() => handleDownload(row.downloadLink, selectedMonth)}
                      >
                        <SimCardDownloadOutlinedIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                  {expandedProjects.includes(index) &&
                  row.projectNames.length > 1 ? (
                    <TableRow sx={{ border: "5px solid #EBEBEB" }}>
                      <TableCell colSpan={12}>
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{
                            backgroundColor: "#fff",
                            padding: "5px",
                          }}
                        >
                          <Grid item display={"flex"} flexDirection={"row"}>
                            {row.projectNames
                              .slice(1)
                              .map((projectName, index) => (
                                <Typography
                                  key={index} // Don't forget to provide a unique key if you're rendering a list
                                  variant="body1"
                                  sx={{
                                    border: "1px solid #AEAEAE",
                                    borderRadius: "8px",
                                    padding: "4px",
                                    margin: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#000000",
                                    backgroundColor: "#ffffff",
                                    flexGrow: 1,
                                  }}
                                >
                                  {projectName}
                                </Typography>
                              ))}
                          </Grid>

                          <Button
                            variant="text"
                            onClick={() => toggleProjectExpansion(index)}
                            style={{ fontSize: "12px", color: "black" }}
                          >
                            <span style={{ marginRight: "5px" }}>
                              View Less
                            </span>
                            <KeyboardArrowUpIcon
                              style={{ color: "#008080", marginLeft: "5px" }}
                            />
                          </Button>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  ) : null}
                </React.Fragment>
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
          {data?.map((row, index) => (
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
