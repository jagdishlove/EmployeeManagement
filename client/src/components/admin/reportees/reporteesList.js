import {
  Grid,
  Avatar,
  // Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Stack, IconButton, Typography } from "@mui/material";

import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ReporteesList() {
  const [expandedRows, setExpandedRows] = useState([]);

  const navigate = useNavigate();

  const reportees = useSelector(
    (state) => state?.nonPersist?.workSpace?.reports || []
  );

  const reporteesPages = useSelector(
    (state) => state?.nonPersist?.workSpace?.reports || []
  );

  const toggleRowExpansion = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
  };
  const totalPages = reporteesPages?.totalPages;

  const [currentPage, setCurrentPage] = useState(0);

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

  const handleNavigate = (id) => {
    navigate(`/userDetailPage/${id}`);
  };

  return (
    <Grid
      container
      spacing={2}
      mt={3}
      sx={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        borderRadius: "5px",
      }}
    >
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
      </Grid>
      <Grid container>
        <TableContainer
          component={Paper}
          sx={{
            padding: "10px",
            textAlign: "center",
          }}
        >
          <Table
            sx={{
              borderTop: "1px solid #DADADA",
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>S.No</strong>
                </TableCell>
                <TableCell>
                  <strong>Full Name</strong>
                </TableCell>
                <TableCell>
                  <strong>Designation</strong>
                </TableCell>
                <TableCell>
                  <strong>Skills</strong>
                </TableCell>
                <TableCell>
                  <strong>Mobile No</strong>
                </TableCell>
                <TableCell>
                  <strong>Reporting Manager</strong>
                </TableCell>
                <TableCell>
                  <strong>Project Name</strong>
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                textAlign: "center",
              }}
            >
              {reportees?.content?.length > 0 ? (
                <>
                  {reportees?.content?.map((row, index) => (
                    <>
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
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
                                    {row?.firstName?.charAt(0)}
                                  </Avatar>
                                </>
                              )}
                            </Grid>
                            <Grid item>
                              {row?.firstName} {row?.lastName}
                            </Grid>
                          </Grid>
                        </TableCell>
                        <TableCell>{row?.designation}</TableCell>

                        <TableCell>
                          {row.employeeSkillMapping?.length > 0 && (
                            <Grid
                              container
                              sx={{
                                border: "1px solid #F3F3F3",
                                borderRadius: "5px",
                                backgroundColor: "#F3F3F3",
                                overflow: "auto",
                              }}
                            >
                              {row.employeeSkillMapping
                                .slice(0, 2)
                                .map((employeeSkill, skillIndex) => (
                                  <Grid
                                    item
                                    key={skillIndex}
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
                                    {employeeSkill.rating && (
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
                                    )}
                                  </Grid>
                                ))}
                              {row.employeeSkillMapping.length > 2 && (
                                <Grid
                                  item
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-end",
                                    marginLeft: "auto",
                                  }}
                                >
                                  <Button
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
                          )}
                        </TableCell>
                        <TableCell>{row?.phoneNumber}</TableCell>
                        <TableCell>
                          {row?.managerFirstName} {row?.managerLastName}
                        </TableCell>
                        <TableCell>
                          {row?.projectName?.map((project, index) => (
                            <div key={index}>{project}</div>
                          ))}
                        </TableCell>
                        <TableCell
                          sx={{
                            color: "#1475E7",
                            cursor: "pointer",
                            textDecoration: "underline",
                            fontSize: "18px",
                          }}
                          onClick={() => handleNavigate(row.id)}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            view <KeyboardArrowRightIcon />
                            <KeyboardArrowRightIcon
                              sx={{
                                marginLeft: "-18px",
                              }}
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedRows.includes(index) ? (
                        <>
                          <TableRow sx={{ backgroundColor: "#EBEBEB" }}>
                            <TableCell colSpan={8}>
                              <Grid sx={{ backgroundColor: "#fff" }}>
                                {expandedRows.includes(index) &&
                                  row?.employeeSkillMapping?.map(
                                    (employeeSkill, skillIndex) => (
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
                                        {employeeSkill.rating && (
                                          <>
                                            <StarOutlinedIcon
                                              style={{
                                                backgroundColor:
                                                  employeeSkill.rating < 5
                                                    ? "#90DC90"
                                                    : employeeSkill.rating >=
                                                        5 &&
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
                                        )}
                                      </Grid>
                                    )
                                  )}
                              </Grid>
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  ))}
                </>
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Box
                        colSpan={6}
                        mt={5}
                        sx={{ display: "flex", justifyContent: "center" }}
                      >
                        <Typography>Reportees Data Not Found</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
