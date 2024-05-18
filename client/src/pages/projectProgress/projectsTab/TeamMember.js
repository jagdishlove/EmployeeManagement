import React from "react";

import Box from "@mui/material/Box";
import {
  Avatar,
  Grid,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import { Stack, IconButton } from "@mui/material";
import TeamMemebrs from "../../../assets/Team_Members.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

const TeamMember = (props) => {
  const {
    currentPage,
    totalPages,
    handlePrevPage,
    handleNextPage,
    dashboardProjectResources,
    startIndex,
    toggleRowExpansion,
    expandedRows,
  } = props;
  return (
    <div>
      <>
        <Grid
          container
          mt={"10px"}
          sx={{
            padding: "20px",
            boxShadow: "2",
            marginRight: "10px",
            backgroundColor: "#FFFFFF",
            borderRadius: "5px",
          }}
        >
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6} display={"flex"} flexDirection={"row"}>
              <img src={TeamMemebrs} />
              <Typography margin={2} variant="h5" style={{ fontWeight: "600" }}>
                {" "}
                Team Members
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container justifyContent="flex-end">
                <Stack
                  direction="row"
                  spacing={2}
                  alignItems="center"
                  justifyContent="flex-end"
                >
                  <Typography variant="body1" sx={{ color: "#5E5E5E" }}>
                    {currentPage + 1} of {totalPages} Pages
                  </Typography>
                  <IconButton
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                  >
                    <KeyboardArrowLeftOutlinedIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                  >
                    <ChevronRightOutlinedIcon />
                  </IconButton>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={{ overflowY: "auto" }}>
            <Table style={{ tableLayout: "fixed" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "600",
                      width: "10%",
                      fontSize: "18px",
                    }}
                  >
                    S.No
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "600",
                      width: "30%",
                      fontSize: "18px",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "600",
                      width: "20%",
                      fontSize: "18px",
                    }}
                  >
                    Designation
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "600",
                      width: "35%",
                      fontSize: "18px",
                    }}
                  >
                    Skills
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "600",
                      width: "20%",
                      fontSize: "18px",
                    }}
                  >
                    Total No. of Hours
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "600",
                      width: "20%",
                      fontSize: "18px",
                    }}
                  >
                    Logged In Hours
                  </TableCell>

                  <TableCell
                    style={{
                      fontWeight: "600",
                      width: "20%",
                      fontSize: "18px",
                    }}
                  >
                    Hours Left
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dashboardProjectResources?.content?.map((row, index) => (
                  <React.Fragment key={row.resourceId}>
                    <TableRow>
                      <TableCell style={{ fontSize: "16px" }}>
                        {startIndex + index + 1}
                      </TableCell>
                      <TableCell>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            {row?.fileStorage ? (
                              <>
                                <Avatar
                                  alt="Profile Picture"
                                  src={`data:image/png;base64,${row?.fileStorage?.data}`}
                                  sx={{
                                    border: "2px solid #A4A4A4",
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                <Avatar
                                  sx={{
                                    color: "#fff",
                                    backgroundColor: " #4813B8",
                                  }}
                                >
                                  {row?.employeeName.charAt(0)}
                                </Avatar>
                              </>
                            )}
                          </Grid>
                          <Grid item style={{ fontSize: "16px" }}>
                            {row.employeeName}
                          </Grid>
                        </Grid>
                      </TableCell>
                      <TableCell style={{ fontSize: "16px" }}>
                        {row.designation}
                      </TableCell>
                      <TableCell
                        style={{
                          maxWidth: "240px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {row.employeeSkills?.length > 0 && (
                          <React.Fragment>
                            <Grid
                              container
                              sx={{
                                border: "1px solid #F3F3F3",
                                borderRadius: "5px",
                                backgroundColor: "#F3F3F3",
                                overflow: "auto",
                              }}
                            >
                              {row.employeeSkills
                                .slice(0, 1)
                                .map((employeeSkill, skillIndex) => (
                                  <Grid
                                    item
                                    key={skillIndex}
                                    alignItems="center"
                                    sx={{
                                      border: "1px solid #AEAEAE",
                                      borderRadius: "8px",
                                      padding: "4px",
                                      margin: "5px",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "flex-end",
                                      color: "#000000",
                                      backgroundColor: "#ffffff",
                                    }}
                                  >
                                    <span style={{ color: "black" }}>
                                      {employeeSkill.skillName}
                                    </span>{" "}
                                    <>
                                      <StarOutlinedIcon
                                        style={{
                                          backgroundColor:
                                            employeeSkill.rating < 5
                                              ? "#90DC90"
                                              : employeeSkill.rating >= 5 &&
                                                employeeSkill.rating <= 7
                                              ? "#E6E62C"
                                              : "#E38F75",
                                          color: "#ffff",
                                          borderRadius: "50%",
                                          width: 15,
                                          height: 15,
                                          marginTop: 0,
                                          marginLeft: 2,
                                          marginRight: 2,
                                        }}
                                      />
                                      {employeeSkill.rating}
                                    </>
                                  </Grid>
                                ))}
                              {row.employeeSkills.length > 2 && (
                                <Grid
                                  item
                                  xs={2}
                                  alignItems="center"
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    marginLeft: "auto",
                                  }}
                                >
                                  <Button
                                    onClick={() => toggleRowExpansion(index)}
                                    style={{ justifyContent: " flexEnd" }}
                                  >
                                    {expandedRows.includes(index) ? (
                                      <>
                                        <KeyboardArrowUpIcon />
                                      </>
                                    ) : (
                                      <>
                                        <KeyboardArrowDownIcon />
                                      </>
                                    )}
                                  </Button>
                                </Grid>
                              )}
                            </Grid>
                          </React.Fragment>
                        )}
                      </TableCell>

                      <TableCell style={{ fontSize: "16px" }}>
                        {row.occupancyHours}
                      </TableCell>

                      <TableCell style={{ fontSize: "16px" }}>
                        {" "}
                        {row.loggedInHours}{" "}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-flex",
                          }}
                        >
                          <CircularProgressbar
                            value={row.hoursLeft}
                            styles={{
                              root: { width: "80px" },
                              path: {
                                stroke:
                                  parseInt(row.loggedInHours) >
                                  parseInt(row.occupancyHours)
                                    ? "#FF0000"
                                    : "#4CAF50",
                              },
                              text: { fontSize: "14px", fill: "#000" },
                            }}
                          />
                          <Box
                            sx={{
                              top: 0,
                              left: 0,
                              bottom: 0,
                              right: 0,
                              position: "absolute",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography
                              variant="caption"
                              component="div"
                              style={{ lineHeight: "15px", fontWeight: "bold" }}
                            >
                              {`${Math.abs(row.hoursLeft.split(" ")[0])} Hrs`}
                              <br />
                              {`${Math.abs(row.hoursLeft.split(" ")[2])} Mins`}
                              <br />
                              {parseFloat(row.loggedInHours) >
                              parseFloat(row.occupancyHours)
                                ? "exceed"
                                : "left"}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                    {expandedRows.includes(index) && (
                      <TableRow sx={{ border: "5px solid #EBEBEB" }}>
                        <TableCell colSpan={7}>
                          <Grid container>
                            {expandedRows.includes(index) &&
                              row.employeeSkills
                                .slice(1)
                                .map((employeeSkill, skillIndex) => (
                                  <Grid
                                    item
                                    key={skillIndex}
                                    sx={{
                                      border: "1px solid #AEAEAE",
                                      borderRadius: "8px",
                                      padding: "4px",
                                      margin: "5px",
                                      display: "block",
                                      alignItems: "center",
                                      justifyContent: "flex-end",
                                      color: "#000000",
                                      backgroundColor: "#ffffff",
                                      float: "left",
                                    }}
                                  >
                                    <span style={{ color: "black" }}>
                                      {employeeSkill.skillName}
                                    </span>{" "}
                                    <>
                                      <StarOutlinedIcon
                                        style={{
                                          backgroundColor:
                                            employeeSkill.rating < 5
                                              ? "#90DC90"
                                              : employeeSkill.rating >= 5 &&
                                                employeeSkill.rating <= 7
                                              ? "#E6E62C"
                                              : "#E38F75",
                                          color: "#ffff",
                                          borderRadius: "50%",
                                          width: 15,
                                          height: 15,
                                          marginTop: 0,
                                          marginLeft: 2,
                                          marginRight: 2,
                                        }}
                                      />
                                      {employeeSkill?.rating || 0}
                                    </>
                                  </Grid>
                                ))}

                            {row.employeeSkills?.length > 1 && (
                              <Grid
                                container
                                justifyContent="flex-end"
                                display={"flex"}
                                flexDirection={"row"}
                              >
                                <Button
                                  style={{
                                    padding: "0px",
                                  }}
                                  onClick={() => toggleRowExpansion(index)}
                                >
                                  {expandedRows.includes(index) ? (
                                    <>
                                      View Less
                                      <KeyboardArrowUpIcon />
                                    </>
                                  ) : (
                                    <>
                                      <KeyboardArrowDownIcon />
                                    </>
                                  )}
                                </Button>
                              </Grid>
                            )}
                          </Grid>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </>
    </div>
  );
};

export default TeamMember;
